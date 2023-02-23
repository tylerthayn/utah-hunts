let Extend=function(){var setProperty=function setProperty(target,name,value){'__proto__'===name?Object.defineProperty(target,name,{enumerable:true,configurable:true,value:value,writable:true}):target[name]=value};var getProperty=function getProperty(obj,name){if('__proto__'===name){if(!Object.prototype.hasOwnProperty.call(obj,name))return;return Object.getOwnPropertyDescriptor(obj,name).value}return obj[name]};var isPlainObject=function isPlainObject(obj){if(!obj||'[object Object]'!==Object.prototype.toString.call(obj))return false;var hasOwnConstructor=Object.prototype.hasOwnProperty.call(obj,'constructor');var hasIsPrototypeOf=obj.constructor&&obj.constructor.prototype&&Object.prototype.hasOwnProperty.call(obj.constructor.prototype,'isPrototypeOf');if(obj.constructor&&!hasOwnConstructor&&!hasIsPrototypeOf)return false;var key;for(key in obj);return'undefined'==typeof key||Object.prototype.hasOwnProperty.call(obj,key)};function ExtendArray(...args){let target=args.shift();target=null!=target&&Array.isArray(target)?target:[];while(args.length>0){let src=args.shift();null!=src&&(Array.isArray(src)?src.forEach(e=>{target.includes(e)||target.push(e)}):target.push(src))}return target}function Extend(...args){'boolean'==typeof args.first&&args.shift();let target=args.shift();target=null==target||'object'!=typeof target&&'function'!=typeof target?{}:target;if(Array.isArray(target))return ExtendArray(target,...args);while(args.length>0){let src=args.shift();if(null!=src)for(name in src){let targetProperty=getProperty(target,name);let srcProperty=getProperty(src,name);'undefined'!=typeof srcProperty&&null!=srcProperty&&srcProperty!==target&&(Array.isArray(targetProperty)?setProperty(target,name,ExtendArray(targetProperty,srcProperty)):isPlainObject(targetProperty)?setProperty(target,name,Extend(targetProperty,srcProperty)):setProperty(target,name,srcProperty))}}return target}return Extend}();
function LoadScript (u,c=(()=>{})){return new Promise((resolve,reject)=>{var s=document.createElement('script');s.type='text/javascript';s.src=u;s.addEventListener('load',resolve);s.addEventListener('error',reject);document.getElementsByTagName('head')[0].appendChild(s)})}
function LoadStyle(url,cb=(()=>{})){let link=document.createElement('link');link.rel='stylesheet';link.href=url;link.addEventListener('load',cb);document.getElementsByTagName('head')[0].append(link)}
function Unique(list) {
	let u = []
	list.forEach(i => {
		if (!u.includes(i)) {
			u.push(i)
		}
	})
	return u
}

(function () {

	let options = {
		prefix: 'D:/NodeJs/node_modules',
		require: {
			deps: ['jquery', 'lodash', 'jquery-ui', '@js/core', 'jQuery', 'Observers', 'Ui', 'chartjs'], //'lodash', '@js/core', 'jquery', 'jquery-ui', 'notifyjs'],
			paths: {
				'@css:jquery/jquery-ui.css': '{{prefix}}/jqueryui/jquery-ui.css',
				'@css:tts.css': '{{prefix}}/@tyler.thayn/styles/tts.css',
				'@js/core': '{{prefix}}/@tyler.thayn/js.core/index',
				'@tyler.thayn/js.core': '{{prefix}}/@tyler.thayn/js.core/index',
				'jQuery': '{{prefix}}/@tyler.thayn/jQuery',
				jquery: '{{prefix}}/jquery/dist/jquery.min',
				'jquery-ui': '{{prefix}}/jqueryui/jquery-ui.min',
				lodash: '{{prefix}}/lodash/lodash',
				notifyjs: '{{prefix}}/notifyjs-browser/dist/notify',
				Observers: '{{prefix}}/@tyler.thayn/Observers',
				requirejs: '{{prefix}}/requirejs/require.js',
				Ui: '{{prefix}}/@tyler.thayn/Ui',
				chartjs: 'https://cdn.jsdelivr.net/npm/chart.js@4.2.1/dist/chart.umd.min'
			}
		}
	}

	if (document.currentScript.hasAttribute('prefix')) {
		options.prefix = document.currentScript.getAttribute('prefix')
	}

	if (document.currentScript.hasAttribute('require')) {
		try {
			Extend(options.require, JSON.parse(document.currentScript.getAttribute('require')))
		} catch (e) {}
	}

	Object.keys(options.require.paths).forEach(key => {
		options.require.paths[key] = options.require.paths[key].replace('{{prefix}}', options.prefix)
	})


	if (document.currentScript.hasAttribute('deps')) {
		options.require.deps = Unique(Extend([], options.require.deps, document.currentScript.getAttribute('deps').split(',').map(s => s.trim())))
	}

	window.require = options.require
	Object.keys(require.paths).forEach(key => {
		if (key.startsWith('@css')) {
console.log(require.paths[key])
			LoadStyle(require.paths[key])
		}
	})

	window.require.callback = function ($) {

	}

	LoadScript(require.paths.requirejs)

}())
