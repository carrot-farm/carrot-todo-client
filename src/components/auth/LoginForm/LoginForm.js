import React from "react";
import styles from "./styles.scss";
import classNames from "classnames/bind";
import { Button, Input, InputLabel, FormControl } from "@material-ui/core";
import { Link } from "react-router-dom";

import { Row } from "components/common/Elements";

const cx = classNames.bind(styles);

const LoginForm = ({
  email,
  emailError,
  handleEmailChange,
  password,
  passwordError,
  handlePasswordChange,
  passwordConfirm,
  passwordConfirmError,
  handlePasswordConfirmChange,
  passwordConfirmHelperText,
  handleLoginClick,
  handleGoogleLoginClick,
  buttonDisabled
}) => (
  <div className={cx("login-form-root")}>
    <div className={cx("login-container")}>
      <h3> 로그인 </h3>
      <br />
      <Row>
        <FormControl fullWidth>
          <InputLabel htmlFor="login-input-email">email</InputLabel>
          <Input
            id="login-input-email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            error={emailError}
            autoFocus={true}
          />
        </FormControl>
      </Row>
      <Row>
        <FormControl fullWidth>
          <InputLabel htmlFor="login-input-password">password</InputLabel>
          <Input
            id="login-input-password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            error={passwordError}
            type="password"
          />
        </FormControl>
        <div className="helper-text font-size s-07 left-align grey-text line-height s-height">
          8~16자 영문,숫자,특수문자 조합
        </div>
      </Row>

      {/* 가입하기 / 비밀번호 찾기 */}
      <Row>
        <div
          className={cx(
            "other-links-container flex between font-size s-0d8 blue-text"
          )}
        >
          <div className={cx("find-password-link")}>
            <Link to="/findPassword">비밀번호 찾기</Link>
          </div>
          <div className={cx("register-link")}>
            <Link to="/register">회원가입</Link>
          </div>
        </div>
      </Row>

      {/* 로그인 버튼 */}
      <Row>
        <Button
          className={cx("login-button blue-text")}
          size="large"
          variant="outlined"
          fullWidth
          onClick={handleLoginClick}
          disabled={buttonDisabled}
        >
          LOGIN
        </Button>
      </Row>

      {/* 구글 로그인 */}
      <Row>
        <Button
          className={cx("google-login-button red-text")}
          size="large"
          variant="outlined"
          fullWidth
          disabled={buttonDisabled}
          onClick={handleGoogleLoginClick}
        >
          GOOGLE
        </Button>
      </Row>
    </div>
  </div>
);
export default LoginForm;
