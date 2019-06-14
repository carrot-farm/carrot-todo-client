import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import * as baseActions from "store/modules/base";
import AdminHeader from "components/headers/AdminHeader";

class AdminHeaderContainer extends Component {
  // ==== open drawer
  handleOpenDrawerCilck = () => {
    const { BaseActions } = this.props;
    BaseActions.drawerToggle({ sw: true });
  };

  // ==== close drawer
  handleCloseDrawerClick = () => {
    const { BaseActions } = this.props;
    BaseActions.drawerToggle({ sw: false });
  };

  // ==== 마운트
  async componentDidMount() {
    const { BaseActions, history } = this.props;
    const {
      data: { userInfo }
    } = await BaseActions.getInitialData();

    // 접근 제한
    if (!userInfo || !userInfo.isAdmin) {
      alert("접근 권한이 없습니다.");
      history.replace("/");
    }
  }

  // ===== 랜더링
  render() {
    const { drawerSw } = this.props;
    return (
      <AdminHeader
        drawerSw={drawerSw}
        handleOpenDrawerCilck={this.handleOpenDrawerCilck}
        handleCloseDrawerClick={this.handleCloseDrawerClick}
      />
    );
  }
}

// ===== 커넥트
export default connect(
  state => ({
    userInfo: state.base.get("userInfo"),
    drawerSw: state.base.get("drawerSw")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(AdminHeaderContainer));
