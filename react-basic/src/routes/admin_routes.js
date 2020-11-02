import AdminContainer from "components/admin/AdminContainer";
import ScanQR from "pages/admin/ScanQR";

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
