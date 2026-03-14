import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

const IconGitHub = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="proj-github-icon">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
    </svg>
)

const projects = [
    {
        id: 'proj-1',
        tag: 'Streamlit · Python · Groq API',
        title: 'Code Generator',
        desc: 'AI-powered code generation web application using Streamlit and Groq LLMs. Generate production-ready code from natural language descriptions.',
        img: '/Code Generator.png',
        live: 'https://codegeneration-agent-18.streamlit.app/',
        code: 'https://github.com/Saitejaa18/Code_generation-Agent',
    },
    {
        id: 'proj-2',
        tag: 'Streamlit · Python · Pandas',
        title: 'Smart AI Budget Assistant',
        desc: 'AI-powered personal finance management with comprehensive financial tools including budget analysis and investment advice.',
        img: '/Smart Budget.png',
        live: 'https://smartaibudget.streamlit.app/',
        code: 'https://github.com/Saitejaa18/Smart_AI_Budget',
    },
    {
        id: 'proj-3',
        tag: 'Streamlit · MSAL · OAuth 2.0',
        title: 'SharePoint File Agent',
        desc: 'Smart file discovery and cloud upload automation connecting local storage with Microsoft cloud services.',
        img: '/one drive agent.png',
        live: 'https://onedriveagent.streamlit.app/',
        code: 'https://github.com/Saitejaa18/one_drive_agent',
    },
    {
        id: 'proj-4',
        tag: 'Python · LLMs · Vision Models',
        title: 'AI Doctor Agent',
        desc: 'AI-powered medical assistant that analyzes medical images and answers diagnostic questions using large language models.',
        img: '/AI_doctor.png',
        live: 'https://aidoctoragent-ahuhq7qxvt6mthttd5hnyg.streamlit.app/',
        code: 'https://github.com/Saitejaa18/AI_Doctor_Agent',
    },
    {
        id: 'proj-5',
        tag: 'LangChain · Transformers · FAISS',
        title: 'RAG Semantic Search',
        desc: 'RAG model which gives answers from your external knowledge base you have uploaded using Sentence Transformers and FAISS.',
        img: '/RAG.png',
        live: 'https://ragchatapp18.streamlit.app/',
        code: 'https://github.com/Saitejaa18/RAG_APP',
    },
    {
        id: 'proj-6',
        tag: 'Torch · GEN-AI · LoRA',
        title: 'Text-to-Image Generator',
        desc: 'Fine-tunes Stable Diffusion using LoRA to generate images from text prompts, optimized for 4GB VRAM GPUs.',
        img: '/text-to-img.png',
        live: '#',
        code: 'https://github.com/Saitejaa18/Text_to_Image_Generation',
    },
    {
        id: 'proj-7',
        tag: 'Blockchain · Node.js · React',
        title: 'Certificate Verification via Blockchain',
        desc: 'Blockchain-based certificate verification system that ensures authenticity and integrity of academic or professional certificates.',
        img: '/certificate.png',
        live: '#',
        code: 'https://github.com/Saitejaa18/Certificate-Verification-and-Validation-using-Block-Chain',
    },
    {
        id: 'proj-8',
        tag: 'React · Node.js · MongoDB',
        title: 'Employee Management',
        desc: 'Full-stack Employee Management System streamlining administration, attendance tracking, and organizational data control.',
        img: '/Employee management syste,.png',
        live: '#',
        code: 'https://github.com/Saitejaa18/Employee-Management-System',
    }
]

