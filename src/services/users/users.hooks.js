const { authenticate } = require('@feathersjs/authentication').hooks;
const { setField } = require('feathers-authentication-hooks');

const limitToUser = setField({
  from: 'params.user._id',
  as: 'params.query._id'
})

module.exports = {
  before: {
    all: [ ],
    find: [ authenticate('jwt'), limitToUser ],
    get: [ authenticate('jwt'), limitToUser ],
    create: [  ],
    update: [  authenticate('jwt'), limitToUser ],
    patch: [  authenticate('jwt'), limitToUser ],
    remove: [ authenticate('jwt'), limitToUser ]
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
