import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Experience.css'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
    {
        type: 'work',
        icon: '💼',
        period: 'May 2025 — Feb 2026',
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
        type: 'edu',
        icon: '🎓',
        period: '2021 — 2025',
        title: 'B.Tech — Computer Science & Engineering (IoT)',
        place: 'Sri Indu Institute of Engineering and Technology · CGPA: 7.41',
        desc: 'Specialized in IoT, software engineering, data structures, machine learning, and cloud computing. Graduated with a strong foundation in both hardware-software integration and AI systems.',
        tags: ['IoT', 'DSA', 'Machine Learning', 'Cloud', 'Python'],
    },
]

export default function Experience() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.tl-item', {
                scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
                opacity: 0, x: -50, stagger: 0.2, duration: 0.8, ease: 'expo.out',
            })
            gsap.from('.tl-line', {
                scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
                scaleY: 0, duration: 1.5, ease: 'expo.out', transformOrigin: 'top',
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="experience" className="section" ref={sectionRef}>
            <div className="section-inner">
                <div className="section-label">
                    <span className="label-line" />
                    <span>03 / EXPERIENCE &amp; EDUCATION</span>
                </div>
                <h2 className="section-title">My <span className="gradient-text">Journey</span></h2>
                <p className="section-sub">The path that built my skills and shaped my perspective</p>

                <div className="timeline">
                    <div className="tl-line" />
                    {timeline.map(({ type, icon, period, title, place, desc, tags }, i) => (
                        <div key={i} className={`tl-item tl-${type}`}>
                            <div className="tl-dot glass">
                                <span className="tl-icon">{icon}</span>
                            </div>
                            <div className="tl-card glass">
                                <div className="tl-header">
                                    <div className="tl-meta">
                                        <span className="tl-badge">{type === 'work' ? 'Experience' : 'Education'}</span>
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
        </section>
    )
}
