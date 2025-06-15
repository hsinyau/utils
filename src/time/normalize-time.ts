/**
 * 将时间规范化为标准 ISO 格式字符串
 * @param time - 要规范化的时间，可以是日期字符串、时间戳或 Date 对象
 * @param options - 可选配置项
 * @param options.timezone - 目标时区，默认为 UTC
 * @param options.format - 输出格式，支持 'iso' 或 'timestamp'，默认为 'iso'
 * @returns 规范化后的时间字符串或时间戳
 */
export function normalizeTime(
  time: string | number | Date,
  options: {
    timezone?: string
    format?: 'iso' | 'timestamp'
  } = {},
): string | number {
  const { timezone = 'UTC', format = 'iso' } = options
  let date: Date

  // 处理不同类型的输入
  if (typeof time === 'string') {
    // 处理 ISO 格式字符串
    if (time.includes('T') || time.includes(' ')) {
      // 直接使用 Date 解析 ISO 字符串
      date = new Date(time)
    }
    // 处理其他格式的日期字符串（如 'YYYY-MM-DD'）
    else {
      try {
        // 明确指定为 UTC 日期
        date = new Date(`${time}T00:00:00Z`)
      }
      catch {
        throw new Error(`Invalid date string: ${time}`)
      }
    }
  }
  // 处理时间戳
  else if (typeof time === 'number') {
    // 直接从时间戳创建 Date 对象
    date = new Date(time)
  }
  // 处理 Date 对象
  else if (time instanceof Date) {
    date = time
  }
  else {
    throw new TypeError(`Unsupported time type: ${typeof time}`)
  }

  // 验证日期是否有效
  if (Number.isNaN(date.getTime())) {
    throw new TypeError(`Invalid date: ${time}`)
  }

  // 根据时区调整时间
  if (timezone !== 'UTC') {
    try {
      // 使用 Intl.DateTimeFormat 获取指定时区的时间部分
      const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: timezone,
        hour12: false,
      })

      // 提取格式化后的日期部分
      const parts = formatter.formatToParts(date)
      const year = parts.find(p => p.type === 'year')?.value || ''
      const month = parts.find(p => p.type === 'month')?.value || ''
      const day = parts.find(p => p.type === 'day')?.value || ''
      const hour = parts.find(p => p.type === 'hour')?.value || ''
      const minute = parts.find(p => p.type === 'minute')?.value || ''
      const second = parts.find(p => p.type === 'second')?.value || ''

      // 构建新的 UTC 时间
      const adjustedDate = new Date(
        Date.UTC(
          Number.parseInt(year, 10),
          Number.parseInt(month, 10) - 1,
          Number.parseInt(day, 10),
          Number.parseInt(hour, 10),
          Number.parseInt(minute, 10),
          Number.parseInt(second, 10),
        ),
      )

      date = adjustedDate
    }
    catch (error) {
      console.warn(`Failed to adjust timezone to ${timezone}, using UTC. Error:`, error)
      // 时区转换失败时，默认为 UTC
    }
  }

  // 根据指定格式返回结果
  if (format === 'timestamp') {
    return date.getTime()
  }

  // 返回 ISO 格式字符串
  return date.toISOString()
}
