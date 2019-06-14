import React from "react";
import { Switch, Route } from "react-router-dom";
import { AdminMainPage, LoginPage, RegisterPage, MainPage } from "pages";

import Base from "containers/common/Base";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/admin" component={AdminMainPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
      <Base />
    </div>
  );
};

export default App;
