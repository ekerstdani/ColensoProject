/**
 * Created by Daniel on 27/03/2016.
 */

var express = require('express');
var router = express.Router();

var basex = require('basex');
var client = new basex.Session("127.0.0.1", 1984, "admin", "admin");
client.execute("OPEN Colenso");





module.exports = router;