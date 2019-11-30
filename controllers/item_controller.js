const Item = require('../models/Item')

module.exports = {
  async create(req, res, next) {
    try {
      const imageUrl = req.file.destination + req.file.filename
      
      const item = new Item({
        userId: req.user.id.toString(),
        title: req.body.title,
        description: req.body.description,
        image: imageUrl,
        categoryId: req.body.categoryId
      })

      const savedItem = await item.save()
      res.send(savedItem);

    } catch (err){
      next(err)
    }
  },



};
