'use strict';

exports.decode = function(bytes) {
	let 
		time = bytes.toString('ascii'),
		year, month, day,
		hours, minutes, seconds, timezone,
		timeStr;

	year = time.slice(0, 2);
	month = time.slice(2, 4)
	day = time.slice(4, 6);
	hours = time.slice(6, 8);

	if (time.length > 8) {
		minutes = time.slice(8, 10);
	}

	if (time.length > 10) {
		seconds = time.slice(10, 12);
	}

	if (time.length > 12) {
		if (time[12] === 'Z') {
			timezone = 'UTC';
		}
	}

	timeStr = '20' + year + '-' + month + '-' + day + ' ' + hours;

	if (minutes) {
		timeStr += ':' + minutes;
	}

	if (seconds) {
		timeStr += ':' + seconds;
	}

	if (timezone) {
		timeStr += ' ' + timezone;
	}

	return timeStr;
};