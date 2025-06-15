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
