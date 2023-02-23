require('@tyler.thayn/js.core')
let PDF = require('../lib/PDF')
let $fs = require('fs-extra')
let $path = require('path')
let config = require('../lib/config')
let Odds = require('../lib/Odds')

let out = (s) => {
	out(s)
	console.warn(s)
}

let list = []
config.oddsUrls.Each((v, type) => {
	Object.keys(v).sort().reverse().forEach(year => {
		list.push([type, year])
		$fs.ensureDirSync($path.resolve(config.dbDir, 'odds', year))
	})
})

function Process () {
	if (list.length > 0) {
		let [type, year] = list.shift()
		out(type+'::'+year+'...')
		let folder = $path.join(config.dbDir, 'odds-dl', type, year)
		let entries = $fs.readdirSync(folder)
		function Process2() {
			if (entries.length > 0) {
				let entry = entries.shift()
				let file = $path.resolve(folder, entry)
				out('\t'+file+'...')
				PDF.Text(file).then(data => {
					out('Parsing...')
					Odds.Parse(data).then(odds => {
						out('Validating...')
						let res = Odds.Validate(odds)
						if (res !== true) {
							out('fail - '+res+'\n')
							return Process2()
						}
						out('Exporting...')
						$fs.writeFileSync(
							$path.resolve(config.dbDir, 'odds', year, odds.huntId+'.json'),
							JSON.stringify(odds, null, '\t'),
							'utf-8'
						)
						out('ok'+'\n')
						Process2()
					}).catch(error => {
						out(error)
						out('\n')
						Process2()
					})
				})
			} else {
				Process()
			}
		}
		Process2()
	} else {
		log('Done')
	}
}

Process()

