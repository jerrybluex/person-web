import React, { useState, useRef, useEffect } from 'react'
import { useLang } from '../i18n/LangContext'
import { Button } from '../components/Button'
// @ts-ignore
import { parseOfdDocument, renderOfd } from 'ofd-tools'

export function OfdConverter() {
  const { t } = useLang()
  const [status, setStatus] = useState<'idle' | 'parsing' | 'success' | 'error'>('idle')
  const [pageCount, setPageCount] = useState(0)
  const [fileName, setFileName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [renderedDivs, setRenderedDivs] = useState<HTMLDivElement[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Clean up rendered divs when unmounted
  useEffect(() => {
    return () => {
      renderedDivs.forEach(div => {
        try {
          // If the library has custom destructors or cleanup
          if ((div as any).del_data) {
            (div as any).del_data()
          }
        } catch (e) {}
      });
    }
  }, [renderedDivs])

  // Inject rendered DIVs into previewRef
  useEffect(() => {
    if (status === 'success' && previewRef.current) {
      previewRef.current.innerHTML = ''
      renderedDivs.forEach(div => {
        // Apply responsive wrapper styles to each page div returned by ofd.js
        div.style.width = '100%'
        div.style.height = 'auto'
        div.style.display = 'block'
        div.style.margin = '0 auto 24px auto'
        div.style.backgroundColor = '#ffffff'
        div.style.boxShadow = '0 6px 18px rgba(26, 35, 48, 0.06)'
        div.style.border = '1px solid var(--border-hair-soft)'
        div.style.borderRadius = 'var(--radius)'
        
        // Find internal SVGs and ensure they scale properly
        const svgs = div.getElementsByTagName('svg')
        for (let i = 0; i < svgs.length; i++) {
          const svg = svgs[i]
          svg.style.width = '100%'
          svg.style.height = 'auto'
          svg.style.display = 'block'
        }
        
        previewRef.current?.appendChild(div)
      })
    }
  }, [status, renderedDivs])

  const processFile = (file: File) => {
    if (!file) return
    setFileName(file.name)
    setStatus('parsing')
    setErrorMessage('')
    setRenderedDivs([])
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer
      if (!arrayBuffer) {
        setErrorMessage('Failed to read file contents')
        setStatus('error')
        return
      }

      try {
        parseOfdDocument({
          ofd: arrayBuffer,
          success: (res: any) => {
            try {
              // renderOfd(screenWidth, ofd)
              // res is an array of document objects returned by ofd-tools
              const ofdDoc = Array.isArray(res) ? res[0] : res
              const divs = renderOfd(840, ofdDoc)
              if (divs && divs.length > 0) {
                setRenderedDivs(divs)
                setPageCount(divs.length)
                setStatus('success')
              } else {
                setErrorMessage('Empty pages returned from renderer')
                setStatus('error')
              }
            } catch (renderError: any) {
              console.error('Error rendering OFD pages:', renderError)
              setErrorMessage(renderError?.message || String(renderError))
              setStatus('error')
            }
          },
          fail: (err: any) => {
            console.error('Error parsing OFD file:', err)
            const detail = err?.message || err?.msg || (typeof err === 'object' ? JSON.stringify(err) : String(err))
            setErrorMessage(detail === '{}' ? 'Authorization / Parse Error' : detail)
            setStatus('error')
          }
        })
      } catch (parseError: any) {
        console.error('Crash during OFD processing:', parseError)
        setErrorMessage(parseError?.message || String(parseError))
        setStatus('error')
      }
    }
    reader.onerror = () => {
      setErrorMessage('FileReader error')
      setStatus('error')
    }
    reader.readAsArrayBuffer(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      processFile(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files && files[0]) {
      processFile(files[0])
    }
  }

  const triggerSelectFile = () => {
    fileInputRef.current?.click()
  }

  const handlePrint = () => {
    window.print()
  }

  const handleReset = () => {
    setStatus('idle')
    setFileName('')
    setErrorMessage('')
    setRenderedDivs([])
    setPageCount(0)
  }

  return (
    <div className="ofd-converter-card" style={{
      background: 'var(--color-card)',
      border: '1px solid var(--border-hair-soft)',
      borderRadius: 'var(--radius-md)',
      padding: '40px',
      maxWidth: '880px',
      margin: '0 auto',
      boxShadow: 'var(--shadow-card)'
    }}>
      {/* Dynamic Style Tag for Print Media Formatting */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          /* Hide all non-printable elements */
          nav, footer, .no-print, header, .tools-header, button {
            display: none !important;
          }
          
          /* Remove page margins and background colors */
          body, html {
            background: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: auto !important;
          }
          
          /* Target parent containers to expand full-width */
          .site-nav-inner, .site-nav-links, .site-nav-action, 
          #root, .tools-page-container, .ofd-converter-card {
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
            max-width: 100% !important;
            width: 100% !important;
            background: transparent !important;
          }
          
          /* Ensure OFD page container expands full width and shows all contents */
          .ofd-preview-section {
            margin: 0 !important;
            padding: 0 !important;
            display: block !important;
            width: 100% !important;
            max-height: none !important;
            overflow: visible !important;
          }
          
          /* Style every single generated OFD page div during print */
          .ofd-preview-section > div {
            page-break-after: always !important;
            break-after: page !important;
            display: block !important;
            margin: 0 auto !important;
            box-shadow: none !important;
            border: none !important;
            background: #ffffff !important;
            /* Keep original inline width/height and relative positioning */
          }
        }
      ` }} />

      <div className="no-print">
        <h2 style={{
          font: 'var(--type-h2)',
          color: 'var(--color-slate-ink)',
          marginBottom: '12px',
          letterSpacing: 'var(--tracking-tight)'
        }}>
          {t('tools.ofd.name')}
        </h2>
        <p style={{
          fontSize: '14px',
          color: 'var(--color-muted)',
          lineHeight: '1.6',
          marginBottom: '32px'
        }}>
          {t('tools.ofd.desc')}
        </p>
      </div>

      {status === 'idle' && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerSelectFile}
          className="no-print"
          style={{
            border: '2px dashed',
            borderColor: isDragOver ? 'var(--color-steel-bright)' : 'var(--border-hair-strong)',
            borderRadius: 'var(--radius)',
            padding: '64px 32px',
            textAlign: 'center',
            cursor: 'pointer',
            background: isDragOver ? 'rgba(139, 92, 246, 0.06)' : 'transparent',
            transition: 'all var(--dur) var(--ease-out)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".ofd"
            style={{ display: 'none' }}
          />
          
          {/* Upload Icon */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              color: isDragOver ? 'var(--color-steel-bright)' : 'var(--color-muted)',
              marginBottom: '20px',
              transition: 'color var(--dur) var(--ease-out)'
            }}
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>

          <p style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--color-slate-ink)',
            marginBottom: '8px'
          }}>
            {t('tools.ofd.dragTip')}
          </p>
          <p style={{
            fontSize: '13px',
            color: 'var(--color-faint)',
            marginBottom: '24px'
          }}>
            {t('tools.ofd.privacyTip')}
          </p>
        </div>
      )}

      {status === 'parsing' && (
        <div className="no-print" style={{
          padding: '64px 32px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Spinner Animation */}
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--border-hair-strong)',
          borderTop: '3px solid var(--color-steel)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '24px'
          }} />
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          ` }} />
          <p style={{
            fontSize: '15px',
            color: 'var(--color-slate-2)',
            fontWeight: 500
          }}>
            {t('tools.ofd.processing')}
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="no-print" style={{
          padding: '48px 32px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: '#e55a5a', marginBottom: '16px' }}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p style={{
            fontSize: '15px',
            color: '#e55a5a',
            fontWeight: 600,
            marginBottom: '8px'
          }}>
            {t('tools.ofd.error')}
          </p>
          {errorMessage && (
            <p style={{
              fontSize: '13px',
              color: 'var(--color-muted)',
              marginBottom: '24px',
              fontFamily: 'monospace',
              background: 'rgba(229, 90, 90, 0.05)',
              padding: '8px 12px',
              borderRadius: '4px',
              maxWidth: '100%',
              wordBreak: 'break-all'
            }}>
              {errorMessage}
            </p>
          )}
          <Button onClick={handleReset} variant="ghost" size="sm">
            {t('tools.ofd.closeBtn')}
          </Button>
        </div>
      )}

      {status === 'success' && (
        <div>
          {/* Action Bar (Top) */}
          <div className="no-print" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-hair-soft)',
            paddingBottom: '20px',
            marginBottom: '24px'
          }}>
            <div>
              <p style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--color-slate-ink)',
                marginBottom: '4px',
                wordBreak: 'break-all'
              }}>
                {fileName}
              </p>
              <p style={{
                fontSize: '13px',
                color: 'var(--color-faint)'
              }}>
                {t('tools.ofd.pages').replace('{count}', String(pageCount))}
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button onClick={handleReset} variant="ghost" size="sm">
                {t('tools.ofd.closeBtn')}
              </Button>
              <Button onClick={handlePrint} variant="primary" size="sm">
                {t('tools.ofd.exportBtn')}
              </Button>
            </div>
          </div>

          {/* User Hint Area */}
          <div className="no-print" style={{
            background: 'var(--color-paper)',
            borderRadius: 'var(--radius)',
            padding: '16px 20px',
            marginBottom: '24px',
            fontSize: '13px',
            color: 'var(--color-slate-2)',
            lineHeight: '1.5',
            borderLeft: '4px solid var(--color-steel)'
          }}>
            {t('tools.ofd.printTip')}
          </div>

          {/* Render container where OFD canvas/SVGs will be appended */}
          <div
            ref={previewRef}
            className="ofd-preview-section"
            style={{
              maxHeight: '75vh',
              overflowY: 'auto',
              padding: '24px',
              background: 'var(--color-paper-2)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-hair-soft)'
            }}
          />
        </div>
      )}
    </div>
  )
}
