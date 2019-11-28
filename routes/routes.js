const UserController = require('../controllers/user_controller');
const Auth = require('../auth/userAuth')

module.exports = (app) => {
  //User Route
  //create a new user by post method
  app.post('/api/user', UserController.create)
  app.post('/api/user/login',UserController.login)
  app.post('/api/user/auto-login',UserController.autoLogin)
  app.post('/api/user/update',Auth,UserController.updateProfile)
};
