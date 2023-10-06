import { useSelector } from 'react-redux'
import { createTheme } from '@material-ui/core'
import { AppRouter } from 'router'
import { ThemeProvider } from '@material-ui/core'
import { getThemePallete } from 'theme/materialTheme'
import { languageSelector } from 'store/selectors/lang'
import { IntlProvider } from 'react-intl'
import { DEFAULT_LOCALE } from './constants/locale'
import { languageMap } from 'utils/translate'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { DARK_THEME_KEY, ThemeType, THEME_STORAGE_KEY } from 'store/reducers/theme/types'
import './App.css'

export const CustomThemeContext = createContext({
  theme: localStorage.getItem(THEME_STORAGE_KEY),
  setTheme: (theme: ThemeType) => {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  },
})

function App(): JSX.Element {
  const lang = useSelector(languageSelector)
  const [theme, setThemeName] = useState(localStorage.getItem(THEME_STORAGE_KEY) || 'dark')

  const handleChangeTheme = useCallback(
    (newTheme: ThemeType) => {
      setThemeName(newTheme)
      localStorage.setItem(THEME_STORAGE_KEY, `${theme}`)
    },
    [theme]
  )

  const value = useMemo(
    () => ({
      theme,
      setTheme: handleChangeTheme,
    }),
    [theme, handleChangeTheme]
  )

  const currentTheme = useMemo(() => createTheme(getThemePallete(theme)), [theme])

  return (
    <IntlProvider locale={lang} defaultLocale={DEFAULT_LOCALE} messages={languageMap[lang]} key={lang}>
      <CustomThemeContext.Provider value={value}>
        <ThemeProvider theme={currentTheme}>
          <AppRouter />
        </ThemeProvider>
      </CustomThemeContext.Provider>
    </IntlProvider>
  )
}

export default App
