const { authenticate } = require('@feathersjs/authentication').hooks;
const { setField } = require('feathers-authentication-hooks');

const populateOwner = require('../../hooks/populate-owner');

const limitToUser = setField({
  from: 'params.user.github_id',
  as: 'params.query.user_id'
})

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [limitToUser],
    get: [limitToUser],
    create: [limitToUser, populateOwner()],
    update: [limitToUser, populateOwner()],
    patch: [limitToUser, (context) => {
      if (context.data.pushDate) {
        const { pushDate } = context.data;
        context.data.pushDate = new Date(pushDate);
        return context;
      } else {
        return context;
      }
    }],
    remove: [limitToUser]
  },
  
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
