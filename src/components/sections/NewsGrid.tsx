import NewsGridClient, { HoldingNewsItem } from './NewsGridClient';

const HOLDING_API_URL =
  process.env.NEXT_PUBLIC_HOLDING_API_URL ||
  (process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://surkit.com.tr');

async function getHoldingNews(locale: string): Promise<HoldingNewsItem[] | null> {
  try {
    const revalidateTime = process.env.NODE_ENV === 'development' ? 0 : 900;
    const res = await fetch(`${HOLDING_API_URL}/api/news?lang=${locale}`, {
      next: { revalidate: revalidateTime },
      cache: process.env.NODE_ENV === 'development' ? 'no-store' : undefined,
    });

    if (!res.ok) return null;
    const data = await res.json();

    if (data && data.success && Array.isArray(data.news) && data.news.length > 0) {
      return data.news;
    }
    return null;
  } catch (err) {
    return null;
  }
}

export default async function NewsGrid({ locale = 'tr' }: { locale?: string }) {
  const apiNews = await getHoldingNews(locale);
  return <NewsGridClient apiNews={apiNews} locale={locale} />;
}
