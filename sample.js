fbAPI = require('./fbAPI');

var client = new fbAPI();
client.me.get('groups');
client.me.get('home');