import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "./header/header";
import SideBar from "./sidebar/sidebar";

const AdminLayout = ({ children, user }) => {
  return (
    <SidebarProvider>
      <SideBar user={user} />
      <main className="flex h-screen w-full flex-col overflow-y-auto">
        <Header user={user} />
        <div className="flex-1 rounded-lg px-3 py-5">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
