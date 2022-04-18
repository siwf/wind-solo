<!--
 * @Description: 全局确认弹框
 * @Autor: siwenfeng
 * @Date: 2021-10-25 15:36:33
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-15 10:42:15
-->
<template>
  <u-popup
    v-model="showModal"
    mode="center"
    border-radius="24"
    :width="width"
    :scrolly="false"
    :mask-close-able="false"
    :custom-style="{ top: '-200rpx' }"
  >
    <view class="f-financial-planner u-flex-col">
      <view class="f-modal-header">
        <view class="f-modal-title u-m-b-16">{{ modalTitle }}</view>
        <slot />
      </view>
      <view class="f-modal-footer u-flex">
        <view class="f-footer-view" @tap="cancle">{{ cancelText }}</view>
        <view class="f-footer-view f-view-right" @tap="confirm">{{ confirmText }}</view>
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
            default: ''
        },
        cancelText: {
            type: String,
            default: '跳过'
        },
        confirmText: {
            type: String,
            default: "确定"
        },
        width: {
          type: String,
          default: '80%'
        }
    },
    methods: {
        cancle() {
            this.$emit('cancle')
        },
        confirm() {
            this.$emit('confirm')
        }
    }
};
</script>

<style scoped lang="scss">
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
  }
  .f-modal-footer {
    .f-footer-view {
      flex: 1;
      height: 96rpx;
      line-height: 96rpx;
      text-align: center;
      color: $font-color-normal;
      font-size: $font-xl;
      position: relative;
    }
    .f-view-right {
      color: $font-color-spec !important;
    }
    .f-view-right::before {
      position: absolute;
      content: '';
      height: 96rpx;
      width: 0;
      left: 0;
      border: 1rpx solid $border-color-base;
    }
  }
}
</style>