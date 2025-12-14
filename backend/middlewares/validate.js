const { Joi, celebrate } = require("celebrate");

module.exports.validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(30).optional(),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});


module.exports.validateId = celebrate({
  params: Joi.object().keys({
       id: Joi.string().min(1).required(),  
  }),
});