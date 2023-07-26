import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'

const themeKey = 'sardTheme'

export type ThemeType = 'dark' | 'light'

const systemTheme = window.matchMedia('(prefers-color-scheme:dark)').matches
  ? 'dark'
  : 'light'

const defaulTheme = (window.localStorage.getItem(themeKey) ||
  systemTheme) as ThemeType

document.documentElement.dataset.docTheme = defaulTheme

interface ThemeContext {
  theme: ThemeType
  setTheme: Dispatch<SetStateAction<ThemeType>>
}

export const ThemeContext = createContext<ThemeContext>({
  theme: defaulTheme,
  setTheme: () => {
    void 0
  },
})

export interface ThemeProviderProps {
  children?: ReactNode | ((context: ThemeContext) => ReactNode)
}

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  const { children } = props
  const [theme, setTheme] = useState(defaulTheme)

  useEffect(() => {
    document.documentElement.dataset.docTheme = theme
    window.localStorage.setItem(themeKey, theme)
  }, [theme])

  const context = useMemo(() => {
    return { theme, setTheme }
  }, [theme])

  return (
    <ThemeContext.Provider value={context}>
      {typeof children === 'function' ? children(context) : children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
