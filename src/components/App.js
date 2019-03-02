import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {
   ToDoPage,
   CategoryListPage
} from 'pages';
import Base from 'containers/common/Base';


const App = ()=>{
   return (
      <div>
         <Switch>
            <Route exact path="/" component={ToDoPage}></Route>
            <Route exact path="/CategoryList" component={CategoryListPage}></Route>
         </Switch>
         <Base />
      </div>
   )
}

export default App;