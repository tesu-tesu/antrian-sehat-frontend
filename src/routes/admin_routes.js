import AdminContainer from "components/admin/AdminContainer";
import ScanQR from "pages/admin/ScanQR";
import ErrorPage from "../pages/404Pages/ErrorPage";
import WaitingList from "pages/admin/WaitingList";
import AdminProfile from "../pages/admin/AdminProfile";
import AboutUsPage from "../pages/AboutUsPage";

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
    name: "Data Antrian Pasien",
    path: "/admin/antrian-pasien",
    exact: true,
    component: WaitingList,
    private: true,
    isAdmin: true,
  },
  {
    name: "Profile",
    path: "/admin/profile",
    exact: true,
    component: AdminProfile,
    private: true,
    isAdmin: true,
  },
  {
    name: "Tentang Kami",
    path: "/admin/about-us/",
    exact: true,
    component: AboutUsPage,
    private: true,
    isAdmin: true,
  },
  {
    name: "Halaman Error",
    path: "/admin/*",
    exact: true,
    component: ErrorPage,
    private: true,
    isAdmin: true,
    isNotFound: true,
  },
];
