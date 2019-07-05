import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import * as baseActions from "store/modules/base";
import * as pageMenuActions from "store/modules/pageMenu";
import PageMenu from "components/admin/page/PageMenu";

class PageMenuContainer extends Component {
  componentDidMount() {}

  render() {
    const { pageMenu } = this.props;
    return (
      <>
        <PageMenu pageMenu={pageMenu} />
      </>
    );
  }
}

export default connect(
  state => ({
    userInfo: state.base.get("userInfo"),
    pageMenu: state.pageMenu.get("pageMenu")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    PageMenuActions: bindActionCreators(pageMenuActions, dispatch)
  })
)(withRouter(PageMenuContainer));
