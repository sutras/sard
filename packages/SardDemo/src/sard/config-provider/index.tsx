import { createContext, FC, ReactNode, useMemo } from 'react'
import { Locale } from '../locale'

export interface Bem {
  namespace?: string
  blockSeparator?: string
  elementSeparator?: string
  modifierSeparator?: string
}
export interface ConfigProviderContextValue {
  theme: string
  lang: string
  bem?: Bem
}

export const ConfigProviderContext = createContext<ConfigProviderContextValue>({
  theme: 'light',
  lang: 'zh-CN',
  bem: {},
})

export interface ConfigProviderProps {
  children?: ReactNode
  theme?: string
  lang?: string
  bem?: Bem
}

export const ConfigProvider: FC<ConfigProviderProps> = (props) => {
  const { children, theme = 'light', lang = 'zh-CN', bem } = props

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
