/**
 * Created by Daniel on 27/03/2016.
 */

var express = require('express');
var router = express.Router();

var basex = require('basex');
var client = new basex.Session("127.0.0.1", 1984, "admin", "admin");
client.execute("OPEN Colenso");




// Tag Search
router.get("/",function(req,res){
    client.execute("XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0';" +
        " (//" +req.query.tagString +")[position() = (1 to 10)]",
        function (error, result) {

            // Make the Query array
            var str = result.result;
            str = str.substring(1 + req.query.tagString.length,str.length)
            str=str.split("<"+req.query.tagString);

            for(var i=0;i<str.length;i++){
                str[i]="<"+req.query.tagString+str[i]
            }
            console.log(str);
            //Rest of
            if(error){ console.error(error);}
            else {
                res.render('database', { title: 'Colenso Database', query: str });
}
        }
    );
});

//String Search
router.get("/",function(req,res){
    client.execute("XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0'; " +
        "//name[@type = 'place' and position() = 1 and . = '"+req.query.nameString+"']",
        function (error, result) {
            var str = result.result;
            str=str.split(req.query.nameString);
            console.log(str);
            if(error){ console.error(error);}
            else {
                //for loop

                res.render('database', { title: 'Colenso Database', query: str });
            }
        }
    );
});




module.exports = router;