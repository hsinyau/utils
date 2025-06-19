/**
 * 转换 _ 或 - 为驼峰形式
 * @param {string} str 原始字符串
 * @example
 * camelize('foo-bar') // 'fooBar'
 * camelize('foo_bar') // 'fooBar'
 * camelize('fooBar') // 'fooBar'
 * @returns {string} CamelCase 形式
 */
export function camelize(str: string): string {
  if (!str.includes('-') && !str.includes('_')) {
    return str
  }
  return str.replace(/[-_][^-_]/g, match => match.charAt(1).toUpperCase())
}
