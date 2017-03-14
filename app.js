'use strict';

var async = require('async');
var hdb = require('hdb');
var client = require('./lib/client');
var sql_command = "";

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

sql_command = "SELECT VALUE FROM SYS.M_SYSTEM_OVERVIEW WHERE NAME = 'Version'";
async.waterfall([connect, executeSQL, disconnect], function (err, rows) {
    client.end();
    if (err) {
        return console.error(err);
    }
    console.log("System Version: " + rows[0].VALUE);
});
