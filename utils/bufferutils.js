'use strict';

exports.readBytesAsInt = function(buffer) {
	if (!buffer || !Buffer.isBuffer(buffer)) {
		throw new TypeError('Argument must be a buffer.');
	}

	let value = 0;

	for (let shift = (buffer.length - 1) * 8, offset = 0; offset < buffer.length; shift -= 8, offset++) {
		value += buffer[offset] << shift;
	}

	return value;
};