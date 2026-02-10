"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = window.innerWidth + "px"
      canvas.style.height = window.innerHeight + "px"
    }
    
    // Initial resize with timeout to avoid layout thrashing
    const timer = setTimeout(resizeCanvas, 100)
    window.addEventListener("resize", resizeCanvas, { passive: true })

    // Particle system
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
    }> = []

    const colors = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444"]

    // Create particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, "0")
        ctx.fill()
      })

      // Use requestAnimationFrame for smooth animation
      animationId = requestAnimationFrame(animate)
    }
    
    // Start animation with a delay to prioritize LCP
    const animationTimer = setTimeout(() => {
      animate()
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearTimeout(animationTimer)
      window.removeEventListener("resize", resizeCanvas)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none" 
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  )
}
