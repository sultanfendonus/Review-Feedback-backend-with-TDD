const Review = require('../models/Review')
const Item = require('../models/Item')

module.exports = {
  async create(req, res, next) {
    try {
        const review = new Review({
            userId: req.user.id,
            itemId: req.body.itemId,
            rate: req.body.rate,
            review: req.body.review
        })
        const response = await review.save();

        if(req.body.rate === '5'){
            await Item.findOneAndUpdate({_id: req.body.itemId}, {$inc: {num_of_rate: 1, total_rate_point:req.body.rate, tenStars:1}})
        }else{
            await Item.findOneAndUpdate({_id: req.body.itemId}, {$inc: {num_of_rate: 1, total_rate_point:req.body.rate}})
        }

        res.send(response);

    } catch (err){
      next(err)
    }
  },

  async all(req, res, next){
    try {
      const review = await Review.find({}).sort({vote: -1})

      const pageCount = Math.ceil(review.length / 10);
      let page = parseInt(req.query.p);
      if (!page) { page = 1;}
      if (page > pageCount) {
        page = pageCount
      }
      res.json({
        "page": page,
        "pageCount": pageCount,
        "items": review.slice(page * 10 - 10, page * 10)
      });
    } catch (error) {
      next(error)
    }
  }



};
