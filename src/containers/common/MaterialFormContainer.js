import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import * as baseActions from "store/modules/base";
import * as materialFormActions from "store/modules/materialForm";
import MaterialForm from "components/common/MaterialForm";
import { check } from "lib/validator";

class MaterialFormContainer extends Component {
  // ===== 마운트
  componentDidMount() {}

  // ===== 업데이트
  shouldComponentUpdate(prevProps) {
    if (prevProps[prevProps.formName] === this.props[this.props.formName]) {
      return false;
    }
    return true;
  }

  // ===== input change
  handleInputChange = ({ e, formName, item, index }) => {
    const { MaterialFormActions } = this.props;
    const { value } = e.target;
    const { validate } = item;
    // validate
    if (validate) {
      const { error } = check({ value, options: validate });
      if (
        error &&
        value !== "" &&
        (item.tag === "input" || item.tag === "textField")
      ) {
        if (
          validate.max < value.length &&
          (!validate.type || validate.type === "string")
        ) {
          return false;
        }
        MaterialFormActions.setError({ formName, index, isError: true });
      } else {
        MaterialFormActions.setError({ formName, index, isError: false });
      }
    }
    MaterialFormActions.inputChange({ value, formName, item, index });
  };

  // ===== switch change
  handleSwitchChange = ({ e, formName, item, index }) => {
    const { MaterialFormActions } = this.props;
    const { checked } = e.target;
    MaterialFormActions.switchChange({ checked, formName, item, index });
  };

  // ===== file change
  handleFileChange = ({ e, formName, item, index }) => {
    const { MaterialFormActions } = this.props;
    const { files } = e.target;
    MaterialFormActions.fileChange({
      file: files.length ? files[0] : "",
      formName,
      item,
      index
    });
  };

  // ===== submit
  handleSubmit = ({ e, model, formName }) => {
    const { MaterialFormActions } = this.props;
    e.preventDefault();
    const modelJS = model.toJS();
    let formData = [];
    let i = 0;
    const formsEach = modelJS.form;
    let k = 0,
      len = formsEach.length;
    let item;
    let value;
    let validationPass = true;
    let files = [];
    let j = 0;

    // 유효성 검사 및 formData 객체 생성
    for (; k < len; k++) {
      item = formsEach[k];
      if (item.attr && item.attr.name) {
        validationPass = true;
        // 타입별 값 설정
        if (item.tag === "file" && item.attr.file) {
          // value = item.attr.file;
          files[j++] = {
            tag: item.tag,
            name: item.attr.name,
            file: item.attr.file
          };
        } else if (item.tag === "checkbox" || item.tag === "switch") {
          value = item.attr.checked || false;
        } else {
          value = item.attr.value;
        }

        // 유효성 검사
        if (item.validate) {
          // 파일 검사
          if (item.tag === "file") {
            if (item.validate.required === true && !item.attr.file) {
              validationPass = false;
            }
            // 파일외 검사
          } else {
            validationPass = check({ value, options: item.validate }).error
              ? false
              : true;
          }
        }

        // 유효성 검사 통과 하지 못 했을 때.
        if (validationPass === false) {
          if (item.alert) {
            alert(item.alert);
          }
          return false;
        }

        // formData 만들기
        if (item.tag !== "file") {
          formData[i++] = {
            tag: item.tag,
            name: item.attr.name,
            value: value
          };
        }
      }
    }
    // before
    if (typeof modelJS.before === "function") {
      if (modelJS.before({ model, formData, files }) === false) {
        return false;
      }
    }
    // send
    MaterialFormActions.send({ data: formData, url: modelJS.url, files });
  };

  // ===== render
  render() {
    const { formName } = this.props;
    const selectedMedel = this.props[formName];

    if (!selectedMedel) {
      return null;
    }

    return (
      <>
        <MaterialForm
          model={selectedMedel}
          formName={formName}
          handleInputChange={this.handleInputChange}
          handleSwitchChange={this.handleSwitchChange}
          handleFileChange={this.handleFileChange}
          handleSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

export default connect(
  state => ({
    isLogged: state.base.get("isLogged"),
    PageMenuForm: state.materialForm.get("PageMenuForm")
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    MaterialFormActions: bindActionCreators(materialFormActions, dispatch)
  })
)(withRouter(MaterialFormContainer));
