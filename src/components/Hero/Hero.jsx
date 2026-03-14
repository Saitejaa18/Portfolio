import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'


gsap.registerPlugin(ScrollTrigger)

const ROLES = [
    'AI / Full Stack Developer',
    'Machine Learning Engineer',
    'Generative AI Developer',
    'React & Node.js Builder',
    'Vibe Coder',
    'Prompt Engineer'
]

export default function Hero() {
    const sectionRef = useRef(null)
    const [roleIdx, setRoleIdx] = useState(0)
    const [displayed, setDisplayed] = useState('')
    const [deleting, setDeleting] = useState(false)

    /* ── Typing animation ── */
    useEffect(() => {
        const target = ROLES[roleIdx]
        let timeout
        if (!deleting && displayed.length < target.length) {
            timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80)
        } else if (!deleting && displayed.length === target.length) {
            timeout = setTimeout(() => setDeleting(true), 1600)
        } else if (deleting && displayed.length > 0) {
            timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
        } else if (deleting && displayed.length === 0) {
            setDeleting(false)
            setRoleIdx((i) => (i + 1) % ROLES.length)
        }
        return () => clearTimeout(timeout)
    }, [displayed, deleting, roleIdx])

    /* ── GSAP entrance ── */
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.5 })
                .to('#hero-eyebrow', { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' })
                .to('#hero-name', { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' }, '-=0.3')
                .to('#hero-quote', { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }, '-=0.5')
                .to('#hero-role-wrap', { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' }, '-=0.4')
                .to('#hero-bio', { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' }, '-=0.3')
                .to('#hero-btns', { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }, '-=0.3')
                .to('.stat-card', { opacity: 1, x: 0, stagger: 0.12, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.4')
                /* Image wrap entrance — swings in like a web sling */
                .fromTo('#hero-img-wrap',
                    { opacity: 0, scale: 0.7, rotate: -15 },
                    { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: 'elastic.out(1, 0.6)' },
                    0.6
                )

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top', end: 'bottom top', scrub: 1,
                onUpdate: (self) => gsap.set('#hero-content', { y: self.progress * 100 }),
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="hero" className="section" ref={sectionRef}>

            <div className="hero-content" id="hero-content">

                <div className="hero-eyebrow" id="hero-eyebrow">
                    <span className="eyebrow-dot" />
                    <span>Welcome to my Multi-Verse</span>
                </div>

                <h1 className="hero-name" id="hero-name">
                    <span className="name-hi">Hi, I'm</span>
                    <span className="name-main">SAITEJA</span>
                </h1>

                <h2 className="hero-quote" id="hero-quote">
                    With Great Skills<br />
                    <span className="web-text">Comes Great Responsibility</span>
                </h2>

                <div className="hero-role-wrap" id="hero-role-wrap">
                    <span className="role-prefix">I'm a </span>
                    <span className="role-typed">{displayed}<span className="cursor-blink">|</span></span>
                </div>

                <p className="hero-bio" id="hero-bio">
                    AI / Full Stack Developer with experience in Machine Learning, Generative AI, NLP,
                    and cloud-based AI platforms. Skilled in building AI automation systems and scalable
                    applications using Python, Azure AI Foundry, Cosmos DB, Node.js, and React.
                </p>

                <div className="hero-buttons" id="hero-btns">
                    <a href="#projects" className="btn btn-primary">
                        View My Work
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <a href="#contact" className="btn btn-ghost">Hire Me 🕷️</a>
                </div>

                <div className="hero-scroll-hint">
                    <div className="scroll-mouse"><div className="scroll-wheel" /></div>
                    <span>Scroll to swing</span>
                </div>
            </div>

            {/* ── Spider-Web Photo Portal ── */}
            <div className="hero-image-wrap" id="hero-img-wrap">
                {/* Orbiting web-thread rings */}
                <div className="portal-ring ring-1" />
                <div className="portal-ring ring-2" />

                {/* Circular frame with web overlay */}
                <div className="hero-image-frame glass">
                    <img src="/sai.jpg" alt="Rapelli Saiteja" className="hero-profile-img" />
                </div>

                {/* Comic badge stamp */}
                <div className="hero-image-badge" aria-hidden="true">
                    <span>AMAZING</span>
                    <span>DEV ★</span>
                </div>
            </div>

            <div className="hero-stats">
                {[
                    { num: '2+', label: 'Internships' },
                    { num: '8+', label: 'Projects Delivered' },
                    { num: '4+', label: 'Certifications' },
                    { num: '♾️', label: 'Coffee' },
                ].map(({ num, label }) => (
                    <div key={label} className="stat-card glass">
                        <span className="stat-num">{num}</span>
                        <span className="stat-label">{label}</span>
                    </div>
                ))}
            </div>

            <div className="web-corner web-corner-tl" />
            <div className="web-corner web-corner-br" />
        </section>
    )
}