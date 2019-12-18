/*
 *	userType 1：management管理员		2：business商业	3：customer顾客
 *	A：普通用户 or 员工 
 *	B：企业管理员
 * */

var api = {
	"formal": {
		"interface": "https://api.bdmartech.com", //接口
		"domain": "http://m.bdmartech.com",
		"appName": "游轮之极卡",
		"phoneNumber": "400400400",
		"wx": {
			"AppID": "wxeaf6d3cdbb53e013",
			"ast": ""
		}
	},
	"dev": {
		"interface": "https://api-test.wsshanghai.com", //接口
		"domain": "http://train.wsshanghai.com",
		"appName": "游轮之极卡",
		"phoneNumber": "400400400",
		"wx": {
			"AppID": "wxeaf6d3cdbb53e013",
			"ast": ""
		}
	}
}
var lks = "dev";
export default {
	Interface: {
		"site": lks,
		"apiurl": api[lks]["interface"], //space111111
		"domain": api[lks]["domain"],
		"appName": api[lks]["appName"],
		"phoneNumber": api[lks]["phoneNumber"],
		"wxConfig": api[lks]["wx"],
		"addr": {
			"getWeChatInfo": "/v4/ApiWeChat-getWeChatInfo.htm", //获取微信信息-公众号?code=1
			"getWeChatInfoMP": "/v4/ApiWeChatMinProgram-getWeChatInfo.htm", //获取微信信息-小程序?code=1

		}
	}
}
