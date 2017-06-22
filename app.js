// Copyright 2017 SAP SE.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http: //www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied. See the License for the specific
// language governing permissions and limitations under the License.
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
  // Execute a SQL command to access the version of the SAP HANA server
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