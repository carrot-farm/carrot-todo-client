import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";

import * as baseActions from "store/modules/base";
import * as registerActions from "store/modules/register";
import { checkEmail, checkPassword } from "lib/validator";

import Terms from "components/auth/Terms";
import RegisterForm from "components/auth/RegisterForm";

class LoginContainer extends Component {
  componentDidMount() {}

  // ===== 전체 선택
  handleAllTermsClick = e => {
    const { RegisterActions } = this.props;
    document.body.scrollIntoView(false);
    RegisterActions.setCheckAllTerms({ checked: e.target.checked });
  };

  // ===== 이용약관
  handleTerms1Click = e => {
    const { RegisterActions } = this.props;
    RegisterActions.setCheckTerms1({ checked: e.target.checked });
  };

  // ===== 개인정보 취급방침 안내
  handleTerms2Click = e => {
    const { RegisterActions } = this.props;
    RegisterActions.setCheckTerms2({ checked: e.target.checked });
  };

  // ===== 홍보성 메일 수신
  handleTerms3Click = e => {
    const { RegisterActions } = this.props;
    RegisterActions.setCheckTerms3({ checked: e.target.checked });
  };

  // ===== 약관동의
  handleTermsAgreeClick = e => {
    const { RegisterActions, checkedTerms1, checkedTerms2 } = this.props;
    if (!checkedTerms1 || !checkedTerms2) {
      return alert("필수 약관을 동의해 주셔야 합니다.");
    }
    RegisterActions.setAgreeTerms();
  };

  // ===== email change
  handleEmailChange = e => {
    const { RegisterActions } = this.props;
    const email = e.target.value;
    const error = checkEmail(email).error ? true : false;
    RegisterActions.setEmail(email);
    RegisterActions.setEmailError(error);
  };

  // ===== password change
  handlePasswordChange = e => {
    const { RegisterActions } = this.props;
    const password = e.target.value;
    const error = checkPassword(password).error ? true : false;
    RegisterActions.setPassword(password);
    RegisterActions.setPasswordError(error);
  };

  // ===== password confirm change
  handlePasswordConfirmChange = e => {
    const { RegisterActions, password } = this.props;
    const passwordConfirm = e.target.value;
    const error = password !== passwordConfirm ? true : false;
    // console.log(password, passwordConfirm, error);
    RegisterActions.setPasswordConfirm(passwordConfirm);
    RegisterActions.setPasswordConfirmError(error);
  };

  // ===== handle 가입하기
  handleLocalRegisterClick = async () => {
    const {
      BaseActions,
      sending,
      RegisterActions,
      checkedTerms3,
      email,
      emailError,
      password,
      passwordError,
      passwordConfirm,
      passwordConfirmError,
      history
    } = this.props;
    if (!email || emailError) {
      return alert("email을 확인하십시요.");
    }
    if (!password || passwordError) {
      return alert("password를 확인하십시요.");
    }
    if (!passwordConfirm || passwordConfirmError) {
      return alert("'password 재확인'을 확인하십시요.");
    }
    if (sending) {
      return;
    }
    BaseActions.toggleSending({ sw: true });
    setTimeout(() => {
      BaseActions.toggleSending({ sw: false });
    }, 5000);
    const result = await RegisterActions.submitLocalRegister({
      email,
      password,
      checkedTerms3
    });
    BaseActions.toggleSending({ sw: false });
    if (result.status === 200) {
      history.push("/login");
    }
  };

  render() {
    const {
      checkedAllTerms,
      checkedTerms1,
      checkedTerms2,
      checkedTerms3,
      agreeTerms,
      email,
      emailError,
      password,
      passwordError,
      passwordConfirm,
      passwordConfirmError
    } = this.props;
    if (!agreeTerms) {
      // 약관 미동의 시
      return (
        <Terms
          checkedAllTerms={checkedAllTerms}
          checkedTerms1={checkedTerms1}
          checkedTerms2={checkedTerms2}
          checkedTerms3={checkedTerms3}
          handleAllTermsClick={this.handleAllTermsClick}
          handleTerms1Click={this.handleTerms1Click}
          handleTerms2Click={this.handleTerms2Click}
          handleTerms3Click={this.handleTerms3Click}
          handleTermsAgreeClick={this.handleTermsAgreeClick}
        />
      );
    }
    // 약관 동의 후 가입 폼.
    return (
      <RegisterForm
        email={email}
        emailError={emailError}
        handleEmailChange={this.handleEmailChange}
        password={password}
        passwordError={passwordError}
        handlePasswordChange={this.handlePasswordChange}
        passwordConfirm={passwordConfirm}
        passwordConfirmError={passwordConfirmError}
        handlePasswordConfirmChange={this.handlePasswordConfirmChange}
        handleLocalRegisterClick={this.handleLocalRegisterClick}
      />
    );
  }
}

export default connect(
  state => ({
    sending: state.base.get("sending"),
    checkedAllTerms: state.register.get("checkedAllTerms"),
    checkedTerms1: state.register.get("checkedTerms1"),
    checkedTerms2: state.register.get("checkedTerms2"),
    checkedTerms3: state.register.get("checkedTerms3"),
    agreeTerms: state.register.get("agreeTerms"),
    email: state.register.get("email"),
    emailError: state.register.get("emailError"),
    password: state.register.get("password"),
    passwordError: state.register.get("passwordError"),
    passwordConfirm: state.register.get("passwordConfirm"),
    passwordConfirmError: state.register.get("passwordConfirmError")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    RegisterActions: bindActionCreators(registerActions, dispatch)
  })
)(withRouter(LoginContainer));
