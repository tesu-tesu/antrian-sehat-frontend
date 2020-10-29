/*
  Ini entry point reactnya, disini dipake buat define react router
*/

import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { APP_ROUTE } from "./routes/routes";
import PublicRoute from "components/PublicRoute";
import PasienRoute from "components/PasienRoute";
import AdminRoute from "components/AdminRoute";

export const history = createBrowserHistory();

const App = () => {
  return (
    <Router>
      <Switch>
        {APP_ROUTE.map((value, index) => {
          if (value.private) {
            if(value.isPasien){
              return (
                <PasienRoute
                  key={value.name}
                  component={value.component}
                  path={value.path}
                  exact={value.exact}
                  isPasien={value.isPasien}
                />
              );
            }else{
              return (
                <AdminRoute
                  key={value.name}
                  component={value.component}
                  path={value.path}
                  exact={value.exact}
                  isAdmin={value.isAdmin}
                />
              );
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
        })}
      </Switch>
    </Router>
  );
};

export default App;
