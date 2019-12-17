<template>
	<view class="page">
		
		<view class="pops">
			<view class="main" :class="{'show': show}">
				<view class="icon"></view>
				<view class="text">请输入验证码</view>
				<view class="code">
					<text v-for="(o, i) in list" :key="i" :class="{'focus': o.fs}" v-text="o.val" /></text>
				</view>
				<view class="input">
					<input type="text" focus="true" hover-class="none" :maxlength="list.length" @input="onInput($event)" @blur="onBlur" />
				</view>
				<view class="button">
					<button type="default" @click="onSubmit" hover-class="none" >提交验证码</button>
				</view>
			</view>
		</view>
		<view class="alert" :class="{'hide': hide}">
			<view class="box">
				<view class="icon"></view>
				<view class="text">活动未开启</view>
				<view class="btns" hover-class="none"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {	
				//在这里设置验证码的个数，现在是4个如要添加就在list数组中加一个{val: '', fs: false} 就好了！！
				list: [
					{val: '', fs: true}, 
					{val: '', fs: false}, 
					{val: '', fs: false},
					{val: '', fs: false}
				],
				show: false, //输入框显示开关
				hide: false, //提示框显示开关
			}
		},
		onLoad() {	
			//输入框显示弹出动画开关
			this.show = true;
		},
		onReady() {
			
		},
		methods: {
			//失去焦点
			onBlur() {
				setTimeout(function(){
					window.scrollTo(0, 0);
				}, 300);
			},
			//当输入框的内容改变时的操作
			onInput(e) {
				const l = e.target.value.length;
				for(let i = 0; i < this.list.length; i++) {
					this.list[i].fs = false;
					this.list[i].val =  e.target.value[i];
				};
				if(l) this.list[l - 1].fs = true;
			},
			//提示验证码方法
			onSubmit() {
				let code = '';
				for(let i = 0, len = this.list.length; i < len; i++) {
					// 获取用户输入的验证码
					code += this.list[i].val;
				};
				if(code && 4 == code.length) {
					uni.showToast({
						title: '验证通过：'+ code,
						image: '../../static/img/alert-2.png',
						duration: 3000
					});
				} else {
					uni.showToast({
						title: '请正确输入验证码！',
						image: '../../static/img/alert-3.png',
						duration: 3000
					});
				};
			}
		}
	};
</script>

<style>
	.page{ position: fixed; top: 0; right: 0; bottom: 0; left: 0; background:  url(../../static/img/index.jpg) no-repeat center; background-size: cover; }
	.page .pops{ position: fixed; top: 0; right: 0; bottom: 0; left: 0; display: flex; flex-direction: row; justify-content: center; align-items: center; background: rgba(0, 0, 0, 0.4);}
	.page .pops .main{ position: relative; display: none; flex-direction: column; align-items: center; padding: 50upx; border-radius: 12upx; width: 480upx; height: 360upx; background: white;}
	.page .pops .main .icon{ position: absolute; top: -48upx; width: 98upx; height: 98upx; background: url(../../static/img/alert-1.png) no-repeat; background-size: contain;}
	.page .pops .main .text{ padding: 50upx 0; color: #4c4e60; font-size: 32upx;}
	.page .pops .main .code{ margin: 10px 0 30px; display: flex; flex-direction: row; justify-content: space-between; width: 300upx;}
	.page .pops .main .code text{ width: 40upx; height: 40upx; line-height: 28upx; border: none; border-bottom: 4upx solid #b2bfbd; text-align: center; color: #4c4e60; font-size: 46upx;}
	.page .pops .main .code text.focus{ border-color: #4c79fa;}
	.page .pops .main .input{ position: absolute; top: 190upx; width: 100%; height: 80upx; opacity: 0; overflow: hidden;}
	.page .pops .main .input input{ position: absolute; left: -50%; width:200%; height: 80upx; line-height: 80upx; font-size: 40upx; text-align: left; outline: none; border: none; background: none; z-index: 666;}
	.page .pops .main .button{ position: relative;}
	.page .pops .main .button button{ width: 360upx; height: 80upx; line-height: 80upx; border-radius: 40upx; text-align: center; color: white; font-size: 32upx; font-weight: bold; background: linear-gradient(#614cff, #4c79fa);}
	
	@keyframes show{
		0%{transform: scale(0);}
		50%{transform: scale(1.1);}
		100%{transform: scale(1);}
	}
	.show{ display: flex!important; animation: show .6s ease-in-out forwards; }
	
	.alert{ position: fixed; top: 0; right: 0; bottom: 0;left: 0; display: none; flex-direction: row; justify-content: center; align-items: center; background: rgba(0, 0, 0, 0.4);}
	.alert .box{ position: relative; display: flex; flex-direction: column; align-items: center; padding: 50upx; border-radius: 12upx; background: white;}
	.alert .box .icon{ position: absolute; top: -48upx; width: 98upx; height: 98upx; background: url(../../static/img/alert-3.png) no-repeat; background-size: contain;}
	.alert .box .text{ padding: 50upx 0; width: 360upx; height: 80upx; line-height: 80upx; text-align: center; color: #4c4e60; font-size: 36upx;}
	
	.hide{ display: flex!important; animation: show .3s ease-in-out forwards; }
</style>