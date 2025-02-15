import LoadingPage from "@/components/loading-page";
import NoItem from "@/components/no-item";
import PaginationComponent from "@/components/pagination";
import { Suspense } from "react";
import DataPageHeader from "@/components/data-page-header";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import CreateForm from "./components/create-form";
import { getAllCategories } from "@/actions/admin/category/crud";

const CategoriesPage = async ({ searchParams }) => {
  const { page, perPage, q } = await searchParams;
  const fetchData = await getAllCategories({
    page: page ? +page : 1,
    perPage: perPage ? +perPage : 20,
    q: q || "",
  });

  const data = fetchData.data;

  return (
    <Suspense fallback={<LoadingPage />}>
      <DataPageHeader
        title="دسته بندی ها"
        text="مشاهده تمامی دسته بندی ها"
        createComponent={<CreateForm />}
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

export default CategoriesPage;
