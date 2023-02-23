require('@tyler.thayn/js.core')
let Odds = require('./Odds')

let PDF = require('./PDF')

//PDF.Split('db2/odds-dl/BigGame/2021.pdf', 'tmp/2021').then(log).catch(log)

PDF.Text('db2/odds-dl/BigGame/2021/page_069.pdf').then(data => {
	Odds.Parse(data).then(odds => {
		log(odds)
	})
}).catch(log)


