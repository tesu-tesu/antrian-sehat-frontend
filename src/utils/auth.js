/*
  Ini utils auth, tujuannya buat ngecek di localstorage ada item "USER" apa nggak. Btw nanti
  kalo misal nyimpen token atau yg sensitif2 gitu pake cookies aja lho ya. Kalo sekedar data
  kayak nama user di localStorage aja gpp
*/
// import sessionstorage from 'sessionstorage';
import Cookies from "js-cookie";

export const setUserLogin = (user) => {
  Cookies.set("USER", user);
};
export const login = (user) => {
  Cookies.set("USER", user);
};

export const logout = () => {
  Cookies.remove("USER");
};

export const isLogin = () => {
  if (Cookies.get("USER")) {
    return true;
  }
  return false;
};

export const isPasien = () => {
  if (Cookies.getJSON("USER")?.role === "Pasien") {
    return true;
  }
  return false;
};
export const isAdmin = () => {
  if (Cookies.getJSON("USER")?.role === "Admin") {
    return true;
  }
  return false;
};
export const isSuperAdmin = () => {
  if (Cookies.getJSON("USER")?.role === "Super Admin") {
    return true;
  }
  return false;
};
