const {Router}= require('express');
const {Temperament} = require('../db');
const { getPromise } = require('./apiCallers');

const temperaments = Router();

temperaments.get('/', function(req,res){
    (async ()=>{
        const count =  await Temperament.count();
        if(count ===0){
            let rawData = await getPromise('https://api.thedogapi.com/v1/breeds');
            let temperaments = new Set();
            let outGoing = [];
            rawData.forEach(elem =>{
                if(elem.temperament){
                    let separateTempers = elem.temperament.split(', ');
                    separateTempers.forEach(temper=> temperaments.add(temper));
                }
            })
            temperaments.forEach(element=> outGoing.push(Temperament.create({name:element})));
            return Promise.all(outGoing);
        }else{
            return Temperament.findAll();
        };
    })().then(data=> res.send(data));
        
})

module.exports= {temperaments};