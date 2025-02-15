import { Suspense } from "react";
import LoadingPage from "@/components/loading-page";
import DataPageHeader from "@/components/data-page-header";
import NoItem from "@/components/no-item";
import NewsCard from "./components/news-card";
import PaginationComponent from "@/components/pagination";
import { getAllElectedNews, getAllNews } from "@/actions/admin/news/crud";
import ElectedNewsSkeleton from "@/components/skeletons/elected-news-skeleton";
import NewsSkeleton from "@/components/skeletons/news-skeleton";
import SwitchTheme from "@/components/themes/switch-theme";
import ElectedNewsCard from "./components/elected-news-card";
import { Home } from "lucide-react";
import Link from "next/link";
import { routes } from "@/routes/routes";

export async function generateMetadata() {
  return {
    title: "اخبار و مقالات",
  };
}

const NewsPage = async ({ searchParams }) => {
  const { page, perPage, q } = await searchParams;
  let news = null;
  let electedNews = null;

  await getAllNews({
    page: page ? +page : 1,
    perPage: perPage ? +perPage : 20,
    q: q || "",
  })
    .then((res) => {
      news = res?.data || [];
    })
    .catch(() => {
      news = [];
    });

  await getAllElectedNews()
    .then((res) => {
      electedNews = res?.data?.data || [];
    })
    .catch(() => {
      electedNews = [];
    });

  return (
    <Suspense fallback={<LoadingPage />}>
      <main className="relative mx-auto min-h-screen max-w-[1920px] overflow-hidden px-2 pb-5 pt-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-8 md:col-span-2">
            <DataPageHeader title="اخبار منتخب" />
            {electedNews ? (
              electedNews.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {electedNews.map((item) => (
                    <ElectedNewsCard key={item.id} data={item} />
                  ))}
                </div>
              ) : (
                <NoItem />
              )
            ) : (
              <ElectedNewsSkeleton />
            )}
          </div>
          <div className="col-span-8 md:col-span-6">
            <DataPageHeader title="آخرین اخبار سایت" />
            <div className="flex items-center gap-2">
              <Link
                href={routes.root.landing}
                className="text-primary transition-all duration-200 hover:scale-105"
              >
                <Home />
              </Link>
              <SwitchTheme />
            </div>

            {news ? (
              news.data.length > 0 ? (
                <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {news.data.map((item) => (
                    <NewsCard key={item.id} data={item} />
                  ))}
                </div>
              ) : (
                <NoItem />
              )
            ) : (
              <NewsSkeleton />
            )}
            <div className="mt-4">
              {news.data.length !== 0 && (
                <PaginationComponent
                  total={news.total || 0}
                  page={news.page || 1}
                  perPage={news.perPage || 20}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </Suspense>
  );
};

export default NewsPage;
