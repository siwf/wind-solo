<!--
 * @Description: 注册成功页面
 * @Autor: siwenfeng
 * @Date: 2021-10-18 10:51:09
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-12-01 09:23:00
-->
<template>
  <view class="f-public-smscode u-p-t-76 u-p-x-64 f-container-white">
    <view class="f-smscode-title">
      <view class="u-m-b-32 f-title-value">注册成功</view>
      <view class="f-smscode-phone"
        >根据《私募投资基金募集行为管理办法》规定，深圳惠融资产管理有限公司仅对“具有相应风险识别能力和风险承担能力，投资于单只私募基金的金额不低于100万元，且个人金融资产不低于300万元或者最近三年个人年均收入不低于50万元”的特定投资者宣传、推介相关私募投资基金产品。请先完成身份认证后，我们才能为您提供后续服务。</view
      >
    </view>
    <uni-common-button
      @click="next"
      title="一键认证"
      :isDisabled="isDisabled"
    ></uni-common-button>
    <view class="f-btn-text" @tap="latterCheck">稍后认证</view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      // 用来判断页面卸载的返回类型
      navbackType: 0 //0默认是点击了返回， 1 立即实名认证 2 稍后认证
    };
  },
  methods: {
    next() {
      // 立即实名认证
      this.navbackType = 1;
      this.$Router.push('/pages/my/realname')
    },
    latterCheck() {
      this.navbackType = 2;
      this.$api.repalceAllUser()
    }
  },
  computed: {
    isDisabled() {
      return false;
    },
  },
  onUnload() {
    if (this.navbackType === 0) {
      this.$api.repalceAllUser()
    }
  }
};
</script>

<style scoped lang="scss">
.f-public-smscode {
  .f-smscode-title {
    .f-title-value {
      height: 64rpx;
      font-size: $font-xxg;
      font-weight: 500;
      color: $font-color-base;
      line-height: 64rpx;
    }
    margin-bottom: 96rpx;
    .f-smscode-phone {
    //   height: 44rpx;
      font-size: $font-md;
      color: $font-color-normal;
      line-height: 44rpx;
    }
  }
  .f-btn-text  {
    text-align: center;
    height: 44rpx;
    font-size: $font-md;
    color: $font-color-normal;
    line-height: 44rpx;
    margin-top: 48rpx;
  }
}
</style>

