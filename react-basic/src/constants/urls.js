/*
  Ini constant Url, buat ngedefine Url rest API biasa
*/
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:8000/api";

export const GET_FILMS = "https://ghibliapi.herokuapp.com/films";

let JWT = null;
if(Cookies.getJSON("USER") !== undefined)
  JWT = Cookies.getJSON("USER").token;

export const JWT_HEADER = JWT;
export const LOGIN_API =  `${BASE_URL}/auth/login`;
export const REGISTER_API =  `${BASE_URL}/auth/register`;


export const GET_POLYCLINIC_OF_HA = (id_health_agency) => `${BASE_URL}/admin/health-agency/${id_health_agency}/polyclinic`;
export const GET_HEALTH_AGENCY = (id_health_agency) => `${BASE_URL}/admin/health-agency/${id_health_agency}`;