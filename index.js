'use strict';

const
	Decoder = require('./decoder/decoder'),
	consts = require('./types/constants');

module.exports = {
	Decoder: Decoder,
	types: consts
};