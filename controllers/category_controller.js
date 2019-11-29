const Category = require('../models/Category')


module.exports = {
  async create(req, res, next) {

    try {
      const imageUrl = req.file.destination + req.file.filename
      const category = new Category({name: req.body.name, thumbnail: imageUrl})
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
