import { createMuiTheme } from "@material-ui/core/styles";

const ColorTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#4dd0e1",
      main: "#00acc1",
      dark: "#00838f",
      contrastText: "#fff"
    },
    secondary: {
      light: "#4dabf5",
      main: "#2196f3",
      dark: "#1769aa",
      contrastText: "#fff"
    },
    type: "light"
  }
});

export default ColorTheme;
