require(['jquery', './HuntOdds', 'chartjs', 'Ui/App', '@js/core', 'jQuery', 'Graph'], ($, HuntOdds, chartjs) => {
window.chartjs = chartjs
	window.data = {
		2022: {"points": 26, "applicants": 25, "tags": {"bonus": 1,"regular": 2}},
		2021: {"points": 26, "applicants": 20, "tags": {"bonus": 1,"regular": 1}},
		2020: {"points": 26, "applicants": 22, "tags": {"bonus": 1,"regular": 1}}
	}

	let app = null

	$.get('app.json', config => {
		window.App = app = new $.App(config)
		app.$e.on('ready', () => {
log('ready')
			HuntOdds.Load('../db/odds').then(Odds => {
				window.Odds = App.Odds = Odds
				let huntSelector = $('#Odds select.Hunts')[0]
				Odds.hunts.forEach(hunt => {
					$(huntSelector).append($(`<option value="${hunt}">${hunt}</option>`))
				})
			})


		})
	})


/*
	$('.Year').each((i, e) => {
		Define(e, 'applicants', {
			get: () => {
				return $(e).data('applicants')
			},
			set: (v) => {
				$(e).data('applicants', v)
				$(e).find('.Applicants')[0].height.baseVal.value = v*5
				$(e).find('.Applicants')[0].y.baseVal.value = 500 - v*5
			}
		})
		e.permits = {}
		Define(e.permits, 'bonus', {
			get: () => {
				return $(e).data('permits.bonus')
			},
			set: (v) => {
				$(e).data('permits.bonus', v)
log($(e).find('.Permits .Bonus')[0])
				$(e).find('.Permits .Bonus')[0].height.baseVal.value = v*5
				$(e).find('.Permits .Bonus')[0].y.baseVal.value = 500 - $(e).find('.Permits .Regular')[0].height.baseVal.value - $(e).find('.Permits .Bonus')[0].height.baseVal.value
			}
		})
		Define(e.permits, 'regular', {
			get: () => {
				return $(e).data('permits.regular')
			},
			set: (v) => {
				$(e).data('permits.regular', v)
				$(e).find('.Permits .Regular')[0].height.baseVal.value = v*5
				$(e).find('.Permits .Regular')[0].y.baseVal.value = 500 - v*5
			}
		})

	})

	*/


})

