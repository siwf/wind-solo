<!--
 * @Description: 空数据组件
 * @Autor: siwenfeng
 * @Date: 2021-10-25 10:48:32
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-18 19:40:09
-->
<template>
	<view class="f-empty-wrap u-flex-col u-row-center u-col-center" :style="{ 'padding-top': marginTop }">
		<image class="empty-img"         
		v-if="$IMG_URL"
        :src="$IMG_URL + 'empty.png'" mode="aspectFill"></image>
		<view class="u-m-t-48 empty-text">{{ tipText }}</view>
        <view class="empty-text">
            <slot name="bottom" />
        </view>
	</view>
</template>

<script>
/**
 * fEmpty- 数据为空页
 * @property {String} image - 空白图。
 * @property {String} tipText - 提示语。
 * @property {String} marginTop - 距离父级距离。
 */
export default {
	name: 'fEmpty',
	props: {
		image: {
			type: String,
			default: ''
		},
		tipText: {
			type: String,
			default: '暂无数据'
		},
		btnText: {
			type: String,
			default: ''
		},
		marginTop: {
			type: String,
			default: '172rpx'
		},
		customStyle: {
			type: Object,
			default: () => {
				return {
					// width: '200rpx',
					// height: '70rpx',
					// background: 'linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1))',
					// borderRradius: '35rpx',
					// fontSize: '28rpx',
					// color: '#fff',
					// border: 0
				};
			}
		}
	},
	methods: {

	}
};
</script>

<style lang="scss" scoped>
.empty-img {
	width: 456rpx;
	height: 456rpx;
}
.empty-text{
    height: 44rpx;
    font-size: $font-md;
    color: $font-color-msg;
    line-height: 44rpx
}
</style>
