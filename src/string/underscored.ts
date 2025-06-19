/**
 * 转换驼峰形式至 "_" 分割形式
 * @param {string} str 原始字符串
 * @example
 * underscored('fooBar') // 'foo_bar'
 * underscored('fooBarBaz') // 'foo_bar_baz'
 * @returns {string} camel_case 形式
 */
export function underscored(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase()
}
