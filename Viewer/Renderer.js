require('@tyler.thayn/js.core')
let $fs = require('fs-extra')
let Handlebars = require('handlebars')

let barWidth = 20

let data = {
	points: 10,
	years: [2019,2020,2021,2022],
	width: 500, height: 200,
	viewBox: '0 0 1000 525',
	year: {x: 0, y: 0, width: barWidth, height: 525, viewBox: '0 0 '+barWidth+' 525'},
	point: {viewBox: '0 0 '+barWidth*4+' 525'},
	applicants: {x: barWidth*0.1, y:100, width: barWidth*0.9, height: 400, fill: '#000000'},
	label: {x: 0, y: 0, fill: '#000000'},
	permits: {
		bonus: {x: barWidth*0.1, y: 200, width: barWidth*0.9, height: 100},
		regular: {x: barWidth*0.1, y: 300, width: barWidth*0.9, height: 200}
	}
}

Handlebars.registerHelper('Get', function (key, v = '') {
    return data.Get(key, v)
})

Handlebars.registerHelper('Offset', function (type, index) {
	if (type === 'point') {
		return index * barWidth*data.years.length*1.3
	}
	if (type === 'year') {
		return index * barWidth*1.2
	}
	return ''
})


Handlebars.registerHelper('for', function (count, ctx, options) {
  let output = []
  for (let i=0;i<count;i++) {
    output.push(options.fn(Extend({}, ctx, {_index: i})))
	//delete ctx['@index']
  }
  return output.join('\n')
})

Handlebars.registerHelper('JSON', function (ctx) {
    return JSON.stringify(ctx, null, '\t')
})

let template = Handlebars.compile($fs.readFileSync('./Graph.hbs', 'utf-8'))
log(template(data))





