// ./src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from './i18n-config'

// 获取用户语言偏好
function getLocale(request: NextRequest): string {
  // 获取请求头中的 accept-language 字段
  const acceptLanguage = request.headers.get('accept-language')
  const languages = acceptLanguage ? acceptLanguage.split(',') : []
  // 可用的语言列表
  const locales: string[] = i18n.locales as unknown as string[]

  // 开始匹配语言
  for (const lang of languages) {
    const language = lang.split(';')[0].trim().toLowerCase(); // 处理优先级，提取语言代码
    if (locales.includes(language)) {
      return language;
    }
  }
  
  // 未匹配上，返回默认语言
  return i18n.defaultLocale;
}

// 中间件
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  // 检查路径是否缺少语言前缀
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // 无语言前缀，重定向
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }
}

// 配置中间件的匹配规则
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // 排除 API 请求和静态文件
}