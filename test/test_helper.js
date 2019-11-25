const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/feedu_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', error => {
      console.warn('Warning', error);
    });
});

beforeEach((done)=>{
  const {users, categories, items, reviews} = mongoose.connection.collections;
    users.drop(()=>{
      categories.drop(()=>{
            items.drop(()=>{
              reviews.drop(()=>{
                done();
              })
            })
        })
    })
})
