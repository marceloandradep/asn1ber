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

module.exports = Tag;