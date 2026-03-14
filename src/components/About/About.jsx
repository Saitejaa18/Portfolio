import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const journey = [
    {
        type: 'intro',
        icon: '👋',
        period: 'Hello!',
        title: 'I\'m Rapelli Saiteja',
        place: 'AI / Full Stack Developer · India',
        desc: 'An AI / Full Stack Developer with hands-on experience in Machine Learning, Generative AI, NLP, and cloud-based AI platforms. I love turning complex problems into elegant, scalable solutions.',
        tags: ['AI', 'Gen-AI', 'Python', 'ML', 'DL,NLP', 'RAG','LangChain'],
    },
    {
        type: 'edu',
        icon: '🎓',
        period: '2021 — 2025',
        title: 'B.Tech — Computer Science & Engineering (IoT)',
        place: 'Sri Indu Institute of Engineering and Technology · CGPA: 7.41',
        desc: 'Specialized in IoT, software engineering, machine learning, and cloud computing. Graduated with a strong foundation in both hardware-software integration and AI systems.',
        tags: ['IoT', 'OpenCV', 'Machine Learning', 'Cloud', 'Python'],
    },
    {
        type: 'work',
        icon: '💼',
        period: 'May 2025 — Present',
        title: 'Full Stack AI Intern',
        place: 'X360 Technologies · Canada (Remote)',
        desc: 'Built backend APIs using Python and Node.js for an AI test automation platform. Developed React dashboards for analytics and monitoring. Designed scalable Cosmos DB data models and worked in Agile teams using Jira.',
        tags: ['Python', 'Node.js', 'React', 'Cosmos DB', 'Jira', 'Agile'],
    },
    {
        type: 'work',
        icon: '🤖',
        period: '6 Months',
        title: 'AI/ML Engineer Intern',
        place: 'LnTeks Technologies',
        desc: 'Built ML and NLP models using Python. Created pre-processing, feature engineering and model pipelines. Assisted in ML testing and deployment workflows.',
        tags: ['Python', 'ML', 'NLP', 'Scikit-learn', 'Feature Engineering'],
    },
    {
        type: 'contact',
        icon: '📧',
        title: 'Let\'s Work Together',
        place: 'Available for Remote & On-site Roles Worldwide',
        desc: 'Open to opportunities in Full-Time,  Let\'s build something amazing together!',
        tags: [],
    },
]

export default function About() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.about-avatar-wrap', {
                scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
                opacity: 0, scale: 0.6, duration: 1, ease: 'back.out(1.7)',
            })
            gsap.from('.tl-item', {
                scrollTrigger: { trigger: '.tl-item', start: 'top 80%' },
                opacity: 0, x: -50, stagger: 0.15, duration: 0.8, ease: 'expo.out',
            })
            gsap.from('.tl-line', {
                scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
                scaleY: 0, duration: 1.5, ease: 'expo.out', transformOrigin: 'top',
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="about" className="section" ref={sectionRef}>
            <div className="web-grid" />
            <div className="section-inner">
                <div className="section-label">
                    <span className="label-line" />
                    <span>02 / ABOUT & JOURNEY</span>
                </div>

                <div className="about-layout">
                    {/* Avatar Section */}
                    <div className="about-sidebar">
                        <div className="about-avatar-wrap glass">
                            <div className="spider-mask-icon">
                                <svg viewBox="0 0 120 120" fill="none">
                                    {/* Anatomical Mask Shell - Iteration 4 (Rounded Chin) */}
                                    <path d="M60 2 C32 2, 12 22, 12 58 C12 82, 35 112, 60 116 C85 112, 108 82, 108 58 C108 22, 88 2, 60 2 Z" fill="#CC0000" stroke="#000" strokeWidth="2.5" />
                                    
                                    {/* Webbing Pattern */}
                                    <g opacity="0.4">
                                        {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map(angle => (
                                            <line 
                                                key={angle}
                                                x1="60" y1="52" 
                                                x2={60 + 100 * Math.cos((angle * Math.PI) / 180)} 
                                                y2={52 + 100 * Math.sin((angle * Math.PI) / 180)}
                                                stroke="#000" strokeWidth="0.8" 
                                            />
                                        ))}
                                        <path d="M30 35 Q60 22 90 35" stroke="#000" strokeWidth="0.8" />
                                        <path d="M18 52 Q60 40 102 52" stroke="#000" strokeWidth="0.8" />
                                        <path d="M15 72 Q60 65 105 72" stroke="#000" strokeWidth="0.8" />
                                        <path d="M28 98 Q60 108 92 98" stroke="#000" strokeWidth="0.8" />
                                    </g>

                                    {/* Expressive Layered Eyes */}
                                    <path d="M16 52 C24 34, 46 34, 56 52 C46 72, 30 76, 16 52 Z" fill="#000" />
                                    <path d="M21 53 C28 40, 42 40, 51 53 C42 66, 28 68, 21 53 Z" fill="#fff" />
                                    
                                    <path d="M104 52 C96 34, 74 34, 64 52 C74 72, 90 76, 104 52 Z" fill="#000" />
                                    <path d="M99 53 C92 40, 78 40, 69 53 C78 66, 92 68, 99 53 Z" fill="#fff" />
                                </svg>
                            </div>
                            <div className="avatar-ring ring-1" />
                            <div className="avatar-ring ring-2" />
                            <div className="avatar-label">
                                <span className="av-name">Rapelli Saiteja</span>
                                <span className="av-role">AI / Full Stack Developer</span>
                            </div>
                        </div>
                    </div>

                    {/* Timeline Journey */}
                    <div className="about-timeline">
                        <div className="timeline">
                            <div className="tl-line" />
                            {journey.map(({ type, icon, period, title, place, desc, tags }, i) => (
                                <div key={i} className={`tl-item tl-${type}`}>
                                    <div className="tl-dot glass">
                                        <span className="tl-icon">{icon}</span>
                                    </div>
                                    <div className="tl-card glass">
                                        <div className="tl-header">
                                            <div className="tl-meta">
                                                <div className="tl-badge">{type === 'work' ? 'Experience' : type === 'edu' ? 'Education' : type === 'intro' ? 'Introduction' : 'Contact'}</div>
                                                <span className="tl-period">{period}</span>
                                            </div>
                                            <h3 className="tl-title">{title}</h3>
                                            <span className="tl-place">{place}</span>
                                        </div>
                                        <p className="tl-desc">{desc}</p>
                                        <div className="tl-tags">
                                            {tags.map(t => <span key={t} className="tl-tag">{t}</span>)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
