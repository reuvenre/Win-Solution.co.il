// Barrel entry for design-sync: re-export each page-section component as a
// NAMED export so the converter's IIFE exposes them on window.<globalName>.
// (The components are default exports; `export * from` would drop them.)
export { default as Hero } from '../src/components/Hero'
export { default as Services } from '../src/components/Services'
export { default as About } from '../src/components/About'
export { default as Navbar } from '../src/components/Navbar'
export { default as Footer } from '../src/components/Footer'
export { default as ContactForm } from '../src/components/ContactForm'
export { default as Calendly } from '../src/components/Calendly'
export { default as WhatsApp } from '../src/components/WhatsApp'
export { default as AIChat } from '../src/components/AIChat'
export { default as AutomationBackground } from '../src/components/AutomationBackground'
