/*
  Kalo nambah route disini ya, caranya gini :
    1. Import component2nya
    2. Masukin ke array APP_ROUTE, private itu berarti routenya cuman bisa diliat kalo udah login,
       restricted itu berarti routenya gak bisa diliat kalo udah login (Misal kalo aku masuk 
        halaman login padal udah login)
        
  - Home untuk pasien yang sudah login
  - Dashboard untuk admin & superadmin yang sudah login
*/

import Login from "pages/Login";
import Register from "pages/Register";
import PasienContainer from "components/pasien/PasienContainer";
import AdminContainer from "components/admin/AdminContainer";
import ErrorPage from "../pages/404Pages/ErrorPage";

export const APP_ROUTE = [
  {
    name: "Register",
    path: "/register",
    exact: true,
    component: Register,
    restricted: true,
  },
  {
    name: "Login",
    path: "/login",
    exact: true,
    component: Login,
    restricted: true,
  },
  {
    name: "Login",
    path: "/",
    exact: true,
    component: Login,
    restricted: true,
  },
  {
    name: "Master Layout Admin",
    path: "/admin",
    // exact: true, //di false karena ada nested Switch di dalamnya AdminCOntainer
    component: AdminContainer,
    private: true,
    isAdmin: true,
  },
  {
    name: "Master Layout Pasien",
    path: "/pasien",
    // exact: true, //di false karena ada nested Switch di dalamnya PasienCOntainer
    component: PasienContainer,
    private: true,
    isPasien: true,
  },
  {
    name: "Error Page not found",
    path: "/*",
    component: ErrorPage,
    private: true,
    exact: true,
    isNotFound: true,
  },
  {
    name: "Error Page not found",
    path: "/error",
    component: ErrorPage,
    private: true,
    exact: true,
    isNotFound: true,
  }
];
