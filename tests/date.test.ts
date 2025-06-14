import { describe, expect, it } from 'vitest'
import { isValidCustomDateFormat, isValidDate, isValidDateTime, isValidTimestamp, timestamp } from '../src/time'

describe('date', () => {
  it('timestamp', () => {
    expect(timestamp()).toBe(Date.now())
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
})
