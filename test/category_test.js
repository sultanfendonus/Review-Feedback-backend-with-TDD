const Category = require('../models/Category')
const assert = require('assert');

describe("create A Category",()=>{
    it('should create new category directly by mongoose schema',(done)=>{
        const category = new Category({name: 'Apps',thumbnail: 'https://xyzthumbnail.com/jdfljlj'});
        category.save()
            .then((result)=>{
                assert(!category.isNew);
                done();
            });
    })
})