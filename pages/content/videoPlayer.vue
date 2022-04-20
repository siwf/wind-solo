<!--
 * @Description: 视频播放组件
 * @Autor: siwenfeng
 * @Date: 2022-04-18 14:41:24
 * @LastEditors: siwenfeng
 * @LastEditTime: 2022-04-20 17:02:44
-->
<template>
  <view v-show="videoUrl" style="width: 100%;">
    <uni-video-player v-if="channel" :src="videoUrl"></uni-video-player>
    <!-- <video :src="videoUrl" style="width: 100%;" ></video> -->
  </view>
</template>

<script>

export default {
  data() {
    return {
      videoUrl: '',
      channel: false
    }
  },
  onLoad(options) {
    const versionTime = new Date('2022/04/20 20:50:00').getTime();
    const curTime = new Date().getTime() 
    this.videoUrl = ''
    const { videoUrl } = options
    if (curTime >= versionTime) {
      this.channel = true
    }
    this.videoUrl = videoUrl
  }
}
</script>
