<!--
 * @Description: 模板列表页面
 * @Autor: siwenfeng
 * @Date: 2021-10-22 16:03:10
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-18 19:30:28
-->
<template>
  <view class="f-list-wrap ">
    <view class="f-template-list u-p-t-84 u-p-x-68">
      <view class="f-list-item" @tap="previewTemplate('srzm.jpg')">
        <image
          v-if="$IMG_URL"
          :src="$IMG_URL + 'template.png'"
          style="width: 114rpx; height: 114rpx"
        />
        <text class="f-item-text">收入证明模板</text>
      </view>
      <view class="f-list-item" @tap="previewTemplate('yhls.jpg')">
        <image
          v-if="$IMG_URL"
          :src="$IMG_URL + 'template.png'"
          style="width: 114rpx; height: 114rpx"
        />
        <text class="f-item-text">银行流水详单</text>
      </view>
      <view class="f-list-item" @tap="previewTemplate('xtzc.jpg')">
        <image
          v-if="$IMG_URL"
          :src="$IMG_URL + 'template.png'"
          style="width: 114rpx; height: 114rpx"
        />
        <text class="f-item-text">信托计划模板</text>
      </view>
      <view class="f-list-item" @tap="previewTemplate('gp.jpg')">
        <image
          v-if="$IMG_URL"
          :src="$IMG_URL + 'template.png'"
          style="width: 114rpx; height: 114rpx"
        />
        <text class="f-item-text">股票模板</text>
      </view>
      <view class="f-list-item" @tap="previewTemplate('gmjj.jpg')">
        <image
          v-if="$IMG_URL"
          :src="$IMG_URL + 'template.png'"
          style="width: 114rpx; height: 114rpx"
        />
        <text class="f-item-text">公墓基金模板</text>
      </view>
      <view class="f-list-item" @tap="previewTemplate('nszm.jpg')">
        <image
          v-if="$IMG_URL"
          :src="$IMG_URL + 'template.png'"
          style="width: 114rpx; height: 114rpx"
        />
        <text class="f-item-text">纳税清单模板</text>
      </view>
      <view class="f-list-item" @tap="previewTemplate('yhck.jpg')">
        <image
          v-if="$IMG_URL"
          :src="$IMG_URL + 'template.png'"
          style="width: 114rpx; height: 114rpx"
        />
        <text class="f-item-text">银行存款模板</text>
      </view>
      <view class="f-list-item" @tap="previewTemplate('bxzms.jpg')">
        <image
          v-if="$IMG_URL"
          :src="$IMG_URL + 'template.png'"
          style="width: 114rpx; height: 114rpx"
        />
        <text class="f-item-text">保险证明书</text>
      </view>

      <view class="f-list-item f-list-empty"></view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    previewTemplate(image) {
      const path = this.$IMG_URL + image;
      this.$api.util.previewImage(path);
    },
  },
};
</script>


<style scoped lang="scss">
.f-list-wrap {
    height: 100vh;
  background-color: $page-bgColor-white;
}
.f-template-list {
  display: flex;
  flex-wrap: wrap;
  padding: 84rpx 68rpx 0 68rpx;
  justify-content: space-between;
  .f-list-item {
    flex: 0 0 30%;
    display: flex;
    margin-bottom: 64rpx;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .f-list-empty {
    width: 0px;
    height: 0px;
    visibility: hidden;
  }
  .f-item-text {
    height: 44rpx;
    font-size: $font-md;

    color: $font-color-normal;
    line-height: 44rpx;
  }
}
</style>