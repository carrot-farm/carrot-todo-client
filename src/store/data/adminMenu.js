import { List } from "immutable";

export default List([
  {
    id: "0",
    text: "환경설정",
    showChildren: false,
    children: [
      {
        id: "0-0",
        text: "기본환경설정",
        to: "/admin/config/carrotConfigs"
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
        to: "/admin/page/pageMenu"
      }
    ]
  }
]);
