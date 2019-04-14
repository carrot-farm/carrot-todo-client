import React from "react";
// import { withStyles } from "@material-ui/core/styles";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Drawer,
//   Button,
//   List,
//   ListItem,
//   ListItemText
// } from "@material-ui/core";
// import { Menu, Person, Add } from "@material-ui/icons";
import styles from "./styles.scss";
import classNames from "classnames/bind";
// import HorizontalContainer from "containers/list/HorizontalContainer";
// import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

export const Container = ({ children, ...args }) => {
  return (
    <div className="el-container container" {...args}>
      {children}
    </div>
  );
};

export const Row = ({ children, ...args }) => {
  return (
    <div className={cx("el-row row")} {...args}>
      {children}
    </div>
  );
};
export const Col = ({ children, ...args }) => {
  return (
    <div className={cx("el-col col")} {...args}>
      {children}
    </div>
  );
};

export default {
  Container,
  Row,
  Col
};
