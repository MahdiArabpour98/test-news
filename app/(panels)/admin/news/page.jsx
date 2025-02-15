import LoadingPage from "@/components/loading-page";
import NoItem from "@/components/no-item";
import PaginationComponent from "@/components/pagination";
import { Suspense } from "react";
import DataPageHeader from "@/components/data-page-header";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { getAllNews } from "@/actions/admin/news/crud";
import { routes } from "@/routes/routes";

const NewsPage = async ({ searchParams }) => {
  const { page, perPage, q } = await searchParams;
  const fetchData = await getAllNews({
    page: page ? +page : 1,
    perPage: perPage ? +perPage : 20,
    q: q || "",
  });

  const data = fetchData.data;

  return (
    <Suspense fallback={<LoadingPage />}>
      <DataPageHeader
        title="خبر ها"
        text="مشاهده تمامی خبر ها"
        link={routes.admin.news.create}
        btnTitle={"افزودن"}
      />

      <DataTable columns={columns} data={data.data} />
      {data.data.length === 0 && <NoItem />}
      {data.data.length !== 0 && (
        <PaginationComponent
          total={data.total || 0}
          page={data.page || 1}
          perPage={data.perPage || 20}
        />
      )}
    </Suspense>
  );
};

export default NewsPage;
