/*
  admin 페이지에서 사용되는 헤더
*/
import React, { useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { IconButton, Drawer, Divider } from "@material-ui/core";
import { Menu, ArrowBack, ExpandMore, ExpandLess } from "@material-ui/icons";
import { List } from "immutable";

import styles from "./styles.scss";
import { Header, Container } from "components/common/Elements";

const cx = classNames.bind(styles);

// ===== 관리자 페이지 메뉴 데이터
const menusData = List([
  {
    id: "0",
    text: "menu1",
    to: "/menu1",
    active: true,
    showChildren: false,
    children: [
      {
        id: "0-0",
        text: "child-menu1",
        to: "/child-menu1",
        active: false
      },
      {
        id: "0-1",
        text: "child-menu2",
        to: "/child-menu2",
        active: true
      }
    ]
  },
  {
    id: "1",
    text: "menu2",
    to: "/menu2",
    active: false,
    showChildren: false,
    children: [
      {
        id: "1-0",
        text: "child2-menu1",
        to: "/child2-menu1",
        active: false
      }
    ]
  },
  {
    id: "2",
    text: "menu3",
    to: "/menu3",
    active: false,
    showChildren: false
  }
]);

// ===== 헤더
const FullHeightNav = ({ menus }) => {
  const [menuData, setMenuData] = useState(menus);
  // ===== 자식 리스트 보기
  const handleShowChildrenClick = (item, index) => {
    setMenuData(menuData.setIn([index, "showChildren"], !item.showChildren));
  };
  return (
    <nav className={cx("folding-menu-root")}>
      {/* 부모 리스트 */}
      <ul className="paret-menu">
        {menuData.map((item, index) => (
          <li
            className={`parent-li index-${index} ${
              item.active ? "active" : ""
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
              {item.children && item.children.length && (
                <div className={"child-toggle-button"}>
                  <IconButton
                    className={"child-menu-open-button"}
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
                      childItem.active ? "active" : ""
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

export default FullHeightNav;
