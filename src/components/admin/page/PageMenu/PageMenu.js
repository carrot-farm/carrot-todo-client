/*
  페이지 설정
*/
import React from "react";
import classNames from "classnames/bind";
import {
  Paper,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  TextField,
  Button,
  Divider
} from "@material-ui/core";
import { SubdirectoryArrowRight } from "@material-ui/icons";

import styles from "./styles.scss";
import {
  Container,
  Section,
  Row,
  Col,
  BottomSpace
} from "components/common/Elements";

const cx = classNames.bind(styles);

// ===== 페이지 메뉴 리스트
const PageMenuForm = ({
  type,
  item,
  parentItem,
  index,
  handleNameChange,
  handleOrderChange,
  handleTargetChange,
  handleLinkChange,
  handleInsertClick,
  handleUpdateClick,
  handleDeleteClick
}) => (
  <form>
    <Row>
      {/* 메뉴명 */}
      <Col className={"s12"}>
        <FormControl fullWidth>
          {parentItem ? (
            <InputLabel>
              <SubdirectoryArrowRight />({parentItem.men_name}) 의 자식 메뉴명
            </InputLabel>
          ) : (
            <InputLabel>메뉴명</InputLabel>
          )}
          <Input
            value={item.men_name}
            onChange={e => handleNameChange(e, item, index)}
          />
        </FormControl>
      </Col>
    </Row>
    {/* 순서 */}
    <Row>
      <Col className="s5">
        <FormControl fullWidth>
          <InputLabel>순서</InputLabel>
          <Input
            type="number"
            value={item.men_order}
            onChange={e => handleOrderChange(e, item, index)}
          />
        </FormControl>
      </Col>
      <Col className="s7">
        <FormControl fullWidth>
          <InputLabel>새창으로 열림</InputLabel>
          <Select
            inputProps={{
              name: "target",
              id: "menu-anchor-target"
            }}
            value={item.men_target}
            onChange={e => handleTargetChange(e, item, index)}
          >
            <MenuItem value="_self">현제창에서</MenuItem>
            <MenuItem value="_blank">새창에서</MenuItem>
          </Select>
        </FormControl>
      </Col>
    </Row>
    <Row>
      <Col className={"s12"}>
        <FormControl fullWidth>
          <TextField
            label="링크주소"
            multiline
            margin="normal"
            value={item.men_link}
            onChange={e => handleLinkChange(e, item, index)}
          />
        </FormControl>
      </Col>
    </Row>
    {type === "update" ? (
      <Row>
        <Col className={"s6"}>
          <Button
            className="grey-text text-darken-3"
            variant="outlined"
            type="button"
            size="large"
            fullWidth
            onClick={e => handleDeleteClick(e, item, index)}
          >
            삭제
          </Button>
        </Col>
        <Col className={"s6"}>
          <Button
            className="blue-text "
            variant="outlined"
            type="button"
            size="large"
            fullWidth
            onClick={e => handleUpdateClick(e, item, index)}
          >
            수정
          </Button>
        </Col>
      </Row>
    ) : (
      <Row>
        <Col className={"s12"}>
          <Button
            className="grey-text text-darken-3"
            variant="outlined"
            type="button"
            size="large"
            fullWidth
            onClick={e => handleInsertClick(e, item, index)}
          >
            메뉴 등록
          </Button>
        </Col>
      </Row>
    )}
  </form>
);

// ===== 페이지 메뉴 리스트
const PageMenu = ({
  pageMenu,
  handleNameChange,
  handleOrderChange,
  handleTargetChange,
  handleLinkChange,
  handleInsertClick,
  handleUpdateClick,
  handleDeleteClick
}) => {
  return (
    <div className={cx("admin_page_page-menu-root")}>
      <Section>
        <Container>
          {/* 타이틀 */}
          <div className={"title"}>
            <Row>
              <Col className={cx("s12")}>
                <h2>메뉴설정</h2>
              </Col>
            </Row>
          </div>
          {/* 부모 메뉴 */}
          <ul>
            <li>
              {pageMenu.map((item, index) => (
                <Paper className={cx("paper white")} key={item.men_id}>
                  <PageMenuForm
                    type={"update"}
                    parentItem={null}
                    item={item}
                    index={index}
                    handleNameChange={handleNameChange}
                    handleOrderChange={handleOrderChange}
                    handleTargetChange={handleTargetChange}
                    handleLinkChange={handleLinkChange}
                    handleInsertClick={handleInsertClick}
                    handleUpdateClick={handleUpdateClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                  {/* 자식 메뉴 */}
                  {item.children &&
                    item.children.length &&
                    item.children.map((childItem, childIndex) => (
                      <div className="grey lighten-5" key={childItem.men_id}>
                        <PageMenuForm
                          type={"update"}
                          item={childItem}
                          parentItem={item}
                          index={childIndex}
                          handleNameChange={handleNameChange}
                          handleOrderChange={handleOrderChange}
                          handleTargetChange={handleTargetChange}
                          handleLinkChange={handleLinkChange}
                          handleInsertClick={handleInsertClick}
                          handleUpdateClick={handleUpdateClick}
                          handleDeleteClick={handleDeleteClick}
                        />
                      </div>
                    ))}
                </Paper>
              ))}
            </li>
          </ul>
        </Container>
      </Section>
      {/* 추가 작성 폼 */}
      <Section>
        {/* 타이틀 */}
        <div className={"title"}>
          <Row>
            <Col className={cx("s12")}>
              <h2>메뉴 만들기</h2>
            </Col>
          </Row>
        </div>
        <Paper>
          <PageMenuForm
            type={"insert"}
            item={null}
            parentItem={null}
            index={null}
            handleNameChange={handleNameChange}
            handleOrderChange={handleOrderChange}
            handleTargetChange={handleTargetChange}
            handleLinkChange={handleLinkChange}
            handleInsertClick={handleInsertClick}
            handleUpdateClick={handleUpdateClick}
            handleDeleteClick={handleDeleteClick}
          />
        </Paper>
      </Section>
      {/* 글 작성 폼 바로가기 */}
      <div />
      <BottomSpace />
    </div>
  );
};

export default PageMenu;
