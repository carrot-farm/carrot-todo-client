import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import classNames from "classnames/bind";

import styles from "./styles.scss";
import * as baseActions from "store/modules/base";
import AdminHeaderContainer from "containers/headers/AdminHeaderContainer";

const cx = classNames.bind(styles);

const PageTemplate = ({ children, drawerSw }) => {
  return (
    <div className={cx("admin-page-template-root")}>
      <AdminHeaderContainer />
      <div
        className={cx(
          `main-root-wrapper ${drawerSw ? "open-drawer" : "close-drawer"}`
        )}
      >
        <main className={cx("main")}>{children}</main>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    drawerSw: state.base.get("drawerSw")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(PageTemplate);
