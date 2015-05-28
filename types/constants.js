'use strict';

const
	masks = require('./bitmasks');

module.exports = {

	// Tag classes
	Universal: 0x0,
	Application: masks.bit6,
	ContextSpecific: masks.bit7,
	Private: masks.bit7 | masks.bit6,

	// Tag forms
	Primitive: 0x0,
	Constructed: masks.bit5,

	// Universal class tags
	EOC: 0,
	Boolean: 1,
	Integer: 2,
	BitString: 3,
	OctetString: 4,
	Null: 5,
	OID: 6,
	ObjectDescriptor: 7,
	External: 8,
	Real: 9,
	Enumerated: 10,
	Embedded: 11,
	UTF8String: 12,
	RelativeOID: 13,
	Sequence: 16,
	Set: 17,
	NumericString: 18,
	PrintableString: 19,
	T61String: 20,
	VideotexString: 21,
	IA5String: 22,
	UTCTime: 23,
	GeneralizedTime: 24,
	GraphicString: 25,
	VisibleString: 26,
	GeneralString: 27,
	UniversalString: 28,
	CharacterString: 29,
	BMPString: 30,

	// Length forms
	ShortForm: 0x00,
	LongForm: 0x80
};