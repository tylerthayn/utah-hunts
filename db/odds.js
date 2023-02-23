require('@tyler.thayn/js.core')
$fs = require('fs')
$path = require('path')


let years = {}, hunts = []

$fs.readdirSync($path.resolve(__dirname, 'odds')).forEach(year => {
	years[year] = {resident: [], non: []}
	$fs.readdirSync($path.resolve(__dirname, 'odds', year)).forEach(f => {
		let [hunt, type] = f.replace(/\.json$/, '').split('.')
		years[year][type].push(hunt)
		hunts.push(hunt)
	})
	log(year)
})

$fs.writeFileSync($path.resolve(__dirname, 'odds', 'index.json'), JSON.stringify({
	years: Object.keys(years),
	hunts: hunts
}, null, '\t'), 'utf-8')
