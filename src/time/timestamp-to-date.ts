import { padZero } from '../string/pad-zero'
import { isValidTimestamp } from './is-valid-timestamp'

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
