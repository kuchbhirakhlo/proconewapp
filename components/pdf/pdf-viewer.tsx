"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ZoomIn, ZoomOut, RotateCw, X, Lock, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react"

let pdfjsLib: any = null
if (typeof window !== 'undefined') {
    // Dynamically import pdfjs-dist only in browser
    import('pdfjs-dist').then((module) => {
        pdfjsLib = module
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
    })
}

interface PDFViewerProps {
    pdfUrl: string
    pdfId?: string
    title: string
    onClose?: () => void
    className?: string
}

export default function PDFViewer({ pdfUrl, pdfId, title, onClose, className = "" }: PDFViewerProps) {
    const [zoom, setZoom] = useState(1.5)
    const [rotation, setRotation] = useState(0)
    const [error, setError] = useState<string>("")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(true)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const pdfDocRef = useRef<any>(null)

    // Ensure PDF URL has ?alt=media parameter for direct download
    const getProperPdfUrl = () => {
        let url = pdfUrl
        // Add ?alt=media if not already present and it's a Firebase URL
        if (url.includes('firebasestorage') && !url.includes('?')) {
            url += '?alt=media'
        }
        return url
    }

    const properUrl = getProperPdfUrl()

    // Load PDF.js document and render first page
    useEffect(() => {
        const loadPDF = async () => {
            try {
                setLoading(true)
                setError("")
                
                // Wait for pdfjsLib to be loaded
                if (!pdfjsLib) {
                    setError("PDF viewer not available in this environment")
                    setLoading(false)
                    return
                }
                
                // Fetch PDF with CORS handling
                const response = await fetch(properUrl)
                if (!response.ok) throw new Error(`HTTP ${response.status}`)
                
                const arrayBuffer = await response.arrayBuffer()
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
                
                pdfDocRef.current = pdf
                setTotalPages(pdf.numPages)
                
                // Render first page
                await renderPage(1, pdf)
            } catch (err) {
                console.error('PDF loading error:', err)
                setError(`Failed to load PDF: ${err instanceof Error ? err.message : 'Unknown error'}`)
            } finally {
                setLoading(false)
            }
        }

        loadPDF()
    }, [properUrl])

    // Render a specific page
    const renderPage = async (pageNum: number, pdf?: any) => {
        try {
            const pdfDoc = pdf || pdfDocRef.current
            if (!pdfDoc || !canvasRef.current) return

            const page = await pdfDoc.getPage(pageNum)
            const viewport = page.getViewport({ scale: zoom, rotation })

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
        <Card className={`w-full h-full ${className}`}>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CardTitle className="text-lg truncate">{title}</CardTitle>
                        <div title="This document is secure and protected">
                            <Lock className="h-4 w-4 text-green-600" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-gray-200 rounded-md p-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handlePrevPage}
                                disabled={currentPage <= 1}
                                title="Previous page"
                                className="h-8 w-8 p-0"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="text-sm text-gray-600 min-w-[80px] text-center">
                                {currentPage}/{totalPages}
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleNextPage}
                                disabled={currentPage >= totalPages}
                                title="Next page"
                                className="h-8 w-8 p-0"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                        
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleZoomOut}
                            disabled={zoom <= 0.5}
                            title="Zoom out"
                        >
                            <ZoomOut className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-gray-600 min-w-[60px] text-center">
                            {Math.round(zoom * 100)}%
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleZoomIn}
                            disabled={zoom >= 3}
                            title="Zoom in"
                        >
                            <ZoomIn className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRotate}
                            title="Rotate page"
                        >
                            <RotateCw className="h-4 w-4" />
                        </Button>
                        {onClose && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onClose}
                                title="Close"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0 flex flex-col h-full">
                {error && (
                    <div className="p-4 bg-yellow-50 border-b border-yellow-200 flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-yellow-700">
                            <p className="font-semibold">PDF Loading Issue</p>
                            <p>{error}</p>
                        </div>
                    </div>
                )}
                <div 
                    className="relative flex-1 bg-gray-100 overflow-auto flex items-center justify-center"
                    onContextMenu={handleContextMenu}
                >
                    {loading && (
                        <div className="text-center text-gray-500">
                            <p className="mb-2">Loading PDF...</p>
                        </div>
                    )}
                    {!loading && (
                        <canvas
                            ref={canvasRef}
                            className="shadow-lg"
                            style={{
                                transform: `rotate(${rotation}deg)`,
                            }}
                        />
                    )}
                </div>
                <div className="p-4 bg-blue-50 border-t border-blue-200">
                    <div className="flex items-start gap-2">
                        <Lock className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                        <div className="text-sm text-blue-700">
                            <p className="font-semibold mb-1">🔒 Secure Document</p>
                            <p>This document is protected and can only be viewed by authorized students. Downloading and sharing are disabled.</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}