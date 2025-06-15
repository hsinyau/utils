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
