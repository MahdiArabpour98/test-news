import CreatePageHeader from "@/components/create-page-Header";
import EditForm from "../../components/edit-form";
import { getNewsById } from "@/actions/admin/news/crud";

const EditPage = async ({ params }) => {
  const { id } = await params;
  const fetchData = await getNewsById(id);

  const data = fetchData.data;
  return (
    <div>
      <CreatePageHeader title={"ویرایش خبر"} />
      <EditForm data={data} />
    </div>
  );
};

export default EditPage;
