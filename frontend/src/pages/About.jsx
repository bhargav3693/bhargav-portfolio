import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const reveal = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
}

const timeline = [
    {
        year: '2024–2026',
        degree: 'Master of Computer Applications (MCA)',
        institution: 'Swarnandhra College of Engineering and Technology',
        cgpa: '7.56',
        color: 'from-blue-600 to-blue-400',
        glow: 'rgba(37,99,235,0.35)',
    },
    {
        year: '2021–2024',
        degree: 'B.Sc. Computer Science',
        institution: 'SVKP & Dr. K.S. Raju Arts & Science College',
        cgpa: '7.44',
        color: 'from-purple-600 to-purple-400',
        glow: 'rgba(168,85,247,0.35)',
    },
    {
        year: '2019–2021',
        degree: 'Intermediate (MPC)',
        institution: 'Board of Intermediate Education, A.P.',
        cgpa: '7.16',
        color: 'from-cyan-600 to-cyan-400',
        glow: 'rgba(34,211,238,0.35)',
    },
    {
        year: '2018–2019',
        degree: 'Secondary School Certificate (SSC)',
        institution: 'Board of Secondary Education, A.P.',
        cgpa: '8.7',
        color: 'from-emerald-600 to-emerald-400',
        glow: 'rgba(16,185,129,0.35)',
    },
]

const strengths = [
    { icon: '🎯', label: 'Problem Solving' },
    { icon: '🤝', label: 'Team Collaboration' },
    { icon: '🔄', label: 'Adaptability' },
    { icon: '⚡', label: 'Quick Learner' },
    { icon: '🗄️', label: 'Database Management' },
    { icon: '🌐', label: 'Web Development' },
]

export default function About() {
    return (
        <PageTransition>
            <div className="section-padding max-w-5xl mx-auto">
                {/* Heading */}
                <motion.div
                    variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">Get to know me</span>
                    <h1 className="font-display font-bold text-5xl text-white mt-2">About Me</h1>
                </motion.div>

                {/* Bio */}
                <motion.div
                    variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-12 items-center mb-20"
                >
                    <div className="space-y-4 text-slate-400 leading-relaxed">
                        <p>
                            Hi! I'm <span className="text-white font-semibold">B. Bhargav</span>, an MCA student at
                            Swarnandhra College of Engineering and Technology, deeply passionate about crafting
                            software that solves real-world problems.
                        </p>
                        <p>
                            My journey in technology began with a fascination for how systems work under the hood.
                            From designing relational databases to building responsive web interfaces, I enjoy
                            working across the full development stack.
                        </p>
                        <p>
                            Through internships at XYZ Technologies and ABC Software Solutions, I've applied my
                            academic knowledge in production settings — building features, optimizing queries, and
                            collaborating in agile teams.
                        </p>
                        <p>
                            I'm dedicated to continuous learning and thrive in environments that challenge me to
                            think critically and deliver elegant, efficient solutions.
                        </p>
                    </div>

                    {/* Contact/Info Card */}
                    <div className="glass rounded-2xl p-8 space-y-5">
                        {[
                            { label: 'Name', value: 'B. Bhargav' },
                            { label: 'Status', value: 'MCA Student (2024–2026)' },
                            { label: 'Location', value: 'West Godavari, Andhra Pradesh' },
                            { label: 'Email', value: 'bottabhargav7@gmail.com' },
                            { label: 'Focus', value: 'Software Development, Databases' },
                        ].map(({ label, value }) => (
                            <div key={label} className="flex items-start gap-4">
                                <span className="text-slate-500 text-sm font-mono w-24 shrink-0 pt-0.5">{label}</span>
                                <span className="text-white text-sm">{value}</span>
                            </div>
                        ))}
                        <a
                            href="mailto:bottabhargav7@gmail.com"
                            className="mt-4 inline-block w-full text-center py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all hover:-translate-y-0.5"
                        >
                            ✉️ Send a Message
                        </a>
                    </div>
                </motion.div>

                {/* Education Timeline */}
                <motion.div
                    variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="font-display font-bold text-3xl text-white mb-10 text-center">Education Timeline</h2>
                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600 via-purple-600 to-transparent hidden md:block" />

                        <div className="space-y-6">
                            {timeline.map((item, i) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, x: -32 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.12, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                                    className="md:pl-20 relative"
                                >
                                    {/* Timeline dot */}
                                    <div
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full hidden md:block"
                                        style={{ background: `linear-gradient(135deg, ${item.color.replace('from-', '').replace(' to-', ', ')})`, boxShadow: `0 0 12px ${item.glow}` }}
                                    />

                                    <div className="glass rounded-2xl p-6 hover:border-blue-500/30 transition-all group hover:-translate-y-0.5">
                                        <div className="flex flex-wrap items-start justify-between gap-3">
                                            <div>
                                                <span className="font-mono text-xs text-slate-500">{item.year}</span>
                                                <h3 className="font-display font-semibold text-white text-lg mt-0.5">{item.degree}</h3>
                                                <p className="text-slate-400 text-sm mt-0.5">{item.institution}</p>
                                            </div>
                                            <div className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-bold`}>
                                                CGPA {item.cgpa}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Strengths */}
                <motion.div
                    variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
                >
                    <h2 className="font-display font-bold text-3xl text-white mb-10 text-center">Core Strengths</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {strengths.map(({ icon, label }, i) => (
                            <motion.div
                                key={label}
                                initial={{ opacity: 0, scale: 0.85 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07, duration: 0.4 }}
                                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(37,99,235,0.2)' }}
                                className="glass rounded-2xl p-5 flex items-center gap-4 cursor-default"
                            >
                                <span className="text-3xl">{icon}</span>
                                <span className="text-white font-medium text-sm">{label}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </PageTransition>
    )
}
