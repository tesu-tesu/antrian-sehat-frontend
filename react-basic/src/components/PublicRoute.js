/*
  Ini komponen PublicRoute, tujuannya kalo misal user udah login terus ada Route yang 
  restricted, nanti dia redirect ke halaman dashboard (Misal kalo aku masuk halaman login padal
    udah login)
  - Home untuk pasien yang sudah login
  - Dashboard untuk admin & superadmin yang sudah login
*/

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin, isPasien } from "utils/auth";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() && restricted ? (
          isPasien() ?
          <Redirect to="/" />
          :
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
