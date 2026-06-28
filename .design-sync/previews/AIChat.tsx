import { AIChat } from 'win-solutions-automations'

// Floating chat launcher (position:fixed; opens a panel on click). Shown
// closed. We re-anchor the fixed launcher to this relative stage so it sits in
// the card corner instead of escaping to the page viewport.
export const Default = () => (
  <div
    dir="rtl"
    style={{ background: '#05050a', color: '#e8e8f0', position: 'relative', minHeight: 300, overflow: 'hidden' }}
  >
    <style>{`.chat-stage .fixed{position:absolute !important;transform:none !important;opacity:1 !important}`}</style>
    <div className="chat-stage" style={{ position: 'absolute', inset: 0 }}>
      <AIChat />
    </div>
  </div>
)
