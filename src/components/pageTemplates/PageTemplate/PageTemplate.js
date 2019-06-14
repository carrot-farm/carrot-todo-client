import React from "react";
import classNames from "classnames/bind";

import styles from "./PageTemplate.scss";
// import TradeHeaderContainer from "containers/common/TradeHeaderContainer";

const cx = classNames.bind(styles);

const PageTemplate = ({ Header, MainContent }) => {
  return (
    <div className={cx("page-template-root")}>
      <Header />
      <main className={[cx("main")]}>
        <MainContent />
      </main>
      <footer className={cx("footer")} />
    </div>
  );
};

export default PageTemplate;
