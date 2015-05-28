'use strict';

const
	octets = require('../types/octets'),
	IdentifierOctet = octets.IdentifierOctet,
	LengthOctet = octets.LengthOctet;

function Decoder(data) {
	if (!data || !Buffer.isBuffer(data)) {
		throw new TypeError('Data must be a buffer.');
	}
	this._buffer = data;
}

Decoder.prototype.decode = function() {
	this._reset();
	return this._processOctet();
};

Decoder.prototype._reset = function() {
	this._offset = 0;
}

Decoder.prototype._peekOctet = function() {
	return this._buffer[this._offset];
}

Decoder.prototype._readOctet = function() {
	let octet = this._peekOctet();
	this._offset++;
	return octet;
}

Decoder.prototype._processOctet = function() {
	let
		identifierOctet = this._processIdentifier(),
		lengthOctet = this._processLength(),
		length = 0;

	if (lengthOctet.isShortForm()) {
		length = lengthOctet.lengthValue;
	} else {
		length = this._readBytesAsInt(lengthOctet.lengthValue);
	}

	return new Tag(identifierOctet, lengthOctet, length, this._processOctet());
}

Decoder.prototype._processIdentifier = function() {
	return new IdentifierOctet(this._readOctet());
}

Decoder.prototype._processLength = function() {
	return new LengthOctet(this._readOctet());
}

Decoder.prototype._readBytesAsInt = function(nBytes) {
	if (!nBytes || typeof nBytes != 'number' || nBytes < 0) {
		throw new TypeError('Argument must be a valid number greater than 0.');
	}

	let value = 0;

	for (let shift = (nBytes - 1) * 8; shift >= 0; shift -= 8) {
		value += this._readOctet() << shift;
	}

	return value;
}

module.exports = Decoder;