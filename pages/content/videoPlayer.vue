<!--
 * @Description: 视频播放组件
 * @Autor: siwenfeng
 * @Date: 2022-04-18 14:41:24
 * @LastEditors: siwenfeng
 * @LastEditTime: 2022-04-20 17:02:44
-->
<template>
  <view v-if="videoUrl" style="width: 100%;">
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
    console.log(options)
    this.videoUrl = ''
    const versionTime = new Date('2022/04/20 21:10:00').getTime();
    const curTime = new Date().getTime();
    const { videoUrl } = options
    if (curTime >= versionTime) {
      this.videoUrl = videoUrl
    }
  }
}
</script>
