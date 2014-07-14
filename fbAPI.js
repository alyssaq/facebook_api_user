var querystring = require('querystring');
var https = require('https');
var Promise = require('promise');
var config = require('./config');

function FbAPI() {
  this.base = 'https://graph.facebook.com/'
    + (config.version || '');
};

FbAPI.prototype.requestJson = function(url) {
  console.log('Getting data from ' + url);
  return new Promise(function (resolve, reject) {
    https.get(url, function (res) {
      var buffer = [];
      res.on('data', Array.prototype.push.bind(buffer));
      res.on('end', function () {
        var text = buffer.join('');
        var json = JSON.parse(text);
        if (res.statusCode < 400) {
          resolve(json);
        } else {
          console.error('Err! HTTP status code:', res.statusCode, url);
          reject(Error(text));
        }
      });
    }).on('error', function (err) {
      console.error('Err! HTTP request failed:', err.message, url);
      reject(err);
    });
  });
}

FbAPI.prototype.get = function(path, params) {
  var url = this.base;
  params = params || {};
  path = (path[0] == '/' ? path: '/' + path);
  params.access_token = config.access_token;
  url += path + '?' + querystring.stringify(params);

  return this.requestJson(url).then(function(data) {
    console.log('Fetched ' + JSON.stringify(data));
    return data;
  }).catch(function(err) {
    console.error('Error get: ' + err);
  })
};

module.exports = FbAPI;

