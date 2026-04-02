import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Calendly from './components/Calendly'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import AIChat from './components/AIChat'
import WhatsApp from './components/WhatsApp'

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Calendly />
        <ContactForm />
      </main>
      <Footer />
      <AIChat />
      <WhatsApp />
    </div>
  )
}

export default App
