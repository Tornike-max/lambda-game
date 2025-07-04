export function formatUSD(value: number | string) {
  const numValue = typeof value === "string" ? Number(value) : value;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(numValue);
}

export function formatMultiplier(multiplier: number): string {
  return `${multiplier.toFixed(2)}x`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}