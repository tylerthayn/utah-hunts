define(['jquery', 'Graph/BarGroup', 'Graph/Bar', '@js/core'], ($, BarGroup, Bar) => {

	function Graph (e) {
		Define(this, 'e', {get: () => {return $('#Graph')[0]}})

		return this
	}

	Graph.prototype.Bar = Bar
	Graph.prototype.BarGroup = BarGroup

	Graph.prototype.Append = function (e) {
		$(this.e).append(e)
		$(e).triggerHandler('mounted', this)
		this.Update()
	}

	Graph.prototype.Update = function () {
		$('#Graph').data('range-applicants', Math.max(...$('#Graph').find('.BarGraph').map((i, e) => {
			return $(e).data('applicants')
		}).toArray()) || 10)
		$('#Graph').data('range-tags', Math.max(...$('#Graph').find('.BarGraph').map((i, e) => {
			return $(e).data('bonus') + $(e).data('regular')
		}).toArray()) || 1)

		let width = 0
		$(this.e).find('> svg').each((i, e) => {
			$(e).triggerHandler('update')
			width += e.width.baseVal.value
		})
	log('width:'+width)

		this.e.width.baseVal.value = width
		$(this.e).children().triggerHandler('update')
	}

	$.extend({
		Graph: new Graph($('#Graph')[0])
	})

	return Graph

})
