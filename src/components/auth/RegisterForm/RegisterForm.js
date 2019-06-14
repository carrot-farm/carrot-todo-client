import React from "react";
import styles from "./styles.scss";
import classNames from "classnames/bind";
import { Button, Input, InputLabel, FormControl } from "@material-ui/core";

import { Row, Col } from "components/common/Elements";

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
  handleLocalRegisterClick,
  buttonDisabled
}) => (
  <div className={cx("register-form-root")}>
    <div className={cx("form-container")}>
      <Row>
        <Col className={cx("s12")}>
          <h3> 안녕하세요.~ 당근보드입니다. </h3>
        </Col>
      </Row>
      <Row>
        <FormControl fullWidth>
          <InputLabel htmlFor="register-input-email">email</InputLabel>
          <Input
            id="register-input-email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            error={emailError}
          />
        </FormControl>
      </Row>
      <Row>
        <FormControl fullWidth>
          <InputLabel htmlFor="register-input-password">password</InputLabel>
          <Input
            id="register-input-password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            error={passwordError}
            type="password"
          />
        </FormControl>
        <div className="helper-text font-size s-07 left-align grey-text line-height s-height">
          8~16자 영문, 숫자, 특수문자 조합
        </div>
      </Row>
      <Row>
        <FormControl fullWidth>
          <InputLabel htmlFor="register-input-password-confirm">
            password 재확인
          </InputLabel>
          <Input
            id="register-input-password-confirm"
            fullWidth
            type="password"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            error={passwordConfirmError}
          />
        </FormControl>
        <div className="password-confirm-helper-text helper-text font-size s-07 left-align red-text line-height m-line">
          {passwordConfirmHelperText}
        </div>
      </Row>

      {/* 로그인 버튼 */}
      <Row>
        <Button
          className={cx("login-button blue-text")}
          size="large"
          variant="outlined"
          fullWidth
          onClick={handleLocalRegisterClick}
          disabled={buttonDisabled}
        >
          가입하기
        </Button>
      </Row>
    </div>
  </div>
);
export default LoginForm;
