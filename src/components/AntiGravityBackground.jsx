import React, { useEffect, useRef, useState } from 'react';


const AntiGravityBackground = () => {
    const canvasRef = useRef(null);
    const [scrollY, setScrollY] = useState(0);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#CC0000', '#E53935', '#1565C0', '#42A5F5', '#FFD700'];

        const rings = 20;
        const particlesPerRing = 50;
        const baseRadius = 300;

        let targetX = canvas.width / 2;
        let targetY = canvas.height / 2;
        let currentX = targetX;
        let currentY = targetY;

        let breathingPhase = 0;
        let breathingSpeed = 0.02;

        let currentRadius = baseRadius;

        let mouseX = canvas.width / 2;
        let mouseY = canvas.height / 2;

        class Particle {
            constructor(ringIndex, particleIndex, totalInRing) {
                this.ringIndex = ringIndex;
                this.angle = (particleIndex / totalInRing) * Math.PI * 2;
                const ringVariation = 0.85 + Math.random() * 0.3;
                this.ringRadius = (ringIndex / rings) * baseRadius * ringVariation;

                const normalizedRing = ringIndex / rings;
                this.baseSize = 0.8 + normalizedRing * 2.0;
                this.size = this.baseSize;

                // Increased brightness: 0.4-0.9 range instead of 0.3-0.8
                this.baseOpacity = 0.6 + normalizedRing * 0.4;
                this.color = colors[Math.floor(Math.random() * colors.length)];

                this.x = currentX;
                this.y = currentY;

                this.wobbleSpeed = 0.01 + Math.random() * 0.01;
                this.wobbleOffset = Math.random() * Math.PI * 2;
                this.wobbleAmount = 2 + Math.random() * 3;

                this.visibility = 0;
            }

            update(time) {
                const breathingScale = 1 + Math.sin(breathingPhase) * 0.1;

                const effectiveRadius = this.ringRadius * (currentRadius / baseRadius) * breathingScale;

                const wobble = Math.sin(time * this.wobbleSpeed + this.wobbleOffset) * this.wobbleAmount;
                const wobbleAngle = this.angle + (wobble * 0.01);

                let targetX = currentX + Math.cos(wobbleAngle) * effectiveRadius;
                let targetY = currentY + Math.sin(wobbleAngle) * effectiveRadius;

                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const distanceToMouse = Math.sqrt(dx * dx + dy * dy);
                const repulsionRadius = 150;

                if (distanceToMouse < repulsionRadius && distanceToMouse > 0) {
                    const force = (repulsionRadius - distanceToMouse) / repulsionRadius;
                    const repulsionStrength = 100;

                    const pushX = (dx / distanceToMouse) * force * repulsionStrength;
                    const pushY = (dy / distanceToMouse) * force * repulsionStrength;

                    targetX += pushX;
                    targetY += pushY;
                }

                // Faster movement for smoother 60FPS: 0.08 instead of 0.05
                this.x += (targetX - this.x) * 0.09;
                this.y += (targetY - this.y) * 0.09;

                const angleToCenter = Math.atan2(this.y - currentY, this.x - currentX);
                this.rotation = angleToCenter;

                // Calculate visibility based on distance from cursor
                const visibilityRadius = 400;
                const distanceToCursor = Math.sqrt(
                    (this.x - mouseX) * (this.x - mouseX) +
                    (this.y - mouseY) * (this.y - mouseY)
                );

                let targetVisibility = 0;
                if (distanceToCursor < visibilityRadius) {
                    targetVisibility = 1 - (distanceToCursor / visibilityRadius);
                }

                // Faster transition for smoother 60FPS: 0.15 instead of 0.1
                this.visibility += (targetVisibility - this.visibility) * 0.15;
            }

            draw() {
                if (this.visibility < 0.01) return;

                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);

                ctx.fillStyle = this.color;
                ctx.shadowBlur = 20;
                ctx.shadowColor = this.color;
                // Maximum brightness: 1.0 multiplier instead of 0.8
                ctx.globalAlpha = this.baseOpacity * 0.8 * this.visibility;

                ctx.beginPath();
                ctx.ellipse(0, 0, this.size * 1.5, this.size * 0.7, 0, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();

                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;
                ctx.restore();
            }
        }

        function init() {
            particles.length = 0;

            for (let ring = 0; ring < rings; ring++) {
                const particlesInThisRing = Math.max(8, Math.floor(particlesPerRing * (ring / rings)));

                for (let i = 0; i < particlesInThisRing; i++) {
                    particles.push(new Particle(ring, i, particlesInThisRing));
                }
            }

            particles.push(new Particle(0, 0, 1));
        }

        let animationTime = 0;
        let isAnimating = true;

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            animationTime++;
            breathingPhase += breathingSpeed;

            // Faster cursor following for smoother 60FPS: 0.08 instead of 0.05
            currentX += (targetX - currentX) * 0.09;
            currentY += (targetY - currentY) * 0.09;

            currentRadius = baseRadius;

            for (let i = 0; i < particles.length; i++) {
                particles[i].update(animationTime);
                particles[i].draw();
            }

            if (isAnimating) {
                animationFrameRef.current = requestAnimationFrame(animate);
            }
        }

        const handleMouseMove = (event) => {
            targetX = event.clientX;
            targetY = event.clientY;
            mouseX = event.clientX;
            mouseY = event.clientY;
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            targetX = canvas.width / 2;
            targetY = canvas.height / 2;
            currentX = targetX;
            currentY = targetY;
        };

        const handleScroll = () => {
            const currentScroll = window.scrollY || window.pageYOffset;
            setScrollY(currentScroll);

            // Pause animation when scrolled down more than 100px
            if (currentScroll > 100) {
                isAnimating = false;
            } else {
                if (!isAnimating) {
                    isAnimating = true;
                    animate();
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll, { passive: true });

        init();
        animate();

        return () => {
            isAnimating = false;
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Calculate opacity based on scroll position (fade out between 0-100px scroll)
    const opacity = Math.max(0, 1 - (scrollY / 100));

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: 1,
                pointerEvents: 'none',
                opacity: opacity,
                transition: 'opacity 0.3s ease-out',
            }}
        />
    );
};

export default AntiGravityBackground;
