'use strict';

const
	fs = require('fs'),
	log = require('bunyan').createLogger({ name: 'decoder-test' }),
	Decoder = require('../index').Decoder;

fs.readFile("response-node.txt", function(err, data) {
	if (err) {
		throw err;
	}

	//var data = new Buffer([0x30, 0x0d, 0x06, 0x09, 0x60, 0x86, 0x48, 0x01, 0x65, 0x03, 0x04, 0x02, 0x01, 0x05, 0x00]);

	let 
		decoder = new Decoder(data),
		asn1 = decoder.decode();

	log.info({ asn1: asn1 });
});