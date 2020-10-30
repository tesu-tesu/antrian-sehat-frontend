import AdminContainer from "components/admin/AdminContainer";

export const APP_ADMIN_ROUTE = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    exact: true,
    component: AdminContainer,
    private: true,
    isAdmin: true,
  },
];
