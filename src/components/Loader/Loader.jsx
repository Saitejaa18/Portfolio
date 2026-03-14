import { useEffect, useRef } from 'react'
import './Loader.css'

export default function Loader() {
    const loaderRef = useRef(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (loaderRef.current) {
                loaderRef.current.classList.add('hidden')
            }
        }, 2500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div id="loader" ref={loaderRef}>
            <div className="loader-inner">
                {/* Spider-Man mask SVG */}
                <div className="loader-mask">
                    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Mask shell with rounded anatomical chin (Iteration 4) */}
                        <path className="mask-fill" d="M60 2 C32 2, 12 22, 12 58 C12 82, 35 112, 60 116 C85 112, 108 82, 108 58 C108 22, 88 2, 60 2 Z" />
                        
                        {/* Radial Webbing Pattern */}
                        <g className="web-group">
                            {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map(angle => (
                                <line 
                                    key={angle}
                                    className="web-line" 
                                    x1="60" y1="52" 
                                    x2={60 + 100 * Math.cos((angle * Math.PI) / 180)} 
                                    y2={52 + 100 * Math.sin((angle * Math.PI) / 180)}
                                    strokeWidth="0.8" 
                                />
                            ))}
                            {/* Concentric curved web arcs */}
                            <path className="web-circle" d="M30 35 Q60 22 90 35" strokeWidth="0.8" />
                            <path className="web-circle" d="M18 52 Q60 40 102 52" strokeWidth="0.8" />
                            <path className="web-circle" d="M15 72 Q60 65 105 72" strokeWidth="0.8" />
                            <path className="web-circle" d="M28 98 Q60 108 92 98" strokeWidth="0.8" />
                        </g>

                        {/* Large, expressive anatomical eyes */}
                        <g className="mask-eyes">
                            {/* Left Eye */}
                            <path d="M16 52 C24 34, 46 34, 56 52 C46 72, 30 76, 16 52 Z" fill="#000" />
                            <path className="mask-eye" d="M21 53 C28 40, 42 40, 51 53 C42 66, 28 68, 21 53 Z" />
                            
                            {/* Right Eye */}
                            <path d="M104 52 C96 34, 74 34, 64 52 C74 72, 90 76, 104 52 Z" fill="#000" />
                            <path className="mask-eye" d="M99 53 C92 40, 78 40, 69 53 C78 66, 92 68, 99 53 Z" />
                        </g>
                    </svg>
                </div>
                <div className="loader-text">
                    <span className="loader-label">LOADING Saiteja's MULTI-VERSE</span>
                    <div className="loader-bar">
                        <div className="loader-fill" />
                    </div>
                </div>
            </div>
        </div>
    )
}
