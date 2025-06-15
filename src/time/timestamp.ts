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
