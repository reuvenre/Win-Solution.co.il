import { Calendly } from 'win-solutions-automations'

// Calendly injects an external widget script at runtime; offline it shows the
// section shell. Wrapper supplies the dark theme it expects.
export const Default = () => (
  <div dir="rtl" style={{ background: '#05050a', color: '#e8e8f0', position: 'relative', overflow: 'hidden', minHeight: 420 }}>
    <Calendly />
  </div>
)
