import { padZero } from './string'

/**
 * 获取当前时间戳
 *
 * @example
 * ```ts
 * timestamp() // 1718332800000
 * ```
 * @category Time
 * @returns 当前时间戳
 */
export const timestamp = (): number => +Date.now()

/**
 * 检查输入是否为有效的时间戳
 * @param value - 待检查的值，可以是数字或字符串
 * @example
 * ```ts
 * isValidTimestamp(1718332800000) // true
 * isValidTimestamp('1718332800000') // true
 * isValidTimestamp('2025-06-14T00:00:00.000Z') // false
 * ```
 * @returns 如果是有效时间戳返回true，否则返回false
 */
export function isValidTimestamp(value: any): boolean {
  // 检查是否为数字类型或可转换为数字的字符串
  const numValue = typeof value === 'string' ? Number(value) : value

  // 检查是否为NaN
  if (Number.isNaN(numValue)) {
    return false
  }

  // 检查是否为有限数字
  if (!Number.isFinite(numValue)) {
    return false
  }

  // 检查是否为整数
  if (!Number.isInteger(numValue)) {
    return false
  }

  // 检查时间戳范围（1970-2099年之间）
  const date = new Date(numValue)
  const timestamp = date.getTime()

  // 验证转换后的时间戳是否与原始值一致（处理无效日期）
  if (Number.isNaN(timestamp)) {
    return false
  }

  // 检查时间戳范围（自定义合理范围）
  const minTimestamp = new Date('1970-01-01').getTime()
  const maxTimestamp = new Date('2099-12-31').getTime()

  return timestamp >= minTimestamp && timestamp <= maxTimestamp
}

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

/**
 * 验证年、月、日组合是否为有效日期
 * @param year 年份
 * @param month 月份 (1-12)
 * @param day 日期
 * @example
 * ```ts
 * isValidDate(2025, 6, 15) // true
 * isValidDate(2025, 13, 15) // false
 * ```
 * @returns 是否为有效日期
 */
export function isValidDate(year: number, month: number, day: number): boolean {
  // 检查月份范围
  if (month < 1 || month > 12) {
    return false
  }

  // 检查日期范围（考虑每月天数不同以及闰年）
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  // 闰年判断
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    daysInMonth[1] = 29 // 闰年2月有29天
  }

  return day >= 1 && day <= daysInMonth[month - 1]
}

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

/**
 * 将时间戳转换为指定格式的日期字符串
 * @param timestamp - 时间戳（秒级或毫秒级）
 * @param format - 输出格式，支持YYYY、MM、DD、HH、mm、ss等占位符
 * @param isMillisecond - 是否为毫秒级时间戳，默认为true
 * @returns 格式化后的日期字符串，失败时返回原始时间戳
 */
export function timestampToDate(
  timestamp: number | string,
  format = 'YYYY-MM-DD HH:mm:ss',
  isMillisecond = true,
): string {
  try {
    // 转换为数字类型
    const numTimestamp = typeof timestamp === 'string'
      ? Number(timestamp)
      : timestamp

    // 验证时间戳有效性
    if (!isValidTimestamp(numTimestamp)) {
      throw new Error(`无效的时间戳: ${timestamp}`)
    }

    // 转换为毫秒级时间戳
    const msTimestamp = isMillisecond
      ? numTimestamp
      : numTimestamp * 1000

    // 创建Date对象
    const date = new Date(msTimestamp)

    // 格式化日期
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    // 替换格式占位符
    let formattedDate = format
    formattedDate = formattedDate.replace('YYYY', year.toString())
    formattedDate = formattedDate.replace('MM', padZero(month, 2))
    formattedDate = formattedDate.replace('DD', padZero(day, 2))
    formattedDate = formattedDate.replace('HH', padZero(hour, 2))
    formattedDate = formattedDate.replace('mm', padZero(minute, 2))
    formattedDate = formattedDate.replace('ss', padZero(second, 2))

    return formattedDate
  }
  catch (error) {
    console.error('转换失败:', error)
    return timestamp.toString()
  }
}
