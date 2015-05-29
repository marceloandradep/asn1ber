'use strict';

const
	utils = require('../utils/bufferutils'), 
	types = [
		{
			code: 0,
			description: 'EOC',
			parse: function(bytes) {
				return 'Not implemented';
			}
		},
		{
			code: 1,
			description: 'Boolean',
			parse: function(bytes) {
				let value = utils.readBytesAsInt(bytes);
				return value != 0;
			}
		},
		{
			code: 2,
			description: 'Integer',
			parse: function(bytes) {
				let value;

				if (bytes.length > 4) {
					value = bytes;
				} else {
					value = utils.readBytesAsInt(bytes);
				}
				
				return value;
			}
		},
		{
			code: 3,
			description: 'Bit String',
			parse: require('../algorithms/bitstring').decode
		},
		{
			code: 4,
			description: 'Octet String',
			parse: require('../algorithms/octetstring').decode
		},
		{
			code: 5,
			description: 'Null'
		},
		{
			code: 6,
			description: 'Object Identifier',
			parse: require('../algorithms/oid').decode
		},
		{
			code: 7,
			description: 'Object Descriptor',
			parse: function(bytes) {
				return 'Not implemented';
			}
		},
		{
			code: 8,
			description: 'External',
			parse: function(bytes) {
				return 'Not implemented';
			}
		},
		{
			code: 9,
			description: 'Real',
			parse: function(bytes) {
				return 'Not implemented';
			}
		},
		{
			code: 10,
			description: 'Enumerated',
			parse: function(bytes) {
				return 'Not implemented';
			}
		},
		{
			code: 11,
			description: 'Embedded',
			parse: function(bytes) {
				return 'Not implemented';
			}
		},
		{
			code: 12,
			description: 'UTF-8 String',
			parse: function(bytes) {
				return 'Not implemented';
			}
		},
		{
			code: 13,
			description: 'Relative Object Identifier',
			parse: function(bytes) {
				return 'Not implemented';
			}
		},
		{
			code: 14,
			description: 'Reserved'
		},
		{
			code: 15,
			description: 'Reserved'
		},
		{
			code: 16,
			description: 'Sequence'
		},
		{
			code: 17,
			description: 'Set'
		},
		{
			code: 18,
			description: 'Numeric String',
			parse: function(bytes) {
				return 'Not implemented';
			}
		},
		{
			code: 19,
			description: 'Printable String',
			parse: function(bytes) {
				return bytes.toString('ascii');
			}
		},
		{
			code: 20,
			description: 'T61 String',
			parse: function(bytes) {
				return 'Not implemented';
			}
		},
		{
			code: 21,
			description: 'Videotex String',
			parse: function(bytes) {
				return 'Not implemented';
			}
		},
		{
			code: 22,
			description: 'IA5 String',
			parse: function(bytes) {
				return 'Not implemented';
			}
		},
		{
			code: 23,
			description: 'UTCTime',
			parse: require('../algorithms/utctime').decode
		},
		{
			code: 24,
			description: 'Generalized Time',
			parse: require('../algorithms/generalizedtime').decode
		},
		{
			code: 25,
			description: 'Graphic String',
			parse: function(bytes) {
				return 'Not implemented';
			}
		},
		{
			code: 26,
			description: 'Visible String',
			parse: function(bytes) {
				return 'Not implemented';
			}
		},
		{
			code: 27,
			description: 'General String',
			parse: function(bytes) {
				return 'Not implemented';
			}
		},
		{
			code: 28,
			description: 'Universal String',
			parse: function(bytes) {
				return 'Not implemented';
			}
		},
		{
			code: 29,
			description: 'Character String',
			parse: function(bytes) {
				return 'Not implemented';
			}
		},
		{
			code: 30,
			description: 'BMP String',
			parse: function(bytes) {
				return 'Not implemented';
			}
		}
	];

exports.parse = function(identifierOctet, parentOffset, bytes, Decoder) {
	if (identifierOctet.isUniversal()) {
		return types[identifierOctet.tagNumber].parse(bytes, parentOffset, Decoder);
	} else {
		return bytes.toString('ascii');
	}
};

exports.types = types;