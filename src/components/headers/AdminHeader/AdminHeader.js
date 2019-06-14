/*
  admin 페이지에서 사용되는 헤더
  fullHeightMenus 사용.
*/
import React, { useState } from "react";
import classNames from "classnames/bind";
import { Link, withRouter } from "react-router-dom";
import { IconButton, Drawer, Divider } from "@material-ui/core";
import { Menu, ArrowBack, ExpandMore, ExpandLess } from "@material-ui/icons";
import { List } from "immutable";

import styles from "./styles.scss";
import { Header, Container } from "components/common/Elements";

const cx = classNames.bind(styles);

/*===== 관리자 페이지 메뉴 데이터
  {
    id(str or int): map 시 key 값,
    text(str): 메뉴에 나타날값,
    to(str): 링크 페이지. 값이 없을시는 페이지 이동이 안된다,
    showChildren(bool/parent only): 자식 메뉴 폴딩 여부
    children(jsonArr/parent only): 자식 메뉴
  }
*/
const menusData = List([
  {
    id: "0",
    text: "환경설정",
    showChildren: false,
    children: [
      {
        id: "0-0",
        text: "기본환경설정",
        to: "/admin/config/carrot-configs"
      }
    ]
  },
  {
    id: "1",
    text: "페이지설정",
    showChildren: false,
    children: [
      {
        id: "1-0",
        text: "메뉴관리",
        to: "/admin/page/page-menu"
      }
    ]
  }
]);

// ===== 헤더
const FullHeightMenu = ({ menus, location }) => {
  const [menuData, setMenuData] = useState(menus);
  // ===== 자식 리스트 보기
  const handleShowChildrenClick = (item, index) => {
    setMenuData(menuData.setIn([index, "showChildren"], !item.showChildren));
  };
  return (
    <nav className={cx("full-height-menu-root")}>
      {/* 부모 리스트 */}
      <ul className="paret-menu">
        {menuData.map((item, index) => (
          <li
            className={`parent-li index-${index} ${
              location.pathname === item.to ? "active" : ""
            }`}
            key={item.id}
          >
            <div className={"parent-text-container text-container "}>
              {item.to ? (
                <Link to={item.to} className="parent-text text">
                  {item.text}
                </Link>
              ) : (
                <div className={"parent-text text"}>{item.text}</div>
              )}
              {/* 폴딩버튼 */}
              {item.children && item.children.length && (
                <div className={"child-toggle-button"}>
                  <IconButton
                    className={"child-menu-open-button white-text"}
                    arial-label="child menu open button"
                    component="span"
                    onClick={e => handleShowChildrenClick(item, index)}
                  >
                    {item.showChildren ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </div>
              )}
            </div>
            <Divider />
            {/* 자식 메뉴 리스트 */}
            {item.showChildren && (
              <ul className="children-menu-list">
                {item.children.map((childItem, childIndex) => (
                  <li
                    className={`child-li index-${index}-${childIndex} ${
                      location.pathname === childItem.to ? "active" : ""
                    }`}
                    key={`${index}-${childIndex}`}
                  >
                    <div className="child-text-container text-container ">
                      {childItem.to ? (
                        <Link to={childItem.to} className="child-text text">
                          {childItem.text}
                        </Link>
                      ) : (
                        <div className={"child-text text"}>
                          {childItem.text}
                        </div>
                      )}
                    </div>
                    <Divider />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

// ===== 헤더
const AdminHeader = ({
  drawerSw,
  handleOpenDrawerCilck,
  handleCloseDrawerClick,
  location
}) => {
  return (
    <>
      {/* 메뉴 */}
      <Drawer
        className={cx("drawer")}
        variant="persistent"
        anchor="left"
        open={drawerSw}
        classes={{ paper: "240px" }}
      >
        <div className="header flex between">
          <div className="font-size s-1d2 ">ADMIN PAGE</div>
          <IconButton
            className="white-text "
            arial-label="menu-hide-button"
            component="span"
            onClick={handleCloseDrawerClick}
          >
            <ArrowBack />
          </IconButton>
        </div>
        <Divider />
        <FullHeightMenu menus={menusData} location={location} />
      </Drawer>

      {/* 헤더  */}
      <Header
        className={cx(
          `admin-header-root  ${drawerSw ? "open-drawer" : "hide-drawer"}`
        )}
      >
        <Container className={"flex between middle-align white-text"}>
          <div className="toggle-button-container">
            {!drawerSw && (
              <IconButton
                className={cx("show-menu-button white-text")}
                arial-label="show menu button"
                component="span"
                onClick={handleOpenDrawerCilck}
              >
                <Menu />
              </IconButton>
            )}
          </div>
          <div className="menus-container flex row-end spacing-1">
            <div className="to-home-page-button">
              <Link to="/">홈페이지</Link>
            </div>
            <div className="logout-button">로그아웃</div>
          </div>
        </Container>
      </Header>
    </>
  );
};

export default withRouter(AdminHeader);
