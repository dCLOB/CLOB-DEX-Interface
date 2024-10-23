export const formatDecimal = (value: number | bigint | `${number}`) =>
  Intl.NumberFormat("en-US", {
    maximumFractionDigits: 6,
  }).format(value);
