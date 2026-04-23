'use client'

import { useEffect, useState } from 'react'

const STEPS = [
  { icon: '📄', label: 'Parsing syllabus input...' },
  { icon: '✂️', label: 'Chunking into semantic sections...' },
  { icon: '🧠', label: 'Extracting topics with AI...' },
  { icon: '🔗', label: 'Structuring hierarchy...' },
]

export default function LoadingState() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(s => (s + 1) % STEPS.length)
    }, 900)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', gap: '1.75rem', padding: '3rem 1rem',
    }}>
      {/* Animated Ring */}
      <div style={{ position: 'relative', width: '64px', height: '64px' }}>
        <div style={{
          width: '64px', height: '64px',
          border: '3px solid var(--border)',
          borderTopColor: 'var(--accent)',
          borderRadius: '50%',
          animation: 'spin 0.9s linear infinite',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '1.25rem',
        }}>
          {STEPS[step].icon}
        </div>
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', maxWidth: '280px' }}>
        {STEPS.map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.5rem 0.75rem',
            borderRadius: '8px',
            background: i === step ? 'rgba(108,99,255,0.12)' : 'transparent',
            border: `1px solid ${i === step ? 'rgba(108,99,255,0.3)' : 'transparent'}`,
            transition: 'all 0.3s ease',
          }}>
            <span style={{ fontSize: '0.85rem' }}>{s.icon}</span>
            <span style={{
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              color: i === step ? 'var(--accent2)' : i < step ? 'var(--sub-color)' : 'var(--text-dim)',
              transition: 'color 0.3s',
            }}>
              {i < step ? '✓ ' : ''}{s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
