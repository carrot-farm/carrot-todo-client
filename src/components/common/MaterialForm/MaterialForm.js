import React from "react";
import classNames from "classnames/bind";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  InputLabel,
  Input,
  TextField,
  Switch,
  Select,
  MenuItem,
  FormHelperText,
  RadioGroup,
  Radio,
  Checkbox,
  Button
} from "@material-ui/core";

import styles from "./styles.scss";
import { Row, Col } from "components/common/Elements";

const cx = classNames.bind(styles);

// ===== input
const renderInput = ({ formName, item, index, handleInputChange }) => {
  return (
    <FormControl className={cx("material-input")}>
      {item.label && <InputLabel>{item.label}</InputLabel>}
      <Input
        {...item.attr}
        onChange={e => handleInputChange({ e, formName, item, index })}
      />
      {item.helperText && <FormHelperText>{item.helperText}</FormHelperText>}
    </FormControl>
  );
};

// ===== input, textarea 요소 랜더링
const renderTextField = ({ formName, item, index, handleInputChange }) => (
  <div className={cx("material-input")}>
    <TextField
      {...item.attr}
      label={item.label || ""}
      InputProps={{
        readOnly: item.attr.readOnly || false,
        "aria-label": item.attr["aria-label"] || ""
      }}
      onChange={e => handleInputChange({ e, formName, item, index })}
    />
    {item.helperText && <FormHelperText>{item.helperText}</FormHelperText>}
  </div>
);

// ===== 스위치 랜더링
const renderSwitch = ({ formName, item, index, handleSwitchChange }) => (
  <div
    className={cx(
      `material-input switch-wrapper grey-text text-darken-1 ${item.alignRow &&
        "flex between"}`
    )}
  >
    {item.label && <div className="switch-label">{item.label}</div>}
    <div className={cx("switch-container ")}>
      <span className="left-el">{item.leftLabel || ""}</span>
      <span className="center-el">
        <Switch
          {...item.attr}
          onChange={e => handleSwitchChange({ e, formName, item, index })}
        />
      </span>
      <span className="right-el">{item.rightLabel || ""}</span>
    </div>
  </div>
);

// ===== 체크박스 랜더링
const renderCheckbox = ({ formName, item, index, handleSwitchChange }) => (
  <div className={cx(`material-input checkbox-wrapper `)}>
    <div className={cx("checkbox-container ")}>
      <span className="center-el">
        <FormControlLabel
          control={
            <Checkbox
              {...item.attr}
              onChange={e => handleSwitchChange({ e, formName, item, index })}
            />
          }
          label={item.label}
        />
      </span>
    </div>
  </div>
);

// ===== 라디오 랜더링
const renderRadio = ({ formName, item, index, handleInputChange }) => (
  <div className={cx(`material-input radio-wrapper `)}>
    {item.label && <div className="switch-label">{item.label}</div>}
    <div className={cx("switch-container ")}>
      <RadioGroup
        {...item.attr}
        onChange={e => handleInputChange({ e, formName, item, index })}
      >
        {item.items.map((_item, _index) => (
          <FormControlLabel
            key={`radio_${_index}_${_item.value}`}
            {..._item}
            control={<Radio />}
          />
        ))}
      </RadioGroup>
    </div>
  </div>
);

// ===== 셀렉트 랜더링
const renderSelect = ({ formName, item, index, handleInputChange }) => (
  <FormControl className={cx("material-input")}>
    {item.label && <InputLabel>{item.label}</InputLabel>}
    <Select
      {...item.attr}
      onChange={e => handleInputChange({ e, formName, item, index })}
    >
      {item.attr.native
        ? item.items.map((_item, _index) => (
            <option value={_item.value} key={`select_${_index}_${_item.value}`}>
              {_item.label}
            </option>
          ))
        : item.items.map((_item, _index) => (
            <MenuItem
              value={_item.value}
              key={`selete_${_index}_${_item.value}`}
            >
              {_item.label}
            </MenuItem>
          ))}
    </Select>
    {item.helperText && <FormHelperText>{item.helperText}</FormHelperText>}
  </FormControl>
);

// ===== 버튼 랜더링
const renderButton = ({ model, formName, item, index }) => (
  <div className={cx("material-input")}>
    <Button
      {...item.attr}
      onClick={e => {
        item.onClick && item.onClick({ e, model, formName, item, index });
      }}
    >
      {item.buttonText}
    </Button>
  </div>
);

// ===== 파일 버튼 랜더링
const renderFile = ({ formName, item, index, handleFileChange }) => (
  <div className={cx("material-input flex flex-start")}>
    <div className={cx("file-name-col flex-1")}>
      <FormControl>
        {item.label && <InputLabel>{item.label}</InputLabel>}
        <Input value={item.attr.file ? item.attr.file.name : ""} disabled />
        {item.helperText && <FormHelperText>{item.helperText}</FormHelperText>}
      </FormControl>
    </div>
    <div className={cx("file-upload-button-col")}>
      <Input
        {...item.attr}
        className="none"
        type="file"
        id={`${formName}_${index}_file-input`}
        onChange={e => handleFileChange({ e, formName, item, index })}
      />
      <label htmlFor={`${formName}_${index}_file-input`}>
        <Button {...item.buttonAttr} component="span">
          upload
        </Button>
      </label>
    </div>
  </div>
);

// ===== 폼 요소 랜더링
const renderElements = ({
  model,
  formName,
  item,
  index,
  handleInputChange,
  handleSwitchChange,
  handleFileChange
}) => {
  if (item.tag === "input") {
    return renderInput({ formName, item, index, handleInputChange });
  } else if (item.tag === "textField") {
    return renderTextField({
      formName,
      item,
      index,
      handleInputChange
    });
  } else if (item.tag === "select") {
    return renderSelect({
      formName,
      item,
      index,
      handleInputChange
    });
  } else if (item.tag === "radio") {
    return renderRadio({
      formName,
      item,
      index,
      handleInputChange
    });
  } else if (item.tag === "checkbox") {
    return renderCheckbox({
      formName,
      item,
      index,
      handleSwitchChange
    });
  } else if (item.tag === "button") {
    return renderButton({
      model,
      formName,
      item,
      index
    });
  } else if (item.tag === "file") {
    return renderFile({
      formName,
      item,
      index,
      handleFileChange
    });
  } else if (item.tag === "switch") {
    return renderSwitch({
      formName,
      item,
      index,
      handleSwitchChange
    });
  }
};

// ===== 폼 랜더링
const MaterialForm = ({
  model,
  formName,
  handleInputChange,
  handleSwitchChange,
  handleFileChange,
  handleSubmit
}) => {
  const form = model.get("form");
  const legend = model.get("legend");
  const legendClassName = model.get("legendClassName");

  return (
    // 폼 랜더링
    <form onSubmit={e => handleSubmit({ e, model, formName })}>
      <FormControl component="fieldset">
        {legend && (
          <FormLabel component="legend" className={cx(`${legendClassName}`)}>
            {legend}
          </FormLabel>
        )}
        <Row>
          {form.map((item, index) => (
            <Col key={`${formName}_${index}`} className={item.colClassName}>
              {renderElements({
                model,
                formName,
                item,
                index,
                handleInputChange,
                handleSwitchChange,
                handleFileChange
              })}
            </Col>
          ))}
        </Row>
      </FormControl>
    </form>
  );
};

export default MaterialForm;
