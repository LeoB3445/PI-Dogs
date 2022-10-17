const {Router}= require('express');
const {$} = require('jquery');
const { Op } = require('sequelize');
const {Dogs, Temperament} = require('../db');

const dogs = Router();

dogs.get('/', function(req,res){
    var dbQuery, apiQuery;
    if(req.query.name){
        apiQuery= $.get(`https://api.thedogapi.com/v1/breeds/search?q=${req.query.name}`);
        console.log(apiQuery)
        dbQuery= Dogs.findAll({
            where:{
                name:{
                    [Op.substring]:req.query.name
                }
            }
        })
        
    }else{
        apiQuery = $.get(`https://api.thedogapi.com/v1/breeds`)
        dbQuery = Dogs.findAll()
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
    .then(  (data)=>res.send( {dbData:data[0], apiData:data[0]}    ) )
    .catch((err)=> res.status(500).send(err))
})

module.exports={dogs};