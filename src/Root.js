import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider } from "@material-ui/core/styles";

import Routes from "./Routes";
import store from "store";
import ColorTheme from "components/common/ColorTheme"; //컬러 테마

// const store = configure();

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MuiThemeProvider theme={ColorTheme}>
          <Routes />
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
