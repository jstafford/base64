var fs = require('fs');
var regenerate = require('regenerate');
var template = require('lodash.template');

// http://whatwg.org/html/common-microsyntaxes.html#space-character
var spaceCharacters = regenerate(
	0x0020, // U+0020 SPACE
	0x0009, // U+0009 CHARACTER TABULATION (tab)
	0x000A, // U+000A LINE FEED (LF)
	0x000C, // U+000C FORM FEED (FF)
	0x000D  // U+000D CARRIAGE RETURN (CR)
);

var packageStr = fs.readFileSync('package.json', 'utf-8');
var packageJson = JSON.parse(packageStr);

var data = {
	'spaceCharacters': spaceCharacters.toString(),
	'version': packageJson.version
};

// the following based on code from gulp-template by Sindre Sorhus at
// https://github.com/sindresorhus/gulp-template/blob/master/index.js
var templateStr = fs.readFileSync('./src/base64.js', 'utf-8');
var templateFunc = template(templateStr);
var buffer = new Buffer(templateFunc(data));
fs.writeFileSync('./lib/index.js', buffer);
