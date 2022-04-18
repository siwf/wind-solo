<!--
 * @Description: 状态提示组件
 * @Autor: siwenfeng
 * @Date: 2021-10-25 11:04:40
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-18 19:44:30
-->
<template>
  <view
    class="f-status-tooltip u-flex-col u-row-center u-col-center"
    :style="{ 'padding-top': marginTop }"
  >
    <!-- <image class="empty-img" :src="$IMG_URL + '/villageDoctor/health-platform/client/empty.png'" mode="aspectFill"></image> -->
    <image
      class="empty-img"
      v-if="$IMG_URL && image"
      :src="$IMG_URL + image + '.png'"
      mode="aspectFill"
    ></image>
    <view class="u-m-t-40 f-tooltip-title ">{{
      tooltipTitle
    }}</view>
    <!-- tiptextTop第一行文字 -->
    <view class="u-m-t-16 f-tooltip-top f-tooltip-text">{{ tiptextTop }}</view>
    <!-- tiptextBottom第二行文字 -->
    <view v-show="tiptextBottom" class="f-tooltip-top">{{ tiptextBottom }}</view>
    <view class="f-status-button u-m-t-64" @tap="btnClick">{{ btnText }} </view>
  </view>
</template>

<script>
export default {
  name: "fStatusTooltip",
  props: {
    image: {
      type: String,
      default: "empty",
    },
    tooltipTitle: {
      type: String,
      default: "",
    },
    tiptextTop: {
      type: String,
      default: "",
    },
    tiptextBottom: {
      type: String,
      default: "",
    },
    btnText: {
      type: String,
      default: "知道了",
    },
    marginTop: {
      type: String,
      default: "76rpx",
    },
    customStyle: {
      type: Object,
      default: () => {
        return {
          // width: '200rpx',
          // height: '70rpx',
          // background: 'linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1))',
          // borderRradius: '35rpx',
          // fontSize: '28rpx',
          // color: '#fff',
          // border: 0
        };
      },
    },
  },
  methods: {
      btnClick() {
          this.$emit('click')
      }
  },
};
</script>

<style lang="scss" scoped>
.empty-img {
  width: 456rpx;
  height: 456rpx;
}

.f-tooltip-title {
  height: 64rpx;
  font-size: $font-xxg;
  text-align: center;
  font-weight: 500;
  color: $font-color-base;
  line-height: 64rpx;
}
.f-tooltip-text {
  font-size: $font-md;

  color: $font-color-msg;
  line-height: 44rpx;
}
.f-status-button {
  font-size: $font-lg;
  height: 100rpx;
  width: 350rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: $font-color-light;
  background: linear-gradient(270deg, #EEBF85 0%, #E08F45 100%);
    box-shadow: 0px 6rpx 12rpx 0px rgba(225,174,127,0.5);
    border-radius: 50rpx;
}
</style>
