<!--
 * @Description: 公司介绍组件
 * @Autor: siwenfeng
 * @Date: 2021-11-26 15:16:37
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-26 15:49:47
-->
<template>
    <view class="f-container-white u-p-x-64 u-p-y-64">
        <image
        style="height: 192rpx; width: 622rpx"
        v-if="$IMG_URL"
        :src="$IMG_URL + 'introduce.png'"
      />
      <view class="u-m-t-48 f-company-intro">
        深圳惠融资产管理有限公司，成立于2015年10月，于2015年11月在中国证券投资基金业协会完成私募管理人备案（备案编号：P1027460），是中国证券投资基金业协会会员单位。惠融资产专注于权益投资和固定收益投资领域，致力于为投资者创造长期价值。
      </view>
      <view class="f-company-intro m-t-90">
        依托于专业团队，惠融资产为投资者定制不同“风险/收益特征”的资产组合，在跨越市场周期、承担可控风险的同时取得长期稳健收益。
      </view>
    </view>
</template>

<style lang="scss" scoped>
.f-company-intro  {
    font-size: $font-lg;
    font-family: PingFangSC-Regular, PingFang SC;
    line-height: 48rpx;
}
.m-t-90 {
    margin-top: 90rpx;
}
</style>