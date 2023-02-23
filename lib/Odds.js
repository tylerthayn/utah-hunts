require('@tyler.thayn/js.core')

function _Validate (odds, options = {}) {
	options = Extend({}, Validate.Options, options)

	let points = Object.keys(odds)
	for (let i=0; i<=options.minPoints; i++) {
		if (!Reflect.has(odds, i)) {
			return 'No points ('+i+')'
		}
		if (odds[i].points != i) {
			return 'Mismatch in points index/value'
		}
		if (odds[i].applicants < 0 || odds[i].applicants > options.maxApplicants) {
			return 'Applicants out of Range: '+odds[i].applicants
		}
		if (!Reflect.has(odds[i], 'tags')) {
			return 'No tags object'
		}
		if (!Reflect.has(odds[i].tags, 'bonus')) {
			return 'No bonus tags'
		}
		if (!Reflect.has(odds[i].tags, 'regular')) {
			return 'No regular tags'
		}
		if (odds[i].tags.bonus < 0 || odds[i].tags.bonus > options.maxBonus) {
			return 'Bonus out of Range: '+odds[i].tags.bonus
		}
		if (odds[i].tags.regular < 0 || odds[i].tags.regular > options.maxRegular) {
			return 'Regular out of Range: '+odds[i].tags.regular
		}
		if (odds[i].tags.regular + odds[i].tags.bonus > odds[i].applicants) {
			return 'Bonus + Regular tags > applicants'
		}
	}

	return true
}

function Validate (odds, options = {}) {
	options = Extend({}, Validate.Options, options)

	if (!Reflect.has(odds, 'huntId') || !options.huntIdRegExp.test(odds.huntId)) {
		return 'Invalid Hunt Id: '+odds.huntId
	}

	if (Reflect.has(odds, 'resident')) {
		if (!Reflect.has(odds, 'non')) {
			return 'Resident exists, but no NonResident'
		}
	}
	if (Reflect.has(odds, 'non')) {
		if (!Reflect.has(odds, 'resident')) {
			return 'NonResident exists, but no Resident'
		}
	}

	if (Reflect.has(odds, 'resident')) {
		let s = _Validate(odds.resident, options)
		if (s !== 'true') {
			return s
		}
	}
	if (Reflect.has(odds, 'non')) {
		let s = _Validate(odds.non, options)
		if (s !== 'true') {
			return s
		}
	}

	if (!Reflect.has(odds, 'resident') && !Reflect.has(odds, 'non')) {
		return _Validate(odds)
	}

	return true
}

Validate.Options = {
	huntIdRegExp: /^[A-Z]{1,2}\d{4}$/,
	minPoints: 25,
	maxApplicants: 1000,
	maxBonus: 100,
	maxRegular: 100
}

module.exports = {
	Parse: require('./OddsParser'),
	Validate: Validate
}
