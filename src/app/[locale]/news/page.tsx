import PressRoomSection from '@/components/sections/PressRoomSection';
import { HoldingNewsItem } from '@/components/sections/NewsGridClient';

const HOLDING_API_URL =
  process.env.NEXT_PUBLIC_HOLDING_API_URL || 'https://surkit.com.tr';

async function getHoldingNews(locale: string): Promise<HoldingNewsItem[] | null> {
  try {
    const res = await fetch(`${HOLDING_API_URL}/api/news?lang=${locale}`, {
      next: { revalidate: 300 },
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.success && Array.isArray(data.news) && data.news.length > 0) {
        return data.news;
      }
    }

    if (HOLDING_API_URL !== 'https://surkit.com.tr') {
      const fallbackRes = await fetch(`https://surkit.com.tr/api/news?lang=${locale}`, {
        next: { revalidate: 300 },
      });
      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json();
        if (fallbackData && fallbackData.success && Array.isArray(fallbackData.news)) {
          return fallbackData.news;
        }
      }
    }

    return null;
  } catch (err) {
    try {
      const liveRes = await fetch(`https://surkit.com.tr/api/news?lang=${locale}`);
      if (liveRes.ok) {
        const liveData = await liveRes.json();
        if (liveData && liveData.success && Array.isArray(liveData.news)) {
          return liveData.news;
        }
      }
    } catch (e) {}
    return null;
  }
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const apiNews = await getHoldingNews(locale);

  return <PressRoomSection apiNews={apiNews} />;
}
