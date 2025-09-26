"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, ExternalLink, ZoomIn, ZoomOut, RotateCw, X } from "lucide-react"

interface PDFViewerProps {
    pdfUrl: string
    title: string
    onClose?: () => void
    className?: string
}

export default function PDFViewer({ pdfUrl, title, onClose, className = "" }: PDFViewerProps) {
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)

    const handleZoomIn = () => {
        setZoom(prev => Math.min(prev + 0.25, 2))
    }

    const handleZoomOut = () => {
        setZoom(prev => Math.max(prev - 0.25, 0.5))
    }

    const handleRotate = () => {
        setRotation(prev => (prev + 90) % 360)
    }

    const handleDownload = () => {
        const link = document.createElement('a')
        link.href = pdfUrl
        link.download = `${title}.pdf`
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const handleOpenInNewTab = () => {
        window.open(pdfUrl, '_blank')
    }

    return (
        <Card className={`w-full h-full ${className}`}>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg truncate">{title}</CardTitle>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleZoomOut}
                            disabled={zoom <= 0.5}
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
                            disabled={zoom >= 2}
                        >
                            <ZoomIn className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRotate}
                        >
                            <RotateCw className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDownload}
                        >
                            <Download className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleOpenInNewTab}
                        >
                            <ExternalLink className="h-4 w-4" />
                        </Button>
                        {onClose && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onClose}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="relative w-full h-[600px] md:h-[800px]">
                    <iframe
                        src={`${pdfUrl}#zoom=${zoom * 100}&scrollbar=1&toolbar=1&navpanes=1`}
                        className="w-full h-full border-0"
                        title={title}
                        style={{
                            transform: `rotate(${rotation}deg)`,
                            transformOrigin: 'center'
                        }}
                    />
                </div>
                <div className="p-4 bg-gray-50 text-sm text-gray-600">
                    <p className="mb-2">
                        <strong>Instructions:</strong> Use the controls above to zoom, rotate, download, or open in a new tab.
                    </p>
                    <p>
                        If the PDF doesn't load properly, try opening it in a new tab or downloading it directly.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}