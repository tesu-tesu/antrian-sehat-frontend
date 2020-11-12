import AdminContainer from "components/admin/AdminContainer";
import ScanQR from "pages/admin/ScanQR";
import ErrorPage from "../pages/404Pages/ErrorPage";

export const APP_ADMIN_ROUTE = [
    {
      name: "QR Scan",
      path: "/admin/scan-qr",
      exact: true,
      component: ScanQR,
      private: true,
      isAdmin: true,
    },

];
