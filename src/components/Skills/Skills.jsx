import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Skills.css'

gsap.registerPlugin(ScrollTrigger)

const skillIcons = [
    // Languages & Web
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'languages' },
    { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', category: 'languages' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'languages' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'languages' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', category: 'languages' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', category: 'languages' },
    { name: 'REST API', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', category: 'languages' },
    
    // AI/ML
    { name: 'Machine Learning', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg', category: 'aiml' },
    { name: 'NLP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'aiml' },
    { name: 'Generative AI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', category: 'aiml' },
    { name: 'RAG', icon: '/RAGlogo.png', category: 'aiml' },
    { name: 'LangChain', icon: '/Langchain.png', category: 'aiml' },
    { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', category: 'aiml' },
    
    // Cloud & Database
    { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', category: 'cloud' },
    { name: 'Azure AI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', category: 'cloud' },
    { name: 'Cosmos DB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'cloud' },
    
    // Libraries & Tools
    { name: 'Scikit-learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg', category: 'libraries' },
    { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', category: 'libraries' },
    { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg', category: 'libraries' },
    { name: 'Jupyter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg', category: 'libraries' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'libraries' },
    { name: 'Jira', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg', category: 'libraries' },
]

export default function Skills() {
    const sectionRef = useRef(null)
    const containerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate skill orbs on scroll
            gsap.fromTo('.skill-orb', 
                { opacity: 0, scale: 0 },
                {
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
                    opacity: 1,
                    scale: 1,
                    stagger: {
                        amount: 1.5,
                        grid: [4, 6],
                        from: 'random'
                    },
                    duration: 0.8,
                    ease: 'back.out(1.7)'
                }
            )

            // Continuous floating animation
            gsap.to('.skill-orb', {
                y: 'random(-20, 20)',
                x: 'random(-20, 20)',
                rotation: 'random(-15, 15)',
                duration: 'random(3, 5)',
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                stagger: {
                    each: 0.1,
                    repeat: -1
                }
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section id="skills" className="section" ref={sectionRef}>
            <div className="section-inner">
                <div className="section-label">
                    <span className="label-line" />
                    <span>03 / SKILLS</span>
                </div>
                <h2 className="section-title">My <span className="gradient-text">Arsenal</span></h2>
                <p className="section-sub">Technologies and tools I use to build intelligent, scalable systems</p>

                <div className="skills-container" ref={containerRef}>
                    {skillIcons.map((skill, index) => (
                        <div 
                            key={index} 
                            className={`skill-orb glass skill-${skill.category}`}
                            data-name={skill.name}
                        >
                            <img src={skill.icon} alt={skill.name} className="skill-icon-img" />
                            <div className="skill-label">{skill.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
