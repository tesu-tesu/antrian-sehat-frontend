import AdminContainer from "components/admin/AdminContainer";
import ScanQR from "pages/admin/ScanQR";
import ErrorPage from "../pages/404Pages/ErrorPage";
import WaitingList from "pages/admin/WaitingList";

export const APP_ADMIN_ROUTE = [
    {
      name: "QR Scan",
      path: "/admin/scan-qr",
      exact: true,
      component: ScanQR,
      private: true,
      isAdmin: true,
    },
    {
        name: "Waiting List",
        path: "/admin/waiting-list",
        exact: true,
        component: WaitingList,
        private: true,
        isAdmin: true,
    },
    {
        name: "Error Page",
        path: "/admin/*",
        exact: true,
        component: ErrorPage,
        private: true,
        isAdmin: true,
        isNotFound: true,
    },
];