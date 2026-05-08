/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0F172A',
        accent: '#2563EB',
        glow: '#60A5FA',
        gold: '#FBBF24',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(96,165,250,0.35), 0 0 30px rgba(96,165,250,0.15)',
        glowStrong: '0 0 0 1px rgba(96,165,250,0.45), 0 0 45px rgba(96,165,250,0.22)',
      },
      backgroundImage: {
        'radial-hero':
          'radial-gradient(1200px circle at 20% 10%, rgba(37,99,235,0.18), transparent 50%), radial-gradient(900px circle at 80% 40%, rgba(96,165,250,0.14), transparent 55%)',
      },
    },
  },
  plugins: [],
}

