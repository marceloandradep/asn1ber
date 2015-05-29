'use strict';

exports.decode = function(bytes, Decoder) {
	let
		nodes = [],
		value = 0;

	nodes.push(bytes[0] / 40 >> 0);
	nodes.push(bytes[0] % 40);

	for (let offset = 1; offset < bytes.length; offset++) {
		let octet = bytes[offset];

		value <<= 7;
		value += octet & 0x7f;

		if ((octet & 0x80) == 0) {
			nodes.push(value);
			value = 0;
		}
	}

	return nodes.join('.');
}