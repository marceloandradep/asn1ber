'use strict';

exports.decode = function(bytes, parentOffset, Decoder) {
	if (bytes[0] == 0) {
		bytes = bytes.slice(1, bytes.length);
		parentOffset++;

		let decoder = new Decoder(bytes, parentOffset);

		if (decoder.isValid()) {
			return decoder.decode();
		} else {
			return bytes;
		}
	} else {
		let bitString = '';

		for (let b in bytes) {
			for (let bit = 0x80; bit > 0x00; bit >>= 1) {
				if ((b & bit) == bit) {
					bitString += '1';
				} else {
					bitString += '0';
				}
			}
		}

		return bitString;
	}
};