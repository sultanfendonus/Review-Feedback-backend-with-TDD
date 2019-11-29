const UserController = require('../controllers/user_controller');
const CategoryController = require('../controllers/category_controller');
const Auth = require('../auth/userAuth')
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+ file.originalname)
  }
})

const CategoryImageUpload = multer({ storage: storage });


module.exports = (app) => {
  //User Route
  //create a new user by post method
  app.post('/api/user', UserController.create)
  app.post('/api/user/login',UserController.login)
  app.post('/api/user/auto-login',UserController.autoLogin)
  app.post('/api/user/update',Auth,UserController.updateProfile)

  //Category Route
  app.post('/api/category/new', CategoryImageUpload.single('image'), CategoryController.create)
  app.get('/api/category/list', Auth, CategoryController.list)
  //app.post('/api/category/update', Auth, CategoryController.update)
  //app.post('/api/category/delete', Auth, CategoryController.delete)
};
