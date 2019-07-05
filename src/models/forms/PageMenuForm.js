import { List, Map } from "immutable";

const PageMenuForm = Map({
  method: "post",
  url: "/api/cms/test",
  before: ({ formData, model }) => {
    console.log(formData);
  },
  after: (state, action) => {
    console.log("after", state, action);
  },
  error: (state, action) => {
    console.log("error", state, action);
  },
  legend: "타이틀",
  legendClassName: "red-text",
  form: List([
    // ===== input
    {
      tag: "input",
      label: "예금주명",
      colClassName: "s6",
      alert: "예금주명을 확인해 주십시요.",
      // validate: {
      //   type: "number",
      //   required: true,
      //   min: 2,
      //   max: 10,
      //   checkEmail: true,
      //   checkPassword: true
      // },
      helperText: "당근",
      attr: {
        name: "input",
        value: ""
        // type: "text",
        // placeholder: "플레",
        // autoFocus: true
        // required: true,
        // error: true
      }
    },
    // ===== input, textarea
    {
      tag: "textField",
      label: "textarea",
      colClassName: "s6",
      helperText: "헬퍼 텍스트",
      // validate: {
      //   required: true,
      //   checkPassword: true
      // },
      alert: "패스워드를 확인해 주십시요.",
      attr: {
        name: "textField",
        value: "",
        type: "password",
        // multiline: true,
        // rows: 1,
        placeholder: "placholder"
        // autoFocus: true,
        // required: true,
        // readOnly: true,
        // disabled: true,
        // error: true,
        // "aria-label": "레이블"
      }
    },
    // ===== swtich
    {
      tag: "switch",
      colClassName: "s12",
      label: "switch",
      leftLabel: "left",
      rightLabel: "right",
      // alignRow: true, // 횡 정렬
      attr: {
        name: "switch",
        checked: false
        // disabled: true
      }
    },
    // ===== select
    {
      tag: "select",
      colClassName: "s12",
      lable: "셀렉트 레이블",
      helperText: "당근",
      attr: {
        name: "selectName",
        placeholder: "placeholder",
        value: 20
        // error: true
        // displayEmpty: true, // 빈 값의 텍스트도 보여준다.
        // native: true,
        // disabled: true,
      },
      items: [
        { value: "", label: "None" },
        { value: 10, label: "Ten" },
        { value: 20, label: "Twenty" },
        { value: 30, label: "Thirty" }
      ]
    },
    // ===== checkbox
    {
      tag: "checkbox",
      colClassName: "s12",
      label: "label",
      attr: {
        name: "checkboxName",
        value: 20,
        checked: true
        // disabled: true,
      }
    },
    // ===== radio (값이 반드시 string 이어야 한다.)
    {
      tag: "radio",
      colClassName: "s12",
      label: "radio",
      attr: {
        name: "radioName",
        row: true,
        value: "20"
        // disabled: true
      },
      items: [
        { value: "10", label: "Ten", labelPlacement: "start" },
        { value: "20", label: "Twenty", labelPlacement: "bottom" },
        { value: "30", label: "Thirty" }
      ]
    },
    // ===== file button
    {
      tag: "file",
      colClassName: "s12",
      helperText: "file helper text",
      alert: "파일을 선택해 주십시요",
      validate: {
        // required: true
      },
      attr: {
        name: "file"
      },
      buttonText: "업로드",
      buttonAttr: {
        variant: "contained"
      }
    },
    // ===== button
    {
      tag: "button",
      colClassName: "s12",
      buttonText: "테스트 버튼",
      attr: {
        className: "button-class red-text",
        variant: "outlined", // contained, outlined, text
        size: "large", // small, medium, large
        fullWidth: true,
        type: "submit"
        // href: "#"
        // disabled: true
      }
      // onClick: ({ e, formName, item, index, model }) => {
      //   console.log(model.toJS());
      // }
    }
  ])
});

export default PageMenuForm;
