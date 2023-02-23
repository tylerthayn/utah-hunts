define(['jquery', '@js/core'], ($) => {

	function HuntOdds (data) {
		Extend(this, data)

		return this
	}

	HuntOdds.prototype.Hunt = function (id, type = 'resident') {
		return new Promise((resolve, reject) => {
			let o = {}
			return Promise.all(this.years.map(year => {
				return new Promise((resolve, reject) => {
					 fetch(`${this.path}/${year}/${id}.${type}.json`).then(res => res.json()).then(data => {
						o[year] = data
					}).catch(error => {
						log(error)
					}).finally(resolve)
				})
			})).then(() => {}).catch(log).finally(() => {
				o.points = Object.keys(o[Object.keys(o)[0]].points)
				Define(o, 'Get', function (n) {
					let data = {}
					Object.keys(this).forEach(year => {
						try {
							data[year] = this[year].points[n]
						} catch (e) {console.warn(e)}
					})
					return data
				})

				resolve(o)
			})
		})
	}

	HuntOdds.Load = function (path) {
		return new Promise((resolve, reject) => {
			fetch(`${path}/index.json`).then(res => res.json()).then(data => {
				data.path = path
				resolve(new HuntOdds(data))
			}).catch(reject)
		})
	}

	return HuntOdds

})
