import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import * as baseActions from "store/modules/base";
import AdminMain from "components/admin/AdminMain";

class AdminMainContainer extends Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <AdminMain />
      </>
    );
  }
}

export default connect(
  state => ({
    userInfo: state.base.get("userInfo")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(AdminMainContainer));
