import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  AdminMainPage,
  LoginPage,
  RegisterPage,
  MainPage,
  CarrotConfigsPage,
  PageMenuPage
} from "pages";

import Base from "containers/common/Base";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/admin/page/pageMenu" component={PageMenuPage} />
        <Route
          path="/admin/config/carrotConfigs"
          component={CarrotConfigsPage}
        />
        <Route path="/admin" component={AdminMainPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
      <Base />
    </div>
  );
};

export default App;
