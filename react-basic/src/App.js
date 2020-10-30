/*
  Ini entry point reactnya, disini dipake buat define react router
*/

import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { APP_ROUTE } from "./routes/routes";
import { APP_ADMIN_ROUTE } from "./routes/admin_routes";
import { APP_PATIENT_ROUTE } from "./routes/patient_routes";
import PublicRoute from "components/PublicRoute";
import PasienRoute from "components/PasienRoute";
import AdminRoute from "components/AdminRoute";

export const history = createBrowserHistory();

const App = () => {
  return (
    <Router>
      <Switch>
      {APP_ADMIN_ROUTE.map((value, index) => {
          return (
            <AdminRoute
              key={value.name}
              component={value.component}
              path={value.path}
              exact={value.exact}
              isAdmin={value.isAdmin}
            />
          );
        })};
        {APP_PATIENT_ROUTE.map((value, index) => {
          return (
            <PasienRoute
              key={value.name}
              component={value.component}
              path={value.path}
              exact={value.exact}
              isPasien={value.isPasien}
            />
          );
        })};
        {APP_ROUTE.map((value, index) => {
          if (value.private) {
            if(value.isPasien){
              //
            }else{
              //
            }
          } else {
            return (
              <PublicRoute
                key={value.name}
                restricted={value.restricted}
                path={value.path}
                component={value.component}
                exact={value.exact}
              />
            );
          }
        })};
      </Switch>
    </Router>
  );
};

export default App;
