import { lazy, Suspense } from 'react'
import './App.css'
import AutomationBackground from './components/AutomationBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Footer from './components/Footer'
import WhatsApp from './components/WhatsApp'

// Below-the-fold components are code-split so their deps (the Calendly embed,
// and react-hook-form + zod for the form) don't weigh down the initial bundle.
const Calendly = lazy(() => import('./components/Calendly'))
const ContactForm = lazy(() => import('./components/ContactForm'))

function App() {
  return (
    <div className="min-h-screen bg-[#05050a] text-white overflow-x-hidden">
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[100] focus:bg-accent focus:text-black focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
      >
        דלג לתוכן הראשי
      </a>
      <AutomationBackground />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Suspense fallback={null}>
          <Calendly />
          <ContactForm />
        </Suspense>
      </main>
      <Footer />
      <WhatsApp />
    </div>
  )
}

export default App
