import LocaleSwitcher from '@/components/locale-switcher'
import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import { Metadata } from 'next'

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale }
}) {

  const t = await getDictionary(lang)

  return (
    <div style={{ padding: 24 }}>
      <main>
        <h1>
          {t('title')}
        </h1>
        <p>
          {t('description')}
        </p>
        <p>
          {t('welcome to {posi}, {name}', { posi: 'Next.js', name: 'Cooyue' })}
        </p>
        <p>
          {t('这是不存在翻译的文本，本页面已接入 webhook !?!?')}
        </p>
        <LocaleSwitcher />
      </main>
    </div>
  )
}

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale }
}): Promise<Metadata> {

  const t = await getDictionary(lang)

  return {
    title: t('title'),
    description: t('description')
  }
}