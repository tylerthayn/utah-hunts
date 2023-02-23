require('@tyler.thayn/js.core')
let ChildProcess = require('child_process')
let $fs = require('fs-extra')
let $path = require('path')

function Split (pdf, folder) {
	return new Promise((resolve, reject) => {
		$fs.ensureDirSync($path.resolve(folder))
		let args = [
			pdf,
			'burst',
			'output',
			folder+'\\page_\%03d.pdf'
		]
		let cp = ChildProcess.spawn('pdftk', args)
		cp.on('data', chunk => {
			console.log(chunk.toString())
		})
		cp.on('exit', resolve)
		cp.on('error', reject)
	})
}

function Text (pdf) {
	return new Promise((resolve, reject) => {
		let cp = ChildProcess.spawn($path.resolve(__dirname, '../bin/xpdf/pdftotext.exe'), [$path.resolve(pdf), '-'])
		let data = ''
		cp.stdout.on('data', chunk => {
			data += chunk.toString()
		})
		cp.on('exit', () => resolve(data))
		cp.on('error', reject)
	})
}

module.exports = {
	Split: Split,
	Text: Text
}


