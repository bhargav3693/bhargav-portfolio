import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/skills', label: 'Skills' },
    { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', handler)
        return () => window.removeEventListener('scroll', handler)
    }, [])

    useEffect(() => setMobileOpen(false), [location])

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-lg shadow-black/30' : 'bg-transparent'
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <NavLink to="/" className="font-display font-bold text-xl tracking-tight">
                    <span className="text-gradient">B.</span>
                    <span className="text-white ml-1">Bhargav</span>
                </NavLink>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map(({ path, label }) => (
                        <li key={path}>
                            <NavLink
                                to={path}
                                className={({ isActive }) =>
                                    `relative text-sm font-medium transition-colors duration-200 ${isActive ? 'text-blue-400' : 'text-slate-300 hover:text-white'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {label}
                                        {isActive && (
                                            <motion.span
                                                layoutId="navUnderline"
                                                className="absolute -bottom-1 left-0 right-0 h-px bg-blue-400"
                                                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Desktop CTA */}
                <a
                    href="/contact"
                    className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5"
                >
                    Hire Me
                </a>

                {/* Mobile Hamburger */}
                <button
                    aria-label="Toggle menu"
                    onClick={() => setMobileOpen(o => !o)}
                    className="md:hidden flex flex-col gap-1.5 p-2"
                >
                    {[0, 1, 2].map(i => (
                        <motion.span
                            key={i}
                            animate={
                                mobileOpen
                                    ? i === 1 ? { opacity: 0, scaleX: 0 }
                                        : i === 0 ? { rotate: 45, y: 8 }
                                            : { rotate: -45, y: -8 }
                                    : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                            }
                            className="block w-6 h-px bg-slate-300 origin-center transition-all"
                        />
                    ))}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden glass border-t border-blue-900/20"
                    >
                        <ul className="p-6 flex flex-col gap-4">
                            {navLinks.map(({ path, label }) => (
                                <li key={path}>
                                    <NavLink
                                        to={path}
                                        className={({ isActive }) =>
                                            `block text-sm font-medium py-1 ${isActive ? 'text-blue-400' : 'text-slate-300'}`
                                        }
                                    >
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                            <li>
                                <a
                                    href="/contact"
                                    className="inline-block mt-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all"
                                >
                                    Hire Me
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
