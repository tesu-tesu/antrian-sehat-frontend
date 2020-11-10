/*
  Ini constant Url, buat ngedefine Url rest API biasa
*/
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8000/api";

export const GET_FILMS = "https://ghibliapi.herokuapp.com/films";

let JWT = null;
if (Cookies.getJSON("USER") !== undefined) JWT = Cookies.getJSON("USER").token;

//INITIALIZE
export const JWT_HEADER = JWT;

//LOGIN & REGISTER API
export const LOGIN_API = `${BASE_URL}/auth/login`;
export const REGISTER_API = `${BASE_URL}/auth/register`;

//PATIENT API
export const GET_ALL_HEALTH_AGENCIES = (page_number) =>
  `${BASE_URL}/admin/health-agency?page=${page_number}`;
export const GET_ALL_POLYMASTERS = (page_number) =>
  `${BASE_URL}/admin/poly-master?page=${page_number}`;

export const GET_POLYCLINIC_OF_HA = (id_health_agency) =>
  `${BASE_URL}/admin/health-agency/${id_health_agency}/polyclinic`;
export const GET_ONE_HEALTH_AGENCY = (id_health_agency) =>
  `${BASE_URL}/admin/health-agency/${id_health_agency}`;
export const GET_WAITING_LIST = () => `${BASE_URL}/user/get-waiting-list`;
export const GET_NEAREST_WAITING_LIST = () => `${BASE_URL}/user/show-nearest-waiting-list`;
export const GET_WAITING_LIST_BY_SCHEDULE = (schedule, date) =>
  `${BASE_URL}/user/get-waiting-list/${schedule}/${date}`;
export const BOOK_WAITING_LIST = () =>
  `${BASE_URL}/admin/waiting-list/create`;
export const GET_RESIDENCE_NUMBER = () => `${BASE_URL}/user/get-residence-number`;

  //ADMIN API
