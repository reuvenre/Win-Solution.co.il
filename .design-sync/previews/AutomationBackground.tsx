import { AutomationBackground } from 'win-solutions-automations'

// Canvas particle-network backdrop (the site's animated background layer).
export const Default = () => (
  <div dir="rtl" style={{ background: '#05050a', position: 'relative', minHeight: 420, overflow: 'hidden' }}>
    <AutomationBackground />
  </div>
)
