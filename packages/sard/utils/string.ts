function splitWord(string: string) {
  return string
    .split(/[^a-zA-Z0-9$]+/)
    .map((item) => item.split(/([A-Z][^A-Z]*)/))
    .flat()
    .filter(Boolean)
}

/**
 * 将字符串首字母转换为小写格式。
 */
export function lowerFirst(string: string) {
  return string.replace(/^[A-Z]/, (m) => m.toLowerCase())
}

/**
 * 将字符串首字母转换为大写格式。
 */
export function upperFirst(string: string) {
  return string.replace(/^[a-z]/, (m) => m.toUpperCase())
}

/**
 * 将字符串转换为 PascalCase 格式（大驼峰）。
 */
export function pascalCase(string: string) {
  return splitWord(string)
    .map((word) => upperFirst(word.toLowerCase()))
    .join('')
}

/**
 * 将字符串转换为 camelCase 格式（小驼峰）。
 */
export function camelCase(string: string) {
  return lowerFirst(pascalCase(string))
}

/**
 * 将字符串转换为 Capitalize 格式（首字母大写，其余小写）。
 */
export function capitalize(string: string) {
  return upperFirst(string.toLowerCase())
}

/**
 * 将字符串转换为 kebab-case 格式（使用连字符拼接单词）。
 */
export function kebabCase(string: string) {
  return splitWord(string)
    .map((item) => item.toLowerCase())
    .join('-')
}

/**
 * 将字符串转换为 snake_case 格式（使用下划线拼接单词）。
 */
export function snakeCase(string: string) {
  return splitWord(string)
    .map((item) => item.toLowerCase())
    .join('_')
}

/**
 * 每n位数字添加一个分隔符
 */
export function addSeparator(num: number | string, separator = ',', digit = 3) {
  return String(num).replace(new RegExp(`\\B(?=(\\d{${digit}})+(?!\\d))`, 'g'), separator)
}

/**
 * 生成唯一ID，可作为元素选择器，或者用于表示全局唯一字符串，仅限于当前应用生命周期
 */
let counter = 0
const uid = 'sard-' + (~~(Math.random() * 10e8)).toString(36)
export function uniqid(): string {
  return uid + '-' + (++counter).toString(36)
}

/**
 * 判断是否为韩文字符
 */
export function isKorean(text: string) {
  return /([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(text)
}