export default function Projects() {
    const sectionRef = useRef(null)
    const carouselRef = useRef(null)
    const [radius, setRadius] = useState(1000)

    // Drag state refs
    const isDraggingRef = useRef(false)
    const startXRef = useRef(0)
    const currentAngleRef = useRef(0)
    const targetAngleRef = useRef(0)
    const dragStartAngleRef = useRef(0)

    useEffect(() => {
        // Calculate dynamic radius: Front card perfectly fits bounds when carousel pivots at -radius.
        const calcRadius = () => {
            const isNarrow = window.innerWidth < 1000;
            // Match the new smaller CSS width
            const containerWidth = isNarrow ? window.innerWidth * 0.8 : Math.min(window.innerWidth * 0.6, 600);
            
            // R = (W/2) / tan(PI / N)
            setRadius((containerWidth / 2) / Math.tan(Math.PI / projects.length) + (isNarrow ? 20 : 15));
        }
        calcRadius();
        window.addEventListener('resize', calcRadius);
        return () => window.removeEventListener('resize', calcRadius);
    }, [])

    useEffect(() => {
        // Smooth animation loop using rAF instead of CSS animation
        let raf;
        const autoRotateSpeed = 0.05;
        const updateRotation = () => {
            if (!isDraggingRef.current) {
                targetAngleRef.current -= autoRotateSpeed; // Slow auto-rotate
            }
            // Smooth lerping
            currentAngleRef.current += (targetAngleRef.current - currentAngleRef.current) * 0.08;

            if (carouselRef.current) {
                // translateZ(-radius) pushes the entire carousel backwards from the viewport,
                // so the active card at exactly +radius (via the card's transform) perfectly sits at z=0 (normal screen size).
                carouselRef.current.style.transform = `translateZ(-${radius}px) rotateX(-2deg) rotateY(${currentAngleRef.current}deg)`;
            }
            raf = requestAnimationFrame(updateRotation);
        }
        updateRotation();
        return () => cancelAnimationFrame(raf);
    }, [radius])

    const handlePointerDown = (e) => {
        isDraggingRef.current = true;
        startXRef.current = e.clientX || e.touches[0].clientX;
        dragStartAngleRef.current = targetAngleRef.current;
        document.body.style.cursor = 'grabbing';
    }

    // Capture global mouse/touch events to allow robust dragging even if cursor leaves the container
    useEffect(() => {
        const handlePointerMove = (e) => {
            if (!isDraggingRef.current) return;
            const x = e.clientX || e.touches[0].clientX;
            const delta = x - startXRef.current;
            targetAngleRef.current += delta * 0.25; // Drag sensitivity multiplier
            startXRef.current = x;
        }

        const handlePointerUp = () => {
            if (isDraggingRef.current) {
                isDraggingRef.current = false;
                document.body.style.cursor = 'default';
            }
        }

        window.addEventListener('mousemove', handlePointerMove);
        window.addEventListener('mouseup', handlePointerUp);
        window.addEventListener('touchmove', handlePointerMove, { passive: false });
        window.addEventListener('touchend', handlePointerUp);

        return () => {
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('mouseup', handlePointerUp);
            window.removeEventListener('touchmove', handlePointerMove);
            window.removeEventListener('touchend', handlePointerUp);
        }
    }, [])

    const handleLinkClick = (e) => {
        // Prevent accidental link clicks if the user was just violently dragging the carousel
        if (Math.abs(targetAngleRef.current - dragStartAngleRef.current) > 3) {
            e.preventDefault();
        }
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.section-label, .section-title, .section-sub', {
                scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                opacity: 0, y: 30, stagger: 0.15, duration: 0.8, ease: 'expo.out',
            })

            gsap.from('.carousel-container', {
                scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
                opacity: 0, scale: 0.95, duration: 1.2, ease: 'power2.out',
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="projects" className="section" ref={sectionRef}>
            <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
                <div className="section-label">
                    <span className="label-line" />
                    <span>05 / PROJECTS</span>
                </div>
                <h2 className="section-title text-center">My <span className="gradient-text">Projects</span></h2>
                <p className="section-sub text-center" style={{ marginBottom: '40px' }}>AI-powered and full-stack projects that make a real-world impact</p>

                <div
                    className="carousel-container"
                    onMouseDown={handlePointerDown}
                    onTouchStart={handlePointerDown}
                >
                    <div className="carousel-3d" ref={carouselRef}>
                        {projects.map((proj, idx) => {
                            const angle = (360 / projects.length) * idx
                            return (
                                <article
                                    key={proj.id}
                                    className="project-card glass"
                                    style={{
                                        // Push the card exactly 'radius' units away from the center pivot
                                        transform: `rotateY(${angle}deg) translateZ(${radius}px)`
                                    }}
                                >
                                    <div className="proj-visual-container">
                                        {proj.img ? (
                                            <img src={proj.img} alt={proj.title} className="proj-image" draggable="false" />
                                        ) : (
                                            <div className="proj-icon-fallback">
                                                <IconGitHub />
                                            </div>
                                        )}
                                    </div>
                                    <div className="proj-info">
                                        <span className="proj-tag">{proj.tag}</span>
                                        <h3>{proj.title}</h3>
                                        <p>{proj.desc}</p>
                                        <div className="proj-links">
                                            {proj.live !== '#' && (
                                                <a href={proj.live} target="_blank" rel="noreferrer" className="proj-link" onClick={handleLinkClick}>Live Demo ↗</a>
                                            )}
                                            <a href={proj.code} target="_blank" rel="noreferrer" className="proj-link proj-link-ghost" onClick={handleLinkClick}>View Code</a>
                                        </div>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
