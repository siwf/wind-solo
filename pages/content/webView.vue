<!-- 外链,webview -->
<template>
	<view><web-view :src="webviewPath" @load="loadSuccessHandler"></web-view></view>
</template>

<script>
export default {
	data() {
		return {
			webviewPath: ''
		};
	},
	onLoad() {
		uni.showLoading({
        title: "加载中",
      });
		this.webviewPath = this.$Route.query.webviewPath;
	},
	methods: {
		loadSuccessHandler() {
			uni.hideLoading();		
		}
	}
};
</script>

<style></style>A
