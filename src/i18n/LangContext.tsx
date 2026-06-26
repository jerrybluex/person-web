import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { zh } from './zh'
import { en } from './en'

export type Lang = 'zh' | 'en'

type Dict = typeof zh

const dicts: Record<Lang, Dict> = { zh, en }

interface LangContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: string) => string
}

const LangContext = createContext<LangContextValue>({
  lang: 'zh',
  setLang: () => {},
  t: (key: string) => key,
})

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.')
  let current: unknown = obj
  for (const k of keys) {
    if (current == null || typeof current !== 'object') return path
    current = (current as Record<string, unknown>)[k]
  }
  if (typeof current === 'string') return current
  if (Array.isArray(current)) return current.join('||')
  return path
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('lang')
      if (saved === 'en' || saved === 'zh') return saved
    } catch {}
    return 'zh'
  })

  const setLang = (l: Lang) => {
    setLangState(l)
    try { localStorage.setItem('lang', l) } catch {}
  }

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [lang])

  const t = (key: string): string => getNestedValue(dicts[lang] as unknown as Record<string, unknown>, key)

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
