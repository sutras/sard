import { useEffect, useState } from 'react'

const themeKey = 'sardTheme'

const defaultTheme = 'light'

const mapThemeIcon = {
  light: 'bi-sun-fill',
  dark: 'bi-moon-stars-fill',
}

document.documentElement.dataset.docTheme =
  window.localStorage.getItem(themeKey) || defaultTheme

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
  }, [theme])

  return (
    <div className="doc-theme" onClick={toggleTheme}>
      <span className={mapThemeIcon[theme]}></span>
    </div>
  )
}
