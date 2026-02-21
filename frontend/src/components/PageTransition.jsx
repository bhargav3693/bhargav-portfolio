import { motion } from 'framer-motion'

const pageVariants = {
    initial: { opacity: 0, y: 24, filter: 'blur(4px)' },
    enter: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] } },
    exit: { opacity: 0, y: -16, filter: 'blur(4px)', transition: { duration: 0.3, ease: 'easeIn' } },
}

export default function PageTransition({ children }) {
    return (
        <motion.div
            className="page-wrapper"
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
        >
            {children}
        </motion.div>
    )
}
