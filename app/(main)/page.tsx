import { Hero } from "../components/Hero";
import { Sidebar } from "../components/Sidebar";
import { EventBanner } from "../components/BannerEvent";
import { LatestNewsSection } from "../components/article/LatestNewsSection";
import { InfiniteScrollArticles } from "../components/InfiniteScrollArticles";
import { FeaturedRow } from "../components/FeaturedRow";
import {
  getAllArticles,
  getTrendingItems,
  getUpcomingEvents,
} from "../lib/api";
import { ArticleFeed } from "../components/ArticleFeed";
import SliderNewsWrapper from "../components/slider/SliderNewsWrapper";

export default async function HomePage() {
  const [allArticles, trendingItems, upcomingEvents] = await Promise.all([
    getAllArticles(),
    getTrendingItems(),
    getUpcomingEvents(),
  ]);

  const featuredArticle = (allArticles ?? []).find((a) => a.featured);
  const allNonFeatured = (allArticles ?? []).filter((a) => !a.featured);

  const heroSidebarArticles = allNonFeatured.slice(0, 4);
  const featuredRowArticles = allNonFeatured.slice(4, 8);
  const initialLatestArticles = allNonFeatured.slice(8, 13);

  const latestArticles = allNonFeatured.slice(8, 13);
  const recommendationArticles = allNonFeatured.slice(13, 20);
  const dynamicLoadArticles = allNonFeatured.slice(20);

  return (
    <>
      <Hero featuredArticle={featuredArticle} articles={heroSidebarArticles} />

      <FeaturedRow articles={featuredRowArticles} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <EventBanner events={upcomingEvents ?? []} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-12">
            <LatestNewsSection
              title="Berita Terbaru"
              articles={latestArticles}
            />
            <SliderNewsWrapper articles={recommendationArticles} title="Rekomendasi" />
            <InfiniteScrollArticles articlesToLoad={dynamicLoadArticles} />
            <ArticleFeed
              initialArticles={initialLatestArticles}
              articlesToLoad={dynamicLoadArticles}
            />
          </div>

          <div className="lg:col-span-1">
            <Sidebar
              trendingItems={trendingItems ?? []}
              upcomingEvents={upcomingEvents ?? []}
            />
          </div>
        </div>
      </main>
    </>
  );
}