/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'media',
    theme: {
        extend: {
            colors: {
                'tachometer-yellow': '#FFD700',
                'tachometer-red': '#FF0000',
            },
        },
    },
    plugins: [],
} 