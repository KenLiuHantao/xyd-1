/**
 * 全局变量和帮助函数
 */

window.Promise = require('promise-polyfill');
const axios = require('axios');

window.onerror = function(err) {
	console.error(err);
	setTimeout(() => {
		let s = err.toString();
		if (s.match(/find\s+variable/i)) return;
	}, 10);
};

//assign polyfill
Object.assign = Object.assign || function(target) {
	for (let i = 1; i < arguments.length; i++) {
		let source = arguments[i];
		for (let key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}
	return target;
};


let xbls = {
	config(config) {
		/**
		 * 支持以下注入：
		 * history: react-router的历史提供者
		 * wxShareEndpoint: 微信分享sign的url
		 * apiEndoint: api请求的url
		 */
		if (!config) config = {};
		Object.assign(xbls, config);
		return xbls;
	},

	weiboLink: 'https://weibo.com/p/1006066535530977/home?from=page_100606&mod=TAB#place',

	jsonp:'http://211.159.157.19',

	downLoad() {},

	title(title) {
		document.title = title;
		let iframe = document.createElement('iframe');
		iframe.onload = () => {
			setTimeout(() => {
				document.body.removeChild(iframe);
			}, 0);
		};
		document.body.appendChild(iframe);
	},

	_addParams(url, extras) {
		let params = ['appid', 'cid', 'mid', 'source', 'hotel_id', 'brand_id', 'from', 'myid'];
		for (let i = 0; i < params.length; i++) {
			if (extras && extras[params[i]]) continue;
			url = this._addParam(url, params[i]);
		}
		if (extras) {
			for (let key in extras) {
				if (extras[key]) url = this._addParam(url, key, extras[key]);
			}
		}
		return url;
	},

	_addParam(url, param, value) {
		let v = value === undefined ? xbls._GET(param) : value;
		if (v && url.indexOf(param + '=') === -1 && !url.match(/^javascript\:/i)) {
			let seperator = url.indexOf('?') === -1 ? '?' : '&';
			url += seperator + param + '=' + v;
		}
		return url;
	},

	fetchCache: {},

	fetch(url, options) {
		if (!options) options = {};
		let useCache = !!options.cache;
		let cacheKey = url + JSON.stringify(options);
		if (useCache && xbls.fetchCache[cacheKey]) {
			return Promise.resolve(xbls.fetchCache[cacheKey]);
		}

		if (options.json) {
			options.body = JSON.stringify(options.json);
			if (!options.headers) options.headers = {};
			if (!options.method) options.method = 'POST';
			options.headers['content-type'] = 'application/json';
		}

		if (options.method) options.method = options.method.toUpperCase();
		if (!options.headers) options.headers = {};

		let newHeaders = {};
		for (let key in options.headers) {
			newHeaders[key.toLowerCase()] = options.headers[key];
		}
		options.headers = newHeaders;
		newHeaders = null;

		if (options.method === 'POST' && !options.headers['content-type']) {
			options.headers['content-type'] = xbls.defaultFetchPOSTContentType;
		}

		url = xbls._addParams(url);

		return axios({
			method: options.method || 'GET',
			url,
			headers: options.headers || {},
			responseType: 'json',
			data: options.body
		}).then(function(res) {
			let data = res.data;
			if (!data.success && data.msg === 'login') {
				alert('登录过期。需要刷新当前网页。');
				location.reload();
				return Promise.reject('login');
			} else if (!data.success) {
				let msg = data.msg || data.message;
				throw new Error(msg || JSON.stringify(data));
			} else {
				if (useCache) {
					xbls.fetchCache[cacheKey] = data;
				}
				return Promise.resolve(data);
			}
		}).catch((err) => {
			//处理5xx错误
			if (typeof err === 'object' && err.response
				//&& Math.floor(err.response.status/100) === 5
			) {
				let re = err.response.data;
				if (re && re.message) {
					throw new Error(re.message);
				}
			}
			throw err;
		}).catch(err => {
			if (!options.silent) {
				alert(err.message || err);
			}
			throw err;
		});
	},


	/**
	 * 获取get参数
	 */
	_GET(need) {
		let qs = location.search.replace(/^\?/, '');
		let arr = qs.split('&');
		let _get = {};
		for (let i = 0; i < arr.length; i++) {
			if (!arr[i]) continue;
			let p = arr[i].split('=');
			if (p[0]) {
				_get[p[0]] = decodeURIComponent(p[1]);
			}
		}
		if (need) return _get[need];
		return _get;
	},

	_VGET(need) {
		let query = this.$router.query;
		if (need) return query[need];
		return _get;
	},

	kv: {
		set(k, v) {
			if (window['localStorage']) {
				localStorage[k] = v;
			}
		},
		get(k) {
			if (window['localStorage']) {
				return localStorage[k] || '';
			}
			return '';
		}
	},

	cookie: {
		set(name, value, days, path) {
			let dir = path || '/',
				expires;
			if (days) {
				let date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = '; expires=' + date.toGMTString();
			} else {
				expires = '';
			}
			document.cookie = name + '=' + value + expires + '; path=' + dir;
		},

		get(name) {
			let nameEQ = name + '=';
			let ca = document.cookie.split(';');
			for (let i = 0; i < ca.length; i++) {
				let c = ca[i];
				while (c.charAt(0) === ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
			}
			return null;
		},

		delete(name) {
			this.set(name, '', -1);
		}
	},

	/**
	 * 请求后端api
	 */
	api(method, args, options) {
		if (!this.apiEndpoint) throw new Error('no xbls.apiEndpoint!');

		if (!args) args = {};
		let get = xbls._GET();
		get.method = method;
		let queries = Object.keys(get).map(function(k) {
			return k + '=' + encodeURIComponent(get[k]);
		}).join('&');

		console.log(this.apiEndpoint, queries);
		return xbls.fetch(this.apiEndpoint + '?' + queries, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				args,
			}),
			silent: options && options.silent,
			cache: options && options.cache
		});
	}
};

export default xbls;