import { useContext } from 'react'
import { ThemeContext } from '../../ThemeProvider'

const mapThemeIcon = {
  light: 'bi-sun-fill',
  dark: 'bi-moon-stars-fill',
}

export interface ThemeProps {
  className?: string
}

export default function Theme() {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggleTheme = () => {
    setTheme((theme) => {
      return theme === 'light' ? 'dark' : 'light'
    })
  }

  return (
    <div className="doc-theme" onClick={toggleTheme}>
      <span className={mapThemeIcon[theme]}></span>
    </div>
  )
}
