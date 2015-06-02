'use strict';

exports.decode = function(bytes, parentOffset, Decoder) {
	let 
		content = bytes.slice(1, bytes.length),
		decoder = new Decoder(content, parentOffset + 1);

	if (decoder.isValid()) {
		return decoder.decode();
	} else {
		let 
			bitString = '',
			padding = bytes[0],
			currentByte = 1, currentBit = 0x80,
			numBits = (bytes.length - 1) * 8 - padding;

		for (let i = 0; i < numBits; i++) {
			if ((bytes[currentByte] & currentBit) == currentBit) {
				bitString += '1';
			} else {
				bitString += '0';
			}

			if (currentBit == 0x01) {
				currentBit = 0x80;
				currentByte++;
			} else {
				currentBit >>= 1;
			}
		}

		return bitString;
	}
};