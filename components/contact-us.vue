<template name="ContactUs">
	<view class="pop-box box-on-page">
		<view class="pop-head">
			<view class="pop-title pop-title2">• 联系方式 •</view>
		</view>
		<view class="pop-main" style="height:auto">
			<view class="intro-box">
				<view class="intro-block">
					<view class="content-rule">如需预定航线或了解更多详情，请与庞洛邮轮世界之极卡专属客服代表联系。</view>
					<view class="content-info">
						<view class="content-block">
							<view class="ct-icon">
								<img class="ct-img" src="../static/icon-phone.png" />
							</view>
							<view class="ct-row">
								联系电话：<text class="clr-green">021-61575351</text>
							</view>
						</view>
						<view class="content-block">
							<view class="ct-icon">
								<img class="ct-img" src="../static/icon-mail.png" />
							</view>
							<view class="ct-row">
								联系邮箱：<text class="clr-green">mzhang@ponant.com</text>
							</view>
						</view>
					</view>
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
<style scoped>
	.content-rule {
		font-size: 32upx;
		line-height: 1.8;
	}

	.content-block {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		align-items: center;
		padding-bottom: 30upx;
	}

	.content-block:last-child {
		padding-bottom: 0;
	}

	.ct-icon {
		height: 100upx;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 20upx 0;
	}

	.ct-img {
		height: 100%;
		width: auto;
	}

	.ct-row {
		font-size: 32upx;
		line-height: 2;
	}
</style>
