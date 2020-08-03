// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const Joi = require('@hapi/joi');

const schema = Joi.object({
  title: Joi.string().required().max(100),
  badge: Joi.string().max(1),
  badgeText: Joi.string().allow(null, '').max(50),
  pushDate: Joi.date().required(),
})

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { error } = schema.validate(context.data);
    if (error) { throw new Error(error) };
    const data = {
      title: context.data.title,
      completed: false,
      user_id: context.params.user.github_id,
      createdAt: new Date(),
      badge: context.data.badge,
      badgeText: context.data.badgeText,
      pushDate: new Date(context.data.pushDate),
    };
    context.data = data;
    return context;
  };
};
