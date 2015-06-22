'use strict';

const
	types = require('../decoder/tagdecoders').types;

function Tag(identifierOctet, lengthOctet, length, offset, value) {
	if (lengthOctet) {
		// the tag length is at least of 2 bytes (identifierOcter + lengthOctet)
		let tagLength = 2;

		if (lengthOctet.isLongForm()) {
			tagLength += lengthOctet.lengthValue;
		}

		this.tagLength = tagLength;
		this.contentLength = length;
		this.length = this.tagLength + this.contentLength;
	}

	this.offset = offset;

	if (identifierOctet) {
		this.tagClass = identifierOctet.tagClass;
		this.tagForm = identifierOctet.tagForm;
		this.tagNumber = identifierOctet.tagNumber;

		if (identifierOctet.isUniversal()) {
			this.tagDescription = types[this.tagNumber].description;	
		} else {
			this.tagDescription = '[' + this.tagNumber + ']';
		}

		if (identifierOctet.isConstructed()) {
			if (value) {
				this.elementCount = value.length;
			} else {
				this.elementCount = 0;
			}
		}

		this.value = value;
	}
};

Tag.prototype.matches = function(tagNumber, tagForm, tagClass) {
	if (tagNumber < 0) {
		throw new TypeError('You must provide a valid tagNumber.');
	}

	let
		matchesNumber, matchesForm = true, matchesClass = true;

	matchesNumber = tagNumber === this.tagNumber;

	if (tagForm) {
		matchesForm = tagForm === this.tagForm;
	}

	if (tagClass) {
		matchesClass = tagClass === this.tagClass;
	}

	return matchesNumber && matchesForm && matchesClass;
}

module.exports = Tag;