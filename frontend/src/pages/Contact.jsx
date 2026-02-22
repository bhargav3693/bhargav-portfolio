import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import PageTransition from '../components/PageTransition'

const reveal = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const initialForm = { name: '', email: '', subject: '', message: '' }

// 👇 Keep backend URL in one place
const API_URL = "https://bhargav-portfolio-backend.onrender.com"

function FloatingInput({ id, label, type = 'text', value, onChange, required, as: As = 'input', rows }) {
    const [focused, setFocused] = useState(false)
    const raised = focused || value.length > 0

    const sharedProps = {
        id,
        value,
        onChange,
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false),
        required,
        ...(As === 'input' ? { type } : { rows: rows || 5 }),
        className: "w-full bg-transparent pt-6 pb-2 text-white text-sm outline-none resize-none"
    }

    return (
        <div className={`relative border-b ${focused ? 'border-blue-400' : 'border-slate-700'}`}>
            {As === 'input'
                ? <input {...sharedProps} />
                : <textarea {...sharedProps} />
            }

            <label
                htmlFor={id}
                className={`absolute left-0 text-sm transition-all pointer-events-none ${
                    raised ? '-top-1 text-xs text-blue-400' : 'top-6 text-slate-500'
                }`}
            >
                {label}
            </label>
        </div>
    )
}

export default function Contact() {

    const [form, setForm] = useState(initialForm)
    const [status, setStatus] = useState('idle')
    const [message, setMessage] = useState('')

    const handleChange = (field) => (e) =>
        setForm(prev => ({ ...prev, [field]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')
        setMessage('')

        try {
            const response = await axios.post(
                `${API_URL}/api/contact`,
                form,
                {
                    headers: { "Content-Type": "application/json" },
                    timeout: 20000 // 20 sec (for Render wake up)
                }
            )

            if (response.data.success) {
                setStatus('success')
                setMessage(response.data.message || "Message sent successfully!")
                setForm(initialForm)
            } else {
                throw new Error("Server responded but failed")
            }

        } catch (error) {
            console.error("Contact Error:", error)

            setStatus('error')

            if (error.code === "ECONNABORTED") {
                setMessage("Server is waking up... Please try again.")
            } else if (error.response) {
                setMessage(error.response.data.message || "Server error occurred.")
            } else {
                setMessage("Network error. Please try again.")
            }
        }
    }

    return (
        <PageTransition>
            <div className="section-padding max-w-4xl mx-auto">

                <motion.div
                    variants={reveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl font-bold text-white">Get In Touch</h1>
                    <p className="text-slate-400 mt-3">
                        Have a project idea? Let's build something amazing.
                    </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">

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
                        <div className="text-red-400 text-sm">⚠ {message}</div>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold transition"
                    >
                        {status === 'loading' ? "Sending..." : "Send Message"}
                    </button>

                </form>
            </div>
        </PageTransition>
    )
}