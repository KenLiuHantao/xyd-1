import Vue from 'vue'
import App from './App'
import router from './router'
import xbls from './lib/xbls.es6';
import moment from 'moment';
import ElementUI from 'element-ui';
import xblsUI from './public/index';
import VueResource from 'vue-resource';
import 'element-ui/lib/theme-chalk/index.css';
require('s/icon.ico');
require('s/common.less');
require('s/icon.less');
Vue.config.productionTip = false;

window.z = window.xbls = xbls;
window.moment = moment;
xbls.config({
	apiEndpoint: '/api'
});

Vue.use(ElementUI);
Vue.use(xblsUI);
Vue.use(VueResource);

router.beforeEach((to, from, next) => {
	let sUserAgent = navigator.userAgent.toLowerCase();

	let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";

	let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";

	let bIsMidp = sUserAgent.match(/midp/i) == "midp";

	let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";

	let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";

	let bIsAndroid = sUserAgent.match(/android/i) == "android";

	let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";

	let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		if (!to.path.match('wap')) {
			if (to.path === '/') {
				router.push('/wap/cover');
				next();
			} else {
				let path = to.path.replace('web', 'wap');
				router.push(path);
				next();
			}
		}
	}
	next();
});

Vue.http.interceptors.push(function(request) {
	// console.log(request)
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})