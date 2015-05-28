'use strict';

exports.decode = function(bytes) {
	let stringOctet = '';

	for (let offset = 0; offset < bytes.length; offset++) {
		stringOctet += bytes[offset].toString(16);
	}

	return stringOctet;
}