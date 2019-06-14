import React from "react";
import styles from "./styles.scss";
import classNames from "classnames/bind";
import { Checkbox, Button, FormControlLabel } from "@material-ui/core";

import { Row, Col, BottomSpace } from "components/common/Elements";

const cx = classNames.bind(styles);

const Terms = ({
  checkedAllTerms,
  checkedTerms1,
  checkedTerms2,
  checkedTerms3,
  handleAllTermsClick,
  handleTerms1Click,
  handleTerms2Click,
  handleTerms3Click,
  handleTermsAgreeClick
}) => (
  <section className={cx("terms-section")}>
    <div className={cx("terms-container grey-text text-darken-1")}>
      <Row>
        <Col className="s12 center-align">
          <h2 className="title font-size s-1d5 "> 가입약관 </h2>
        </Col>
      </Row>

      {/* 전체 선택 */}
      <Row>
        <Col className={cx("s12")}>
          <FormControlLabel
            control={
              <Checkbox
                className={cx("agree1")}
                value="allSelect"
                checked={checkedAllTerms}
                onChange={e => handleAllTermsClick(e)}
              />
            }
            label="전체 선택"
          />
        </Col>
      </Row>

      {/* 이용약관 */}
      <Row>
        <Col className={cx("s12")}>
          <FormControlLabel
            control={
              <Checkbox
                name="agree1"
                value="agree1"
                checked={checkedTerms1}
                onChange={e => handleTerms1Click(e)}
              />
            }
            label="이용약관 (필수)"
          />
        </Col>
        <Col className={cx("s12")}>
          <div className={cx("terms1 terms-detail-container")}>
            <div className={cx("terms-box")}>이용약관</div>
          </div>
        </Col>
      </Row>

      {/* 개인정보 취급방침안내 */}
      <Row>
        <Col className={cx("s12")}>
          <FormControlLabel
            control={
              <Checkbox
                name="agree2"
                value="agree2"
                checked={checkedTerms2}
                onChange={e => handleTerms2Click(e)}
              />
            }
            label="개인정보 취급방침 안내 (필수)"
          />
        </Col>
        <Col className={cx("s12")}>
          <div className={cx("terms2 terms-detail-container")}>
            <div className={cx("terms-box")}>개인정보 취급방침 안내</div>
          </div>
        </Col>
      </Row>

      {/* 이벤트 등 프로모션 알림 메일 수신 */}
      <Row>
        <Col className={cx("s12")}>
          <FormControlLabel
            control={
              <Checkbox
                name="agree3"
                value="agree3"
                checked={checkedTerms3}
                onChange={e => handleTerms3Click(e)}
              />
            }
            label="이벤트 등 프로모션 알림 메일 수신 (선택)"
          />
        </Col>
      </Row>

      {/* 버튼 */}
      <Row>
        <Col className={cx("s6")}>
          <Button
            className={cx("cancel-button grey-text")}
            size="large"
            variant="outlined"
            href="/"
            fullWidth
          >
            비동의
          </Button>
        </Col>
        <Col className={cx("s6")}>
          <Button
            className={cx("agree-button red-text")}
            size="large"
            variant="outlined"
            fullWidth
            onClick={handleTermsAgreeClick}
          >
            동의
          </Button>
        </Col>
      </Row>
      <BottomSpace />
    </div>
  </section>
);
export default Terms;
