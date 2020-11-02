/*
  Ini komponen PrivateRoute, tujuannya dia ngecek kalo user belum login nanti 
  redirect ke halaman login
*/

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin, isPasien } from "utils/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(Component);
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? (
          isPasien() ? (
            <>
              <Component {...props} />
              <Redirect to="/pasien" />
            </>
          ) : (
            <>
              <Component {...props} />
              <Redirect to="/admin" />
            </>
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
