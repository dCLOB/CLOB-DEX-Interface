export interface DecimalProps {
  fixed: number
  thousSep?: string
  floatSep?: string
  children?: string | number
  prevValue?: string | number
  className?: string
  color?: string
}

const handleRemoveExponent = (value: DecimalProps['children']) => {
  const data = String(value).split(/[eE]/)

  if (data.length === 1) {
    return data[0]
  }

  const sign = Number(value) < 0 ? '-' : ''
  const str = data[0].replace('.', '')
  let result = ''
  let power = Number(data[1]) + 1

  if (power < 0) {
    result = `${sign}0.`

    // eslint-disable-next-line no-plusplus
    while (power++) {
      result += '0'
    }

    // eslint-disable-next-line
    return result + str.replace(/^\-/, '');
  }

  power -= str.length

  // eslint-disable-next-line no-plusplus
  while (power--) {
    result += '0'
  }

  return `${str}${result}`
}

const formatWithSeparators = (value: string, thousSep?: string, floatSep?: string) => {
  let fmtNum = value

  if (thousSep !== floatSep) {
    if (floatSep) {
      fmtNum = fmtNum.replace('.', floatSep)
    }

    if ((thousSep && floatSep) || (thousSep && !floatSep && thousSep !== '.')) {
      const fmtNumParts = fmtNum.toString().split(floatSep || '.')
      fmtNumParts[0] = fmtNumParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousSep)
      fmtNum = fmtNumParts.join(floatSep || '.')
    }
  }

  return fmtNum
}

export const decimalFormat = (
  value: DecimalProps['children'],
  precision: number,
  thousSep?: string,
  floatSep?: string
): string => {
  if (typeof value === 'undefined') {
    return '0'
  }

  let fmtVal: DecimalProps['children'] = ''
  let isPositive = true
  let result = '0'

  if (typeof value === 'string' && Number(value) < 0) {
    fmtVal = value.slice(1)
    isPositive = false
  } else if (typeof value === 'number' && value < 0) {
    fmtVal = value * -1
    isPositive = false
  } else {
    fmtVal = value
  }

  if (fmtVal !== '' && fmtVal !== 0) {
    result = handleRemoveExponent(
      Number(`${Math.floor(Number(`${handleRemoveExponent(fmtVal)}e${precision}`))}e-${precision}`)
    )
  }

  if (result.indexOf('.') === -1 && precision > 0) {
    result += '.'
  }

  while (result.slice(result.indexOf('.')).length <= precision) {
    result += '0'
  }

  result = formatWithSeparators(result, thousSep, floatSep)

  return isPositive ? result : `-${result}`
}
