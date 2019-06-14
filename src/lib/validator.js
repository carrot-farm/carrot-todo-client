import Joi from "joi";

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
