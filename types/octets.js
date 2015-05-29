'use strict';

const
	masks = require('./bitmasks'),
	consts = require('./constants'),
	util = require('util');

/**
 * Octet implementation
 */
function Octet(byte) {
	if (typeof byte != 'number') {
		throw new TypeError('Argument must be a number.');
	}

	this._byte = byte;
};

Octet.prototype.readBits = function(mask) {
	if (typeof mask != 'number') {
		throw new TypeError('Argument must be a number.');
	}

	return this._byte & mask;
};

/**
 * Identifier Octet implementation
 */
function IdentifierOctet(byte) {
	Octet.call(this, byte);

	this.tagClass = this.readBits(masks.tagClass);
	this.tagForm = this.readBits(masks.tagForm);
	this.tagNumber = this.readBits(masks.tagNumber);
}

util.inherits(IdentifierOctet, Octet);

IdentifierOctet.prototype.isPrimitive = function() {
	return this.tagForm === consts.Primitive;
};

IdentifierOctet.prototype.isConstructed = function() {
	return this.tagForm === consts.Constructed;
};

IdentifierOctet.prototype.isUniversal = function() {
	return this.tagClass === consts.Universal;
}

/**
 * Length Octet implementation
 */
function LengthOctet(byte) {
	Octet.call(this, byte);

	this.lengthForm = this.readBits(masks.lengthFormFlag);
	this.lengthValue = this.readBits(masks.lengthValueBits);
}

util.inherits(LengthOctet, Octet);

LengthOctet.prototype.isShortForm = function() {
	return this.lengthForm === consts.ShortForm;
};

LengthOctet.prototype.isLongForm = function() {
	return this.lengthForm === consts.LongForm;
};

exports.Octet = Octet;
exports.IdentifierOctet = IdentifierOctet;
exports.LengthOctet = LengthOctet;