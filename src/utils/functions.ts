export function titleToUrl(title: string): string {
  return title.toLowerCase().replace(/ /g, "-");
}
