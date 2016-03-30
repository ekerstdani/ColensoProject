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


/* GET View page. */
router.get('/view', function(req, res, next) {
    var title = req.query.Title;
    var querySearch = req.query.queryFile;
    var logicSearch = req.query.logicQuery;
    if(title){
        if(title !== undefined){
            var query = "XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0'; for $t in //text where matches($t, '" + title + "', 'i') return db:path($t)";
            //var query = "XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0';  " + "for $t in "+title+" return db:path($t)";

            client.execute(query,
                function(error, result){
                    if(error){
                        console.error(error);
                    }else{

                        res.render('view', { title: 'Search page',results: result.result.split('\n')});
                    }
                });
        }
    }

    else if(logicSearch){
        var logicString = "'" + logicSearch + "'";
        logicString = logicString.replace(" AND ", '\' ftand \'').replace(" OR ", '\' ftor \'').replace(" NOT ", '\' ftnot \'');
        var query = "XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0';  " + "for $t in //TEI[. contains text "+ logicString +" using wildcards] return db:path($t)";
        client.execute(query,
            function(error, result){
                if(error){
                    console.error(error);
                }else{
                    res.render('view', {title: 'Search Page', results: result.result.split('\n')});
                }
            });
    }
    else if(querySearch){
        if(querySearch !== undefined){
            var query = "XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0';  " + "for $t in "+ querySearch +" return db:path($t)";

            client.execute(query,
                function(error, result){
                    if(error){
                        console.error(error);
                    }else{

                        res.render('view', { title: 'Search page', results: result.result.split('\n')});
                    }
                });
        }
    }
    else{
        res.render('view', { title: 'Colenso Search page', results: []});
    }
});


router.get('/open', function(req,res){
    var path = req.query.path
    console.log(path)
    client.execute("XQUERY doc('./Colenso/"+path+"')",
        function(error, result){
            if(error){
                console.error(error);
            }else{
                res.render('open', {title: 'Result', place: result.result});
            }
        });
})







///////////////////////////////////////////////////////////

// Browse

router.get('/browse', function(req, res, next) {
    client.execute("XQUERY declare namespace tei='http://www.tei-c.org/nx/1.0'; " + "db:list('Colenso')",
        function(error, result){
            if(error){
                console.error(error);
            }else{
                //console.log(result);
                res.render('browse', { title: 'Library Page', place: result.result.split('\n')});
            }
        });

});


//

/*
router.get('/document/view', function(req, res) {
    if(req.query.doc!=undefined){
        console.log(req.query.doc);
        client.execute("XQUERY doc('Colenso/"+req.query.doc+"')",
            function (error, result) {
                if(error){ console.error(error);}
                else {
                    res.render('open', { content: result.result, title: req.query.doc, download: "/document/download?doc="+req.query.doc });
                }
            }
        );
    } else {
        res.render('open', { content: req.query.doc });
    }
});*/
module.exports = router;