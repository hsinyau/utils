/**
 * 将反斜杠替换为斜杠
 *
 * @param str - 需要替换的字符串
 * @example
 * ```ts
 * slash('\\hello') // '/hello'
 * slash('\\a\\b\\c') // '/a/b/c'
 * ```
 * @category String
 */
export function slash(str: string): string {
  return str.replace(/\\/g, '/')
}

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

export function randomString(size: number = 16, dict: string = DEFAULT_DICT): string {
  const len = dict.length
  return Array.from(
    { length: size },
    () => dict[Math.floor(Math.random() * len)],
  ).join('')
}

/**
 * 确保字符串以指定前缀开头
 *
 * @param prefix - 前缀
 * @param str - 需要转换的字符串
 * @example
 * ```ts
 * ensurePrefix('https://', 'www.google.com') // 'https://www.google.com'
 * ensurePrefix('https://', 'https://www.google.com') // 'https://www.google.com'
 * ```
 * @category String
 */
export function ensurePrefix(prefix: string, str: string): string {
  if (!str.startsWith(prefix))
    return prefix + str
  return str
}

/**
 * 确保字符串以指定后缀结尾
 *
 * @param suffix - 后缀
 * @param str - 需要转换的字符串
 * @example
 * ```ts
 * ensureSuffix('.png', 'example') // 'example.png'
 * ensureSuffix('.png', 'example.png') // 'example.png'
 * ```
 * @category String
 */
export function ensureSuffix(suffix: string, str: string): string {
  if (!str.endsWith(suffix))
    return str + suffix
  return str
}

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
