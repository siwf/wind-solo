<!--
 * @Description: 首页图片列表组件
 * @Autor: siwenfeng
 * @Date: 2021-10-14 10:10:18
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-26 15:28:16
-->
<template>
  <view class="f-home-list u-m-t-48">
    <view class="f-list-title u-m-b-24">了解惠融资产</view>
    <view class="f-list-wrap">
      <image
        style="height: 160rpx; width: 686rpx"
        v-if="$IMG_URL"
        :src="$IMG_URL + 'gsjj.png'"
        class="u-m-b-20"
        @tap="$Router.push('/pages/home/companyIntro')"
      />
      <image
        style="height: 160rpx; width: 686rpx"
        v-if="$IMG_URL"
        :src="$IMG_URL + 'hzhb.png'"
        class="u-m-b-20"
      />
      <image
        style="height: 160rpx; width: 686rpx"
        v-if="$IMG_URL"
        :src="$IMG_URL + 'fxcx.png'"
        class="u-m-b-20"
      />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      imageList: [],
    };
  },
};
</script>

<style scoped lang="scss">
.f-list-title {
  height: 52rpx;
  font-size: $font-xl;
  font-weight: 500;
  color: $font-color-base;
  line-height: 52rpx;
}
</style>
