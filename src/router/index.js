import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'cover',
		component: resolve => require(['c/cover'], resolve)
	}, {
		path: '/web/index',
		name: 'web_index',
		component: resolve => require(['c/web_index'], resolve)
	}, {
		path: '/web/news',
		name: 'web_news',
		component: resolve => require(['c/web_news'], resolve)
	}, {
		path: '/wap/cover',
		name: 'wap_cover',
		component: resolve => require(['c/wap_cover'], resolve)
	}, {
		path: '/wap/index',
		name: 'wap_index',
		component: resolve => require(['c/wap_index'], resolve)
	}, {
		path: '/wap/news',
		name: 'wap_news',
		component: resolve => require(['c/wap_news'], resolve)
	}]
})