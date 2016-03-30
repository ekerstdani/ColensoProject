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
        " (//name[@type='place'])[1] ",
        function (error, result) {
            if(error){ console.error(error);}
            else {
                res.render('database', { title: 'Colenso Project', place: result.result });
            }
        }
    );
});



module.exports = router;