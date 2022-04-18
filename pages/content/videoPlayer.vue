<!--
 * @Description: 视频播放组件
 * @Autor: siwenfeng
 * @Date: 2022-04-18 14:41:24
 * @LastEditors: siwenfeng
 * @LastEditTime: 2022-04-18 16:24:35
-->
<template>
  <view v-show="videoUrl" style="width: 100%;">
    <uni-video-player :src="videoUrl"></uni-video-player>
    <!-- <video :src="videoUrl" style="width: 100%;" ></video> -->
  </view>
</template>

<script>

export default {
  data() {
    return {
      videoUrl: ''
    }
  },
  onLoad(options) {
    const { videoUrl } = options
    this.videoUrl = videoUrl
  }
}
</script>
