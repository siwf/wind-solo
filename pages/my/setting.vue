<!--
 * @Description: 设置页面
 * @Autor: siwenfeng
 * @Date: 2021-10-15 10:49:41
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-24 17:02:24
-->
<template>
  <view class="f-my-setting container">
    <view class="f-setting-cell u-m-t-36">
      <view class="f-cell-item f-border-bottom u-flex">
        <view class="f-item-left">手机号</view>
        <view class="f-item-right u-flex-1">{{ regMobile }}</view>
      </view>
      <view class="f-cell-item u-flex" @tap="modifyPassword">
        <view class="f-item-left">修改登录密码</view>
        <text class="fortune icon-fortuneArrow-01 u-flex-1 f-item-right"></text>
        <!-- <view class="f-item-right u-flex-1">133****3767</view> -->
      </view>
    </view>
    <view class="u-m-t-24 f-setting-logout" @click="showModal=true">退出登录</view>
    <uni-modal-dialog
      :showModal="showModal"
      cancelText="取消"
      confirmText="确定"
      modalTitle="提示"
      @cancle="showModal=false"
      @confirm="success"
    >
      <view class="f-logout-text"> 确定退出登录吗？ </view>
    </uni-modal-dialog>
  </view>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            showModal: false
        }
    },
    computed: {
      ...mapGetters(["userInfo"]),
      regMobile() {
        return this.$api.util.mobileEncrypt(this.userInfo.regMobile || '') || '';
      }
    },
    methods: {
        modifyPassword() {
          this.$Router.replace({
            path: '/pages/public/oldpassword'
          })
        },
        success() {
          this.$store.dispatch('LogOut').then((res) => {
            this.showModal = false
            this.$Router.replaceAll('/pages/index/index')
            // location.reload()
          }).catch(err => {})
        }
    }
}
</script>


<style scoped lang="scss">
.f-setting-cell {
  background-color: $font-color-light;
  font-size: $font-lg;
  color: $font-color-base;
  line-height: 48rpx;
  padding: 0 40rpx;
  .f-cell-item {
    padding: 32rpx 0rpx;
  }
  .f-item-left {
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400 !important;
  }
  .f-item-right {
    font-family: PingFangSC-Regular, PingFang SC;
    text-align: right;
    font-weight: bold !important;
  }
  .f-border-bottom {
    border-bottom: 1rpx solid $border-color-dark;
  }
}
.f-setting-logout {
  background-color: $font-color-light;
  height: 112rpx;
  text-align: center;
  line-height: 112rpx;
  font-weight: 500;
  color: $font-color-confirm;
  font-size: $font-lg;
}
.f-logout-text {
  text-align: center;
  height: 40rpx;
  font-size: $font-sx;

  color: $font-color-normal;
  line-height: 40rpx;
}
</style>