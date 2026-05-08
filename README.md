# Syed Muhammad Hussnain Bukhari — Portfolio (SPA)

Premium single-page portfolio website built with **React + Vite + Tailwind CSS + Three.js + Framer Motion**.

## Highlights

- **Dark-only premium UI**: `#0F172A` base, `#2563EB` accent, `#60A5FA` glow (no purple gradients)
- **Animated hero**: name entrance + typewriter roles + floating particle background
- **Three.js Robot companion**:
  - Hero robot with glowing eyes + subtle aura + idle float
  - Scroll companion bottom-right with a **scroll progress bar**
- **Stats counters**: animate on scroll into view
- **Skills** grouped cards, **experience** glowing timeline
- **Projects**:
  - Live GitHub repos via REST API
  - 3 featured “Coming Soon” cards
- **Testimonials**: infinite auto-scrolling carousel (pause on hover, swipe on mobile)
- **Contact**:
  - Floating “Contact” chooser (WhatsApp or Email)
  - Appointment section (pick date/time + method → opens WhatsApp/Email with prefilled message)
- **Desktop cursor trail** and smooth scrolling

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Three.js
- GitHub REST API

## Getting Started (Local)

```bash
# from this repo folder
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Configuration Notes

- **GitHub repos source**: `https://api.github.com/users/HBukhari202114/repos`
- **Identity/content** lives in `src/lib/content.js`
- **Appointment + contact deep-links** live in `src/lib/contactLinks.js`

## Contact

**Syed Muhammad Hussnain Bukhari**  
**CEO @ CodeNest Tech Solutions**  

- **Company**: `https://share.google/EClCuf3hcMr4FDTZJ`
- **Email**: `myselfhbukhari@gmail.com`
- **WhatsApp**: `+92 314 679 3354`
- **GitHub**: `https://github.com/HBukhari202114`
- **LinkedIn**: `https://www.linkedin.com/in/hussnain-shah-bukhari-9a2609223`
- **Location**: Sadiq Abad, Pakistan

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
