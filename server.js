// Imports
var express = require('express');
var fs = require('fs');

var server = express(); // Create server
server.set("jsonp callback", true); // Enable JSONP

// Read in JSON file
function readJSON(file, callback)
{
  // Read in file
  fs.readFile(file, function(e, data)
  {
    if(e) { callback(e); return; } // Return error to callback
    try
    {
      // Return parsed data to callback if no error
      callback(null, JSON.parse(data));
    }
    catch(exception)
    {
      callback(exception); // Return exception to callback
    }
  });
}

// Return data from callback
server.get('/data', function(req, res)
{
  // Read the JSON data and send to JSONP response
  readJSON('miserables.json', function (e, json)
  {
    if (e) { throw e; }
    res.jsonp(json);
  });
});

server.listen(8080);