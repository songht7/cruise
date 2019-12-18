<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.$store.dispatch('getSystemInfo')
			this.$store.dispatch('isWeixin');
		},
		onShow: function() {
			console.log('App Show')
			this.$store.dispatch('wxAuth');
		},
		onHide: function() {
			//console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/uni.css";
	@import "./common/fonts/iconfont.css";
</style>
