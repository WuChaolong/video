// import fetch from 'node-fetch';
// or
const ampify = require('ampify');

// if you are using your own Promise library, set it through fetch.Promise. Eg.

// import Bluebird from 'bluebird';
// fetch.Promise = Bluebird;

// plain text or html
var html = `
<html>
  <head>
  </head>
  <img src="image.png">
</html>

  `
var amp = ampify(html, {cwd: 'amp'});
console.log(amp);