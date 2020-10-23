/*
  Ini utils auth, tujuannya buat ngecek di localstorage ada item "USER" apa nggak. Btw nanti
  kalo misal nyimpen token atau yg sensitif2 gitu pake cookies aja lho ya. Kalo sekedar data
  kayak nama user di localStorage aja gpp
*/
import sessionstorage from 'sessionstorage';

export const setUserLogin = (user) => {
  sessionstorage.setItem("USER", user);
  sessionstorage.setItem("USER", user);
};
export const login = (user) => {
  sessionstorage.setItem("USER", user);
};

export const logout = () => {
  sessionstorage.removeItem("USER");
};

export const isLogin = () => {
  if (sessionstorage.getItem("USER")) {
    return true;
  }
  return false;
};

