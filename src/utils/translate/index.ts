import { en } from './en'

export type LangType = typeof en

type LangMapType = {
  [key: string]: LangType
}

export const languageMap: LangMapType = {
  default: en,
  en,
}
