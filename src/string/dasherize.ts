import { underscored } from './underscored'

/**
 * 转换驼峰形式至 "-" 分割形式
 * @param {string} str 原始字符串
 * @returns {string} camel-case 形式
 */
export function dasherize(str: string): string {
  return underscored(str).replace(/_/g, '-')
}
