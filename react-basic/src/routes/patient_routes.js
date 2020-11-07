import ListPolyclinic from "pages/patient/ListPolyclinic";
import ListHealthAgency from "pages/patient/ListHealthAgency";
import Home from "pages/patient/Home";
import HealthAgencies from "pages/patient/HealthAgencies";
import ShowTicket from "pages/patient/ShowTicket";
import Polymasters from "pages/patient/Polyclinics";
import PolyclinicSchedule from "pages/patient/PolyclinicSchedules";

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
    path: "/pasien/list-poliklinik/:id_health_agency",
    exact: true,
    component: ListPolyclinic,
    private: true,
    isPasien: true,
  },
  {
    name: "All Health Agencies",
    path: "/pasien/puskesmas",
    exact: true,
    component: HealthAgencies,
    private: true,
    isPasien: true,
  },
  {
    name: "All Polymasters",
    path: "/pasien/polimaster",
    exact: true,
    component: Polymasters,
    private: true,
    isPasien: true,
  },
  // {
  //   name: "Get Health Agency",
  //   path: "/pasien/puskesmas/:id_health_agency",
  //   exact: true,
  //   component: ListHealthAgency,
  //   private: true,
  //   isPasien: true,
  // },
  {
    name: "Show Ticket",
    path: "/pasien/show-ticket",
    exact: true,
    component: ShowTicket,
    private: true,
    isPasien: true,
  },
  {
    name: "Polyclinic Schedules",
    path: "/pasien/polyclinic-schedule/:id_health_agency",
    exact: true,
    component: PolyclinicSchedule,
    private: true,
    isPasien: true,
  },
];
