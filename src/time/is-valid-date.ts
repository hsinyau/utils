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
