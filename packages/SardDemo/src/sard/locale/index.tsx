import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import zhCN from './lang/zh-CN'
import enUS from './lang/en-US'
import { ConfigProviderContext } from '../config-provider'
import { noop } from '../utils'

export const langMap = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

function addLang(name: string, lang: object) {
  langMap[name] = lang
}

export interface LocaleContextValue {
  lang: string
  setLang: (lang: string) => void
}

export const LocaleContext = createContext<LocaleContextValue>({
  lang: 'zh-CN',
  setLang: noop,
})

export interface LocaleProps {
  children?: ReactNode
}

export interface LocaleFC extends FC<LocaleProps> {
  addLang: typeof addLang
}

export const Locale: LocaleFC = (props) => {
  const { children } = props

  const { lang } = useContext(ConfigProviderContext)

  const [currentLang, setCurrentLang] = useState(lang)

  useEffect(() => {
    if (lang) {
      setCurrentLang(lang)
    }
  }, [lang])

  const context = useMemo(() => {
    return {
      lang: currentLang,
      setLang: setCurrentLang,
    }
  }, [currentLang])

  return (
    <LocaleContext.Provider value={context}>{children}</LocaleContext.Provider>
  )
}

Locale.addLang = addLang

export default Locale
