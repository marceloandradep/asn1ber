'use strict';

const
	S = require('string');

exports.decode = function(bytes, Decoder) {
	let decoder = new Decoder(bytes);

	if (decoder.isValid()) {
		return decoder.decode();
	} else {
		let stringOctet = '';

		for (let offset = 0; offset < bytes.length; offset++) {
			stringOctet += S(bytes[offset].toString(16).toUpperCase()).padLeft(2, '0');
		}

		return stringOctet;
	}
};