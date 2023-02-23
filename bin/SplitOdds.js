require('@tyler.thayn/js.core')
let PDF = require('../lib/PDF')
let $fs = require('fs-extra')
let $path = require('path')
let config = require('../lib/config')

let files = []
config.oddsUrls.Each((v, type) => {
	Object.keys(v).forEach(year => {
		files.push([type, year])
	})
})

function Process () {
	if (files.length > 0) {
		let [type, year] = files.shift()
		process.stdout.write(type+'::'+year+'...')
		PDF.Split(
			$path.join(config.dbDir, 'odds-dl', type, year+'.pdf'),
			$path.join(config.dbDir, 'odds-dl', type, year)
		).then(() => {
			log('ok')
		})
		.catch(log)
		.finally(() => {
			Process()
		})
	} else {
		log('DONE')
	}
}

Process()

