'use strict';

const
	fs = require('fs'),
	log = require('bunyan').createLogger({ name: 'decoder-test' }),
	Decoder = require('../decoder/decoder');

fs.readFile("C:/temp/output-node.txt", function(err, data) {
	if (err) {
		throw err;
	}

	let 
		decoder = new Decoder(data),
		asn1 = decoder.decode();

	log.info({asn1: asn1});
});