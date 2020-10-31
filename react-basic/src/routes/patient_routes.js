import ListPolyclinic  from "pages/ListPolyclinic";
import PasienContainer from "components/pasien/PasienContainer";

export const APP_PATIENT_ROUTE = [
  {
    name: "Home",
    path: "/",
    exact: true,
    component: PasienContainer,
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
