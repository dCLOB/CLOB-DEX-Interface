export type FieldType = 'search' | 'text' | 'select' | 'checkbox'

export interface OptionType {
  value: string | number
  label: string | number | JSX.Element
}

export type Options = {
  options: OptionType[]
}
