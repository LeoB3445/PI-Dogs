/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dummy = {
  name:'doggo',
  height: 12,
  weight:27,
  life_expectancy: 3
}

describe('dog routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
  describe('POST /dogs', ()=>{
    it('should get 201 if given a valid dog', ()=>{
      agent.post('/dogs', dummy).expect(201);
    })
  })
});
