const DriversController = require('../controllers/drivers_controller');
const UserController = require('../controllers/user_controller');

module.exports = (app) => {
  app.post('/api/drivers', DriversController.create);
  app.put('/api/drivers/:id', DriversController.edit);
  app.delete('/api/drivers/:id', DriversController.delete);
  app.get('/api/drivers', DriversController.index);
  //User Route
  app.post('/api/user',UserController.create)
};
