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

  async all(req, res, next){
    try {
      const items = await Item.find({}).sort({num_of_rate: -1})

      const pageCount = Math.ceil(items.length / 10);
      let page = parseInt(req.query.p);
      if (!page) { page = 1;}
      if (page > pageCount) {
        page = pageCount
      }
      res.json({
        "page": page,
        "pageCount": pageCount,
        "items": items.slice(page * 10 - 10, page * 10)
      });
    } catch (error) {
      next(error)
    }
  }



};
