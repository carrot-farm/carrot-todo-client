import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import * as baseActions from "store/modules/base";
import CarrotConfigs from "components/admin/config/CarrotConfigs";

class CarrotConfigsContainer extends Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <CarrotConfigs />
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
)(withRouter(CarrotConfigsContainer));
