import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import PageTransition from '../components/PageTransition'

const reveal = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
}

const initialForm = { name: '', email: '', subject: '', message: '' }

function FloatingInput({ id, label, type = 'text', value, onChange, required, as: As = 'input', rows }) {
    const [focused, setFocused] = useState(false)
    const hasValue = value.length > 0
    const raised = focused || hasValue

    const sharedProps = {
        id,
        value,
        onChange,
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false),
        required,
        ...(As === 'input' ? { type } : { rows: rows || 5 }),
        className: `w-full bg-transparent pt-6 pb-2 px-0 text-white text-sm outline-none resize-none placeholder-transparent peer`,
    }

    return (
        <div className={`relative border-b transition-all duration-300 ${focused ? 'border-blue-400' : 'border-slate-700'}`}>
            {As === 'input'
                ? <input {...sharedProps} />
                : <textarea {...sharedProps} />
            }
            <label
                htmlFor={id}
                className={`absolute left-0 text-sm transition-all duration-200 pointer-events-none ${raised ? '-top-0.5 text-xs text-blue-400' : 'top-6 text-slate-500'
                    }`}
            >
                {label}
            </label>
            {/* Animated underline glow */}
            <motion.div
                animate={{ scaleX: focused ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-0 left-0 right-0 h-px bg-blue-400 origin-left"
                style={{ boxShadow: '0 0 8px rgba(96,165,250,0.7)' }}
            />
        </div>
    )
}

export default function Contact() {
    const [form, setForm] = useState(initialForm)
    const [status, setStatus] = useState('idle') // idle | loading | success | error
    const [message, setMessage] = useState('')

    const handleChange = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')
        try {
            const res = await axios.post('/api/contact', form)
            setStatus('success')
            setMessage(res.data.message)
            setForm(initialForm)
        } catch (err) {
            setStatus('error')
            setMessage(err.response?.data?.message || 'Something went wrong. Please try again.')
        }
    }

    return (
        <PageTransition>
            <div className="section-padding max-w-5xl mx-auto">
                {/* Heading */}
                <motion.div
                    variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">Let's connect</span>
                    <h1 className="font-display font-bold text-5xl text-white mt-2">Get In Touch</h1>
                    <p className="text-slate-400 text-lg mt-4 max-w-md mx-auto">
                        Have a project in mind or just want to say hi? I'd love to hear from you.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-10">
                    {/* Info cards */}
                    <motion.div
                        variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
                        className="lg:col-span-2 space-y-4"
                    >
                        {[
                            { icon: '✉️', label: 'Email', value: 'bottabhargav7@gmail.com', href: 'mailto:bottabhargav7@gmail.com' },
                            { icon: '📍', label: 'Location', value: 'West Godavari, Andhra Pradesh' },
                            { icon: '🎓', label: 'Status', value: 'MCA Student (2024–2026)' },
                            { icon: '💼', label: 'Available For', value: 'Internships & Graduate Roles' },
                        ].map(({ icon, label, value, href }) => (
                            <div key={label} className="glass rounded-2xl p-5 hover:border-blue-500/30 transition-all group">
                                <div className="flex items-start gap-4">
                                    <span className="text-2xl">{icon}</span>
                                    <div>
                                        <div className="text-slate-500 text-xs font-mono uppercase tracking-wider mb-0.5">{label}</div>
                                        {href
                                            ? <a href={href} className="text-white text-sm font-medium hover:text-blue-400 transition-colors">{value}</a>
                                            : <div className="text-white text-sm font-medium">{value}</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Status indicator */}
                        <div className="glass rounded-2xl p-5">
                            <div className="flex items-center gap-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                                <span className="text-slate-300 text-sm">
                                    Currently <span className="text-green-400 font-semibold">available</span> and actively seeking opportunities
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
                        className="lg:col-span-3"
                    >
                        <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-8">
                            <div className="grid sm:grid-cols-2 gap-8">
                                <FloatingInput id="name" label="Your Name" value={form.name} onChange={handleChange('name')} required />
                                <FloatingInput id="email" label="Email Address" type="email" value={form.email} onChange={handleChange('email')} required />
                            </div>
                            <FloatingInput id="subject" label="Subject" value={form.subject} onChange={handleChange('subject')} required />
                            <FloatingInput id="message" label="Your Message" as="textarea" rows={5} value={form.message} onChange={handleChange('message')} required />

                            {/* Status message */}
                            {status === 'success' && (
                                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                                    ✅ {message}
                                </motion.div>
                            )}
                            {status === 'error' && (
                                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                    ⚠️ {message}
                                </motion.div>
                            )}

                            <motion.button
                                type="submit"
                                disabled={status === 'loading'}
                                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(37,99,235,0.4)' }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                        />
                                        Sending…
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    )
}
