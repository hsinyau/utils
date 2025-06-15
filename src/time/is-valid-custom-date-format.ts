import { isValidDate } from './is-valid-date'

/**
 * 验证自定义日期格式（如中文日期）
 * @param value 待检查的日期字符串
 * @example
 * ```ts
 * isValidCustomDateFormat('2025年6月15日') // true
 * isValidCustomDateFormat('2025-06-15') // false
 * ```
 * @returns 是否为有效日期
 */
export function isValidCustomDateFormat(value: string): boolean {
  // 匹配中文日期格式：YYYY年MM月DD日
  const chineseDatePattern = /^\d{4}年\d{1,2}月\d{1,2}日$/

  if (!chineseDatePattern.test(value)) {
    return false
  }

  // 提取年、月、日
  const year = Number.parseInt(value.substring(0, 4))
  const month = Number.parseInt(value.substring(5, value.indexOf('月')))
  const day = Number.parseInt(value.substring(value.indexOf('月') + 1, value.indexOf('日')))

  // 验证日期有效性
  return isValidDate(year, month, day)
}
