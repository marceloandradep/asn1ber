'use strict';

const
	Decoder = require('../index').Decoder,
	bitstring = require('../algorithms/bitstring');

let 
	buffer = new Buffer([0x06, 0x6e, 0x5d, 0xe0]),
	str = bitstring.decode(buffer, 0, Decoder);

console.log(str);