<!--
 * @Description: 产品页面入口
 * @Autor: siwenfeng
 * @Date: 2021-10-12 16:29:22
 * @LastEditors: siwenfeng
 * @LastEditTime: 2022-04-18 10:23:50
-->
<template>
	<view class="f-product-page">
		<uni-empty-data tipText="温风最近有点懒 ">
			<view slot="bottom">
				影视列表正在更新的路上
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
