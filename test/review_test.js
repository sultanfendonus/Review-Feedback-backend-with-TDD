const Review = require('../models/Review')
const assert = require('assert');

describe('All Review Related Test',()=>{
     it('should add a review directly by mongoose Schema',(done)=>{
        const review = new Review({itemId: 'dd',userId:'aa',rate: '3',review: 'dddddd',vote:'56'})

        review.save()
            .then((res)=>{
                assert(!review.isNew)
                done();
            })
     })
})