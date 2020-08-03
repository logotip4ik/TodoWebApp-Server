const { Service } = require('feathers-mongodb');

exports.Todo = class Todo extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('todo');
    });
  }
};
