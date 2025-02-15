import AdminLayout from "@/components/layouts/admin";

const AdminRootLayout = async ({ children }) => {
  // check signin and user's access in here

  const user = {
    id: 1,
    phoneNumber: "09131993023",
    fullName: "مهدی عربپور",
  };

  return (
    <AdminLayout defaultOpen={true} user={user}>
      {children}
    </AdminLayout>
  );
};

export default AdminRootLayout;
