import ListPolyclinic from "pages/patient/ListPolyclinic";
import ListHealthAgency from "pages/patient/ListHealthAgency";
import Home from "pages/patient/Home";
import HealthAgencies from "pages/patient/HealthAgencies";

export const APP_PATIENT_ROUTE = [
  {
    name: "Home",
    path: "/pasien",
    exact: true,
    component: Home,
    private: true,
    isPasien: true,
  },
  {
    name: "List Polyclinic of HA",
    path: "/pasien/list-polyclinic/:id_health_agency",
    exact: true,
    component: ListPolyclinic,
    private: true,
    isPasien: true,
  },
  {
    name: "All Health Agencies",
    path: "/pasien/health-agencies",
    exact: true,
    component: HealthAgencies,
    private: true,
    isPasien: true,
  },
  {
    name: "Get Health Agency",
    path: "/pasien/health-agency/:id_health_agency",
    exact: true,
    component: ListHealthAgency,
    private: true,
    isPasien: true,
  },
];
