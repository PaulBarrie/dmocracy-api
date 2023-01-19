export function queryParamsToNumber(queryParam: any, defaultValue: number): number {
  const parsed = Number.parseInt(String(queryParam));
  return Number.isNaN(parsed) ? defaultValue : parsed;
}