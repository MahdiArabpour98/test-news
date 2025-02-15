import { routes } from "@/routes/routes";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  redirect(routes.admin.dashboard);
};

export default AdminPage;
