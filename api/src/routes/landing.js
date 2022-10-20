const {Router} = require('express')
const path= require('path')
const landing = Router();
const buildpath = path.resolve('../client/build');
landing.get('*',function(req,res){
    if(req.path === ''){
        res.sendFile(path.join(buildpath,'index.html'));
    }else{
        res.sendFile(path.join(buildpath,req.path));
    }
})

module.exports = {landing}