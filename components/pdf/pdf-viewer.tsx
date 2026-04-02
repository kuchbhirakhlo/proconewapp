"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ZoomIn, ZoomOut, RotateCw, X, Lock, AlertCircle, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import * as pdfjsLib from "pdfjs-dist"

// Set the worker source to the bundled worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

interface PDFViewerProps {
    pdfUrl: string
    pdfId?: string
    title: string
    onClose?: () => void
    className?: string
}

export default function PDFViewer({ pdfUrl, pdfId, title, onClose, className = "" }: PDFViewerProps) {
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [error, setError] = useState<string>("")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(true)
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const pdfDocRef = useRef<pdfjsLib.PDFDocumentProxy | null>(null)
    const renderTaskRef = useRef<pdfjsLib.RenderTask | null>(null)

    // Extract PDF ID and token from Firebase Storage URL
    const getProxyUrl = useCallback(() => {
        try {
            const url = new URL(pdfUrl)
            const pathParts = url.pathname.split('/o/')[1]?.split('%2F')
            if (pathParts && pathParts.length > 0) {
                const fileName = decodeURIComponent(pathParts[pathParts.length - 1])
                const token = url.searchParams.get('token')
                return `/api/pdf-proxy?pdfId=${encodeURIComponent(fileName)}${token ? `&token=${token}` : ''}`
            }
        } catch (e) {
            console.error('Error parsing PDF URL:', e)
        }
        return pdfUrl
    }, [pdfUrl])

    const proxyUrl = getProxyUrl()

    // Load PDF document
    useEffect(() => {
        let cancelled = false

        const loadPDF = async () => {
            try {
                setLoading(true)
                setError("")

                const response = await fetch(proxyUrl)
                if (!response.ok) {
                    const errorText = await response.text()
                    throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`)
                }

                const arrayBuffer = await response.arrayBuffer()
                if (cancelled) return

                const loadingTask = pdfjsLib.getDocument({
                    data: arrayBuffer,
                    // Limit memory usage on mobile
                    maxImageSize: 16777216, // 4096x4096 max
                })
                const pdf = await loadingTask.promise

                if (cancelled) {
                    pdf.destroy()
                    return
                }

                pdfDocRef.current = pdf
                setTotalPages(pdf.numPages)
                setCurrentPage(1)
            } catch (err) {
                if (cancelled) return
                console.error('PDF loading error:', err)
                setError(`Failed to load PDF: ${err instanceof Error ? err.message : 'Unknown error'}`)
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        loadPDF()

        return () => {
            cancelled = true
            // Cancel any in-flight render task
            if (renderTaskRef.current) {
                renderTaskRef.current.cancel()
                renderTaskRef.current = null
            }
            // Clean up PDF document
            if (pdfDocRef.current) {
                pdfDocRef.current.destroy()
                pdfDocRef.current = null
            }
        }
    }, [proxyUrl])

    // Render a specific page
    const renderPage = useCallback(async (pageNum: number) => {
        try {
            const pdfDoc = pdfDocRef.current
            if (!pdfDoc || !canvasRef.current || !containerRef.current) return

            // Cancel any existing render task
            if (renderTaskRef.current) {
                renderTaskRef.current.cancel()
                renderTaskRef.current = null
            }

            const page = await pdfDoc.getPage(pageNum)
            const viewport = page.getViewport({ scale: 1, rotation })

            // Calculate optimal scale for container
            const container = containerRef.current
            const containerWidth = container.clientWidth - 16 // padding
            const containerHeight = container.clientHeight - 16

            let scale = zoom
            // Auto-fit to width on mobile for initial load
            if (containerWidth < 768) {
                const fitToWidthScale = containerWidth / viewport.width
                scale = Math.min(zoom, fitToWidthScale)
            }

            const scaledViewport = page.getViewport({ scale, rotation })

            // Clamp canvas dimensions to prevent mobile browser crashes
            const maxCanvasSize = 4096
            let finalWidth = scaledViewport.width
            let finalHeight = scaledViewport.height

            if (finalWidth > maxCanvasSize || finalHeight > maxCanvasSize) {
                const ratio = Math.min(maxCanvasSize / finalWidth, maxCanvasSize / finalHeight)
                finalWidth = Math.floor(finalWidth * ratio)
                finalHeight = Math.floor(finalHeight * ratio)
            }

            const canvas = canvasRef.current
            canvas.width = finalWidth
            canvas.height = finalHeight

            const renderContext = {
                canvasContext: canvas.getContext('2d')!,
                viewport: scaledViewport,
                canvas: canvas,
            }

            const renderTask = page.render(renderContext)
            renderTaskRef.current = renderTask
            await renderTask.promise
            renderTaskRef.current = null

            setCurrentPage(pageNum)
        } catch (err: any) {
            if (err?.name === 'RenderingCancelledException') return
            console.error('Page render error:', err)
            setError("Failed to render page")
        }
    }, [zoom, rotation])

    // Render when PDF is loaded or page/zoom/rotation changes
    useEffect(() => {
        if (pdfDocRef.current && !loading) {
            renderPage(currentPage)
        }
    }, [pdfDocRef.current, loading, currentPage, zoom, rotation, renderPage])

    // Prevent right-click context menu on the PDF viewer
    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault()
    }

    // Prevent keyboard shortcuts for printing and saving
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault()
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    const handleZoomIn = () => {
        setZoom(prev => Math.min(prev + 0.25, 3))
    }

    const handleZoomOut = () => {
        setZoom(prev => Math.max(prev - 0.25, 0.5))
    }

    const handleRotate = () => {
        setRotation(prev => (prev + 90) % 360)
    }

    const handlePrevPage = () => {
        const newPage = Math.max(1, currentPage - 1)
        setCurrentPage(newPage)
    }

    const handleNextPage = () => {
        const newPage = Math.min(totalPages, currentPage + 1)
        setCurrentPage(newPage)
    }

    const handleOpenInNewTab = () => {
        window.open(proxyUrl, '_blank')
    }

    return (
        <Card className={`w-full h-full flex flex-col ${className}`}>
            <CardContent className="p-0 flex flex-col flex-1 overflow-hidden min-h-0">
                {error && (
                    <div className="p-3 sm:p-4 bg-yellow-50 border-b border-yellow-200 flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div className="text-xs sm:text-sm text-yellow-700 flex-1">
                            <p className="font-semibold">PDF Loading Issue</p>
                            <p className="break-words">{error}</p>
                            <Button
                                variant="link"
                                size="sm"
                                className="h-auto p-0 mt-1 text-xs text-yellow-700 underline"
                                onClick={handleOpenInNewTab}
                            >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Open PDF in new tab instead
                            </Button>
                        </div>
                    </div>
                )}
                <div
                    ref={containerRef}
                    className="relative flex-1 bg-gray-100 overflow-auto touch-pan-y touch-pan-x"
                    onContextMenu={handleContextMenu}
                    style={{ WebkitOverflowScrolling: 'touch' }}
                >
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 p-4">
                            <p className="text-sm sm:text-base">Loading PDF...</p>
                        </div>
                    )}
                    {!loading && (
                        <div className="flex items-center justify-center min-h-full p-2 sm:p-4">
                            <canvas
                                ref={canvasRef}
                                className="shadow-lg max-w-full h-auto"
                                style={{ maxHeight: '100%' }}
                            />
                        </div>
                    )}

                    {/* Floating controls - responsive layout */}
                    <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-10 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-1.5 sm:p-2 flex flex-row sm:flex-col gap-1.5 sm:gap-2 max-w-[calc(100vw-1rem)] sm:max-w-none">
                        {/* Page navigation */}
                        <div className="flex items-center gap-0.5 sm:gap-1 bg-gray-100 rounded-md p-0.5 sm:p-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handlePrevPage}
                                disabled={currentPage <= 1}
                                title="Previous page"
                                className="h-9 w-9 sm:h-7 sm:w-7 p-0 touch-manipulation"
                            >
                                <ChevronLeft className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                            </Button>
                            <span className="text-xs sm:text-xs text-gray-600 min-w-[50px] sm:min-w-[60px] text-center px-0.5 sm:px-1 text-[10px] sm:text-xs">
                                {currentPage}/{totalPages}
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleNextPage}
                                disabled={currentPage >= totalPages}
                                title="Next page"
                                className="h-9 w-9 sm:h-7 sm:w-7 p-0 touch-manipulation"
                            >
                                <ChevronRight className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                            </Button>
                        </div>

                        {/* Zoom controls */}
                        <div className="flex items-center gap-0.5 sm:gap-1">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleZoomOut}
                                disabled={zoom <= 0.5}
                                title="Zoom out"
                                className="h-9 w-9 sm:h-7 sm:w-7 p-0 touch-manipulation"
                            >
                                <ZoomOut className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                            </Button>
                            <span className="text-[10px] sm:text-xs text-gray-600 min-w-[40px] sm:min-w-[50px] text-center px-0.5 sm:px-1">
                                {Math.round(zoom * 100)}%
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleZoomIn}
                                disabled={zoom >= 3}
                                title="Zoom in"
                                className="h-9 w-9 sm:h-7 sm:w-7 p-0 touch-manipulation"
                            >
                                <ZoomIn className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                            </Button>
                        </div>

                        {/* Other controls */}
                        <div className="flex items-center gap-0.5 sm:gap-1">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleRotate}
                                title="Rotate page"
                                className="h-9 w-9 sm:h-7 sm:w-7 p-0 touch-manipulation"
                            >
                                <RotateCw className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                            </Button>
                            <div className="hidden sm:flex items-center gap-1 px-2 text-xs text-green-700" title="Secure document">
                                <Lock className="h-3 w-3 text-green-600" />
                                <span>Secure</span>
                            </div>
                            <div className="sm:hidden flex items-center px-1" title="Secure document">
                                <Lock className="h-3.5 w-3.5 text-green-600" />
                            </div>
                            {onClose && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={onClose}
                                    title="Close"
                                    className="h-9 w-9 sm:h-7 sm:w-7 p-0 touch-manipulation"
                                >
                                    <X className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
