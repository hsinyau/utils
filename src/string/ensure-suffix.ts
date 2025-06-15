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
