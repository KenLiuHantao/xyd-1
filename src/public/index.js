import news_item from "p/news_item";
import nav from "p/nav";
import down from "p/download";
import contact from 'p/contact';
import dialog from 'p/dialog';
import feet from 'p/feet';
import wap_header from 'p/wap_header';

export default {
	install(Vue, opts = {}) {
		Vue.component(news_item.name, news_item)
		Vue.component(nav.name, nav)
		Vue.component(down.name, down)
		Vue.component(contact.name, contact)
		Vue.component(dialog.name, dialog)
		Vue.component(feet.name, feet)
		Vue.component(wap_header.name, wap_header)
	}
}