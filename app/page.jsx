'use client'

import { useState } from 'react'
import InputForm from '@/components/InputForm'
import TreeView from '@/components/TreeView'
import LoadingState from '@/components/LoadingState'

export default function Home() {
  const [units, setUnits] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleResult(data) {
    setLoading(false)
    setUnits(data)
  }

  function handleReset() {
    setUnits(null)
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      padding: '0 1rem 4rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Glow Effects */}
      <div style={{
        position: 'fixed', top: '-200px', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(108,99,255,0.12) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', bottom: '-100px', right: '-100px',
        width: '400px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ padding: '2.5rem 0 2rem', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(108,99,255,0.12)', border: '1px solid rgba(108,99,255,0.25)',
            borderRadius: '20px', padding: '4px 14px', marginBottom: '1.25rem',
          }}>
            <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--accent2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Problem ID: 15 · Edwisely
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 5vw, 2.75rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, var(--text) 0%, var(--accent2) 60%, var(--topic-color) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.75rem',
          }}>
            SyllaFlow
          </h1>

          <p style={{
            color: 'var(--text-muted)', fontSize: '0.92rem',
            fontFamily: 'var(--font-body)', maxWidth: '420px', margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Transform raw syllabus documents into clean, structured topic hierarchies — instantly.
          </p>

          {/* Legend */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '1.25rem',
            marginTop: '1.25rem', flexWrap: 'wrap',
          }}>
            {[
              { label: 'Unit', color: 'var(--unit-color)', icon: '▪' },
              { label: 'Topic', color: 'var(--topic-color)', icon: '●' },
              { label: 'Subtopic', color: 'var(--sub-color)', icon: '◆' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ color: item.color, fontSize: '0.6rem' }}>{item.icon}</span>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Card */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '18px',
          padding: '1.75rem',
          boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
        }}>
          {loading ? (
            <LoadingState />
          ) : units ? (
            <TreeView units={units} onReset={handleReset} />
          ) : (
            <InputForm onResult={handleResult} onLoading={setLoading} />
          )}
        </div>

        {/* Footer */}
        <p style={{
          textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.7rem',
          fontFamily: 'var(--font-mono)', marginTop: '2rem',
          letterSpacing: '0.04em',
        }}>
          Built with Next.js · Deployed on Vercel · Powered by Claude AI
        </p>
      </div>
    </div>
  )
}
