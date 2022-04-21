<!--
 * @Description: 视频播放组件
 * @Autor: siwenfeng
 * @Date: 2022-04-18 14:41:24
 * @LastEditors: siwenfeng
 * @LastEditTime: 2022-04-21 09:38:44
-->
<template>
  <view style="width: 100%;">
    
    <uni-video-player v-if="videoUrl" :src="videoUrl"></uni-video-player>
    <button class="u-flex u-p-x-32 u-m-t-40 u-reset-button" open-type="contact">
      <image
        style="width: 26px;height:26px;"
        src="@/static/image/home/lxkf.png"
        mode="scaleToFill"
      />
      <view class="message">点我给温风点火这个懒家伙一点建议</view>
    </button>
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
    const versionTime = new Date('2022/04/22 00:00:00').getTime();
    const curTime = new Date().getTime();
    const { videoUrl, channel } = options
    if (curTime >= versionTime || channel) {
      this.videoUrl = videoUrl
    }
  }
}
</script>

<style scoped lang="scss">
.message {
  font-size: 32rpx;
  // text-align: center;
  margin-left: 40rpx;
  color: #99591F;
}
</style>