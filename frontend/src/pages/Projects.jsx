import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const reveal = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
}

const projects = [
    {
        id: 1,
        title: 'Herbal Plants Disease Detection',
        category: 'Machine Learning · Image Processing',
        description:
            'An image-processing pipeline that detects diseases in herbal plants, addressing a key agricultural challenge. Applies foundational ML concepts to classify plant health from leaf imagery.',
        longDescription:
            'This project was developed to solve a real agricultural problem — detecting diseases in herbal plants before they spread. By feeding leaf images through a preprocessing pipeline and applying classification algorithms, the system highlights affected areas and suggests potential diagnoses. The focus was on accuracy, usability, and applicability for farming communities in rural India.',
        tags: ['Python', 'Image Processing', 'Machine Learning', 'OpenCV'],
        icon: '🌿',
        color: 'from-emerald-600/20 to-emerald-900/10',
        border: 'border-emerald-500/20',
        glow: 'rgba(16,185,129,0.15)',
        featured: true,
    },
    {
        id: 2,
        title: 'Web Development Internship',
        category: 'XYZ Technologies · May–Jul 2023',
        description:
            'Developed responsive web applications using HTML, CSS, and JavaScript. Integrated SQL databases with front-end interfaces. Optimized performance through asset minification.',
        longDescription:
            'During this internship, I worked on building responsive, cross-browser-compatible web applications for end clients. I integrated REST APIs with SQL databases, handled form validations, and improved page load performance by implementing asset minification and lazy loading. Worked in an agile team with bi-weekly sprints.',
        tags: ['HTML', 'CSS', 'JavaScript', 'SQL', 'REST API'],
        icon: '🌐',
        color: 'from-blue-600/20 to-blue-900/10',
        border: 'border-blue-500/20',
        glow: 'rgba(37,99,235,0.15)',
        featured: false,
    },
    {
        id: 3,
        title: 'Database Internship',
        category: 'ABC Software Solutions · Jan–Mar 2024',
        description:
            'Designed and normalized relational schemas. Executed CRUD operations and stored procedures. Worked with MongoDB for NoSQL modeling and optimized complex SQL queries.',
        longDescription:
            'At ABC Software Solutions, I was responsible for designing normalized database schemas to support enterprise workflows. I wrote complex SQL queries, created stored procedures, and performed data migrations. Additionally, I gained hands-on experience with MongoDB, designing document-based schemas for flexible data requirements and optimizing query execution plans.',
        tags: ['SQL', 'MongoDB', 'Database Design', 'CRUD', 'Query Optimization'],
        icon: '🗄️',
        color: 'from-purple-600/20 to-purple-900/10',
        border: 'border-purple-500/20',
        glow: 'rgba(168,85,247,0.15)',
        featured: false,
    },
]

function ProjectModal({ project, onClose }) {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

                {/* Modal */}
                <motion.div
                    initial={{ scale: 0.85, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.85, opacity: 0, y: 20 }}
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                    className="relative glass rounded-3xl p-8 max-w-lg w-full z-10 shadow-2xl"
                    onClick={e => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-slate-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all"
                    >
                        ✕
                    </button>

                    <div className="text-4xl mb-4">{project.icon}</div>
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">{project.category}</span>
                    <h2 className="font-display font-bold text-2xl text-white mt-1 mb-4">{project.title}</h2>
                    <p className="text-slate-400 leading-relaxed text-sm mb-6">{project.longDescription}</p>

                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-full glass text-xs font-mono text-blue-400 border border-blue-500/20">
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default function Projects() {
    const [selected, setSelected] = useState(null)

    return (
        <PageTransition>
            <div className="section-padding max-w-5xl mx-auto">
                {/* Heading */}
                <motion.div
                    variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">What I've built</span>
                    <h1 className="font-display font-bold text-5xl text-white mt-2">Projects & Experience</h1>
                </motion.div>

                {/* Featured Project */}
                <motion.div
                    variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="mb-10"
                >
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4 block">Featured Project</span>
                    {projects.filter(p => p.featured).map((project) => (
                        <motion.div
                            key={project.id}
                            whileHover={{ scale: 1.015, boxShadow: `0 0 60px ${project.glow}` }}
                            onClick={() => setSelected(project)}
                            className={`glass rounded-3xl p-8 cursor-pointer border ${project.border} relative overflow-hidden group`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-50 group-hover:opacity-80 transition-opacity`} />
                            <div className="relative">
                                <div className="text-5xl mb-4">{project.icon}</div>
                                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">{project.category}</span>
                                <h2 className="font-display font-bold text-3xl text-white mt-1 mb-3">{project.title}</h2>
                                <p className="text-slate-400 leading-relaxed mb-6 max-w-2xl">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-full glass text-xs font-mono text-blue-400 border border-blue-500/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <button className="inline-flex items-center gap-2 text-sm font-semibold text-white opacity-70 group-hover:opacity-100 transition-opacity">
                                    View Details
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Internship Cards */}
                <div>
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4 block">Internship Experience</span>
                    <div className="grid md:grid-cols-2 gap-6">
                        {projects.filter(p => !p.featured).map((project, i) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                whileHover={{ scale: 1.03, boxShadow: `0 0 40px ${project.glow}` }}
                                onClick={() => setSelected(project)}
                                className={`glass rounded-2xl p-6 cursor-pointer border ${project.border} relative overflow-hidden group`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40 group-hover:opacity-70 transition-opacity`} />
                                <div className="relative">
                                    <div className="text-3xl mb-3">{project.icon}</div>
                                    <span className="text-xs font-mono text-slate-500">{project.category}</span>
                                    <h3 className="font-display font-bold text-xl text-white mt-0.5 mb-2">{project.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-2.5 py-1 rounded-full glass text-xs font-mono text-blue-400 border border-blue-500/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Modal */}
                {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
            </div>
        </PageTransition>
    )
}
