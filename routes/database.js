/**
 * Created by Daniel on 27/03/2016.
 */

var express = require('express');
var router = express.Router();

var basex = require('basex');
var client = new basex.Session("127.0.0.1", 1984, "admin", "admin");
client.execute("OPEN Colenso");




// Tag Search
router.get("/",function(req,res) {


    //Plying around with tryiing to make it a different search
/*
    if (req.query.tagString == undefined && req.query.nameString != undefined) {
        client.execute("XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0'; " +
            "// . = '" + req.query.nameString + "']",
            function (error, result) {

                // Make the Query array
                var str = result.result;
                console.log(str);
                tag=str.split(" ");
                tag=tag[0];
                console.log(tag);
                str = str.substring(1 + (req.query.nameString).length, str.length);
                str = str.split(tag);
                var length = str.length;
                for (var i = 0; i < str.length; i++) {
                    str[i] =  tag + str[i];

                }
                //Rest of
                if (error) {
                    console.error(error);
                }
                else {
                    console.log(str);

                    res.render('database', {title: 'Colenso Database', query: str, length:length})

                }
            }
        );
    }

*/




////Works

     if (req.query.tagString != undefined && req.query.nameString == undefined) {
        client.execute("XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0';" +
            " (//" + req.query.tagString + ")[position() = (1 to 10)]",
            function (error, result) {

                // Make the Query array
                var str = result.result;
                if (req.query.tagString == undefined) {
                    req.query = "";
                } else {
                    str = str.substring(1 + (req.query.tagString).length, str.length);
                    str = str.split("<" + req.query.tagString);
                    var length = str.length;
                    for (var i = 0; i < str.length; i++) {
                        str[i] = "<" + req.query.tagString + str[i];

                    }
                }
                //Rest of
                if (error) {
                    console.error(error);
                }
                else {
                    res.render('database', {title: 'Colenso Database', query: str, length: length})

                }
            }
        );
    }
    else {
        res.render('database', {title: 'Colenso Database'})


    }
})






module.exports = router;