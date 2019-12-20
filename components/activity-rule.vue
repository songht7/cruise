<template name="ActivityRule">
	<view class="pop-box box-on-page">
		<view class="pop-head">
			<view class="pop-title pop-title2">• 活动规则 •</view>
			<view class="pop-close pop-switch" @click="onSwitch">
				{{switchState?'收起':'展开'}}
				<uni-icon type="closeempty" size="42" color="#666666"></uni-icon>
			</view>
		</view>
		<view class="pop-main" style="height:auto">
			<view class="intro-box">
				<view class="intro-block">
					<view class="intro-row"><text class="numb-li">1.</text><text>活动时间：即日起至2020年12月31日。</text></view>
					<view class="intro-row"><text class="numb-li">2.</text><text>活动对象：交通银行世界之极信用卡持卡人（以下称“持卡人”）。</text></view>
					<block v-if="switchState">
						<view class="intro-row"><text class="numb-li">3.</text><text>持卡人关注庞洛微信公众号“庞洛邮轮PONANT”后，即可领取200欧元庞洛邮轮抵用券。该券可在登船后抵用船上的任何消费，可拆分使用，但不找零、不退现。</text></view>
						<view class="intro-row"><text class="numb-li">4.</text><text>活动期间，交通银行世界之极信用卡持卡人除了能领取200欧元庞洛邮轮抵用券，还将专享庞洛邮轮所有线路82折优惠。以上优惠可与庞洛公司官网优惠同享。</text></view>
						<view class="intro-row"><text class="numb-li">5.</text><text>持卡人可至庞洛公司官网 ( <a href="https://en.ponant.com/cruises"
								 target="_blank" style="color:#354e70">https://en.ponant.com/cruises</a> ) 或致电庞洛客服 <em @click='phoneto("021-61575351")'>021-61575351</em>
								查询及挑选线路，庞洛公司将根据持卡人的预订需求出具预订单。</text></view>
						<view class="intro-row"><text class="numb-li">6.</text><text>预订单出具后的7个自然日内，预订舱位免费保留。持卡人需在7个自然日内，使用本人的交通银行世界之极信用卡支付订金，订金金额为订单金额的25%，未按期支付订金的订单将自动失效。订金支付成功后该舱位预订成功，庞洛公司将更新预订单并将其发送给持卡人。</text></view>
						<view class="intro-row"><text class="numb-li">7.</text><text>持卡人需要在所预订航次出发前90个自然日内，使用本人的交通银行世界之极信用卡授权支付或通过国际电汇方式支付75%的尾款。未按期支付尾款的订单将自动失效，订金不予退还。全款付清后，庞洛公司将再次出具付清全款的预订单给持卡人，并出具船票。（登船不以船票作为凭证，乘客凭护照登船。）</text></view>
						<view class="intro-row"><text class="numb-li">8.</text><text>付款方式：订金必须使用交通银行世界之极信用卡支付，尾款可选择使用交通银行世界之极信用卡授权支付或国际电汇方式支付。如选择使用交通银行世界之极信用卡支付时，持卡人需填写庞洛公司提供的支付授权表，提供完整卡号、有效期和CVV2，并扫描发回庞洛公司作为刷卡扣款使用。如使用国际电汇方式支付时，持卡人根据预订单上的电汇信息，必须以欧元货币电汇给庞洛公司。</text></view>
						<view class="intro-row"><text class="numb-li">9.</text><text>此活动为交通银行世界之极信用卡持卡人专属，不可转让。</text></view>
					</block>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: "ActivityRule",
		props: {},
		data() {
			return {
				switchState: false //收起、展开
			}
		},
		components: {},
		methods: {
			phoneto(val) {
				uni.makePhoneCall({
					phoneNumber: val
				});
			},
			onSwitch() {
				this.switchState = !this.switchState;
			}
		}
	}
</script>
<style>
	.pop-title2 {}
</style>
