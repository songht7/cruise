import Vue from 'vue'
import Vuex from 'vuex'
var jweixin = require('jweixin-module')
import common from "../common.js"
Vue.use(Vuex)


/*
 *	dispatch.actions
 * 	commit.mutations
 * */
const store = new Vuex.Store({
	state: {
		loading: "0",
		appName: common.Interface.appName,
		phoneNumber: common.Interface.phoneNumber,
		user: {},
		openid: "",
		wxType: "gzh", //mp:小程序，gzh：公众号
		data: {},
		interface: common.Interface,
		systemInfo: {},
		wxInfo: common.Interface.wxInfo,
		cardList: [], //卡券列表
		isWeixin: false
	},
	mutations: {
		switch_loading(state, status) {
			if (status == "change") {
				if (state.loading == '0') {
					state.loading = '1'
				} else {
					state.loading = '0'
				}
			} else {
				state.loading = status;
			}

		},
		update_data(state, data) {
			state.data = data
		},
		setSystemInfo(state, data) {
			state.systemInfo = data
		}
	},
	actions: {
		getData(ctx, parm) {
			ctx.commit("switch_loading", "1")
			let _parm = parm.parm || '';
			let _url = ctx.state.interface.apiurl + ctx.state.interface.addr[parm.inter] + _parm
			console.log("getData-url-", parm.inter, "：", _url)
			console.log("getData-parm-", parm.inter, "：", parm)
			var result = [];
			uni.request({
				url: _url,
				data: parm.data || {},
				method: parm.method || "GET",
				header: parm.header || {},
				success(res) {
					console.log("getData-success-", parm.inter, "：", res)
					//console.log(res)
					if (res.success) {
						ctx.commit("update_data", res.data.data)
					}
					result = res.data
				},
				fail(err) {
					console.log("getData-err-", parm.inter, "：", err)
					result = {
						"success": false,
						"msg": "接口请求失败",
						"err": err
					}
				},
				complete() {
					ctx.commit("switch_loading", "0")
					if (parm.fun) {
						new parm.fun(result)
					}
				}
			})
		},
		cheack_user(ctx) {
			var user = "";
			var _openid = "";
			uni.getStorage({
				key: "user",
				success: function(res) {
					user = res.data;
					let timestamp = Math.round(new Date().getTime() / 1000);
					//console.log(!user.deathline, timestamp, user.deathline, user.openid, timestamp >= user.deathline)
					if (!user.deathline || timestamp >= user.deathline) {
						//console.log("deathline")
						if (user.openid && user.userType == "3") {
							//console.log("wx-openid")
							ctx.dispatch("wxXCXAuth", 'reCheack');
						} else {
							//console.log("removeStorage-user")
							uni.removeStorage({
								key: "user"
							});
							user = {};
							uni.redirectTo({
								url: "/pages/index/index"
							})
						}
					}
					ctx.commit("get_user", user)
				},
				fail() {
					ctx.commit("get_user", {})
					// uni.redirectTo({
					// 	url: "/pages/index/index"
					// })
				}
			})
		},
		goback(ctx, url) {
			if (url) {
				uni.navigateTo({
					url: url,
					animationType: 'pop-out',
					animationDuration: 1000
				});
			} else {
				uni.navigateBack({
					delta: 1,
					animationType: 'slide-out-right',
					animationDuration: 1000
				});
			}
		},
		isWeixin(ctx) {
			let _isWeixin = !!/micromessenger/i.test(navigator.userAgent.toLowerCase());
			ctx.state.isWeixin = _isWeixin;
		},
		getWXCode(ctx) {
			var appid = ctx.state.interface.wxInfo.AppID;
			if (!ctx.state.isWeixin) {
				return
			}
			var _uWXInfo = "";
			uni.getStorage({
				key: 'uWXInfo',
				success: function(res) {
					_uWXInfo = res.data;
				},
				complete: function() {
					// console.log("=====getStorage-_uWXInfo======")
					// console.log(_uWXInfo)
					if (_uWXInfo && _uWXInfo.openid) {
						var __openid = _uWXInfo.openid;
					} else {
						let redirect_uri = ctx.state.interface.domain;
						let REDIRECT_URI = encodeURIComponent(redirect_uri), //授权后重定向的回调链接地址， 请使用 urlEncode 对链接进行处理
							scope = "snsapi_userinfo", //snsapi_base，snsapi_userinfo （弹出授权页面，获取更多信息）
							state = "STATE"; //重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
						var _url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' +
							REDIRECT_URI +
							'&response_type=code&scope=' + scope + '&state=' + state + '#wechat_redirect';
						let code = _this.queryString('code');
						//console.log(_url)
						if (code) {
							//console.log(code)
							_this.userLogin(code);
						} else {
							window.location.href = _url;
						}
					}
				}
			});

		},
		wxAuth(ctx, type) {
			var funTicket = function(res) {
				console.log("=======getTicket======")
				console.log(res)
				var _config = {
					debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: ctx.state.interface.wxInfo.AppID, // 必填，公众号的唯一标识
					timestamp: '', // 必填，生成签名的时间戳
					nonceStr: '', // 必填，生成签名的随机串
					signature: '', // 必填，签名
					jsApiList: [
						'onMenuShareAppMessage',
						'addCard',
						'chooseCard',
						'openCard'
					] // 必填，需要使用的JS接口列表
				}
				jweixin.config(_config);
			}
		},
		getWXCard(ctx) {
			jweixin.ready(function() {
				// 批量添加卡券接口
				jweixin.addCard({
					cardList: [{
						cardId: '',
						cardExt: ''
					}], // 需要添加的卡券列表
					success: function(res) {
						var cardList = res.cardList; // 添加的卡券列表信息
					}
				});
				// 查看微信卡包中的卡券接口
				jweixin.openCard({
					cardList: [{
						cardId: '',
						code: ''
					}] // 需要打开的卡券列表
				});
			});
		},
		getSystemInfo(ctx) {
			var systemInfo = {}
			uni.getSystemInfo({
				success(res) {
					systemInfo = res
					console.log(systemInfo);
				},
				complete() {
					ctx.commit("setSystemInfo", systemInfo)
				}
			});
		}
	},
	modules: {}
})
export default store
