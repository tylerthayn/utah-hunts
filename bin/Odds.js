require('@tyler.thayn/js.core')
const $fs = require('fs-extra')
const $path = require('path')
let HuntOdds = require('./lib/HuntOdds')

let odds = {
	BigGame: [2022, 2021, 2020, 2019, 2018], //, 2017, 2016, 2015, 2014, 2013],
	//Deer: [2022, 2021, 2020, 2019, 2018]
}

//ParseOdds('BigGame', 2021)
odds.Each((years, type) => {
	years.forEach(year => {
		ParseOdds(type, year)
	})
})

function ParseOdds (type, year) {
	log(`ParseOdds(${type}, ${year})`)
	let input = $path.resolve('./odds', type, year+'.txt')
	let output = $path.resolve('./odds', type, year+'.json')

	let data = $fs.readFileSync(input, 'utf-8')
	let pages = data.split(/Hunt:/gm)
	pages.shift()
	pages.forEach(page => ParsePage(type, year, page))
}


function ParsePage (type, year, page) {
	page = page.trim()
	let huntId = page.substring(0, page.indexOf(' '))

	let resident = new HuntOdds(page.substring(0, page.indexOf(' ')))
	let nonResident = new HuntOdds(page.substring(0, page.indexOf(' ')))

	let lines = page.split(/\n/g)
	while (!lines[0].startsWith('Bonus')) {lines.shift()}

	let headers = [lines.shift().replace(/\#/g, '').replace(/ +/g, ' ').split(' '), lines.shift().replace(/\#/g, '').replace(/ +/g, ' ').split(' ')]
	//let header = headers[0].map((e, i) => {
	//	return headers[0][i] + ' ' + headers[1][i]
	//}).map(h => h.replace(/\r/g, ''))

	let cont = true
	while (cont) {
		let line = lines.shift().trim()
		let match = line.match(/\d+ in \d+(\.\d+)*/g)
		if (match !== null) {
			match.forEach(m => {
				line = line.replace(m, m.replace(/ /g, ''))
			})
		}
		line = line.split(/ /g).map(l => {
			return /\D/.test(l) ? l : parseInt(l)
		})

		resident.points[line[0]] = new HuntOdds.Point(line.slice(0, 4))
		nonResident.points[line[0]] = new HuntOdds.Point(line.slice(6, 10))

		if (line.first === 0) {
			cont = false
		}
	}

	let output = $path.resolve('./db/odds', year.toString(), huntId+'.resident.json')
	$fs.ensureDirSync($path.dirname(output))
	$fs.writeFileSync(output, JSON.stringify(resident, null, '\t'), 'utf-8')
	output = $path.resolve('./db/odds', year.toString(), huntId+'.non.json')
	$fs.writeFileSync(output, JSON.stringify(nonResident, null, '\t'), 'utf-8')

}


/*

year	hunt#				#Points	#bonus	#regular	#total	sucess
				resident
				non



"header": {
			"resident": [
				"Bonus Points",
				"Eligible Applicants",
				"Bonus Permits",
				"Regular Permits",
				"Total Permits",
				"Success Ratio"
			],
			"non": [
				"Bonus Points",
				"Eligible Applicants",
				"Bonus Permits",
				"Regular Permits",
				"Total Permits",
				"Success Ratio"
			]
		}
*/
