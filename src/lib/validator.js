import Joi from "@hapi/joi";

// ====== 이메일 체크
export const checkEmail = input => {
  const schema = Joi.string()
    .required()
    .email({ minDomainAtoms: 2 });
  return Joi.validate(input, schema);
};

// ====== password check. 8~16 영문자, 숫자 특수 문자 포함
export const checkPassword = input => {
  const schema = Joi.string()
    .required()
    .min(8)
    .max(16)
    .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}/);
  return Joi.validate(input, schema);
};

// ====== 체킹
export const check = ({ value, options }) => {
  let schema = Joi;
  let key;
  // console.log("*** check: ", value, options);
  if (!options.type || options.type === "string") {
    schema = schema.string();
  } else if (options.type === "number") {
    schema = schema.number();
  }
  for (key in options) {
    if (key === "required") {
      schema = schema.required();
    } else if (key === "min") {
      schema = schema.min(options[key]);
    } else if (key === "max") {
      schema = schema.max(options[key]);
    } else if (key === "checkEmail") {
      schema = schema.email({ minDomainAtoms: 2 });
    } else if (key === "checkPassword") {
      schema = schema.regex(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}/
      );
    }
  }
  return Joi.validate(value, schema);
};
