import { isValidCustomDateFormat } from './is-valid-custom-date-format'

/**
 * 检查输入是否为有效日期时间格式
 * @param value 待检查的值，可以是日期对象或字符串
 * @example
 * ```ts
 * isValidDateTime(new Date()) // true
 * isValidDateTime('2025-06-14T00:00:00.000Z') // true
 * isValidDateTime('2025-06-14') // false
 * ```
 * @returns 是否为有效日期时间
 */
export function isValidDateTime(value: any): boolean {
  // 处理日期对象
  if (value instanceof Date) {
    return !Number.isNaN(value.getTime())
  }

  // 处理字符串
  if (typeof value === 'string') {
    // 尝试解析字符串为日期
    const date = new Date(value)

    // 检查解析结果是否有效
    if (!Number.isNaN(date.getTime())) {
      return true
    }

    // 尝试自定义格式解析（如中文日期格式）
    return isValidCustomDateFormat(value)
  }

  // 其他类型返回false
  return false
}
