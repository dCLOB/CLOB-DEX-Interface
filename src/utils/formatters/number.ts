export const formatDecimal = (value: number | bigint | `${number}`, minDigits = 2, maxDigits = 2) =>
  Intl.NumberFormat("en-US", {
    minimumFractionDigits: minDigits,
    maximumFractionDigits: maxDigits,
    roundingMode: "floor",
  }).format(value);
