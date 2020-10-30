import ListPolyclinic  from "pages/ListPolyclinic";
import Home from "pages/Home";

export const APP_PATIENT_ROUTE = [
  {
    name: "Home",
    path: "/",
    exact: true,
    component: Home,
    private: true,
    isPasien: true,
  },
  {
    name: "List Polyclinic of HA",
    path: "/list-polyclinic/:id_health_agency",
    exact: true,
    component: ListPolyclinic,
    private: true,
    isPasien: true,
  },
];
