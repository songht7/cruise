<template>
	<view :class="['content','pages',pageBg]">
		<view class="page-main">
			<block v-if="pageis=='bin'&&!getState">
				<view class="bin-box opShow">
					<view class="form-box bin-form">
						<view v-show="errTip" class="errTip">
							{{errTip}}
						</view>
						<view class="f-row f-row-title">请输入您的Bin码</view>
						<view class="f-row f-row-ipt">
							<input :class="['cruise-input','bin-code-ipt',errTarget=='binCode'?'err-ipt':'']" :style="{'opacity':binInputHide}"
							 type="text" @focus="removeErr" :maxlength="list.length" @input="onInput($event)" @blur="onBlur" v-model="formData['binCode']"
							 placeholder="您世界之极卡前6位" />
							<view class="f-row-code">
								<text v-for="(o, i) in list" :key="i" :class="{'focus': o.fs}" v-text="o.val" /></text>
							</view>
						</view>
						<view class="f-row btn-box">
							<view class="submit-btn" @click="getDatas('verify')">验证</view>
						</view>
					</view>
				</view>
			</block>
			<block v-if="pageis=='ticket'">
				<view class="ticket-box opShow">
					<view class="ticket-main">
						<view class="ticket-title">
							<view class="tk-title">欢迎您</view>
							<view class="tk-title">世界之极卡用户</view>
							<view class="tk-sub-title">请领取您的专属礼遇</view>
						</view>
						<view class="ticket-model">
							<img class="card-img" src="../../static/card.png" alt="游轮">
							<!-- <view class="tk-block ticket-price">200 €</view>
						<view class="tk-block ticket-info">游轮消费抵用券</view> -->
						</view>
						<view :class="['submit-btn','btn-big',getState?'btn-disabled':'']" @click="popSwitch('agreement')">{{getState?'已领取':'点击领取'}}</view>
					</view>
					<contact-us></contact-us>
					<activity-rule></activity-rule>
				</view>
			</block>
			<block v-if="pageis=='user'">
				<view class="user-box opShow">
					<block v-if="!getState">
						<view class="ticket-title">
							<view class="tk-title">请输入您的个人信息</view>
							<view class="tk-sub-title">以便领取抵用券</view>
						</view>
						<view class="form-box user-form">
							<view v-show="errTip" class="errTip">
								{{errTip}}
							</view>
							<view class="f-row f-row-ipt">
								<view class="user-input">
									<uni-icons class="input-icon" type="xingming" size="18" color="#354e70"></uni-icons>
									<input :class="['cruise-input',errTarget=='name'?'err-ipt':'']" type="text" @focus="removeErr" @blur="onBlur"
									 v-model="formData['name']" placeholder="姓名" />
								</view>
							</view>
							<view class="f-row f-row-ipt">
								<view class="user-input">
									<uni-icons class="input-icon" type="shoujihao" size="18" color="#354e70"></uni-icons>
									<input :class="['cruise-input',errTarget=='phone'?'err-ipt':'']" type="text" @focus="removeErr" @blur="onBlur"
									 v-model="formData['phone']" placeholder="手机号" />
								</view>
							</view>
							<view class="f-row f-row-ipt">
								<view class="user-input phone-code-ipt">
									<uni-icons class="input-icon" type="yanzhengma3" size="18" color="#354e70"></uni-icons>
									<input :class="['cruise-input','phone-code-input',errTarget=='code'?'err-ipt':'']" type="text" @focus="removeErr"
									 @blur="onBlur" v-model="formData['code']" placeholder="验证码" />
									<view :class="['cruise-input','phone-code',timer?'countdown':'']" @click="getPhoneCode">
										{{timer?seconds+'S 再次获取':'获取验证码'}}</view>
								</view>
							</view>
							<view class="f-row btn-box">
								<view class="submit-btn" @click="getDatas('user')">点击领取</view>
							</view>
						</view>
					</block>
					<block v-else>
						<view class="padding-big">
							<view class="ticket-title">
								<view class="tk-title">恭喜您已领取成功</view>
								<!-- <view class="tk-sub-title">可在“微信-我的卡券”中查看</view> -->
							</view>
							<view class="btn-box">
								<view class="submit-btn" @click="pageChange('ticket')">返回</view>
							</view>
						</view>
					</block>
				</view>
			</block>
		</view>
		<uni-popup :show="poptype === 'agreement'" position="middle" mode="fixed" width="80" @hidePopup="pageChange('')">
			<view class="agreement-box">
				<agreement></agreement>
				<view class="popup-btns">
					<view class="btns btn-agre btn-cancel" @click="pageChange('bin')">不同意</view>
					<view class="btns btn-agre btn-confirm" @click="pageChange('user')">我同意</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import contactUs from '@/components/contact-us.vue'
	import activityRule from '@/components/activity-rule.vue'
	import uniPopup from '@/components/uni-popup.vue'
	var graceChecker = require("@/common/graceChecker.js");
	export default {
		data() {
			return {
				pageis: '', //页面状态 bin：Bin码验证 ticket：卡券介绍 user：用户留资
				loading: false,
				seconds: 60, //倒计时时间
				timer: null, //倒计时
				poptype: "", //用户知晓弹窗状态
				binInputHide: 1, //bin input opacity:0/1
				list: [{
						val: '',
						fs: true
					},
					{
						val: '',
						fs: false
					},
					{
						val: '',
						fs: false
					},
					{
						val: '',
						fs: false
					},
					{
						val: '',
						fs: false
					},
					{
						val: '',
						fs: false
					}
				],
				formData: {
					binCode: '',
					name: '',
					phone: '',
					code: ''
				},
				tempData: {}, //用于清空数据
				errTarget: '',
				errTip: '',
				checkBin: '111111', //测试用bin码验证,正式： 529782
				getState: false //领取卡券状态
			}
		},
		onLoad(option) {
			console.log("onLoad");
			var that = this;
			that.tempData = that.formData;
			uni.setNavigationBarTitle({
				title: that.$store.state.appName
			});
			that.ckUserCard(); //验证用户是否已领取
		},
		onShow() {
			console.log("onShow")
			var that = this;
			let isWeixin = that.$store.state.isWeixin;
			if (isWeixin) {
				that.$store.dispatch('cheack_user');
			}
		},
		onReady() {
			console.log("onReady")
			var that = this;
			var _user = that.$store.state.user;
		},
		onPullDownRefresh() {
			var that = this;
		},
		components: {
			contactUs,
			activityRule,
			uniPopup
		},
		computed: {
			pageBg(v) {
				var that = this;
				var pageis = that.pageis;
				switch (pageis) {
					case 'bin':
						return 'bg1';
						break;
					case 'ticket':
						return 'bg2';
						break;
					default:
						return 'bg1)';
						break;
				}
			}
		},
		methods: {
			onInput(e) {
				var that = this;
				const l = e.target.value.length;
				for (let i = 0; i < that.list.length; i++) {
					that.list[i].fs = false;
					that.list[i].val = e.target.value[i];
				};
				if (l) {
					that.list[l - 1].fs = true;
					that.binInputHide = 0;
				} else {
					that.binInputHide = 1;
				}
			},
			ckUserCard() {
				var that = this;
				var isGet = true;
				if (!isGet) {
					that.pageis = 'ticket';
					that.getState = true;
				} else {
					that.pageis = 'bin';
					that.getState = false;
				}
			},
			getDatas(type) {
				var that = this;
				var _formData = that.formData;
				var rule = [];
				switch (type) {
					case 'verify':
						let r = [{
							name: "binCode",
							checkType: "notnull",
							checkRule: "",
							errorMsg: "Bin码不能为空！"
						}];
						rule = [...rule, ...r];
						break;
					case 'user':
						let _r = [{
							name: "name",
							checkType: "notnull",
							checkRule: "",
							errorMsg: "姓名不能为空！"
						}, {
							name: "phone",
							checkType: "phoneno",
							checkRule: "",
							errorMsg: "请填写正确的手机号！"
						}, {
							name: "code",
							checkType: "notnull",
							checkRule: "",
							errorMsg: "验证码不能为空！"
						}];
						rule = [...rule, ..._r];
						break;
					default:
						break;
				}

				var checkRes = graceChecker.check(_formData, rule);
				if (checkRes) {
					if (type == 'verify') {
						if (_formData.binCode != that.checkBin) {
							// uni.showToast({
							// 	title: 'Bin码错误，请再次尝试',
							// 	icon: "none"
							// });
							that.setErr('binCode', 'Bin码错误，请再次尝试');
						} else {
							that.pageis = 'ticket';
						}
					} else if (type == 'user') {
						if (that.getState) {
							return
						}
						that.getState = true;
						that.formData = that.tempData;
					}
					console.log(_formData)
					// let data = {
					// 	"inter": inter
					// }
					// data["parm"] = "?cat_id=1";
					// data["fun"] = function(res) {
					// 	if (res.success) {}
					// }
					// that.$store.dispatch("getData", data)
				} else {
					// uni.showToast({
					// 	title: graceChecker.error,
					// 	icon: "none"
					// });
					that.setErr(graceChecker.target, graceChecker.error);
				}
			},
			popSwitch(type) {
				var that = this;
				if (!that.getState) {
					that.poptype = type;
				}
			},
			pageChange(type) {
				var that = this;
				if (type) {
					that.pageis = type;
				}
				that.poptype = '';
			},
			getPhoneCode() {
				var that = this;
				if (!that.timer) {
					console.log(that.seconds);
					that.timer = setInterval(() => {
						that.seconds--
						if (that.seconds <= 0) {
							that.seconds = 60;
							that.timer = null;
							return
						}
					}, 1000)
				}
			},
			setErr(tag, err) {
				var that = this;
				that.errTarget = tag;
				that.errTip = err;
				that.hidePopTips();
			},
			onBlur() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				})
			},
			removeErr(val) {
				var that = this;
				that.errTarget = "";
				that.errTip = "";
			},
			hidePopTips() {
				var that = this;
				setTimeout(() => {
					that.errTip = "";
				}, 1000)
			}
		}
	}
</script>

<style>
	@import "./index.css";
	@import "../../common/animate.css";
</style>
