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

const themeKey = 'sardColorScheme'

export type ThemeType = 'dark' | 'light'

const mediaQueryList = window.matchMedia('(prefers-color-scheme:dark)')
const colorScheme = mediaQueryList.matches ? 'dark' : 'light'

const defaulTheme = (window.localStorage.getItem(themeKey) ||
  colorScheme) as ThemeType

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
    const eventHandler = () => {
      setTheme(mediaQueryList.matches ? 'dark' : 'light')
    }
    mediaQueryList.addEventListener('change', eventHandler)
    return () => {
      mediaQueryList.removeEventListener('change', eventHandler)
    }
  }, [])

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
