<!--
 * @Description: 首页图片列表组件
 * @Autor: siwenfeng
 * @Date: 2021-10-14 10:10:18
 * @LastEditors: siwenfeng
 * @LastEditTime: 2022-04-18 16:31:54
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
          image: IMG_URL + "xsj.jpeg",
          videoUrl: 'https://c1.monidai.com/20211018/E7csIm4D/index.m3u8'
        },
        {
          image: IMG_URL + "bjm.jpeg",
          videoUrl: 'http://mpvideo.qpic.cn/0bf2w4abmaaad4adwr3n4fqfbn6dc23qafqa.f10003.mp4?dis_k=146578b21e6ab3c23e8d53bd87eb8a80&dis_t=1650270674&vid=wxv_1814885037427752965&format_id=10003&support_redirect=0&mmversion=false'
        },
        {
          image: IMG_URL + "kbj.jpeg",
          videoUrl: 'https://mp.weixin.qq.com/mp/readtemplate?t=pages/video_player_tmpl&auto=0&vid=wxv_1462512883006652424'
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
