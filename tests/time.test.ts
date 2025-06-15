import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { isValidCustomDateFormat, isValidDate, isValidDateTime, isValidTimestamp, normalizeTime, timestamp } from '../src/time'
import { timeAgo } from '../src/time/time-ago'

describe('date', () => {
  it('timestamp', () => {
    expect(timestamp()).toBeTypeOf('number')
  })

  describe('isValidTimestamp', () => {
    it('有效Unix时间戳（秒级）', () => {
      expect(isValidTimestamp(1630425600)).toBe(true)
    })

    it('有效Unix时间戳（毫秒级）', () => {
      expect(isValidTimestamp(1630425600000)).toBe(true)
    })

    it('有效时间戳字符串（秒级）', () => {
      expect(isValidTimestamp('1630425600')).toBe(true)
    })

    it('有效时间戳字符串（毫秒级）', () => {
      expect(isValidTimestamp('1630425600000')).toBe(true)
    })

    // 无效时间戳测试用例
    it('非数字字符串', () => {
      expect(isValidTimestamp('abc')).toBe(false)
    })

    it('浮点数', () => {
      expect(isValidTimestamp(1630425600.5)).toBe(false)
    })

    it('naN', () => {
      expect(isValidTimestamp(Number.NaN)).toBe(false)
    })

    it('infinity', () => {
      expect(isValidTimestamp(Infinity)).toBe(false)
    })

    it('负数时间戳', () => {
      expect(isValidTimestamp(-1000)).toBe(false)
    })

    it('超出范围的时间戳', () => {
      expect(isValidTimestamp(32503680000000)).toBe(false)
    })

    it('无效日期转换的时间戳', () => {
      expect(isValidTimestamp(21474836470000)).toBe(false)
    })
  })

  describe('isValidDateTime', () => {
    // 有效日期时间测试用例
    it('有效ISO格式日期字符串', () => {
      expect(isValidDateTime('2021-09-01T00:00:00Z')).toBe(true)
    })

    it('有效普通日期字符串', () => {
      expect(isValidDateTime('2021-09-01')).toBe(true)
    })

    it('有效中文日期字符串', () => {
      expect(isValidDateTime('2021年9月1日')).toBe(true)
    })

    it('有效Date对象', () => {
      expect(isValidDateTime(new Date())).toBe(true)
    })

    // 无效日期时间测试用例
    it('无效日期字符串', () => {
      expect(isValidDateTime('2021-13-01')).toBe(false)
    })

    it('无效格式字符串', () => {
      expect(isValidDateTime('abc')).toBe(false)
    })

    it('无效Date对象', () => {
      expect(isValidDateTime(new Date('invalid'))).toBe(false)
    })
  })

  describe('isValidDate', () => {
    it('平年日期验证', () => {
      expect(isValidDate(2021, 1, 31)).toBe(true) // 1月有31天
      expect(isValidDate(2021, 2, 28)).toBe(true) // 平年2月28天
      expect(isValidDate(2021, 2, 29)).toBe(false) // 平年2月没有29天
      expect(isValidDate(2021, 4, 30)).toBe(true) // 4月有30天
      expect(isValidDate(2021, 4, 31)).toBe(false) // 4月没有31天
    })

    it('闰年日期验证', () => {
      expect(isValidDate(2024, 2, 29)).toBe(true) // 闰年2月29天
      expect(isValidDate(2000, 2, 29)).toBe(true) // 世纪闰年
      expect(isValidDate(1900, 2, 29)).toBe(false) // 非闰年
    })

    it('月份范围验证', () => {
      expect(isValidDate(2021, 0, 1)).toBe(false) // 月份不能为0
      expect(isValidDate(2021, 13, 1)).toBe(false) // 月份不能超过12
    })

    it('日期范围验证', () => {
      expect(isValidDate(2021, 1, 0)).toBe(false) // 日期不能为0
      expect(isValidDate(2021, 1, 32)).toBe(false) // 日期不能超过当月最大值
    })
  })

  describe('isValidCustomDateFormat', () => {
    it('标准中文日期格式', () => {
      expect(isValidCustomDateFormat('2021年9月1日')).toBe(true)
      expect(isValidCustomDateFormat('2024年2月29日')).toBe(true) // 闰年
    })

    it('非中文日期格式', () => {
      expect(isValidCustomDateFormat('2021-09-01')).toBe(false)
      expect(isValidCustomDateFormat('2021/09/01')).toBe(false)
      expect(isValidCustomDateFormat('Sep 1, 2021')).toBe(false)
    })

    it('格式不完整', () => {
      expect(isValidCustomDateFormat('2021年9月')).toBe(false)
      expect(isValidCustomDateFormat('2021年')).toBe(false)
      expect(isValidCustomDateFormat('9月1日')).toBe(false)
    })

    it('非法字符', () => {
      expect(isValidCustomDateFormat('2021年9月1日 ')).toBe(false) // 尾部空格
      expect(isValidCustomDateFormat(' 2021年9月1日')).toBe(false) // 前导空格
      expect(isValidCustomDateFormat('2021年9月1日a')).toBe(false) // 额外字符
    })

    it('前导零处理', () => {
      expect(isValidCustomDateFormat('2021年09月01日')).toBe(true)
    })
  })

  describe('timeAgo', () => {
    // 固定当前时间，确保测试结果稳定
    const now = new Date('2023-01-01T12:00:00Z').getTime()

    beforeEach(() => {
      // 每次测试前设置当前时间
      vi.useFakeTimers().setSystemTime(now)
    })

    afterEach(() => {
      // 恢复真实时间
      vi.useRealTimers()
    })

    // 测试时间戳输入
    it('测试时间戳输入', () => {
      // 刚刚
      expect(timeAgo(now - 30000)).toBe('刚刚')
      // 马上
      expect(timeAgo(now + 30000)).toBe('马上')
      // 分钟前
      expect(timeAgo(now - 120000)).toBe('2分钟前')
      // 小时后
      expect(timeAgo(now + 7200000)).toBe('2小时后')
      // 天前
      expect(timeAgo(now - 172800000)).toBe('2天前')
      // 月后
      expect(timeAgo(now + 5184000000)).toBe('2月后')
      // 年前
      expect(timeAgo(now - 63072000000)).toBe('2年前')
    })

    // 测试 Date 对象输入
    it('测试 Date 对象输入', () => {
      expect(timeAgo(new Date(now - 30000))).toBe('刚刚')
      expect(timeAgo(new Date(now + 7200000))).toBe('2小时后')
    })

    // 测试 ISO 字符串输入
    it('测试 ISO 字符串输入', () => {
      const pastTime = new Date(now - 120000).toISOString()
      const futureTime = new Date(now + 172800000).toISOString()

      expect(timeAgo(pastTime)).toBe('2分钟前')
      expect(timeAgo(futureTime)).toBe('2天后')
    })

    // 测试自定义当前时间
    it('测试自定义当前时间', () => {
      const customNow = now + 3600000 // 当前时间 + 1小时

      expect(timeAgo(now, customNow)).toBe('1小时前')
      expect(timeAgo(customNow + 120000, customNow)).toBe('2分钟后')
    })

    // 测试无效输入
    it('测试无效输入', () => {
      // @ts-expect-error 测试错误类型
      expect(timeAgo(null)).toBe('未知时间')
      // 测试错误类型
      expect(timeAgo('invalid-date')).toBe('未知时间')
      // @ts-expect-error 测试错误类型
      expect(timeAgo({})).toBe('未知时间')
    })

    // 测试边界情况
    it('测试边界情况', () => {
      // 59秒前
      expect(timeAgo(now - 59000)).toBe('刚刚')
      // 59秒后
      expect(timeAgo(now + 59000)).toBe('马上')
      // 1分钟整
      expect(timeAgo(now - 60000)).toBe('1分钟前')
      // 接近1小时
      expect(timeAgo(now - 3599000)).toBe('59分钟前')
      // 1小时整
      expect(timeAgo(now - 3600000)).toBe('1小时前')
    })
  })

  describe('normalizeTime', () => {
    it('测试时间戳输入', () => {
      expect(normalizeTime(1672531200000)).toBe('2023-01-01T00:00:00.000Z')
    })

    it('测试日期字符串输入', () => {
      expect(normalizeTime('2023-01-01')).toBe('2023-01-01T00:00:00.000Z')
    })

    it('测试日期对象输入', () => {
      expect(normalizeTime(new Date('2023-01-01T12:00:00.000Z'))).toBe('2023-01-01T12:00:00.000Z')
    })

    it('测试ISO字符串输入', () => {
      expect(normalizeTime('2023-01-01T12:00:00.000Z')).toBe('2023-01-01T12:00:00.000Z')
    })

    it('测试时区转换', () => {
      expect(normalizeTime('2023-01-01T12:00:00.000Z', { timezone: 'Asia/Shanghai' })).toBe('2023-01-01T20:00:00.000Z')
    })

    it('测试格式转换', () => {
      expect(normalizeTime('2023-01-01T12:00:00.000Z', { format: 'timestamp' })).toBe(1672574400000)
    })

    it('测试无效输入', () => {
      // @ts-expect-error 测试错误类型 null
      expect(() => normalizeTime(null)).toThrow('Unsupported time type: object')
      expect(() => normalizeTime('invalid-date')).toThrow('Invalid date: invalid-date')
      // @ts-expect-error 测试错误类型 object
      expect(() => normalizeTime({})).toThrow('Unsupported time type: object')
    })
  })
})
