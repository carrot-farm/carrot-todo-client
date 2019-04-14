import React from "react";
import { Switch, Route } from "react-router-dom";
import { ToDoPage, CategoryListPage, ConfigPage } from "pages";
import Base from "containers/common/Base";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ToDoPage} />
        <Route exact path="/CategoryList" component={CategoryListPage} />
        <Route exact path="/Config" component={ConfigPage} />
      </Switch>
      <Base />
    </div>
  );
};

export default App;
