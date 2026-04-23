'use client'

import { useState } from 'react'

function SubtopicItem({ name, delay }) {
  return (
    <div
      className="fade-up"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.6rem',
        padding: '0.3rem 0.5rem',
        borderRadius: '6px',
        animationDelay: `${delay}ms`,
        transition: 'background 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(16,185,129,0.06)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <span style={{ color: 'var(--sub-color)', fontSize: '0.65rem', marginTop: '0.35rem', flexShrink: 0 }}>◆</span>
      <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem', fontFamily: 'var(--font-body)', lineHeight: '1.5' }}>{name}</span>
    </div>
  )
}

function TopicItem({ topic, index }) {
  const [open, setOpen] = useState(true)
  const hasSubs = topic.subtopics?.length > 0

  return (
    <div
      className="fade-up"
      style={{
        background: 'var(--surface2)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        overflow: 'hidden',
        animationDelay: `${index * 60}ms`,
      }}
    >
      <button
        onClick={() => hasSubs && setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.7rem 0.9rem',
          background: 'none',
          border: 'none',
          cursor: hasSubs ? 'pointer' : 'default',
          textAlign: 'left',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => hasSubs && (e.currentTarget.style.background = 'rgba(6,182,212,0.06)')}
        onMouseLeave={e => e.currentTarget.style.background = 'none'}
      >
        <span style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: 'var(--topic-color)', flexShrink: 0,
          boxShadow: '0 0 6px var(--topic-color)',
        }} />
        <span style={{
          color: 'var(--text)', fontSize: '0.88rem', fontWeight: 500,
          fontFamily: 'var(--font-body)', flex: 1,
        }}>
          {topic.name}
        </span>
        {hasSubs && (
          <span style={{
            color: 'var(--text-dim)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)',
            marginRight: '0.25rem', transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            display: 'inline-block',
          }}>▾</span>
        )}
        {hasSubs && (
          <span style={{
            fontSize: '0.65rem', background: 'rgba(6,182,212,0.15)', color: 'var(--topic-color)',
            padding: '1px 7px', borderRadius: '20px', fontFamily: 'var(--font-mono)',
          }}>
            {topic.subtopics.length}
          </span>
        )}
      </button>

      {hasSubs && open && (
        <div style={{
          padding: '0.25rem 0.9rem 0.6rem 1.5rem',
          borderTop: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column', gap: '0.1rem',
        }}>
          {topic.subtopics.map((sub, i) => (
            <SubtopicItem key={i} name={sub} delay={i * 40} />
          ))}
        </div>
      )}
    </div>
  )
}

function UnitCard({ unit, index }) {
  const [open, setOpen] = useState(true)

  return (
    <div
      className="fade-up"
      style={{
        border: '1px solid var(--border-accent)',
        borderRadius: '14px',
        overflow: 'hidden',
        background: 'var(--surface)',
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Unit Header */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem 1.25rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          borderBottom: open ? '1px solid var(--border)' : 'none',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(108,99,255,0.06)'}
        onMouseLeave={e => e.currentTarget.style.background = 'none'}
      >
        <div style={{
          width: '28px', height: '28px', borderRadius: '7px',
          background: 'linear-gradient(135deg, var(--accent), #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.7rem', fontWeight: 800, color: '#fff',
          fontFamily: 'var(--font-display)', flexShrink: 0,
          boxShadow: '0 2px 10px rgba(108,99,255,0.35)',
        }}>
          {index + 1}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{
            color: 'var(--text)', fontSize: '1rem', fontWeight: 700,
            fontFamily: 'var(--font-display)', letterSpacing: '0.01em',
          }}>
            {unit.unit}
          </p>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', marginTop: '1px' }}>
            {unit.topics?.length || 0} topics
          </p>
        </div>
        <span style={{
          color: 'var(--text-dim)', fontSize: '0.7rem',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          display: 'inline-block', transition: 'transform 0.2s',
        }}>▾</span>
      </button>

      {/* Topics */}
      {open && unit.topics?.length > 0 && (
        <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {unit.topics.map((topic, i) => (
            <TopicItem key={i} topic={topic} index={i} />
          ))}
        </div>
      )}

      {open && (!unit.topics || unit.topics.length === 0) && (
        <div style={{ padding: '1rem', color: 'var(--text-dim)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', textAlign: 'center' }}>
          No topics extracted
        </div>
      )}
    </div>
  )
}

export default function TreeView({ units, onReset }) {
  const totalTopics = units.reduce((s, u) => s + (u.topics?.length || 0), 0)
  const totalSubs = units.reduce((s, u) => s + u.topics?.reduce((ss, t) => ss + (t.subtopics?.length || 0), 0), 0)

  function downloadJSON() {
    const blob = new Blob([JSON.stringify(units, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'syllabus-structure.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* Stats Bar */}
      <div className="fade-up" style={{
        display: 'flex', gap: '0.75rem', flexWrap: 'wrap',
      }}>
        {[
          { label: 'Units', value: units.length, color: 'var(--unit-color)' },
          { label: 'Topics', value: totalTopics, color: 'var(--topic-color)' },
          { label: 'Subtopics', value: totalSubs, color: 'var(--sub-color)' },
        ].map(stat => (
          <div key={stat.label} style={{
            flex: 1, minWidth: '80px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '0.75rem 1rem',
            textAlign: 'center',
          }}>
            <p style={{ color: stat.color, fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
              {stat.value}
            </p>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '0.6rem' }}>
        <button
          onClick={downloadJSON}
          style={{
            flex: 1, padding: '0.65rem', background: 'var(--surface)',
            border: '1px solid var(--border-accent)', borderRadius: '9px',
            color: 'var(--accent2)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
            cursor: 'pointer', transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.target.style.background = 'rgba(167,139,250,0.1)'}
          onMouseLeave={e => e.target.style.background = 'var(--surface)'}
        >
          ↓ Download JSON
        </button>
        <button
          onClick={onReset}
          style={{
            flex: 1, padding: '0.65rem', background: 'var(--surface)',
            border: '1px solid var(--border)', borderRadius: '9px',
            color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
            cursor: 'pointer', transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.04)'}
          onMouseLeave={e => e.target.style.background = 'var(--surface)'}
        >
          ← New Syllabus
        </button>
      </div>

      {/* Tree */}
      {units.map((unit, i) => (
        <UnitCard key={i} unit={unit} index={i} />
      ))}
    </div>
  )
}
