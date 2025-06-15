import { normalizeTime } from './normalize-time'
import { timestamp } from './timestamp'

/**
 * 将各种时间格式转换为相对时间字符串（刚刚、xx前、xx后）
 * @param time 时间表示，可以是时间戳（毫秒）、日期对象、ISO字符串等
 * @param currentTime 当前时间，可选，默认为当前时间
 * @returns 相对时间字符串
 */
export function timeAgo(
  time: number | Date | string,
  currentTime: number | Date | string = timestamp(),
): string {
  try {
    // 标准化输入时间为毫秒时间戳
    const targetTime = Number(normalizeTime(time, { format: 'timestamp' }))
    const now = Number(normalizeTime(currentTime, { format: 'timestamp' }))

    // 计算时间差（秒）
    const diff = (targetTime - now) / 1000

    // 时间单位及其对应的秒数和显示格式
    const units: [number, string, string][] = [
      [60, '刚刚', '马上'],
      [3600, '分钟', '分钟'],
      [86400, '小时', '小时'],
      [2592000, '天', '天'],
      [31536000, '月', '月'],
      [Infinity, '年', '年'],
    ]

    // 查找合适的时间单位
    for (let i = 0; i < units.length; i++) {
      const [threshold, pastUnit, futureUnit] = units[i]

      if (Math.abs(diff) < threshold) {
        // 特殊处理小于1分钟的情况
        if (i === 0)
          return diff >= 0 ? futureUnit : pastUnit

        // 计算具体时间
        const value = Math.floor(Math.abs(diff) / (units[i - 1][0] || 1))

        // 根据时间差的正负决定使用"前"还是"后"
        return diff >= 0
          ? `${value}${futureUnit}后`
          : `${value}${pastUnit}前`
      }
    }

    // 默认返回
    return '很久之前'
  }
  catch (error) {
    console.error('Error formatting relative time:', error)
    return '未知时间'
  }
}
