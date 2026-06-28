import { WhatsApp } from 'win-solutions-automations'

// Floating action button (position:fixed in the live site). For an isolated
// card we re-anchor the fixed element to this relative stage so it sits in the
// card corner instead of escaping to the page viewport.
export const Default = () => (
  <div
    dir="rtl"
    style={{ background: '#05050a', color: '#e8e8f0', position: 'relative', minHeight: 300, overflow: 'hidden' }}
  >
    <style>{`.wa-stage .fixed{position:absolute !important;transform:none !important;opacity:1 !important}`}</style>
    <div className="wa-stage" style={{ position: 'absolute', inset: 0 }}>
      <WhatsApp />
    </div>
  </div>
)
