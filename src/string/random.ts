const DEFAULT_DICT = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'

/**
 * 生成随机字符串
 *
 * @param size - 字符串长度
 * @param dict - 字符集 - 默认使用 nanoid 的字符集
 * @example
 * ```ts
 * randomString(16) // '9aXMo5NadcPvfA1b09M7p8kgNJ8DrWBa'
 * ```
 * @category String
 */

export function random(size: number = 16, dict: string = DEFAULT_DICT): string {
  const len = dict.length
  return Array.from(
    { length: size },
    () => dict[Math.floor(Math.random() * len)],
  ).join('')
}
