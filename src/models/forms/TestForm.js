import { List, Map } from "immutable";

const PageMenuForm = Map({
  method: "post",
  url: "/api/cms/test",
  before: state => {
    console.log(state);
    return false;
  },
  after: (state, action) => {
    console.log("after", state, action);
  },
  error: (state, action) => {
    console.log("error", state, action);
  },
  form: List([
    {
      tag: "input",
      label: "예금주명",
      colClassName: "s12",
      validate: {
        required: true,
        min: 2,
        max: 10,
        alert: "예금주명을 확인해 주십시요."
      },
      attr: {
        type: "text",
        value: "당근",
        placeholder: "플레"
      }
    },
    {
      tag: "input",
      label: "은행명",
      colClassName: "s12",
      validate: {
        required: true,
        min: 2,
        max: 10,
        alert: "예금주명을 확인해 주십시요."
      },
      attr: {
        type: "text",
        value: "은행명",
        placeholder: "플레"
      }
    },
    {
      tag: "button",
      colClassName: "s12",
      attr: { type: "submit" }
    }
  ])
});

export default PageMenuForm;
