import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

// import * as baseActions from "store/modules/base";
import { base } from "../../actions";
import AdminHeader from "components/headers/AdminHeader";

// const {

// } = base.actions;

class AdminHeaderContainer extends Component {
  // ===== open drawer
  handleOpenDrawerCilck = () => {
    const { BaseActions } = this.props;
    BaseActions.drawerToggle({ sw: true });
  };

  // ===== close drawer
  handleCloseDrawerClick = () => {
    const { BaseActions } = this.props;
    BaseActions.drawerToggle({ sw: false });
  };

  // ===== toggle children menus
  handleToggleChildrenMenus = ({ item, index }) => {
    const { BaseActions } = this.props;
    BaseActions.toggleAdminChildrenMenus({ item, index });
  };

  // ===== logout
  handleLogoutClick = () => {
    const { BaseActions, history } = this.props;

    BaseActions.logout();
    history.replace("/");
  };

  // ===== 마운트
  componentDidMount() {
    // console.log("> baset ", baseActions);
    // const { BaseActions, history } = this.props;
    // const {
    //   data: { userInfo }
    // } = await BaseActions.getInitialData();
    // const {
    //   data: { userInfo }
    // } = await BaseActions.getInitialData();
    // 접근 제한
    // if (!userInfo || !userInfo.isAdmin) {
    //   alert("접근 권한이 없습니다.");
    //   history.replace("/");
    // }
  }

  // ===== 업데이트
  shouldComponentUpdate(prevState) {
    console.log("update: ", prevState);
  }

  // ===== 랜더링
  render() {
    const { drawerSw, adminMenus } = this.props;
    return (
      <AdminHeader
        drawerSw={drawerSw}
        menus={adminMenus}
        handleOpenDrawerCilck={this.handleOpenDrawerCilck}
        handleCloseDrawerClick={this.handleCloseDrawerClick}
        handleToggleChildrenMenus={this.handleToggleChildrenMenus}
        handleLogoutClick={this.handleLogoutClick}
      />
    );
  }
}

// ===== 커넥트
export default connect(
  state => ({
    userInfo: state.base.get("userInfo"),
    drawerSw: state.base.get("drawerSw"),
    adminMenus: state.base.get("adminMenus")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(base.actions, dispatch)
  })
)(withRouter(AdminHeaderContainer));
