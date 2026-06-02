import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import './Navbar.css'

gsap.registerPlugin(ScrollToPlugin)

const links = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [active, setActive] = useState('hero')
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 80)
        }

        const options = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActive(entry.target.id)
                }
            })
        }, options)

        const sections = document.querySelectorAll('section[id]')
        sections.forEach(sec => observer.observe(sec))

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', onScroll)
            sections.forEach(sec => observer.unobserve(sec))
            observer.disconnect()
        }
    }, [])

    const scrollTo = (e, href) => {
        e.preventDefault()
        setMenuOpen(false)
        const target = document.querySelector(href)
        if (target) {
            gsap.to(window, { 
                scrollTo: { y: target, offsetY: 72 }, 
                duration: 1, 
                ease: 'expo.inOut',
                overwrite: 'auto'
            })
        }
    }

    return (
        <>
            <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
                <div className="nav-logo">
                    <span className="logo-web">&lt;</span>SAITEJA<span className="logo-web">/&gt;</span>
                </div>

                <ul className="nav-links">
                    {links.map(({ href, label }) => (
                        <li key={href}>
                            <a
                                href={href}
                                className={`nav-link${active === href.slice(1) ? ' active' : ''}`}
                                onClick={(e) => scrollTo(e, href)}
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                    <button 
                        className="nav-cta" 
                        style={{background: 'transparent', border: '1px solid var(--red)', color: 'var(--red-bright)'}}
                        onClick={() => window.dispatchEvent(new Event('open-resume'))}
                    >
                        Resume
                    </button>
                    <a href="#contact" className="nav-cta" onClick={(e) => scrollTo(e, '#contact')}>
                        Hire Me
                    </a>
                </div>

                <button
                    className="nav-hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={menuOpen ? 'open' : ''} />
                    <span className={menuOpen ? 'open' : ''} />
                    <span className={menuOpen ? 'open' : ''} />
                </button>
            </nav>

            {/* Mobile overlay */}
            <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
                <button className="mobile-close" onClick={() => setMenuOpen(false)}>✕</button>
                <ul>
                    {links.map(({ href, label }) => (
                        <li key={href}>
                            <a href={href} className="mobile-link" onClick={(e) => scrollTo(e, href)}>
                                {label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <button className="mobile-link" style={{background: 'none', border: 'none'}} onClick={() => {
                            setMenuOpen(false);
                            setTimeout(() => window.dispatchEvent(new Event('open-resume')), 300);
                        }}>
                            Resume
                        </button>
                    </li>
                </ul>
            </div>
        </>
    )
}
