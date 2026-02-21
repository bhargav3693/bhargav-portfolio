import { useEffect, useRef } from 'react'

export default function CustomCursor() {
    const cursorRef = useRef(null)
    const followerRef = useRef(null)

    useEffect(() => {
        const cursor = cursorRef.current
        const follower = followerRef.current
        let mouseX = 0, mouseY = 0
        let followerX = 0, followerY = 0

        const onMouseMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
            cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`
        }

        const onMouseDown = () => {
            cursor.classList.add('scale-75')
            follower.classList.add('scale-150')
        }
        const onMouseUp = () => {
            cursor.classList.remove('scale-75')
            follower.classList.remove('scale-150')
        }

        const onMouseEnterLink = () => follower.classList.add('scale-[2.5]', 'opacity-40')
        const onMouseLeaveLink = () => follower.classList.remove('scale-[2.5]', 'opacity-40')

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mousedown', onMouseDown)
        document.addEventListener('mouseup', onMouseUp)

        const links = document.querySelectorAll('a, button, [role="button"]')
        links.forEach(el => {
            el.addEventListener('mouseenter', onMouseEnterLink)
            el.addEventListener('mouseleave', onMouseLeaveLink)
        })

        let animId
        const animate = () => {
            followerX += (mouseX - followerX) * 0.1
            followerY += (mouseY - followerY) * 0.1
            follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`
            animId = requestAnimationFrame(animate)
        }
        animId = requestAnimationFrame(animate)

        return () => {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mousedown', onMouseDown)
            document.removeEventListener('mouseup', onMouseUp)
            cancelAnimationFrame(animId)
        }
    }, [])

    return (
        <>
            {/* Dot cursor */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-blue-400 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 mix-blend-difference"
            />
            {/* Glow ring follower */}
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-10 h-10 rounded-full border border-blue-500/50 pointer-events-none z-[9998] transition-transform duration-300 transition-opacity"
                style={{ background: 'rgba(37,99,235,0.05)' }}
            />
        </>
    )
}
