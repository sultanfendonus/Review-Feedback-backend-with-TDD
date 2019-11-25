const Item = require('../models/Item')
const assert = require('assert');

describe('Test for Item Model',()=>{
      it('should create an item direct by mongoose Schema',async ()=>{
        const singleItem = new Item({userId: 'testUser',title: 'djfjd',description: 'dfjhfshkhrfkhdd',
            image: 'httpo',categoryId:'1'});

            const res = await singleItem.save();
            assert(!singleItem.isNew)
     })
})