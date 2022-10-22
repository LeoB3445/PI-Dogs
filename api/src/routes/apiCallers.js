

const getPromise= function(url){
    return new Promise(function(resolve,reject){
        var req = https.get(url, function(res){
            if(res.statusCode !== 200)  return reject(new Error('failed get-statusCode:'+res.statusCode));
            var body = [];
            res.on('data',(chunk)=> {body.push(chunk)})
            res.on('end', ()=>{
                try{
                    body = JSON.parse(Buffer.concat(body).toString())
                }catch(e){
                    reject(e);
                }
                resolve(body);
            })
        });
        req.on('error', function(err) {
            reject(err);
        });
        req.end();
    });
}

module.exports= {getPromise};