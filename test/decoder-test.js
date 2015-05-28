'use strict';

const
	fs = require('fs'),
	log = require('bunyan').createLogger({ name: 'decoder-test' }),
	Decoder = require('../decoder/decoder');

let decoder = new Decoder(new Buffer([0x7f, 0x60, 0xa1]));
decoder._reset();
console.log(decoder._readBytesAsInt(3));

/*fs.readFile("response-node.txt", function(err, data) {
	if (err) {
		throw err;
	}

	let 
		decoder = new Decoder(data),
		asn1 = decoder.decode();

	log.info({ asn1: asn1 });
});*/