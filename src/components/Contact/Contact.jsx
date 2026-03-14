import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from '@emailjs/browser'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

/* ── SVG Icon Components ── */
const IconMail = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <polyline points="2,4 12,13 22,4" />
    </svg>
)
const IconPhone = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2A19.8 19.8 0 013.09 4.18 2 2 0 015.09 2h3a2 2 0 012 1.72c.127.96.361 1.9.7 2.81a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006.09 6.09l1.27-1.27a2 2 0 012.11-.45c.91.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
)
const IconLocation = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
)
const IconGitHub = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
    </svg>
)
const IconLinkedIn = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
)

const contacts = [
    { Icon: IconMail, label: 'Email', val: 'rapellisaiteja999@gmail.com', href: 'mailto:rapellisaiteja999@gmail.com' },
    { Icon: IconPhone, label: 'Phone', val: '+91 8919363234', href: 'tel:+918919363234' },
    { Icon: IconLocation, label: 'Location', val: 'India · Open to Remote Worldwide', href: null },
    { Icon: IconGitHub, label: 'GitHub', val: 'github.com/Saitejaa18', href: 'https://github.com/Saitejaa18' },
    { Icon: IconLinkedIn, label: 'LinkedIn', val: 'rapelli-saiteja', href: 'https://linkedin.com/in/rapelli-saiteja' },
]

export default function Contact() {
    const sectionRef = useRef(null)
    const formRef = useRef()
    const [sending, setSending] = useState(false)
    const [sent, setSent] = useState(false)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.contact-item', {
                scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
                opacity: 0, x: -40, stagger: 0.1, duration: 0.7, ease: 'expo.out',
            })
            gsap.from('#contact-form', {
                scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
                opacity: 0, x: 40, duration: 0.9, ease: 'expo.out',
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setSending(true)

        // EmailJS Integration
        emailjs.sendForm('service_h4uormh', 'template_x9f78xe', formRef.current, 'vSJGCaF6I7CnciiIs')
            .then(() => {
                setSending(false)
                setSent(true)
                e.target.reset()
                setTimeout(() => setSent(false), 5000)
            })
            .catch((error) => {
                setSending(false)
                console.error('EmailJS error:', error)
                alert('Oops! Something went wrong. Please try again or contact me directly.')
            })
    }

    return (
        <section id="contact" className="section" ref={sectionRef}>
            <div className="web-grid" />
            <div className="section-inner">
                <div className="section-label">
                    <span className="label-line" />
                    <span>07 / CONTACT</span>
                </div>
                <h2 className="section-title text-center contact-comic-title">
                    SEND A WEB!
                </h2>
                <p className="section-sub text-center contact-comic-sub">Let's Build Something Extraordinary</p>

                <div className="contact-grid">
                    <div className="contact-info">
                        {contacts.map(({ Icon, label, val, href }) => (
                            <div key={label} className="contact-item glass">
                                <div className="ci-icon-wrap">
                                    <Icon />
                                </div>
                                <div className="ci-text">
                                    <strong>{label}</strong>
                                    {href
                                        ? <a href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noreferrer">{val}</a>
                                        : <span>{val}</span>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>

                    <form className="contact-form glass" id="contact-form" ref={formRef} onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="c-name">Your Name</label>
                            <input type="text" id="c-name" name="user_name" placeholder="John Doe" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="c-email">Email Address</label>
                            <input type="email" id="c-email" name="user_email" placeholder="john@example.com" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="c-subject">Subject</label>
                            <input type="text" id="c-subject" name="subject" placeholder="Project Inquiry / Job Opportunity" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="c-msg">Message</label>
                            <textarea id="c-msg" name="message" rows="5" placeholder="Tell me about your project or opportunity..." required />
                        </div>
                        <button type="submit" className="btn btn-primary btn-full" disabled={sending}>
                            {sending ? 'Sending…' : 'Send Message'}
                            {!sending && (
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M2 8l10-6-3 6 3 6-10-6z" fill="currentColor" />
                                </svg>
                            )}
                        </button>
                        {sent && <div className="form-success">✓ Message sent! Thank you for your message. I'll get back to you
                            soon.</div>}
                    </form>
                </div>
            </div>
        </section>
    )
}
