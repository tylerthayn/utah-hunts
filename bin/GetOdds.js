require('@tyler.thayn/js.core')
let $fs = require('fs-extra')
let $path = require('path')
let https = require('https')
let config = require('../lib/config')
let Download = require('../lib/Download')

function Dl (dls) {
	return new Promise((resolve, reject) => {
		let _DL = () => {
			if (dls.length > 0) {
				let dl = dls.shift()
				Download(...dl).then(_DL).catch(error => {
					log(error)
					_DL()
				})
			} else {
				resolve()
			}
		}
		_DL()
	})
}


$fs.ensureDirSync($path.resolve(config.dbDir, 'odds-dl'))

let dls = []
config.oddsUrls.Each((v, k) => {
	v.Each((vv, kk) => {
		$fs.ensureDirSync($path.resolve(config.dbDir, 'odds-dl', k))
		dls.push([vv, $path.resolve(config.dbDir, 'odds-dl', k, kk+'.pdf')])
	})
})

Dl(dls).then(() => {
	log('downloads complete')
}).catch(log)
