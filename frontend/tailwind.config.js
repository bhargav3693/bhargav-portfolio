/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                },
                dark: {
                    900: '#020408',
                    800: '#060d1a',
                    700: '#0a1628',
                    600: '#111f3a',
                    500: '#1a2d4f',
                },
                purple: {
                    400: '#c084fc',
                    500: '#a855f7',
                    600: '#9333ea',
                },
                cyan: {
                    400: '#22d3ee',
                    500: '#06b6d4',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Sora', 'Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'glow-pulse': 'glowPulse 2s ease-in-out infinite',
                'spin-slow': 'spin 20s linear infinite',
                'slide-up': 'slideUp 0.6s ease-out forwards',
                'fade-in': 'fadeIn 0.8s ease-out forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glowPulse: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(37,99,235,0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(37,99,235,0.7), 0 0 80px rgba(147,51,234,0.3)' },
                },
                slideUp: {
                    from: { opacity: '0', transform: 'translateY(40px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'hero-gradient': 'radial-gradient(ellipse at center top, rgba(37,99,235,0.15) 0%, rgba(10,22,40,0) 70%)',
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}
