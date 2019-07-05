import { List } from "immutable";

export default List([
  {
    men_id: 1,
    men_parent: 0,
    men_name: "메뉴 그룹1",
    men_order: 10,
    men_target: "_self",
    men_link: "/admin/page/pageMenu",
    children: [
      {
        men_id: 2,
        men_parent: 1,
        men_name: "",
        men_order: 11,
        men_target: "_self",
        men_link: "/admin/page/pageMenu"
      },
      {
        men_id: 3,
        men_parent: 1,
        men_name: "자식 메뉴2",
        men_order: 12,
        men_target: "_blank",
        men_link: "/admin/page/pageMenu"
      }
    ]
  },
  {
    men_id: 4,
    men_parent: 0,
    men_name: "메뉴 그룹1",
    men_order: 20,
    men_target: "_self",
    men_link: "/admin/page/pageMenu"
  }
]);
