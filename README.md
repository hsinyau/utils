# @hsinyau/utils

一个现代化的自用 TypeScript 工具函数库。

## ✨ 特性

- 🚀 **现代化**: 使用 TypeScript 编写，支持 ESM
- 📦 **轻量级**: 零依赖（除了 React 相关工具）
- 🎯 **类型安全**: 完整的 TypeScript 类型定义
- 🧪 **测试覆盖**: 使用 Vitest 进行单元测试
- 📚 **文档完善**: 详细的 JSDoc 注释和使用示例

## 📦 安装

```bash
npm install @hsinyau/utils
# 或
yarn add @hsinyau/utils
# 或
pnpm add @hsinyau/utils
```

## 🚀 快速开始

```typescript
import { camelize, cn, timeAgo } from '@hsinyau/utils'

// 字符串处理
camelize('foo-bar') // 'fooBar'

// 时间处理
timeAgo(new Date('2024-01-01')) // '3个月前'

// React 工具
cn('text-red-500', 'bg-blue-500') // 合并 Tailwind CSS 类名
```

## 📚 API 文档

### 字符串工具 (String Utils)

#### `camelize(str: string): string`
将下划线或连字符分隔的字符串转换为驼峰命名。

```typescript
import { camelize } from '@hsinyau/utils'

camelize('foo-bar') // 'fooBar'
camelize('foo_bar') // 'fooBar'
camelize('fooBar') // 'fooBar'
```

#### `dasherize(str: string): string`
将驼峰命名转换为连字符分隔的形式。

```typescript
import { dasherize } from '@hsinyau/utils'

dasherize('fooBar') // 'foo-bar'
dasherize('fooBarBaz') // 'foo-bar-baz'
```

#### `underscored(str: string): string`
将驼峰命名转换为下划线分隔的形式。

```typescript
import { underscored } from '@hsinyau/utils'

underscored('fooBar') // 'foo_bar'
underscored('fooBarBaz') // 'foo_bar_baz'
```

#### `random(size?: number, dict?: string): string`
生成指定长度的随机字符串。

```typescript
import { random } from '@hsinyau/utils'

random(16) // '9aXMo5NadcPvfA1b'
random(8, 'abc_-123') // 'c_13-2ac'
```

#### `ensurePrefix(prefix: string, str: string): string`
确保字符串以指定前缀开头。

```typescript
import { ensurePrefix } from '@hsinyau/utils'

ensurePrefix('http://', 'www.google.com') // 'http://www.google.com'
ensurePrefix('https://', 'https://www.google.com') // 'https://www.google.com'
```

#### `ensureSuffix(suffix: string, str: string): string`
确保字符串以指定后缀结尾。

```typescript
import { ensureSuffix } from '@hsinyau/utils'

ensureSuffix('.png', 'example') // 'example.png'
ensureSuffix('.png', 'example.png') // 'example.png'
```

#### `padZero(num: number, length: number, position?: 'start' | 'end'): string`
用零填充数字到指定长度。

```typescript
import { padZero } from '@hsinyau/utils'

padZero(13579, 10) // '0000013579'
padZero(13579, 8, 'end') // '13579000'
```

#### `slash(str: string): string`
将反斜杠转换为正斜杠。

```typescript
import { slash } from '@hsinyau/utils'

slash('\\a\\b\\c') // '/a/b/c'
```

### 时间工具 (Time Utils)

#### `timeAgo(time: number | Date | string, currentTime?: number | Date | string): string`
将时间转换为相对时间字符串（如"3分钟前"）。

```typescript
import { timeAgo } from '@hsinyau/utils'

timeAgo(new Date('2024-01-01')) // '3个月前'
timeAgo(Date.now() - 60000) // '1分钟前'
timeAgo(Date.now() + 3600000) // '1小时后'
```

#### `timestamp(): number`
获取当前时间戳。

```typescript
import { timestamp } from '@hsinyau/utils'

timestamp() // 1718332800000
```

#### `isValidDate(date: any): boolean`
检查是否为有效的日期。

```typescript
import { isValidDate } from '@hsinyau/utils'

isValidDate(new Date()) // true
isValidDate('invalid') // false
```

#### `isValidTimestamp(timestamp: any): boolean`
检查是否为有效的时间戳。

```typescript
import { isValidTimestamp } from '@hsinyau/utils'

isValidTimestamp(Date.now()) // true
isValidTimestamp('invalid') // false
```

#### `normalizeTime(time: any, options?: NormalizeTimeOptions): string | number | Date`
标准化时间格式。

```typescript
import { normalizeTime } from '@hsinyau/utils'

normalizeTime('2024-01-01', { format: 'timestamp' }) // 1704067200000
normalizeTime(1704067200000, { format: 'date' }) // '2024-01-01T00:00:00.000Z'
```

### React 工具 (React Utils)

#### `cn(...inputs: ClassValue[]): string`
合并 CSS 类名，支持 Tailwind CSS 类名去重。

```typescript
import { cn } from '@hsinyau/utils'

cn('text-red-500', 'bg-blue-500') // 'text-red-500 bg-blue-500'
cn('text-red-500', 'text-blue-500') // 'text-blue-500' (后面的覆盖前面的)
```

## 🛠️ 开发

### 环境要求

- Node.js >= 20.18.0
- pnpm >= 10.11.0

### 安装依赖

```bash
pnpm install
```

### 开发命令

```bash
# 构建
pnpm build

# 开发模式（监听文件变化）
pnpm dev

# 运行测试
pnpm test

# 类型检查
pnpm typecheck

# 代码检查
pnpm lint

# 代码检查并自动修复
pnpm lint:fix
```

### 发布

```bash
pnpm release
```

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件
