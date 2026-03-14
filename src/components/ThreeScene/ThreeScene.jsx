import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './ThreeScene.css'

export default function ThreeScene() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const W = window.innerWidth
        const H = window.innerHeight

        // ── Renderer ──
        const renderer = new THREE.WebGLRenderer({
            canvas, antialias: true, alpha: false,
            powerPreference: 'high-performance',
        })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(W, H)
        renderer.setClearColor(0x050912, 1)   // Clean dark background
        renderer.shadowMap.enabled = false
        renderer.shadowMap.type = THREE.PCFSoftShadowMap

        // ── Scene + Fog ──
        const scene = new THREE.Scene()
        scene.fog = new THREE.FogExp2(0x050912, 0.015)  // Subtle atmospheric fog

        // ── Camera ──
        const camera = new THREE.PerspectiveCamera(65, W / H, 0.1, 200)
        camera.position.set(0, 0, 12)

        // Smooth camera target
        const camTarget = { x: 0, y: 0, z: 12 }
        const mouseXY = { x: 0, y: 0 }

        // ── Lights ──
        const ambient = new THREE.AmbientLight(0xffffff, 0.6)
        scene.add(ambient)

        // Soft red accent light
        const redLight = new THREE.PointLight(0xCC0000, 3, 40)
        redLight.position.set(8, 5, 8)
        scene.add(redLight)

        // Soft blue accent light
        const blueLight = new THREE.PointLight(0x1565C0, 2, 40)
        blueLight.position.set(-8, -5, 8)
        scene.add(blueLight)

        // ── Background starfield layers ──
        function makeStars(count, spread, size, opacity) {
            const geo = new THREE.BufferGeometry()
            const pos = new Float32Array(count * 3)
            for (let i = 0; i < count; i++) {
                pos[i * 3] = (Math.random() - 0.5) * spread
                pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6
                pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5 - 10
            }
            geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
            const mat = new THREE.PointsMaterial({
                size, sizeAttenuation: true,
                color: 0xaaccff,
                transparent: true, opacity,
                blending: THREE.AdditiveBlending, depthWrite: false,
            })
            return new THREE.Points(geo, mat)
        }
        scene.add(makeStars(800, 100, 0.05, 0.4))   // far stars
        scene.add(makeStars(300, 50, 0.1, 0.3))  // mid stars

        // ── Particle web network (simplified) ──
        const NODE_COUNT = 200
        const nodePos = []
        const posArr = new Float32Array(NODE_COUNT * 3)
        const colArr = new Float32Array(NODE_COUNT * 3)

        for (let i = 0; i < NODE_COUNT; i++) {
            const x = (Math.random() - 0.5) * 40
            const y = (Math.random() - 0.5) * 22
            const z = (Math.random() - 0.5) * 18
            nodePos.push(new THREE.Vector3(x, y, z))
            posArr[i * 3] = x; posArr[i * 3 + 1] = y; posArr[i * 3 + 2] = z
            const t = Math.random()
            colArr[i * 3] = THREE.MathUtils.lerp(0.75, 0.08, t)
            colArr[i * 3 + 1] = THREE.MathUtils.lerp(0, 0.3, t)
            colArr[i * 3 + 2] = THREE.MathUtils.lerp(0, 0.65, t)
        }
        const nodeGeo = new THREE.BufferGeometry()
        nodeGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3))
        nodeGeo.setAttribute('color', new THREE.BufferAttribute(colArr, 3))
        const nodeMat = new THREE.PointsMaterial({
            size: 0.07, sizeAttenuation: true, vertexColors: true,
            transparent: true, opacity: 0.4, depthWrite: false,
            blending: THREE.AdditiveBlending,
        })
        scene.add(new THREE.Points(nodeGeo, nodeMat))

        // Web strands (subtle)
        const lineVerts = []
        const maxDist = 5
        for (let i = 0; i < NODE_COUNT; i++) {
            for (let j = i + 1; j < NODE_COUNT; j++) {
                if (nodePos[i].distanceTo(nodePos[j]) < maxDist) {
                    lineVerts.push(nodePos[i].x, nodePos[i].y, nodePos[i].z,
                        nodePos[j].x, nodePos[j].y, nodePos[j].z)
                }
            }
        }
        const lineGeo = new THREE.BufferGeometry()
        lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineVerts, 3))
        scene.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
            color: 0x991100, transparent: true, opacity: 0.03,
            blending: THREE.AdditiveBlending,
        })))

        // ── Hero central sphere — simplified ──
        const sphereGeo = new THREE.SphereGeometry(1.4, 64, 64)
        const sphereMat = new THREE.MeshStandardMaterial({
            color: 0xCC0000,
            emissive: 0x4a0000,
            emissiveIntensity: 0.3,
            metalness: 0.6,
            roughness: 0.2,
        })
        const sphere = new THREE.Mesh(sphereGeo, sphereMat)
        sphere.position.set(5, 0.4, 0)
        scene.add(sphere)

        // Wireframe shell (subtle)
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0xff4444, wireframe: true, transparent: true, opacity: 0.08,
        })
        const wireShell = new THREE.Mesh(sphereGeo, wireMat)
        wireShell.scale.setScalar(1.008)
        sphere.add(wireShell)

        // Single orbit ring
        const torusGeo = new THREE.TorusGeometry(2.1, 0.03, 16, 120)
        const torusMat = new THREE.MeshBasicMaterial({
            color: 0xCC0000, transparent: true, opacity: 0.2,
        })
        const torus = new THREE.Mesh(torusGeo, torusMat)
        torus.position.copy(sphere.position)
        torus.rotation.x = Math.PI * 0.42
        scene.add(torus)

        // Blue octahedron (simplified)
        const octaGeo = new THREE.OctahedronGeometry(0.9, 1)
        const octaMat = new THREE.MeshStandardMaterial({
            color: 0x1565C0, emissive: 0x080d31, emissiveIntensity: 0.4,
            metalness: 0.7, roughness: 0.1,
        })
        const octa = new THREE.Mesh(octaGeo, octaMat)
        octa.position.set(-5, -1, -1)
        scene.add(octa)

        // ── Scroll-based smooth camera path ──
        const camPath = {
            x: [0, -1.5, 1.8, 0.5, -0.3],
            y: [0, 0.8, -0.6, 0.3, -0.4],
            z: [12, 9, 7, 8, 10],
        }
        let scrollT = 0
        const onScroll = () => {
            const max = document.body.scrollHeight - window.innerHeight
            scrollT = max > 0 ? window.scrollY / max : 0
            const seg = scrollT * 4
            const s0 = Math.min(Math.floor(seg), 3)
            const s1 = Math.min(s0 + 1, 4)
            const t = seg - s0
            camTarget.x = THREE.MathUtils.lerp(camPath.x[s0], camPath.x[s1], t)
            camTarget.y = THREE.MathUtils.lerp(camPath.y[s0], camPath.y[s1], t)
            camTarget.z = THREE.MathUtils.lerp(camPath.z[s0], camPath.z[s1], t)
        }
        window.addEventListener('scroll', onScroll, { passive: true })

        // ── Mouse parallax ──
        const onMouse = (e) => {
            mouseXY.x = (e.clientX / window.innerWidth) * 2 - 1
            mouseXY.y = (e.clientY / window.innerHeight) * 2 - 1
        }
        window.addEventListener('mousemove', onMouse)

        // ── Cinematic vignette post-process plane (screen-space quad) ──
        // Done via CSS on ThreeScene.css overlay instead for performance

        // ── Animation loop ──
        const clock = new THREE.Clock()
        let raf
        const animate = () => {
            raf = requestAnimationFrame(animate)
            const t = clock.getElapsedTime()

            // Smooth camera lerp (cinematic damping factor 0.04)
            const lerpF = 0.04
            camera.position.x += (camTarget.x + mouseXY.x * 1.2 - camera.position.x) * lerpF
            camera.position.y += (camTarget.y - mouseXY.y * 0.8 - camera.position.y) * lerpF
            camera.position.z += (camTarget.z - camera.position.z) * lerpF
            camera.lookAt(0, 0, 0)

            // Dynamic centering based on Projects section - Optimized
            const projectsEl = document.getElementById('projects')
            let targetSphereX = 5
            let targetSphereY = 0.4
            
            if (projectsEl && t % 0.1 < 0.016) { // Only check every 100ms
                const rect = projectsEl.getBoundingClientRect()
                const windowCenter = window.innerHeight / 2
                const projCenter = rect.top + rect.height / 2
                const dist = Math.abs(windowCenter - projCenter)
                const factor = Math.max(0, 1 - dist / (window.innerHeight * 0.9))
                
                targetSphereX = 5 * (1 - factor)
                targetSphereY = 0.4 * (1 - factor)
            }
            
            sphere.position.x += (targetSphereX - sphere.position.x) * 0.05
            sphere.position.y += (targetSphereY - sphere.position.y) * 0.05
            torus.position.copy(sphere.position)

            // Sphere + torus
            sphere.rotation.y = t * 0.35
            sphere.rotation.x = t * 0.18
            torus.rotation.z = t * 0.12
            octa.rotation.y = t * 0.5
            octa.rotation.x = t * 0.25

            // Lights orbit (subtle motion)
            redLight.position.set(Math.sin(t * 0.3) * 8, Math.cos(t * 0.25) * 5, 6)
            blueLight.position.set(Math.cos(t * 0.3) * -8, Math.sin(t * 0.4) * -5, 6)

            renderer.render(scene, camera)
        }
        animate()

        // ── Resize ──
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', onResize)

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('mousemove', onMouse)
            window.removeEventListener('resize', onResize)
            renderer.dispose()
        }
    }, [])

    return (
        <>
            <canvas ref={canvasRef} id="bg-canvas" />
            {/* Cinematic vignette overlay */}
            <div id="bg-vignette" />
        </>
    )
}
