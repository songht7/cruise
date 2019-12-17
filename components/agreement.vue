<template name="agreement">
	<view class="pop-box">
		<view class="pop-head">
			<view class="pop-title">用户须知</view>
			<!-- <view class="pop-close" @click="onClick()">
				<uni-icon type="closeempty" size="42" color="#666666"></uni-icon>
			</view> -->
		</view>
		<view class="pop-main">
			<view class="intro-box">
				<view class="intro-block">
					<view class="intro-h3">总则</view>
					<view class="intro-row"><text class="numb-li">1.</text><text>凡直接或间接使用本平台，视为自愿与本（下称本软件）达成协议，接受本声明条款的约束。</text></view>
					<view class="intro-row"><text class="numb-li">2.</text><text>除本软件注明之服务条款外，其他一切因使用本软件而可能遭致的意外、疏忽、侵权及其造成的损失（包括因跳转搜索链接到的第三方网站内容而感染电脑病毒），本软件对其概不负责，亦不承担任何法律责任。</text></view>
					<view class="intro-row"><text class="numb-li">3.</text><text>本软件尊重并保护所有使用用户的个人隐私权，运营方有权使用本软件获取相关的个人信息收集、使用、共享等权力，以及向第三方提供用户的信息，本软件提醒您：您在使用本软件所输入的行为数据将不被认为是您的个人隐私资料。（如果您不同意，您应当停止使用本软件）</text></view>
					<view class="intro-row"><text class="numb-li">4.</text><text>本软件所有商品价格仅供参考，实际价格以官网价格或商家为准，为此造成价格歧义，概不负责。</text></view>
					<view class="intro-row"><text class="numb-li">5.</text><text>本软件提供的所有店铺信息，仅包括中国大陆现有店铺。</text></view>
					<view class="intro-row"><text class="numb-li">6.</text><text>本软件如因系统维护或升级而需暂停服务时，将事先公告。</text></view>
					<view class="intro-row"><text class="numb-li">7.</text><text>禁止一切违反国家现行法律法规、违背公序良俗的行为，用户违反本声明的规定或触犯中华人民共和国法律的，后果及损失均由用户自行承担，本平台不承担任何责任。</text></view>
					<view class="intro-row"><text class="numb-li">8.</text><text>本声明未涉及问题参见国家有关法律法规，当条款与国家法律法规冲突时，以国家法律法规为准。</text></view>
					<view class="intro-row"><text class="numb-li">9.</text><text>本声明在必要时会进行修订，修订将另行通知，修订后的条款一旦公布于网页即有效代替原来的服务条款。</text></view>
					<view class="intro-row"><text class="numb-li">10.</text><text>本软件的一切解释权归运营公司所有，敬请谅解。</text></view>
				</view>
				<view class="intro-block">
					<view class="intro-h3">分则</view>
					<view class="intro-row"><text class="numb-li">1.</text><text>禁止任何煽动分裂国家、反党反政府、贩卖毒品枪支、涉黑涉暴、涉黄涉毒、诈骗等违法内容的发布。</text></view>
					<view class="intro-row"><text class="numb-li">2.</text><text>禁止一切鼓动民族仇恨、民族歧视，破坏民族团结的内容。</text></view>
					<view class="intro-row"><text class="numb-li">3.</text><text>禁止侵犯他人姓名/名称权、名誉/商誉权、肖像权、隐私权、知识产权。</text></view>
					<view class="intro-row"><text class="numb-li">4.</text><text>禁止任何直接或间接传达色情、淫秽信息等违背社会道德、不符公序良俗的内容。</text></view>
					<view class="intro-row"><text class="numb-li">5.</text><text>禁止传播宗教迷信、邪教组织，禁止宗教信仰、传教、宗教培训类宣传。</text></view>
					<view class="intro-row"><text class="numb-li">6.</text><text>禁止使用恶俗标题。</text></view>
					<view class="intro-row"><text class="numb-li">7.</text><text>禁止散布谣言。</text></view>
					<view class="intro-row"><text class="numb-li">8.</text><text>禁止传销、非法分销、多级分销（包括所涉及的平台或机构）。</text></view>
					<view class="intro-row"><text class="numb-li">9.</text><text>国旗、国徽等不能作为广告内容宣传。</text></view>
					<view class="intro-row"><text class="numb-li">10.</text><text>其他违反国家法律法规、违背公序良俗的内容。</text></view>
				</view>
				<view class="intro-block">
					<view class="intro-row">特拟此声明，敬请理解！</view>
					<view class="intro-row">以上规则条款解释权归本软件所有，如有疑问或发现有违规作品，请联系本软件客服。</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		name: "agreement",
		props: {},
		components: {
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>
<style>
</style>
