require('@tyler.thayn/js.core')
let https = require('https')

module.exports = function Get(url) {
	return new Promise((resolve, reject) => {
		https.get(url, (res) => {
			let data = ''
			res.on('data', (chunk) => {data += chunk.toString()})
			res.on('error', reject)
			res.on('end', () => {resolve(data)})
		})
	})
}

