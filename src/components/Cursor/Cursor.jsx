import { useEffect, useRef } from 'react'
import './Cursor.css'

export default function Cursor() {
    const dotRef = useRef(null)
    const trailRef = useRef(null)
    let trailX = 0, trailY = 0
    let targetX = 0, targetY = 0
    let raf

    useEffect(() => {
        const dot = dotRef.current
        const trail = trailRef.current

        const onMove = (e) => {
            targetX = e.clientX
            targetY = e.clientY
            dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        }

        const animate = () => {
            trailX += (targetX - trailX) * 0.1
            trailY += (targetY - trailY) * 0.1
            trail.style.transform = `translate(${trailX}px, ${trailY}px)`
            raf = requestAnimationFrame(animate)
        }

        // Hover grow on interactive elements
        const addHover = () => document.body.classList.add('cursor-hover')
        const rmHover = () => document.body.classList.remove('cursor-hover')

        const hoverEls = document.querySelectorAll('a, button, .skill-card, .project-card, input, textarea')
        hoverEls.forEach(el => {
            el.addEventListener('mouseenter', addHover)
            el.addEventListener('mouseleave', rmHover)
        })

        document.addEventListener('mousemove', onMove)
        raf = requestAnimationFrame(animate)

        return () => {
            document.removeEventListener('mousemove', onMove)
            cancelAnimationFrame(raf)
            hoverEls.forEach(el => {
                el.removeEventListener('mouseenter', addHover)
                el.removeEventListener('mouseleave', rmHover)
            })
        }
    }, [])

    return (
        <>
            <div id="cursor-dot" ref={dotRef} />
            <div id="cursor-trail" ref={trailRef} />
        </>
    )
}
