'use strict';

const
	octets = require('../types/octets'),
	IdentifierOctet = octets.IdentifierOctet,
	LengthOctet = octets.LengthOctet,
	Tag = require('../types/tag'),
	decoders = require('./tagdecoders');

function Decoder(data, parentOffset) {
	if (!data || !Buffer.isBuffer(data)) {
		throw new TypeError('Data must be a buffer.');
	}
	this._buffer = data;
	this._parentOffset = ( parentOffset ? parentOffset : 0 );
}

Decoder.prototype.isValid = function() {
	this._reset();

	let
		identifierOctet = this._processIdentifier(), 
		lengthOctet = this._processLength(), 
		totalLength = 2, length;

	if (lengthOctet.isShortForm()) {
		totalLength += lengthOctet.lengthValue;
	} else {
		totalLength += lengthOctet.lengthValue + this._readBytesAsInt(lengthOctet.lengthValue);
	}

	return (identifierOctet.isUniversal() && totalLength == this._buffer.length);
};

Decoder.prototype.decode = function() {
	this._reset();
	return this._processOctet();
};

Decoder.prototype._reset = function() {
	this._offset = 0;
};

Decoder.prototype._isOutOfLimits = function() {
	return this._offset >= this._buffer.length;
}

Decoder.prototype._peekOctet = function() {
	return this._buffer[this._offset];
};

Decoder.prototype._readOctet = function() {
	let octet = this._peekOctet();
	this._offset++;
	return octet;
};

Decoder.prototype._processOctet = function() {
	let
		tagOffset = this._offset,
		identifierOctet, lengthOctet,
		length = 0, lengthLeft = 0,
		value, childTag;

	identifierOctet = this._processIdentifier();
	lengthOctet = this._processLength();

	if (lengthOctet.isShortForm()) {
		length = lengthOctet.lengthValue;
	} else {
		length = this._readBytesAsInt(lengthOctet.lengthValue);
	}

	lengthLeft = length;
	
	if (identifierOctet.isConstructed()) {
		value = [];

		while (lengthLeft > 0) {
			childTag = this._processOctet();
			value.push(childTag);
			lengthLeft -= childTag.length;
		}
	} else {
		value = this._processValue(identifierOctet, lengthLeft);
	}

	return new Tag(identifierOctet, lengthOctet, length, tagOffset + this._parentOffset, value);
};

Decoder.prototype._processIdentifier = function() {
	return new IdentifierOctet(this._readOctet());
};

Decoder.prototype._processLength = function() {
	return new LengthOctet(this._readOctet());
};

Decoder.prototype._processValue = function(identifierOctet, length) {
	if (length > 0) {
		try {
			return decoders.parse(identifierOctet.tagNumber, this._readBytesAsBuffer(length), Decoder);
		} catch (ex) {
			throw ex;
		}
	}
};

Decoder.prototype._readBytesAsInt = function(nBytes) {
	if (!nBytes || typeof nBytes != 'number' || nBytes < 0) {
		throw new TypeError('Argument must be a valid number greater than 0. Offset: ' + this._offset);
	}

	let value = 0;

	for (let shift = (nBytes - 1) * 8; shift >= 0; shift -= 8) {
		value += this._readOctet() << shift;
	}

	return value;
};

Decoder.prototype._readBytesAsBuffer = function(nBytes) {
	if (!nBytes || typeof nBytes != 'number' || nBytes < 0) {
		throw new TypeError('Argument must be a valid number greater than 0. Offset: ' + this._offset);
	}

	let buffer = this._buffer.slice(this._offset, this._offset + nBytes);
	this._offset += nBytes;

	return buffer;
};

module.exports = Decoder;