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
