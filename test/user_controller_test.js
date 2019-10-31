const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const User = mongoose.model('user');

describe('Users controller', () => {
  it('Post to /api/user creates a new user', (done) => {
    User.count().then(count => {
      request(app)
        .post('/api/user')
        .send({ email: "sultan1640@gmail.com",firstName: "sunny",lastName: "sultan",isSocial : true })
        .end(() => {
          User.count().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  it('Post to /api/user requires email, firstname, lastname and issocial for create new user',(done)=>{
      request(app)
        .post('/api/user')
        .send({})
        .end((err,res)=>{
            assert(res.body.error)
            done();
        })
  });

            

});
