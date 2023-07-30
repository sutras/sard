import { createContext, FC, ReactNode, useMemo } from 'react'
import { Locale, LocaleLang } from '../locale'

export interface Bem {
  namespace?: string
  blockSeparator?: string
  elementSeparator?: string
  modifierSeparator?: string
}
export interface ConfigProviderContextValue {
  theme: string
  lang: LocaleLang
  bem: Bem
}

export const ConfigProviderContext = createContext<ConfigProviderContextValue>({
  theme: 'light',
  lang: null,
  bem: null,
})

export interface ConfigProviderProps {
  children?: ReactNode
  theme?: string
  lang?: LocaleLang
  bem?: Bem
}

export const ConfigProvider: FC<ConfigProviderProps> = (props) => {
  const { children, theme, lang, bem } = props

  const context = useMemo(() => {
    return {
      theme,
      lang,
      bem,
    }
  }, [theme, lang, bem])

  return (
    <ConfigProviderContext.Provider value={context}>
      <Locale>{children}</Locale>
    </ConfigProviderContext.Provider>
  )
}

export default ConfigProvider
