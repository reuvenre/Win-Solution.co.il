export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 px-6 text-center text-white/40 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-bold text-gradient text-base">WIN SOLUTIONS</p>
        <p>© {new Date().getFullYear()} WIN SOLUTIONS. כל הזכויות שמורות.</p>
        <div className="flex gap-6">
          <a href="#services" className="hover:text-accent transition-colors">שירותים</a>
          <a href="#contact" className="hover:text-accent transition-colors">צור קשר</a>
          <a href="#scheduling" className="hover:text-accent transition-colors">פגישה</a>
        </div>
      </div>
    </footer>
  )
}
