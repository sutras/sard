export function kebabCase(str: string) {
  return str
    .replace(/[A-Z]/g, (m) => {
      return '-' + m.toLowerCase()
    })
    .replace(/^-/, '')
}
