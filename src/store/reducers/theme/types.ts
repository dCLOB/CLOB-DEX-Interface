export const LIGHT_THEME_KEY = 'light'
export const DARK_THEME_KEY = 'dark'
export const THEME_STORAGE_KEY = 'theme'

export type ThemeType = 'light' | 'dark'

export interface ThemeState {
  theme: ThemeType
}
