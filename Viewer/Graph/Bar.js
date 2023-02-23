define(['jquery', '@js/core'], ($) => {

	let defaults = {
		position: 0
	}

	function Bar (odds, options = {}) {
		this.options = Extend({}, defaults, options)
		Object.Extensions.EventEmitter(this)

		this.e = $(`
		<svg class="BarGraph Year" data-position="${options.position}" title="${odds.year} :: ${odds.points}" alt="${odds.year} :: ${odds.points}" data-points="${odds.points}" data-year="${odds.year}" data-applicants="${odds.applicants}" data-bonus="${odds.tags.bonus}" data-regular="${odds.tags.regular}" viewBox="0 0 20 1025">
			<text x="0" y="1025" fill="#000000">year</text>
			<svg class="Bar" viewBox="0, 0, 20, 1025">
				<rect class="Applicants" x="2" y="100" width="16" height="400" />
				<g class="Permits">
					<rect class="Bonus" x="2" y="200" width="16" height="100" />
					<rect class="Regular" x="2" y="300" width="16" height="200" />
				</g>
			</svg>
		</svg>`
		)[0]

		Define(this, 'applicants', {
			get: () => {return $(this.e).data('applicants')},
			set: (v) => {$(this.e).data('applicants', v);this.Update()}
		})

		this.tags = {}
		Define(this.tags, 'bonus', {
			get: () => {return $(this.e).data('bonus')},
			set: (v) => {$(this.e).data('bonus', v);this.Update()}
		})
		Define(this.tags, 'regular', {
			get: () => {return $(this.e).data('regular')},
			set: (v) => {$(this.e).data('regular', v);this.Update()}
		})


		$(this.e).on('update', (event) => {
			this.Update()
		})

		return this
	}


	Bar.prototype.Update = function () {
log('position'+this.options.position)
log($(this.e).data())
log($(this.e).find('.Applicants')[0].width.baseVal.value * 1.25 * this.options.position)
		this.e.x.baseVal.value = $(this.e).find('.Applicants')[0].width.baseVal.value * 1.25 * this.options.position
		$(this.e).find('.Applicants')[0].height.baseVal.value = ($(this.e).data('applicants')/$('#Graph').data('range-applicants'))*500+500
		$(this.e).find('.Permits .Bonus')[0].height.baseVal.value = ($(this.e).data('bonus')/$('#Graph').data('range-tags'))*500
		$(this.e).find('.Permits .Regular')[0].height.baseVal.value = ($(this.e).data('regular')/$('#Graph').data('range-tags'))*500

		$(this.e).find('.Applicants')[0].y.baseVal.value = 1000 - $(this.e).find('.Applicants')[0].height.baseVal.value
		$(this.e).find('.Permits .Regular')[0].y.baseVal.value = 1000 - $(this.e).find('.Permits .Regular')[0].height.baseVal.value
		$(this.e).find('.Permits .Bonus')[0].y.baseVal.value = 1000 - $(this.e).find('.Permits .Bonus')[0].height.baseVal.value - $(this.e).find('.Permits .Regular')[0].height.baseVal.value
	}

	return Bar
})
