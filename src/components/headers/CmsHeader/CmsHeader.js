/*
  cms 용 헤더
*/
import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./styles.scss";
import { Container } from "components/common/Elements";

const cx = classNames.bind(styles);

// ===== 헤더 컴포넌트
const CmsHeader = ({ userInfo, handleLogoutClick }) => {
  const { isAdmin } = userInfo || {};

  return (
    <header className={cx("cms-header-root")}>
      {/* 프로필 정보 */}
      <section className={cx("profile-section grey darken-2")}>
        <Container>
          <div className={cx("right-container flex row-end")}>
            {/* 로그인 */}
            {userInfo ? (
              <div className={cx("buttons-container flex row-end spacing-1")}>
                {isAdmin && (
                  <div className={cx("admin-page-button")}>
                    <Link to={"/admin"}>관리자</Link>
                  </div>
                )}
                <div className={cx("myPage-button")}>
                  <Link to="/myPage">마이페이지</Link>
                </div>
                <div
                  className={cx("logout-button cursor-pointer ")}
                  onClick={handleLogoutClick}
                >
                  로그아웃
                </div>
              </div>
            ) : (
              // 로그인 안함
              <div className={cx("buttons-container flex row-end spacing-05")}>
                <div className={cx("login-button ")}>
                  <Link to="/login">로그인</Link>
                </div>
                <div className={cx("register-button ")}>
                  <Link to="/register">회원가입</Link>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
      {/* 메뉴 정보 */}
    </header>
  );
};

export default CmsHeader;
