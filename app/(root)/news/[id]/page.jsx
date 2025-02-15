import { Suspense } from "react";
import LoadingPage from "@/components/loading-page";
import DataPageHeader from "@/components/data-page-header";
import ElectedNewsSkeleton from "@/components/skeletons/elected-news-skeleton";
import NoItem from "@/components/no-item";
import ElectedNewsCard from "../components/elected-news-card";
import NewsDetails from "../components/news";
import { getAllElectedNews, getNewsById } from "@/actions/admin/news/crud";
import Link from "next/link";
import { Home } from "lucide-react";
import SwitchTheme from "@/components/themes/switch-theme";
import { routes } from "@/routes/routes";

const DetailsPage = async ({ params }) => {
  const { id } = await params;
  let news = null;
  let electedNews = null;

  await getNewsById(id)
    .then((res) => {
      if (res.ok) {
        news = res?.data || null;
      } else {
      }
    })
    .catch((err) => {});

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
        <div className="flex flex-col-reverse gap-4 md:grid md:grid-cols-8">
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
          <div className="col-span-8 rounded-lg p-4 shadow-lg md:col-span-6">
            <div className="flex items-center gap-2">
              <Link
                href={routes.root.landing}
                className="text-primary transition-all duration-200 hover:scale-105"
              >
                <Home />
              </Link>
              <SwitchTheme />
            </div>
            {news ? <NewsDetails data={news} /> : <NoItem />}
          </div>
        </div>
      </main>
    </Suspense>
  );
};

export default DetailsPage;
