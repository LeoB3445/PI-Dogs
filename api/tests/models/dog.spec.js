const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  const dummy = {
    name:'doggo',
    height: 12,
    weight:27,
    life_expectancy: 3
  }
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    it('Should operate normally if all parameters are valid',()=>{
      Dog.create(dummy)
    })
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({...dummy, name:null})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should throw an error if name is not a string',(done)=>{
        Dog.create({...dummy, name:[1,2,3]})
          .then(()=>done(new Error('it should not have accepted an int array as name parameter')))
          .catch(()=>done());
        })
      it('should not work if name is not unique', (done)=>{
        Dog.create(dummy)
        .then(()=>Dog.create(dummy))
        .then(()=>done(new Error('second creation should have thrown an error')))
        .catch(()=>done());
      })
    });
    describe('weight', ()=>{
      it('should not work if the number is below zero', ()=>{
        Dog.create({...dummy, weight:-1})
        .then(()=>done(new Error('should not have accepted minus one as weight')))
        .catch(()=>done());
      })
    })
    describe('height', ()=>{
      it('should not work if the number is below zero', ()=>{
        Dog.create({...dummy, height:-1})
        .then(()=>done(new Error('should not have accepted minus one as height')))
        .catch(()=>done());
      });
    });
    describe('life expectancy',()=>{
      it('should work even with a null value', ()=>{
        Dog.create({...dummy, life_expectancy:null})
      });
    })
  })
});
