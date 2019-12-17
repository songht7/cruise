import Vue from 'vue'
import Vuex from 'vuex'
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
		wxXCXAuth(ctx, type) {
			var checkType = type;
			var _wxType = ctx.state.wxType == "mp" ? 'getWeChatInfoMP' : 'getWeChatInfo';
			var _wxini = checkType == undefined && ctx.state.openid == '' ? true : false;
			//console.log("_wxini:", _wxini, "   checkType:", checkType)
			if (_wxini || checkType == "reCheack") {
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						//console.log("getProvider:", res)
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin', //登录服务提供商
								//scopes: 'auth_user', //授权类型，默认 auth_base。支持 auth_base（静默授权）/ auth_user（主动授权） / auth_zhima（芝麻信用）
								success: function(loginRes) {
									//console.log("wx-login-res:", loginRes)
									var _code = loginRes.code;
									if (_code) {
										var _url = ctx.state.interface.apiurl + ctx.state.interface.addr[_wxType] + '?code=' + _code;
										//console.log("getWeChatInfo-url:", _url)
										uni.request({
											url: _url,
											method: "GET",
											header: {},
											success(res) {
												//console.log("getWeChatInfo-success:", res)
												if (res.data.success && res.data.data.openid) {
													var _openid = res.data.data.openid;
													var _token = res.data.data.token ? res.data.data.token : '';
													var deathline = res.data.data.deathline ? res.data.data.deathline : '';
													if (_token && deathline) {
														uni.getStorage({
															key: "user",
															success(ress) {
																let ress_data = ress.data;
																if (ress_data.userType == "3") {
																	console.log("-----wxXCXAuth:reset-----")
																	ress_data["token"] = _token;
																	ress_data["deathline"] = deathline;
																	ress_data["openid"] = _openid;
																	uni.setStorage({
																		key: "user",
																		data: ress_data,
																		success() {
																			if (checkType == 'reCheack') {
																				ctx.dispatch("cheack_user");
																			}
																		}
																	});
																}
															},
															fail() {}
														})
													}
													uni.setStorage({
														key: "openid",
														data: _openid
													});
													ctx.state.openid = _openid;
												}
											},
											fail(err) {
												console.log("getWeChatInfo-err:", err)
											},
											complete() {}
										})
									}
								},
								fail(f) {},
								complete() {}
							});
						}
					}
				});
			}
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
