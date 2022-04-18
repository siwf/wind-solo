<!--
 * @Description: 首页图片列表组件
 * @Autor: siwenfeng
 * @Date: 2021-10-14 10:10:18
 * @LastEditors: siwenfeng
 * @LastEditTime: 2022-04-18 11:09:45
-->
<template>
  <view class="f-home-list u-m-t-48">
    <view class="f-list-title u-m-b-24">最近热映</view>
    <view class="f-list-wrap">
      <image
        style="height: 288rpx; width: 686rpx"
        v-for="(item, index) in imageList"
        :key="index"
        :src="item.image"
        class="u-m-b-20"
      />
    </view>
  </view>
</template>

<script>
import {
	IMG_URL
} from '@/env'
export default {
  data() {
    return {
      imageList: [
        {
          image: IMG_URL + "xsj.jpeg",
          videoUrl: ''
        },
        {
          image: IMG_URL + "bjm.jpeg",
          videoUrl: ''
        },
        {
          image: IMG_URL + "kbj.jpeg",
          videoUrl: ''
        },
      ],
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
