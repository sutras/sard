import { useEffect, useState } from 'react'
import sardConfig from 'virtual:sard-config'

const themeKey = 'sardTheme'

const defaultTheme = window.matchMedia('(prefers-color-scheme:dark)').matches
  ? 'dark'
  : 'light'

const mapThemeIcon = {
  light: 'bi-sun-fill',
  dark: 'bi-moon-stars-fill',
}

const theme = window.localStorage.getItem(themeKey) || defaultTheme

document.documentElement.dataset.docTheme = theme
document.documentElement.dataset[sardConfig.site.themeDataName] = theme

export interface ThemeProps {}

export default function Theme() {
  const [theme, setTheme] = useState(defaultTheme)

  const toggleTheme = () => {
    setTheme((theme) => {
      const nextTheme = theme === 'light' ? 'dark' : 'light'
      window.localStorage.setItem(themeKey, nextTheme)
      return nextTheme
    })
  }

  useEffect(() => {
    const oldTheme = window.localStorage.getItem(themeKey)

    setTheme(oldTheme || defaultTheme)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.docTheme = theme
    document.documentElement.dataset[sardConfig.site.themeDataName] = theme
  }, [theme])

  return (
    <div className="doc-theme" onClick={toggleTheme}>
      <span className={mapThemeIcon[theme]}></span>
    </div>
  )
}
