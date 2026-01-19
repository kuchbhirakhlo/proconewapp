"use client"

import { useState, useEffect } from "react"

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Hide splash screen after animation completes
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="splash-screen">
      <style jsx>{`
        .splash-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 50%, #7f1d1d 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeOut 0.5s ease-in-out 2s forwards;
        }

        .logo-container {
          position: relative;
          width: 120px;
          height: 120px;
          animation: pulse 2s ease-in-out infinite;
        }

        .logo-container img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .brand-name {
          margin-top: 24px;
          font-family: "Inter", sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: white;
          letter-spacing: 2px;
          text-transform: uppercase;
          animation: slideUp 0.8s ease-out 0.3s backwards;
        }

        .tagline {
          margin-top: 12px;
          font-family: "Inter", sans-serif;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 1px;
          animation: slideUp 0.8s ease-out 0.5s backwards;
        }

        .loading-dots {
          display: flex;
          gap: 8px;
          margin-top: 32px;
          animation: slideUp 0.8s ease-out 0.7s backwards;
        }

        .loading-dots span {
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
          animation: bounce 1.4s ease-in-out infinite;
        }

        .loading-dots span:nth-child(1) {
          animation-delay: 0s;
        }

        .loading-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .loading-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }

        .circle-decoration {
          position: absolute;
          width: 200px;
          height: 200px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: rotate 20s linear infinite;
        }

        .circle-decoration:nth-child(1) {
          width: 160px;
          height: 160px;
          animation-duration: 15s;
          animation-direction: reverse;
        }

        .circle-decoration:nth-child(2) {
          width: 240px;
          height: 240px;
          animation-duration: 25s;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeOut {
          to {
            opacity: 0;
            visibility: hidden;
          }
        }
      `}</style>

      <div className="circle-decoration" />
      <div className="circle-decoration" />

      <div className="logo-container">
        <img src="/proco_tech.jpg" alt="Proco Technologies" />
      </div>

      <h1 className="brand-name">Proco Technologies</h1>
      <p className="tagline">Innovate. Create. Transform.</p>

      <div className="loading-dots">
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}
