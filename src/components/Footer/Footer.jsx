import './Footer.css'

export default function Footer() {
    return (
        <footer id="footer">
            <div className="footer-inner">
                <div className="footer-logo">
                    <span className="logo-web">&lt;</span>SAITEJA<span className="logo-web">/&gt;</span>
                </div>
                <p className="footer-copy">
                    © 2026 Rapelli Saiteja · AI / Full Stack Developer 🕷️
                </p>
                <div className="footer-socials">
                    <a href="https://github.com/Saitejaa18" target="_blank" rel="noreferrer" aria-label="GitHub">GitHub</a>
                    <a href="https://linkedin.com/in/rapelli-saiteja" target="_blank" rel="noreferrer" aria-label="LinkedIn">LinkedIn</a>
                    <a href="mailto:rapellisaiteja999@gmail.com" aria-label="Email">Email</a>
                </div>
            </div>
        </footer>
    )
}
