'use strict';

exports.decode = function(bytes) {
	let 
		time = bytes.toString('ascii'),
		year, month, day,
		hours, minutes, seconds, milis, timezone,
		timeStr;

	year = time.slice(0, 4);
	month = time.slice(4, 6)
	day = time.slice(6, 8);
	hours = time.slice(8, 10);

	if (time.length > 10) {
		minutes = time.slice(10, 12);
	}

	if (time.length > 12) {
		seconds = time.slice(12, 14);
	}

	if (time.length > 14) {
		milis = time.slice(14, 18);
	}

	if (time.length > 18) {
		if (time[18] === 'Z') {
			timezone = 'UTC';
		}
	}

	timeStr = year + '-' + month + '-' + day + ' ' + hours;

	if (minutes) {
		timeStr += ':' + minutes;
	}

	if (seconds) {
		timeStr += ':' + seconds;
	}

	if (milis) {
		timeStr += milis;
	}

	if (timezone) {
		timeStr += ' ' + timezone;
	}

	return timeStr;
};