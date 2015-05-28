'use strict';

module.exports = {

	// Primitive bit masks
	bit0: 0x01,
	bit1: 0x02,
	bit2: 0x04,
	bit3: 0x08,
	bit4: 0x10,
	bit5: 0x20,
	bit6: 0x40,
	bit7: 0x80,

	// Identifier octet masks
	tagClass:  0xc0,
	tagForm:   0x20,
	tagNumber: 0x1f,

	// Length octet masks
	lengthFormFlag: 0x80,
	lengthValueBits:  0x7f

};