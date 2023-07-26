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
import { ConfigProviderContext } from '../config-provider'

export type LocaleLang = typeof zhCN

export interface LocaleContextValue {
  lang: LocaleLang
  setLang: (lang: LocaleLang) => void
}

export const LocaleContext = createContext<LocaleContextValue>({
  lang: zhCN,
  setLang: null,
})

export interface LocaleProps {
  children?: ReactNode
}

export type LocaleFC = FC<LocaleProps>

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

export default Locale
