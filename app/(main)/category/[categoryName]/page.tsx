import { getArticlesByCategory, getTrendingItems, getUpcomingEvents } from "@/app/lib/api";
import { LatestNewsArticle } from "@/app/components/article/LatestNewsArticle";
import { Sidebar } from "@/app/components/Sidebar";
import { Tag } from "lucide-react";
import { Article } from "@/app/types";

type Props = {
  params: {
    categoryName: string;
  };
};

function formatCategoryTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function CategoryPage({ params }: Props) {
  // Access params directly (they're already resolved by Next.js)
  const { categoryName } = params;
  
  // Decode the category name
  const decodedCategorySlug = decodeURIComponent(categoryName);

  // Fetch data
  const [articles = [], trendingItems, upcomingEvents] = await Promise.all([
    getArticlesByCategory(decodedCategorySlug),
    getTrendingItems(),
    getUpcomingEvents(),
  ]);

  const title = formatCategoryTitle(decodedCategorySlug);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <section>
            <div className="flex items-center gap-2 mb-6 pb-4 border-b">
              <Tag className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold text-gray-900">
                Category: {title}
              </h1>
            </div>

            {(articles ?? []).length > 0 ? (
              <div className="flex flex-col gap-6">
                {(articles ?? []).map((article) => (
                  <LatestNewsArticle key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-gray-700">Oops!</h2>
                <p className="text-gray-500 mt-2">
                  There are no articles in the {title} category yet.
                </p>
              </div>
            )}
          </section>
        </div>

        <div className="lg:col-span-1">
          <Sidebar
            trendingItems={trendingItems ?? []}
            upcomingEvents={upcomingEvents ?? []}
          />
        </div>
      </div>
    </main>
  );
}