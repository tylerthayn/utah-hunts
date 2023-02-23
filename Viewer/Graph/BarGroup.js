define(['jquery', '@js/core', 'Graph/Bar'], ($) => {

	let defaults = {

	}

	function BarGroup (odds, options = {}) {
		this.options = Extend({}, defaults, options)
		Object.Extensions.EventEmitter(this)

		this.e = $(`
		<svg class="BarGroup Points" data-points="${Object.values(odds)[0].points}" viewBox="0 0 20 1000">
		</svg>`
		)[0]

		this.bars = {}

		Object.keys(odds).forEach((k, i) => {
			try {
				this.bars[k] = new $.Graph.Bar(Extend({}, odds[k], {year: k}), {position: i})
				$(this.e).append(this.bars[k].e)
			} catch (e) {}
		})

		$(this.e).on('update', (event, graph) => {
			this.Update()
		})
/*
		$(this.e).on('mounted', (event, graph) => {
			this.graph = graph
			this.bars.Each((v, k) => {
				$(v.e).triggerHandler('mounted', this)
			})
			//this.Update()
			//log(this)
		})
*/
		return this
	}


	BarGroup.prototype.Update = function () {
		$(this.e).find('.BarGraph').each((i, e) => {
			$(e).triggerHandler('update')
		})

		let width = 0
		$(this.e).find('.BarGraph').each((i, e) => {
			width += e.width.baseVal.value*1.25
		})

		this.e.width.baseVal.value = width
log(width)
		this.e.x.baseVal.value = this.e.width.baseVal.value * 1.1 * this.options.position
		//$(this.e).find('.Applicants')[0].height.baseVal.value = ($(this.e).data('applicants')/$(this.e).parents('#Graph').data('range-y'))*500+500
		//$(this.e).find('.Permits .Bonus')[0].height.baseVal.value = ($(this.e).data('bonus')/$(this.e).parents('#Graph').data('range-tags'))*500
		//$(this.e).find('.Permits .Regular')[0].height.baseVal.value = ($(this.e).data('regular')/$(this.e).parents('#Graph').data('range-tags'))*500

		//$(this.e).find('.Applicants')[0].y.baseVal.value = 1000 - $(this.e).find('.Applicants')[0].height.baseVal.value
		//$(this.e).find('.Permits .Regular')[0].y.baseVal.value = 1000 - $(this.e).find('.Permits .Regular')[0].height.baseVal.value
		//$(this.e).find('.Permits .Bonus')[0].y.baseVal.value = 1000 - $(this.e).find('.Permits .Bonus')[0].height.baseVal.value - $(this.e).find('.Permits .Regular')[0].height.baseVal.value

	}

	return BarGroup
})
