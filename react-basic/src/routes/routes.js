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
import Home from "pages/Home";
import Dashboard from "pages/Dashboard";
import ListPolyclinic  from "pages/ListPolyclinic";
import AdminContainer from "components/admin/AdminContainer";
import ListHealthAgency from "../pages/ListHealthAgency";

export const APP_ROUTE = [
  {
    name: "Resgister",
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
    name: "Home",
    path: "/",
    exact: true,
    component: Home,
    private: true,
    isPasien: true,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    exact: true,
    component: AdminContainer,
    private: true,
    isAdmin: true,
  },
  {
    name: "List Polyclinic of HA",
    path: "/list-polyclinic/:id_health_agency",
    exact: true,
    component: ListPolyclinic,
    private: true,
    isPasien: true,
  },
  {
    name: "List Health Agency",
    path: "/health-agency",
    exact: true,
    component: ListHealthAgency,
    private: true,
    isPasien: true,
  },
];
