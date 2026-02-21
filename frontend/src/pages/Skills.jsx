import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const reveal = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
}

const skillGroups = [
    {
        category: 'Programming',
        icon: '⚡',
        color: 'from-blue-600 to-blue-400',
        glow: 'rgba(37,99,235,0.25)',
        skills: [
            { name: 'C', level: 75 },
            { name: 'Java', level: 80 },
        ],
    },
    {
        category: 'Web Development',
        icon: '🌐',
        color: 'from-cyan-600 to-cyan-400',
        glow: 'rgba(34,211,238,0.25)',
        skills: [
            { name: 'HTML5', level: 90 },
            { name: 'CSS3', level: 85 },
            { name: 'JavaScript', level: 78 },
        ],
    },
    {
        category: 'Database',
        icon: '🗄️',
        color: 'from-purple-600 to-purple-400',
        glow: 'rgba(168,85,247,0.25)',
        skills: [
            { name: 'SQL', level: 85 },
            { name: 'MongoDB', level: 72 },
            { name: 'DBMS', level: 80 },
        ],
    },
    {
        category: 'Tools',
        icon: '🔧',
        color: 'from-emerald-600 to-emerald-400',
        glow: 'rgba(16,185,129,0.25)',
        skills: [
            { name: 'MS Office', level: 88 },
        ],
    },
]

function SkillBar({ name, level, color, delay }) {
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
                <span className="text-slate-300 font-medium">{name}</span>
                <span className="text-slate-500 font-mono">{level}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay, ease: [0.23, 1, 0.32, 1] }}
                    className={`h-full rounded-full bg-gradient-to-r ${color} relative`}
                >
                    {/* Shimmer */}
                    <motion.div
                        animate={{ x: ['0%', '200%'] }}
                        transition={{ duration: 1.5, delay: delay + 1.2, ease: 'linear' }}
                        className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                </motion.div>
            </div>
        </div>
    )
}

function RadialSkill({ name, level, color }) {
    const r = 32
    const circ = 2 * Math.PI * r
    const offset = circ - (circ * level) / 100

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.08 }}
            className="flex flex-col items-center gap-2"
        >
            <div className="relative w-20 h-20">
                <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
                    <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                    <motion.circle
                        cx="40" cy="40" r={r}
                        fill="none"
                        stroke={`url(#grad-${name})`}
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={circ}
                        initial={{ strokeDashoffset: circ }}
                        whileInView={{ strokeDashoffset: offset }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
                    />
                    <defs>
                        <linearGradient id={`grad-${name}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#2563eb" />
                            <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                    </defs>
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">{level}%</span>
            </div>
            <span className="text-slate-300 text-xs font-medium text-center">{name}</span>
        </motion.div>
    )
}

const radialSkills = [
    { name: 'Java', level: 80 },
    { name: 'HTML5', level: 90 },
    { name: 'CSS3', level: 85 },
    { name: 'JavaScript', level: 78 },
    { name: 'SQL', level: 85 },
    { name: 'MongoDB', level: 72 },
    { name: 'C', level: 75 },
    { name: 'DBMS', level: 80 },
]

export default function Skills() {
    return (
        <PageTransition>
            <div className="section-padding max-w-5xl mx-auto">
                {/* Heading */}
                <motion.div
                    variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">What I know</span>
                    <h1 className="font-display font-bold text-5xl text-white mt-2">Technical Skills</h1>
                    <p className="text-slate-400 text-lg mt-4 max-w-lg mx-auto">
                        A curated set of technologies I've worked with across web development, databases, and programming.
                    </p>
                </motion.div>

                {/* Radial overview */}
                <motion.div
                    variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="glass rounded-3xl p-8 mb-12"
                >
                    <h2 className="font-display font-semibold text-xl text-white mb-8 text-center">Proficiency Overview</h2>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-8 justify-items-center">
                        {radialSkills.map((s) => (
                            <RadialSkill key={s.name} {...s} />
                        ))}
                    </div>
                </motion.div>

                {/* Skill bars by category */}
                <div className="grid md:grid-cols-2 gap-6">
                    {skillGroups.map((group, gi) => (
                        <motion.div
                            key={group.category}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: gi * 0.1, duration: 0.5 }}
                            whileHover={{ boxShadow: `0 0 40px ${group.glow}` }}
                            className="glass rounded-2xl p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-2xl">{group.icon}</span>
                                <h3 className={`font-display font-bold text-lg bg-gradient-to-r ${group.color} bg-clip-text text-transparent`}>
                                    {group.category}
                                </h3>
                            </div>
                            <div className="space-y-5">
                                {group.skills.map((skill, si) => (
                                    <SkillBar
                                        key={skill.name}
                                        {...skill}
                                        color={group.color}
                                        delay={gi * 0.1 + si * 0.1}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Tech badge cloud */}
                <motion.div
                    variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <h2 className="font-display font-semibold text-xl text-white mb-6">Technologies &amp; Tools</h2>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {['C', 'Java', 'HTML5', 'CSS3', 'JavaScript', 'SQL', 'MySQL', 'MongoDB', 'DBMS', 'MS Office', 'Git'].map(tech => (
                            <motion.span
                                key={tech}
                                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(37,99,235,0.3)' }}
                                className="px-4 py-2 glass rounded-full text-sm font-mono text-blue-400 border border-blue-500/20 cursor-default"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </PageTransition>
    )
}
