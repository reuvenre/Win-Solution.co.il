import './App.css'
import AutomationBackground from './components/AutomationBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Calendly from './components/Calendly'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import WhatsApp from './components/WhatsApp'

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
        <Calendly />
        <ContactForm />
      </main>
      <Footer />
      <WhatsApp />
    </div>
  )
}

export default App
