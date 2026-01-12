"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ZoomIn, ZoomOut, RotateCw, X, Lock, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react"

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
    const [pdfJsLoaded, setPdfJsLoaded] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const pdfDocRef = useRef<any>(null)
    const pdfjsLibRef = useRef<any>(null)
    const initialRenderDone = useRef(false)

    // Load PDF.js from CDN
    useEffect(() => {
        const loadPdfJs = async () => {
            try {
                // Load PDF.js library
                const pdfjsScript = document.createElement('script')
                pdfjsScript.src = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.min.js'
                pdfjsScript.onload = async () => {
                    // Load the worker
                    const workerScript = document.createElement('script')
                    workerScript.src = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'
                    workerScript.onload = () => {
                        // @ts-ignore
                        pdfjsLibRef.current = window.pdfjsLib
                        pdfjsLibRef.current.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'
                        setPdfJsLoaded(true)
                    }
                    workerScript.onerror = () => {
                        setError("Failed to load PDF worker")
                    }
                    document.body.appendChild(workerScript)
                }
                pdfjsScript.onerror = () => {
                    setError("Failed to load PDF.js library")
                }
                document.body.appendChild(pdfjsScript)
            } catch (err) {
                console.error('Error loading PDF.js:', err)
                setError("Failed to initialize PDF viewer")
            }
        }

        loadPdfJs()

        return () => {
            // Cleanup scripts if needed
        }
    }, [])

    // Extract PDF ID and token from Firebase Storage URL
    const getProxyUrl = () => {
        try {
            const url = new URL(pdfUrl)
            const pathParts = url.pathname.split('/o/')[1]?.split('%2F')
            if (pathParts && pathParts.length > 0) {
                // Get the filename (last part after course_pdfs/)
                const fileName = decodeURIComponent(pathParts[pathParts.length - 1])
                const token = url.searchParams.get('token')
                return `/api/pdf-proxy?pdfId=${encodeURIComponent(fileName)}${token ? `&token=${token}` : ''}`
            }
        } catch (e) {
            console.error('Error parsing PDF URL:', e)
        }
        // Fallback: just use the original URL
        return pdfUrl
    }

    const proxyUrl = getProxyUrl()

    // Load PDF document
    useEffect(() => {
        const loadPDF = async () => {
            try {
                setLoading(true)
                setError("")

                // Wait for pdfjsLib to be loaded
                if (!pdfjsLibRef.current || !pdfJsLoaded) {
                    // Give it a moment to load
                    await new Promise(resolve => setTimeout(resolve, 500))
                    if (!pdfjsLibRef.current) {
                        setError("PDF viewer not available in this environment")
                        setLoading(false)
                        return
                    }
                }

                const pdfjsLib = pdfjsLibRef.current

                // Fetch PDF through proxy to avoid CORS issues
                const response = await fetch(proxyUrl)
                if (!response.ok) {
                    const errorText = await response.text()
                    throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`)
                }

                const arrayBuffer = await response.arrayBuffer()
                const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
                const pdf = await loadingTask.promise

                pdfDocRef.current = pdf
                setTotalPages(pdf.numPages)
            } catch (err) {
                console.error('PDF loading error:', err)
                setError(`Failed to load PDF: ${err instanceof Error ? err.message : 'Unknown error'}`)
            } finally {
                setLoading(false)
            }
        }

        if (pdfJsLoaded) {
            loadPDF()
        }
    }, [proxyUrl, pdfJsLoaded])

    // Render first page when PDF is loaded and canvas is available
    useEffect(() => {
        if (!pdfDocRef.current || loading || initialRenderDone.current) return

        const renderInitialPage = async () => {
            initialRenderDone.current = true
            // Wait for canvas to be available in DOM
            let attempts = 0
            while (!canvasRef.current && attempts < 20) {
                await new Promise(resolve => setTimeout(resolve, 50))
                attempts++
            }
            if (canvasRef.current) {
                await renderPage(1, pdfDocRef.current, true)
            }
        }

        renderInitialPage()
    }, [pdfDocRef.current, loading])

    // Render a specific page
    const renderPage = async (pageNum: number, pdf?: any, isInitial = false) => {
        try {
            const pdfDoc = pdf || pdfDocRef.current
            if (!pdfDoc || !canvasRef.current) return

            // Ensure canvas is in DOM before rendering
            if (isInitial && !canvasRef.current.offsetParent) {
                await new Promise(resolve => setTimeout(resolve, 100))
            }

            const page = await pdfDoc.getPage(pageNum)

            // Calculate optimal scale for mobile devices on initial load
            let finalZoom = zoom

            if (isInitial && canvasRef.current.offsetParent) {
                const containerWidth = (canvasRef.current.offsetParent as HTMLElement).clientWidth
                const isMobile = containerWidth < 768

                if (isMobile) {
                    // Get base viewport to calculate fit-to-screen scale
                    const baseViewport = page.getViewport({ scale: 1, rotation })
                    const padding = 40 // padding on mobile for controls
                    const maxWidth = containerWidth - padding
                    const scaleX = maxWidth / baseViewport.width
                    // Use the smaller of fit-to-width or current zoom
                    finalZoom = Math.min(scaleX, zoom)
                }
            }

            // Apply rotation through PDF.js viewport so the canvas size matches
            // the rotated page, preventing the content from being cut off.
            const viewport = page.getViewport({ scale: finalZoom, rotation })

            canvasRef.current.width = viewport.width
            canvasRef.current.height = viewport.height

            const renderContext = {
                canvasContext: canvasRef.current.getContext('2d')!,
                viewport: viewport,
            }

            await page.render(renderContext).promise
            setCurrentPage(pageNum)
        } catch (err) {
            console.error('Page render error:', err)
            setError("Failed to render page")
        }
    }

    // Re-render when zoom or rotation changes
    useEffect(() => {
        if (pdfDocRef.current && currentPage > 0) {
            renderPage(currentPage)
        }
    }, [zoom, rotation, currentPage])

    // Prevent right-click context menu on the PDF viewer
    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault()
    }

    // Prevent keyboard shortcuts for printing and saving
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent Ctrl+S / Cmd+S (Save)
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault()
            }
            // Prevent Ctrl+P / Cmd+P (Print)
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

    const handlePrevPage = async () => {
        const newPage = Math.max(1, currentPage - 1)
        await renderPage(newPage)
    }

    const handleNextPage = async () => {
        const newPage = Math.min(totalPages, currentPage + 1)
        await renderPage(newPage)
    }

    return (
        <Card className={`w-full h-full flex flex-col ${className}`}>
            <CardContent className="p-0 flex flex-col flex-1 overflow-hidden min-h-0">
                {error && (
                    <div className="p-3 sm:p-4 bg-yellow-50 border-b border-yellow-200 flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div className="text-xs sm:text-sm text-yellow-700">
                            <p className="font-semibold">PDF Loading Issue</p>
                            <p className="break-words">{error}</p>
                            {!pdfJsLoaded && (
                                <p className="mt-2 text-[10px] sm:text-xs">If this persists, please check your internet connection.</p>
                            )}
                        </div>
                    </div>
                )}
                <div
                    className="relative flex-1 bg-gray-100 overflow-auto touch-pan-y touch-pan-x"
                    onContextMenu={handleContextMenu}
                    style={{ WebkitOverflowScrolling: 'touch' }}
                >
                    {!pdfJsLoaded && !error && (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 p-4">
                            <p className="text-sm sm:text-base">Initializing PDF viewer...</p>
                        </div>
                    )}
                    {loading && pdfJsLoaded && (
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
