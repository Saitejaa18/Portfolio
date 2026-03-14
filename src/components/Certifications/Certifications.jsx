import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Certifications.css'

gsap.registerPlugin(ScrollTrigger)

const certs = [
    {
        image: '/certificates/IBM.jpeg',
        title: 'AI & Cloud Virtual Internship',
        issuer: 'IBM (Edunet Foundation)',

    },
    {
        image: '/certificates/linkedin.png',
        title: 'Data Analytics',
        issuer: 'LinkedIn Learning',

    },
    {
        image: '/certificates/GEN-AI.png',
        title: 'AI and ML in IOT and its Applications workshop',
        issuer: 'Skill Move',
    },
    {
        image: '/certificates/Security-Pro by Whizz.jpg',
        title: 'Security Pro',
        issuer: 'TestOut / Whizz',
    },
]

export default function Certifications() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.cert-card', {
                scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
                opacity: 0, y: 40, scale: 0.95, stagger: 0.12, duration: 0.7, ease: 'back.out(1.3)',
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="certifications" className="section" ref={sectionRef}>
            <div className="section-inner">
                <h2 className="section-title text-center" style={{ marginBottom: "1rem" }}>Certifications</h2>
                <p className="section-sub text-center" style={{ marginBottom: "50px", color: "rgba(255,255,255,0.7)", letterSpacing: "0.02em" }}>
                    Selected certifications that support my full-stack and cloud engineering skills.
                </p>

                <div className="certs-grid certs-grid-4">
                    {certs.map(({ image, title, issuer }) => (
                        <div key={title} className="cert-card">
                            <div className="cert-image-wrap">
                                <img src={image} alt={title} className="cert-image" />
                            </div>
                            <div className="cert-body">
                                <h3 className="cert-title">{title}</h3>
                                <span className="cert-issuer">{issuer}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
