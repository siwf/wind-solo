<!--
 * @Description: 首页图片列表组件
 * @Autor: siwenfeng
 * @Date: 2021-10-14 10:10:18
 * @LastEditors: siwenfeng
 * @LastEditTime: 2022-04-21 10:01:35
-->
<template>
  <view class="f-home-list u-m-t-48">
    <view class="f-list-title u-m-b-24">最近热映</view>
    <view class="f-list-wrap">
      <image
        style="height: 288rpx; width: 686rpx"
        v-for="(item, index) in imageList"
        :key="index"
        @click="watchVideo(item.videoUrl)"
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
          image: IMG_URL + "ws2.jpeg",
          videoUrl: 'https://e1.monidai.com/20210223/EuDlG0xK/index.m3u8'
        },
        {
          image: IMG_URL + "bxh.jpeg",
          videoUrl: 'https://hnzy3.hnzyww.com:65/20220414/muDd4z2l/index.m3u8'
        },
        {
          image: IMG_URL + "hsy.jpeg",
          videoUrl: 'https://pps.sd-play.com/20220109/IOM9deDm/index.m3u8'
        },
      ],
    };
  },
  methods: {
    watchVideo(videoUrl) {
      this.$tools.videoTo(videoUrl);
    }
  }
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
