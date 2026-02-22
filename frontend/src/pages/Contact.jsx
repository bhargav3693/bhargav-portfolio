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
    const [status, setStatus] = useState('idle')
    const [message, setMessage] = useState('')

    const handleChange = (field) => (e) =>
        setForm(f => ({ ...f, [field]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')

        try {
            const res = await axios.post(
                'https://bhargav-portfolio-backend.onrender.com/api/contact',  // 👈 YOUR RENDER BACKEND URL
                form
            )

            setStatus('success')
            setMessage(res.data.message)
            setForm(initialForm)

        } catch (err) {
            setStatus('error')
            setMessage(
                err.response?.data?.message ||
                'Something went wrong. Please try again.'
            )
        }
    }

    return (
        <PageTransition>
            <div className="section-padding max-w-5xl mx-auto">
                <motion.div
                    variants={reveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">Let's connect</span>
                    <h1 className="font-display font-bold text-5xl text-white mt-2">Get In Touch</h1>
                    <p className="text-slate-400 text-lg mt-4 max-w-md mx-auto">
                        Have a project in mind or just want to say hi? I'd love to hear from you.
                    </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-8">

                    <FloatingInput
                        id="name"
                        label="Your Name"
                        value={form.name}
                        onChange={handleChange('name')}
                        required
                    />

                    <FloatingInput
                        id="email"
                        label="Email Address"
                        type="email"
                        value={form.email}
                        onChange={handleChange('email')}
                        required
                    />

                    <FloatingInput
                        id="subject"
                        label="Subject"
                        value={form.subject}
                        onChange={handleChange('subject')}
                        required
                    />

                    <FloatingInput
                        id="message"
                        label="Your Message"
                        as="textarea"
                        rows={5}
                        value={form.message}
                        onChange={handleChange('message')}
                        required
                    />

                    {status === 'success' && (
                        <div className="text-green-400 text-sm">✅ {message}</div>
                    )}

                    {status === 'error' && (
                        <div className="text-red-400 text-sm">⚠️ {message}</div>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold text-sm transition-all"
                    >
                        {status === 'loading' ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </PageTransition>
    )
}