/*
  Ini entry point reactnya, disini dipake buat define react router
*/

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { APP_ROUTE } from "./routes/routes";
import { APP_ADMIN_ROUTE } from "./routes/admin_routes";
import { APP_PATIENT_ROUTE } from "./routes/patient_routes";
import PublicRoute from "components/PublicRoute";
import PasienRoute from "components/PasienRoute";
import AdminRoute from "components/AdminRoute";
import ErrorPage from "./pages/404Pages/ErrorPage";

export const history = createBrowserHistory();

const App = () => {
  return (
    <Router>
      <Switch>
        {APP_ROUTE.map((value, index) => {
          return (
            <PublicRoute
              key={value.name}
              restricted={value.restricted}
              path={value.path}
              component={value.component}
              exact={value.exact}
              isNotFound={value.isNotFound}
            />
          );
        })}
        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
