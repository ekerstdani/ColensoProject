var express = require('express');
var router = express.Router();

var basex = require('basex');
var client = new basex.Session("127.0.0.1", 1984, "admin", "admin");
client.execute("OPEN Colenso");



/* GET home page. */
router.get("/",function(req,res){
  client.execute("XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0';" +
      " (//name[@type='place'])[1] ",
      function (error, result) {
        if(error){ console.error(error);}
        else {
          res.render('index', { title: 'Colenso Project', place: result.result });
      }
      }
  );
});





router.get('/search',function(req,res) {
    var queries = req.query;
    client.execute("XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0'; " +
        "//name[. = 'James Hector'" + queries.mysearch + "]",
            function (err, res) {
            if (!err) console.log(res.result)
        })
})






module.exports = router;