'use strict';

const
	masks = require('./bitmasks'),
	consts = require('./constants'),
	util = require('util');

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

function IdentifierOctet(byte) {
	Octet.call(this, byte);

	let self = this;
	this.__defineGetter__('tagClass', function() {
		return self.readBits(masks.tagClass);
	});
	this.__defineGetter__('tagForm', function() {
		return self.readBits(masks.tagForm);
	});
	this.__defineGetter__('tagNumber', function() {
		return self.readBits(masks.tagNumber);
	});
}

function LengthOctet(byte) {
	Octet.call(this, byte);

	let self = this;
	this.__defineGetter__('lengthForm', function() {
		return self.readBits(masks.lengthFormFlag);
	});
	this.__defineGetter__('lengthValue', function() {
		return self.readBits(masks.lengthValueBits);
	});
}

LengthOctet.prototype.isShortForm = function() {
	return this.lengthForm === consts.ShortForm;
}

LengthOctet.prototype.isLongForm = function() {
	return this.lengthForm === consts.LongForm;
}

util.inherits(IdentifierOctet, Octet);
util.inherits(LengthOctet, Octet);

module.exports = {
	Octet: Octet,
	IdentifierOctet: IdentifierOctet,
	LengthOctet: LengthOctet
};