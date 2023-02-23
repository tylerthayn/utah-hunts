require('@tyler.thayn/js.core')
let $fs = require('fs-extra')

function Record (data) {
	this.points = parseInt(data[0])
	this.applicants = parseInt(data[1])
	this.tags = {
		bonus: parseInt(data[2]),
		regular: parseInt(data[3])
	}

	return this
}

function Parse (s) {
	return new Promise((resolve, reject) => {
		let odds = {
			huntId: HuntId(s),
			resident: {},
			non: {}
		}

		if (odds.huntId === false) {
			return reject()
		}

		s = s.replace(/(\r*\n+\r*)+/g, '\n')
		s = s.split(/^.+?# Permits.*$/gm).pop()
		s = s.split('Totals').shift().trim().split(/\n/g)

		//try {$fs.writeFileSync('./data.txt', JSON.stringify(s, null, '\t'), 'utf-8')} catch (e) {}

		let cont = true, type = 'resident'
		while (cont && s.length > 4) {
			function GetRecord () {
				let r = type === 'resident' ? Take(s, 5) : Take(s, 5)
				if (type === 'resident' && r[4] === '0') {Take(s, 1)}
				return new Record(r)
			}

			let r = GetRecord()
			odds[type][r.points] = r


			if (r.points === 0) {
				if (type === 'non') {
					cont = false
				}
				if (type === 'resident') {
					type = 'non'
				}
			}
		}
		resolve(odds)
	})
}


function Take (list, n) {
	let data = list.slice(0, n)
	list.splice(0, n)
	return data
}

function HuntId (s) {
	let m = s.match(/^Hunt: (.+?) /gm)
	return m === null ? false : m[0].split(':').pop().trim()
}


module.exports = Parse

