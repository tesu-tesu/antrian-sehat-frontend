/*
  Ini komponen PrivateRoute, tujuannya dia ngecek kalo user belum login nanti 
  redirect ke halaman login
*/

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin, isAdmin } from "utils/auth";

const AdminRoute = ({ component: Component, setTitle, setPath, ...rest }) => {
  React.useEffect(() => {
    setTitle(rest.nameRoute);
    setPath(rest.path);
  }, []);

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? (
          isAdmin() ? (
            !rest.isNotFound ? (
              <Component />
            ) : (
              <>
                <Redirect to="/error" />
                <Component />
              </>
            )
          ) : (
            <>
              <Redirect to="/pasien" />
              <Component />
            </>
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default AdminRoute;
