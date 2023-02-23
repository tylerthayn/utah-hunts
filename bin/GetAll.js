let $fs = require('fs-extra')
let $path = require('path')

let Get = require('../lib/Get')
let config = require('../lib/config')

process.stdout.write('Ensuring db folder structure...')
$fs.ensureDirSync($path.resolve(config.dbDir))
$fs.ensureDirSync($path.resolve(config.dbDir, 'hunts'))
$fs.ensureDirSync($path.resolve(config.dbDir, 'boundaries'))
process.stdout.write('ok\n')

process.stdout.write('Downloading utah hunt data...')
Get(`${config.apiUrl}/HaSetup`).then(data => {
	process.stdout.write('ok\n')

	let hunts = JSON.parse(data)

	process.stdout.write(`Saving hunt data (${$path.resolve(config.dbDir, 'hunts.json')})...`)
	$fs.writeFileSync($path.resolve(config.dbDir, 'hunts.json'), JSON.stringify(hunts, null, '\t'), 'utf-8')
	process.stdout.write('ok\n')

	let huntIds = Clone(hunts.huntNumberList)
	function ProcessHunt () {
		if (huntIds.length > 0) {
			let huntId = huntIds.shift()

			process.stdout.write(huntId+'...')
			Get(`${config.apiUrl}/HaNumber?hn=${huntId}`).then(data => {
				process.stdout.write('Saving...')
				let huntInfo = JSON.parse(data)

				$fs.writeFileSync($path.resolve(config.dbDir, 'hunts', huntId+'.json'), JSON.stringify(huntInfo, null, '\t'), 'utf-8')
				process.stdout.write('ok\n')

				process.stdout.write('Processing Boundaries...')
				let boundaries = Clone(huntInfo.boundaries)
				function ProcessBoundary () {
					if (boundaries.length > 0) {
						let boundary = boundaries.shift()
						process.stdout.write(`\t${boundary}...`)
						Get(`${config.boundaries.url}?${config.boundaries.qs}&where=BoundaryID%20in%20(${boundary})`).then(data => {
							process.stdout.write('Saving...')
							$fs.writeFileSync($path.resolve(config.dbDir, 'boundaries', boundary+'.geojson'), data, 'utf-8')
							process.stdout.write('ok\n')
							ProcessBoundary()
						})
					} else {
						ProcessHunt()
					}
				}
				process.stdout.write('ok\n')

				ProcessBoundary()
			})
		} else {
			log('done')
		}
	}
	ProcessHunt()
})
