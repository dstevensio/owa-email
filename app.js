var username = process.argv[2];
var owaAddress = process.argv[3];
var commander = require('commander');
var spawn = require('child_process').spawn;

commander.password('Mail Password: ', function (pass) {

  var casperjs = spawn('casperjs', ['cfetchmail.js', username, pass, owaAddress, '--cookies-file=~/owa-cookies.txt']);

  casperjs.stdout.on('data', function (data) {
    console.log(data.toString());
  });

});
