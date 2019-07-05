/*
  기본 환경 설정
*/
import React from "react";
import classNames from "classnames/bind";

import styles from "./styles.scss";
import { Container, Section, Row, Col } from "components/common/Elements";

const cx = classNames.bind(styles);

// ===== 헤더
const CarrotConfigs = ({ drawerSw }) => {
  return (
    <>
      <Section>
        <Container>
          <Row>
            <Col>
              <h2>CarrotConfigs</h2>
            </Col>
          </Row>
        </Container>
      </Section>
    </>
  );
};

export default CarrotConfigs;
