<!--
 * @Description: 产品页面入口
 * @Autor: siwenfeng
 * @Date: 2021-10-12 16:29:22
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-26 11:39:17
-->
<template>
	<view class="f-product-page">
		<uni-empty-data tipText="产品暂不支持在线预约 ">
			<view slot="bottom">
				请联系您的专属理财师
			</view>
		</uni-empty-data>
	</view>
</template>

<script>
import share from '@/mixins/share'

export default {
	mixins: [share]
}
</script>


<style lang="scss" scoped>
.f-product-page {
	height: 100%;
}
</style>
