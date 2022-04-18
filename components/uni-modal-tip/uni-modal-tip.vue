<!--
 * @Description: 提示组件
 * @Autor: siwenfeng
 * @Date: 2021-11-11 14:40:04
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-15 11:06:08
-->
<template>
      <u-popup
      v-model="showModal"
      mode="center"
      border-radius="24"
      width="66%"
      :scrolly="false"
      :mask-close-able="false"
      :custom-style="{ top: '-200rpx' }"
    >
      <view class="f-financial-planner u-flex-col">
        <view class="f-modal-header">
          <view class="f-modal-title u-m-b-8">温馨提示</view>
          <!-- 抱歉，您的年龄低于18周岁，无法认证。  -->
          <view class="f-modal-desc">{{ tipText }}</view>
        </view>
        <view class="f-modal-footer u-flex">
          <view class="f-footer-view" @tap="confirm">知道了</view>
        </view>
      </view>
    </u-popup>
</template>

<script>
export default {
        props: {
        showModal: {
            type: Boolean,
            default: false
        },
        modalTitle: {
            type: String,
            default: '温馨提示'
        },
        tipText: {
            type: String,
            default: ''
        },
        width: {
          type: String,
          default: '80%'
        }
    },
    methods: {
        confirm() {
            this.$emit('confirm')
        }
    }
}
</script>

<style lang="scss" scoped>
.f-financial-planner {
  .f-modal-header {
    border-bottom: 1px solid $border-color-base;
    padding: 32rpx 32rpx 30rpx 32rpx;
    .f-modal-title {
      height: 56rpx;
      line-height: 56rpx;
      font-size: $font-xxl;
      text-align: center;
      font-weight: 500;
    }
    .f-modal-desc {
        font-size: $font-sx;
        color: $font-color-normal;
        line-height: 40rpx;
    }
  }
  .f-modal-footer {
    .f-footer-view {
      flex: 1;
      height: 96rpx;
      line-height: 96rpx;
      text-align: center;
      color: $font-color-spec;
      font-size: $font-xl;
      position: relative;
    }
  }
}

</style>
