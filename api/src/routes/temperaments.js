const {Router}= require('express');
const {Temperament} = require('../db');
const { getPromise } = require('./apiCallers');

const temperaments = Router();

temperaments.get('/', function(req,res){
    const count = (async () => await Temperament.count())();
    console.log(count);
    if(count ===0){
        let rawData = (async () => await getPromise('https://api.thedogapi.com/v1/breeds'))();
        let temperaments = new Set();
        let outGoing = [];
        rawData.forEach(elem =>{
            elem.temperament.split(', ').forEach(temper=> temperaments.add(temper))
        })
        temperaments.forEach(element=> outgoing.push(Temperament.create({name:element})));
        Promise.all(outGoing)
        .then(data => res.send(data)); 
    }else{
        Temperament.findAll()
        .then(data=> res.send(data));
    };
        
})