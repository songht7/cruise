<template name="ContactUs">
	<view class="pop-box box-on-page">
		<view class="pop-head">
			<view class="pop-title pop-title2">• 联系方式 •</view>
		</view>
		<view class="pop-main" style="height:auto">
			<view class="intro-box">
				<view class="intro-block">
					<view class="intro-row">如需预定航线或了解更多详情，请与庞洛邮轮世界之极卡专属客服代表联系。</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: "ContactUs",
		props: {},
		data() {
			return {}
		},
		components: {},
		methods: {
			phoneto(val) {
				uni.makePhoneCall({
					phoneNumber: val
				});
			}
		}
	}
</script>
</style>
