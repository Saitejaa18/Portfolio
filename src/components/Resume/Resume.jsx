import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import './Resume.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

export default function Resume() {
    const [isOpen, setIsOpen] = useState(false)
    const overlayRef = useRef(null)
    const contentRef = useRef(null)

    // PDF state
    const [numPages, setNumPages] = useState(null)
    const [scale, setScale] = useState(1.0)

    useEffect(() => {
        const handleOpen = () => setIsOpen(true)
        window.addEventListener('open-resume', handleOpen)
        return () => window.removeEventListener('open-resume', handleOpen)
    }, [])

    useEffect(() => {
        if (isOpen) {
            gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.3, display: 'flex' })
            gsap.fromTo(contentRef.current,
                { y: 50, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'expo.out', delay: 0.1 }
            )
            document.body.style.overflow = 'hidden'
        } else {
            gsap.to(overlayRef.current, { 
                autoAlpha: 0, 
                duration: 0.3, 
                onComplete: () => {
                    if (overlayRef.current) gsap.set(overlayRef.current, { display: 'none' })
                }
            })
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages)
    }

    const zoomIn = () => setScale(s => Math.min(s + 0.2, 2.5))
    const zoomOut = () => setScale(s => Math.max(s - 0.2, 0.5))

    return (
        <div className="resume-overlay" ref={overlayRef} onClick={() => setIsOpen(false)}>
            <div className="resume-content glass" ref={contentRef} onClick={e => e.stopPropagation()}>
                
                <div className="resume-header">
                    <h2 className="resume-title">My Resume</h2>
                    <div className="resume-actions">
                        
                        <div className="pdf-controls">
                            <button className="pdf-btn" onClick={zoomOut} title="Zoom Out">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                            </button>
                            <span className="pdf-status-text">{Math.round(scale * 100)}%</span>
                            <button className="pdf-btn" onClick={zoomIn} title="Zoom In">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                            </button>
                        </div>

                        <a href="/resume.pdf" download="Saiteja_Resume.pdf" className="btn btn-primary">
                            Download PDF
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '8px'}}>
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                        </a>
                        <button className="resume-close" onClick={() => setIsOpen(false)}>✕</button>
                    </div>
                </div>

                <div className="resume-document custom-pdf-viewer">
                    <Document 
                        file="/resume.pdf" 
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={
                            <div className="resume-fallback">
                                <div className="pdf-spinner"></div>
                                <p>Loading Resume PDF...</p>
                            </div>
                        }
                        error={
                            <div className="resume-fallback">
                                <p>Failed to load PDF.</p>
                                <a href="/resume.pdf" download="Saiteja_Resume.pdf" className="btn btn-ghost">Download Instead</a>
                            </div>
                        }
                    >
                        {Array.from(new Array(numPages || 0), (el, index) => (
                            <Page 
                                key={`page_${index + 1}`}
                                pageNumber={index + 1} 
                                scale={scale} 
                                renderTextLayer={true}
                                renderAnnotationLayer={true}
                                className="pdf-page"
                            />
                        ))}
                    </Document>
                </div>
            </div>
        </div>
    )
}
