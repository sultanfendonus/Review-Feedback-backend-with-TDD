const Category = require('../models/Category')

module.exports = {
  async create(req, res, next) {

    try {
      const category = new Category({name: req.body.name, thumbnail: req.body.thumbnail})
      await category.save();
      res.send({message: 'Category added Successfully Added.'})

    } catch (err){
      next(err)
    }
  },

  async list(req, res, next){
    try {
      const categories = await Category.find({});
      res.send(categories)
    } catch (error) {
      next(error)
    }
  }


};
