import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import * as baseActions from "store/modules/base";
import * as loginActions from "store/modules/login";
import { checkEmail, checkPassword } from "lib/validator";
import LoginForm from "components/auth/LoginForm";
import { googleLogin, saveAccessToken } from "lib/common";

class LoginContainer extends Component {
  componentDidMount() {}

  // ===== email change
  handleEmailChange = e => {
    const { LoginActions } = this.props;
    const email = e.target.value;
    const error = checkEmail(email).error ? true : false;
    LoginActions.setEmail(email);
    LoginActions.setEmailError(error);
  };

  // ===== password change
  handlePasswordChange = e => {
    const { LoginActions } = this.props;
    const password = e.target.value;
    const error = checkPassword(password).error ? true : false;
    LoginActions.setPassword(password);
    LoginActions.setPasswordError(error);
  };

  // ===== handle login click
  handleLoginClick = async () => {
    const {
      BaseActions,
      LoginActions,
      sending,
      email,
      emailError,
      password,
      passwordError,
      history
    } = this.props;
    if (!email || emailError) {
      return alert("email을 확인하십시요.");
    }
    if (!password || passwordError) {
      return alert("password를 확인하십시요.");
    }
    if (sending === true) {
      return false;
    }
    BaseActions.toggleSending({ sw: true });
    setTimeout(() => {
      BaseActions.toggleSending({ sw: false });
    }, 5000);
    await LoginActions.sendLocalLogin({ email, password });
    BaseActions.toggleSending({ sw: false });
    history.push("/");
  };

  // ===== google login click
  handleGoogleLoginClick = async () => {
    const { history } = this.props;
    const { token, refreshToken } = await googleLogin();
    saveAccessToken(token, refreshToken);
    history.push("/");
  };

  render() {
    const {
      email,
      emailError,
      password,
      passwordError,
      passwordConfirm,
      passwordConfirmError
    } = this.props;
    return (
      <LoginForm
        email={email}
        emailError={emailError}
        handleEmailChange={this.handleEmailChange}
        password={password}
        passwordError={passwordError}
        handlePasswordChange={this.handlePasswordChange}
        passwordConfirm={passwordConfirm}
        passwordConfirmError={passwordConfirmError}
        handlePasswordConfirmChange={this.handlePasswordConfirmChange}
        handleLoginClick={this.handleLoginClick}
        handleGoogleLoginClick={this.handleGoogleLoginClick}
      />
    );
  }
}

export default connect(
  state => ({
    sending: state.base.get("sending"),
    email: state.login.get("email"),
    emailError: state.login.get("emailError"),
    password: state.login.get("password"),
    passwordError: state.login.get("passwordError"),
    passwordConfirm: state.login.get("passwordConfirm"),
    passwordConfirmError: state.login.get("passwordConfirmError")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    LoginActions: bindActionCreators(loginActions, dispatch)
  })
)(withRouter(LoginContainer));
