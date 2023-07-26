import { createContext, FC, ReactNode, useMemo } from 'react'
import { Locale, LocaleLang } from '../locale'

export interface ConfigProviderContextValue {
  theme: string
  lang: LocaleLang
}

export const ConfigProviderContext = createContext<ConfigProviderContextValue>({
  theme: 'light',
  lang: null,
})

export interface ConfigProviderProps {
  children?: ReactNode
  theme?: string
  lang?: LocaleLang
}

export const ConfigProvider: FC<ConfigProviderProps> = (props) => {
  const { children, theme, lang } = props

  const context = useMemo(() => {
    return {
      theme,
      lang,
    }
  }, [theme, lang])

  return (
    <ConfigProviderContext.Provider value={context}>
      <Locale>{children}</Locale>
    </ConfigProviderContext.Provider>
  )
}

export default ConfigProvider
