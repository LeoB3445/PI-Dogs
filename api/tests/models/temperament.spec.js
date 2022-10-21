const {Temperament, conn} = require('../../src/db');
const {expect} = require('chai')

xdescribe('Temperament model', ()=>{
    before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
    describe('validators', ()=>{
        beforeEach(()=>{Temperament.sync({force:true})})
        it('should not work if name is null',(done)=>{
            Temperament.create({name:null})
            .then(()=>done(new Error('Should not have passed with null name')))
            .catch(()=>done());
        })
        it('should operate normally if name is valid', ()=>{
            Temperament.create({name:'sleepy'})
        })
    })
})