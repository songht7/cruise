import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// 引入vuex 状态库
import store from "./store";
Vue.prototype.$store = store;

/*全局组件引用*/
import uniIcons from "./components/uni-icons.vue"
Vue.component("uni-icons", uniIcons)

/*用户协议*/
import agreement from "./components/agreement.vue"
Vue.component("agreement", agreement)

/*
	js 中调用 this.$loading() 
		参数可选
			不填 -->  切换loading显示/隐藏
			'1' -->  显示
			'0' -->  隐藏
*/
import loading from './components/loading.vue'
Vue.component('loading', loading)
Vue.prototype.$loading = function(status) {
	if (status) {
		if (status == "1" || status == "0") {
			store.commit("switch_loading", status)
		} else {
			console.log("输入的参数 有误，应为 0/1");
		}
	} else {
		store.commit("switch_loading", 'change')
	}
};
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
