const {Router}= require('express');
const https = require('https');
const { Op } = require('sequelize');
const {Dog, Temperament} = require('../db.js');
const {getPromise} = require('./apiCallers')

const dogs = Router();



dogs.get('/', function(req,res){
    var dbQuery, apiQuery;
    if(req.query.name){
        apiQuery= getPromise(`https://api.thedogapi.com/v1/breeds/search?q=${req.query.name}`);
        dbQuery= Dog.findAll({
            where:{
                name:{
                    [Op.substring]:req.query.name
                }
            }
        })
        
    }else{
        apiQuery = getPromise(`https://api.thedogapi.com/v1/breeds`)
        dbQuery = Dog.findAll()
    }
    dbQuery.then(data =>
        Promise.all(
            data.map(dog =>
                dog.getTemperaments({attributes:['name']})
                .then(tempers =>(   {name:dog.name,temperaments:tempers, img:null, weight:dog.weight }  ))
            )
        )  
    );
    apiQuery.then(data=> data.map(dog=> (   {name:dog.name, temperaments:dog.temperament, weight:dog.weight.metric, img:dog.image.url}  )))

    Promise.all([dbQuery,apiQuery])
    .then(  (data)=>res.send( {dbData:data[0], apiData:data[1]}    ) )

})

dogs.get('/:id', function(req,res){
    var result;
    if(typeof req.params.id === 'string' && req.params.id[0] === 'd'){
        let databaseId = parseInt(req.params.id.substring(1));
        result = Dog.findByPk(databaseId)
        .then(dog=>
            dog.getTemperaments()
            .then((tempers)=>({
                name:dog.name,
                temperaments:tempers,
                img:null,
                weight:dog.weight,
                height:dog.height,
                life_expectancy:dog.life_expectancy
                })
            )
        )
    }else{
        
        result = getPromise(`https://api.thedogapi.com/v1/breeds`)
        .then(data =>  data.find(elem=> (elem.id==req.params.id)   ));
    }
    result.then(found=> {console.log(found);res.send(found)});
})

dogs.post('/', function(req,res){
    Dog.create(req.body.dog)
    .then((dog)=>{
        Temperament.findAll({where:{
            id:{[Op.in]:req.body.temperamentIds}
        }})
        .then((found)=>dog.setTemperaments(found));
    })
    .then(()=> res.status(201).send());
})

module.exports={dogs};