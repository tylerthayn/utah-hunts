require('@tyler.thayn/js.core')

class PointOdds {
	constructor (row) {
		if (Array.isArray(row)) {
			row.forEach((e, i) => {
				this.Set(PointOdds.Fields[i], e)
			})
		} else if (typeof row === 'object') {
			Extend(this, row)
		}
	}
}

PointOdds.Fields = [
	'points',
	'applicants',
	'tags.bonus',
	'tags.regular',
	'tags.total',
	'success'
]


class Odds {
	constructor (hunt, year = 2020, points = {}) {
		if (typeof hunt === 'object') {
			Extend(this, hunt)
		} else {
			this.hunt = hunt
			this.year = typeof year === 'string' ? parseInt(year) : year
			this.points = {}
			if (Array.isArray(points)) {
				points.forEach((e, i) => {
					this.points[i] = new PointOdds(e)
				})
			} else if (typeof points === 'object') {
				Extend(this.points, points)
			}
		}
	}
}

module.exports = Odds
module.exports.Point = PointOdds

/*
let o = new Odds('EB3156', '2022', [
	[28, 1, 1, 0, 1, '1in1.0'],
	[27, 2, 0, 0, 0, 'N/A'],
	[26, 2, 0, 0, 0, 'N/A'],
	[25, 8, 0, 0, 0, 'N/A']
])

log(o)
*/

