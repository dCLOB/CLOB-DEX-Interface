export const calculatePriceChange = (
  lastPrice: number,
  newPrice: number
): { changeValue: string; numberChange: string } => {
  const priceDiff = (newPrice * 100) / (lastPrice || 1) - 100
  const isNegative = priceDiff < 0

  return {
    changeValue: `${isNegative ? priceDiff.toFixed(2) : `+${priceDiff.toFixed(2)}`}%`,
    numberChange: `${isNegative ? newPrice - lastPrice : `+${newPrice - lastPrice}`}`,
  }
}
