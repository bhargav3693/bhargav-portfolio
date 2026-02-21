import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function HeroCanvas() {
    const mountRef = useRef(null)

    useEffect(() => {
        const mount = mountRef.current
        if (!mount) return

        // Scene
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100)
        camera.position.set(0, 0, 5)

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(mount.clientWidth, mount.clientHeight)
        renderer.setClearColor(0x000000, 0)
        mount.appendChild(renderer.domElement)

        // ── Outer wireframe icosahedron ──────────────────────────────────
        const outerGeo = new THREE.IcosahedronGeometry(1.6, 1)
        const outerMat = new THREE.MeshBasicMaterial({
            color: 0x2563eb,
            wireframe: true,
            transparent: true,
            opacity: 0.25,
        })
        const outerMesh = new THREE.Mesh(outerGeo, outerMat)
        scene.add(outerMesh)

        // ── Inner glowing sphere ─────────────────────────────────────────
        const innerGeo = new THREE.SphereGeometry(0.9, 32, 32)
        const innerMat = new THREE.MeshBasicMaterial({
            color: 0x3b82f6,
            wireframe: true,
            transparent: true,
            opacity: 0.15,
        })
        const innerMesh = new THREE.Mesh(innerGeo, innerMat)
        scene.add(innerMesh)

        // ── Particle field ───────────────────────────────────────────────
        const particleCount = 400
        const positions = new Float32Array(particleCount * 3)
        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 12
        }
        const particleGeo = new THREE.BufferGeometry()
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        const particleMat = new THREE.PointsMaterial({
            color: 0x60a5fa,
            size: 0.03,
            transparent: true,
            opacity: 0.6,
        })
        const particles = new THREE.Points(particleGeo, particleMat)
        scene.add(particles)

        // ── Ring ─────────────────────────────────────────────────────────
        const ringGeo = new THREE.TorusGeometry(2.2, 0.015, 8, 120)
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0xa855f7,
            transparent: true,
            opacity: 0.3,
        })
        const ring = new THREE.Mesh(ringGeo, ringMat)
        ring.rotation.x = Math.PI / 2.5
        scene.add(ring)

        // ── Mouse interaction ────────────────────────────────────────────
        let mouseX = 0, mouseY = 0
        const onMouseMove = (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2
            mouseY = -(e.clientY / window.innerHeight - 0.5) * 2
        }
        window.addEventListener('mousemove', onMouseMove)

        // ── Resize handler ───────────────────────────────────────────────
        const onResize = () => {
            if (!mount) return
            camera.aspect = mount.clientWidth / mount.clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(mount.clientWidth, mount.clientHeight)
        }
        window.addEventListener('resize', onResize)

        // ── Animation loop ───────────────────────────────────────────────
        let animId
        const clock = new THREE.Clock()

        const animate = () => {
            animId = requestAnimationFrame(animate)
            const t = clock.getElapsedTime()

            outerMesh.rotation.x = t * 0.12 + mouseY * 0.3
            outerMesh.rotation.y = t * 0.18 + mouseX * 0.3
            innerMesh.rotation.x = -t * 0.1
            innerMesh.rotation.y = t * 0.22
            ring.rotation.z = t * 0.08
            particles.rotation.y = t * 0.03

            // Pulsing scale
            const pulse = 1 + 0.04 * Math.sin(t * 1.5)
            outerMesh.scale.setScalar(pulse)

            renderer.render(scene, camera)
        }
        animate()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('resize', onResize)
            renderer.dispose()
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement)
            }
        }
    }, [])

    return (
        <div
            ref={mountRef}
            className="w-full h-full"
            style={{ minHeight: 420 }}
        />
    )
}
