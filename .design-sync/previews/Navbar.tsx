import { Navbar } from 'win-solutions-automations'

// Navbar is position:fixed and its logo/links animate in with a delay, which
// races a static capture. The wide stage clears the md: breakpoint (so the
// desktop links show) and the force-visible rule pins the entrance animation
// to its resting state so the bar renders deterministically.
export const Default = () => (
  <div dir="rtl" style={{ background: '#05050a', color: '#e8e8f0', position: 'relative', minHeight: 200, overflow: 'hidden' }}>
    <style>{`.nav-stage .fixed{position:absolute !important}.nav-stage *{opacity:1 !important;transform:none !important}`}</style>
    <div className="nav-stage" style={{ position: 'absolute', inset: 0 }}>
      <Navbar />
    </div>
  </div>
)
