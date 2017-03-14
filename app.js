'use strict';

var async = require('async');
var hdb = require('hdb');
var client = require('./lib/client');
var sql_command = "";

const express = require('express');
const app = express();

// [START hdb_client]
function connect(cb) {
  client.connect(cb);
}

function disconnect(rows, cb) {
  function done(err) {
    cb(err, rows);
  }
  client.disconnect(done);
}

function executeSQLArray(cb) {
  var options = {
    rowsAsArray: true
  };
  client.exec(sql_command, options, cb);
}

function executeSQL(cb) {
  client.exec(sql_command, cb);
}
// [END hdb_client]

app.get('/', function (req, res) {
  sql_command = "SELECT VALUE FROM SYS.M_SYSTEM_OVERVIEW WHERE NAME = 'Version'";
  async.waterfall([connect, executeSQL, disconnect], function (err, rows) {
      client.end();
      if (err) {
          return console.error(err);
      }
      res.send("System Version: " + rows[0].VALUE);
  });
})

if (module === require.main) {
  // [START server]
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;