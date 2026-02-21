import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import PageTransition from '../components/PageTransition'
import HeroCanvas from '../components/HeroCanvas'

const stagger = {
    container: { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } },
    item: {
        hidden: { opacity: 0, y: 32 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
    },
}

const stats = [
    { value: '7.56', label: 'CGPA (MCA)' },
    { value: '2+', label: 'Internships' },
    { value: '1+', label: 'Projects' },
    { value: '5+', label: 'Technologies' },
]

export default function Home() {
    const titleRef = useRef(null)

    useEffect(() => {
        if (titleRef.current) {
            gsap.fromTo(
                titleRef.current.querySelectorAll('.gsap-char'),
                { y: 80, opacity: 0, rotationX: -90 },
                { y: 0, opacity: 1, rotationX: 0, duration: 0.8, stagger: 0.04, ease: 'back.out(1.5)', delay: 0.4 }
            )
        }
    }, [])

    const splitText = 'B. Bhargav'.split('').map((char, i) => (
        <span key={i} className="gsap-char inline-block" style={{ minWidth: char === ' ' ? '0.35em' : undefined }}>
            {char}
        </span>
    ))

    return (
        <PageTransition>
            {/* ── Hero ───────────────────────────────────────────────────── */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
                <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at 70% 50%, rgba(168,85,247,0.06) 0%, transparent 60%)',
                }} />

                <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 w-full grid lg:grid-cols-2 gap-16 items-center">
                    {/* Text content */}
                    <motion.div variants={stagger.container} initial="hidden" animate="show" className="space-y-8">
                        {/* Badge */}
                        <motion.div variants={stagger.item}>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono font-medium text-blue-400 border border-blue-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                Open to Opportunities
                            </span>
                        </motion.div>

                        {/* Name */}
                        <motion.h1
                            variants={stagger.item}
                            ref={titleRef}
                            className="font-display font-extrabold leading-none text-6xl sm:text-7xl lg:text-8xl tracking-tight overflow-hidden"
                            aria-label="B. Bhargav"
                        >
                            <span className="text-white">{splitText}</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.div variants={stagger.item} className="flex items-center gap-3">
                            <div className="h-px flex-1 max-w-[60px] bg-blue-600" />
                            <p className="text-blue-400 font-mono text-sm font-medium tracking-widest uppercase">
                                MCA Student · Software Developer
                            </p>
                        </motion.div>

                        {/* Bio */}
                        <motion.p variants={stagger.item} className="text-slate-400 text-lg leading-relaxed max-w-lg">
                            Motivated developer passionate about building{' '}
                            <span className="text-white font-medium">scalable, efficient software</span>.
                            Bridging ideas and elegant code — one project at a time.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div variants={stagger.item} className="flex flex-wrap gap-4">
                            <Link
                                to="/projects"
                                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5"
                            >
                                View Projects
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </Link>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass border border-blue-500/25 text-slate-200 font-semibold text-sm hover:border-blue-400/50 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
                            >
                                Contact Me
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div variants={stagger.item} className="grid grid-cols-4 gap-4 pt-4">
                            {stats.map(({ value, label }) => (
                                <div key={label} className="text-center">
                                    <div className="font-display font-bold text-2xl text-gradient-blue">{value}</div>
                                    <div className="text-xs text-slate-500 mt-0.5">{label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Three.js Canvas */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        className="relative h-[480px] lg:h-[560px]"
                    >
                        {/* Glow halo behind canvas */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-72 h-72 rounded-full"
                                style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)' }} />
                        </div>
                        <HeroCanvas />
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-slate-600 text-xs font-mono tracking-widest">SCROLL</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-px h-8 bg-gradient-to-b from-blue-500 to-transparent"
                    />
                </motion.div>
            </section>

            {/* ── Quick Feature Strip ─────────────────────────────────────── */}
            <section className="py-16 border-t border-slate-800/60">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: '⚡', title: 'Fast Learner', desc: 'Adapts quickly to new technologies and frameworks.' },
                            { icon: '🧠', title: 'Problem Solver', desc: 'Analytical thinker who breaks down complex challenges.' },
                            { icon: '🗄️', title: 'Database Expert', desc: 'SQL, MongoDB — designing efficient data models.' },
                            { icon: '🌐', title: 'Web Developer', desc: 'Responsive, accessible, modern web experiences.' },
                        ].map(({ icon, title, desc }) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="glass rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 group hover:-translate-y-1"
                            >
                                <div className="text-3xl mb-3">{icon}</div>
                                <h3 className="font-semibold text-white text-sm mb-1.5">{title}</h3>
                                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </PageTransition>
    )
}
