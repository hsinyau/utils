/**
 * 数字补零函数
 * @param num - 待补零的数字
 * @param length - 补零后的长度
 * @param direction - 补零方向，默认从开始补零
 * @example
 * ```ts
 * padZero(12345, 10) // '0000012345'
 * padZero(12345, 10, 'end') // '1234500000'
 * ```
 * @returns 补零后的字符串
 */
export function padZero(num: number, length: number = 2, direction: 'start' | 'end' = 'start'): string {
  const str = num.toString()
  if (direction === 'start') {
    return str.padStart(length, '0')
  }
  return str.padEnd(length, '0')
}
