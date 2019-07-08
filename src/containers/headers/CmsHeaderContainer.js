import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom"; //history 객체에 연결하기 위해

// import * as baseActions from "store/modules/base";
import { base } from "../../actions";
import CmsHeader from "components/headers/CmsHeader";

class CmsHeaderContainer extends Component {
  // ===== logout
  handleLogoutClick = () => {
    const { BaseActions } = this.props;
    BaseActions.logout();
  };

  // ===== mount
  componentDidMount = () => {
    const { BaseActions } = this.props;
    BaseActions.getInitialData();
  };

  // ===== 랜더링
  render() {
    const { userInfo } = this.props;
    return (
      <>
        <CmsHeader
          userInfo={userInfo}
          handleLogoutClick={this.handleLogoutClick}
        />
      </>
    );
  }
}

export default connect(
  state => ({
    isLogged: state.base.get("isLogged"),
    userInfo: state.base.get("userInfo")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(base.actions, dispatch)
  })
)(withRouter(CmsHeaderContainer));
