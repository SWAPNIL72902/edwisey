'use client'

import { useState, useRef } from 'react'

const SAMPLE = `Unit 1: Introduction to Data Structures
- Arrays and Dynamic Arrays
- Linked Lists: Singly, Doubly, Circular
- Stacks and Queues
- Applications of Linear Data Structures

Unit 2: Trees and Graphs
- Binary Trees and BST
- Tree Traversals: Inorder, Preorder, Postorder
- AVL Trees and Red-Black Trees
- Graph Representations: Adjacency Matrix, List
- BFS and DFS Algorithms

Unit 3: Sorting and Searching
- Bubble Sort, Selection Sort, Insertion Sort
- Merge Sort and Quick Sort
- Binary Search and its variants
- Hashing and Hash Tables`

export default function InputForm({ onResult, onLoading }) {
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!text.trim() && !file) {
      setError('Please paste syllabus text or upload a PDF.')
      return
    }

    onLoading(true)

    try {
      const formData = new FormData()
      if (file) formData.append('file', file)
      if (text) formData.append('text', text)

      const res = await fetch('/api/extract', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Processing failed')
      }

      onResult(data.units)
    } catch (err) {
      setError(err.message)
      onLoading(false)
    }
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped?.type === 'application/pdf') setFile(dropped)
    else setError('Only PDF files are supported.')
  }

  function loadSample() {
    setText(SAMPLE)
    setFile(null)
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* Text Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Paste Syllabus Text
          </label>
          <button type="button" onClick={loadSample} style={{
            fontSize: '0.72rem', color: 'var(--accent2)', background: 'none', border: 'none',
            cursor: 'pointer', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em',
            padding: '2px 8px', borderRadius: '4px', transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.target.style.background = 'rgba(167,139,250,0.1)'}
          onMouseLeave={e => e.target.style.background = 'none'}
          >
            load sample ↗
          </button>
        </div>
        <textarea
          value={text}
          onChange={e => { setText(e.target.value); setFile(null) }}
          placeholder="Paste your syllabus here...&#10;e.g. Unit 1: Introduction&#10;- Topic A&#10;- Topic B"
          rows={10}
          style={{
            width: '100%',
            background: 'var(--surface2)',
            border: `1px solid ${text ? 'var(--border-accent)' : 'var(--border)'}`,
            borderRadius: '10px',
            padding: '1rem',
            color: 'var(--text)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            lineHeight: '1.7',
            resize: 'vertical',
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onFocus={e => e.target.style.boxShadow = '0 0 0 2px rgba(108,99,255,0.25)'}
          onBlur={e => e.target.style.boxShadow = 'none'}
        />
      </div>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>or</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      {/* PDF Upload */}
      <div
        onDrop={handleDrop}
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => fileRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? 'var(--accent)' : file ? 'var(--sub-color)' : 'var(--border)'}`,
          borderRadius: '10px',
          padding: '1.5rem',
          textAlign: 'center',
          cursor: 'pointer',
          background: dragOver ? 'var(--accent-glow)' : file ? 'rgba(16,185,129,0.06)' : 'transparent',
          transition: 'all 0.2s',
        }}
      >
        <input
          ref={fileRef}
          type="file"
          accept=".pdf"
          style={{ display: 'none' }}
          onChange={e => { setFile(e.target.files[0]); setText('') }}
        />
        {file ? (
          <div>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>📄</div>
            <p style={{ color: 'var(--sub-color)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>{file.name}</p>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.72rem', marginTop: '0.25rem' }}>{(file.size / 1024).toFixed(1)} KB</p>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⬆️</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Drop PDF here or <span style={{ color: 'var(--accent2)' }}>click to browse</span></p>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.72rem', marginTop: '0.25rem', fontFamily: 'var(--font-mono)' }}>PDF files only</p>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: '8px', padding: '0.75rem 1rem',
          color: '#f87171', fontSize: '0.82rem', fontFamily: 'var(--font-mono)',
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Submit */}
      <button type="submit" style={{
        background: 'linear-gradient(135deg, var(--accent), #8b5cf6)',
        border: 'none',
        borderRadius: '10px',
        padding: '0.9rem 1.5rem',
        color: '#fff',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '0.95rem',
        letterSpacing: '0.04em',
        cursor: 'pointer',
        transition: 'opacity 0.2s, transform 0.2s',
        boxShadow: '0 4px 24px rgba(108,99,255,0.3)',
      }}
      onMouseEnter={e => { e.target.style.opacity = '0.9'; e.target.style.transform = 'translateY(-1px)' }}
      onMouseLeave={e => { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)' }}
      >
        Segregate Topics →
      </button>
    </form>
  )
}
