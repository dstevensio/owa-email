var casper = require('casper').create();

casper.options.verbose = true;
casper.options.logLevel = 'debug';

casper.pageSettings = {
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.43 Safari/537.31',
  loadPlugins: false
};

casper.start(casper.cli.args[2], function () {
  this.capture('owaload.png');
  this.fill('form', {
    username: casper.cli.args[0],
    password: casper.cli.args[1]
    }, false);
  this.capture('owabeforesubmit.png');
  this.click('input[type=submit]');
});

casper.then(function () {
  this.capture('owaresult.png');
  this.echo(this.getCurrentUrl());
});

casper.then(function () {
  //this.echo(this.fetchText('div.cntnt > table > tbody'));
  this.capture('owafinal.png');
});

casper.evaluate(function () {
  this.echo(document.querySelector('div.cntnt > table > tbody'));
});

casper.run();
