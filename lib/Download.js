require('@tyler.thayn/js.core')
let $fs = require('fs-extra')
let https = require('https')

module.exports = function Download(url, path) {
	return new Promise((resolve, reject) => {
		https.get(url, (res) => {
			let out = $fs.createWriteStream(path)
			res.on('end', resolve)
			res.on('error', reject)
			res.pipe(out)
		})
	})
}
