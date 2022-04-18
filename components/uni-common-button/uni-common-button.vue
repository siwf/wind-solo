<!--
 * @Description: 通用按钮组件
 * @Autor: siwenfeng
 * @Date: 2021-10-15 13:45:39
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-08 11:14:13
-->
<template>
  <view class="uni-common-button" :class="[fixed ? 'uni-button-safe' : '']" :style="[fixed ? wrapStyle : '']">
    <button
      class="u-reset-button u-flex u-row-center"
      :disabled="canClick"
      :style="[isDisabled ? disabledStyle : buttonStyle]"
      hover-class="none"
      @click="click"
    >
      {{ title }}
    </button>
  </view>
</template>

<script>
	export default {
		name: 'uniCommonButton',
		data() {
			return {

			}
		},
		props: {
			/**
			 *
			 * isDiabled 用于防止用户多次点击 优化
			 */
			// 是否可以点击 默认是可以点击
			canClick: {
				type: Boolean,
				default: false
			},
			isDisabled: {
				type: Boolean,
				default: true
			},
			width: {
				type: String,
				default: '100%'
			},
			height: {
				type: Number,
				default: 100
			},
			borderRadius: {
				type: Number,
				default: 50
			},
			bgColor: {
				type: String,
				default: 'linear-gradient(270deg, #EEBF85 0%, #E08F45 100%)'
			},
			disableBgColor: {
				type: String,
				default: '#E5E5E5'
			},
			fontSize: {
				type: Number,
				default: 32
			},
			color: {
				type: String,
				default: '#FFFFFF'
			},
			title: {
				type: String,
				default: ''
			},
			fixed: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			buttonStyle() {
				const style = {
					width: this.width,
					height: this.height + 'rpx',
					borderRadius: this.borderRadius + 'rpx',
					color: this.color,
					background: this.bgColor,
					fontSize: this.fontSize + 'rpx',
				}
				return style;
			},
			disabledStyle() {
						const style = {
						width: this.width,
						height: this.height + 'rpx',
						borderRadius: this.borderRadius + 'rpx',
						color: this.color,
						background: this.disableBgColor,
						fontSize: this.fontSize + 'rpx'
					}
					return style;
			},
			wrapStyle() {
				return {
					position: 'fixed',
					bottom: 0,
					left: 0,
					background: '#fff',
					"z-index": 1111
				}
			}
		},
		methods: {
			click() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-common-button {
		display: flex;
		align-items: center;
		width: 100%;
	}
	.uni-button-safe {
		padding: 16rpx 32rpx 0 16rpx;
		padding-bottom:calc(10rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
	}
</style>