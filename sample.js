fbAPI = require('./fbAPI');

var client = new fbAPI();
client.get('me', {fields: 'first_name,gender,last_name,location,education'})
client.get('/me/groups');
client.get('me/home');