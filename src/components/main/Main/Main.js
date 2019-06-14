import React from "react";
import styles from "./styles.scss";
import classNames from "classnames/bind";

import { Row } from "components/common/Elements";

const cx = classNames.bind(styles);

const Main = ({}) => (
  <section className={cx("main-root")}>
    <Row>main</Row>
  </section>
);

export default Main;
