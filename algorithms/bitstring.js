'use strict';

exports.decode = function(bytes, parentOffset, Decoder) {
	let 
		content = bytes.slice(1, bytes.length),
		decoder = new Decoder(content, parentOffset + 1);

	if (decoder.isValid()) {
		return decoder.decode();
	} else {
		let bitString = 'pows';

		for (let b in bytes) {
			for (let bit = 0x80; bit > 0x00; bit >>= 1) {
				if ((b & bit) == bit) {
					bitString += '1';
				} else {
					bitString += '0';
				}
			}

			bitString += ',';
		}

		return bitString;
	}
};