<!--
 * @Description: 当前持仓页面
 * @Autor: siwenfeng
 * @Date: 2021-10-15 09:34:11
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-24 15:19:41
-->
<template>
  <view class="f-position-wrap">
    <view class="f-position-top u-flex-col">
      <view class="f-position-money">{{ totalAsset }}</view>
      <view class="f-money-text u-m-t-16">总资产（元）</view>
    </view>
    <view class="f-position-content f-my-position u-p-t-24 u-p-x-32">
      <uni-notice-bar :list="noticeList" />
        <uni-scrollview-list :getList="getList" @updateData="updateData">
          <!-- <template v-slot="{data}"> -->
          <view
            class="f-list-item u-m-b-24"
            v-for="(item, index) in list"
            :key="index"
          >
            <view class="f-item-top u-p-32">
              <view class="f-top-left">
                {{ item.productName + item.productPeriod }}期
              </view>
              <view class="f-top-right u-flex-1 u-flex-col">
                <view class="f-right-money">{{ formateMoney(item.actualAmount) }}</view>
                <view class="f-right-text">认/申购金额(元)</view>
              </view>
            </view>
            <view class="f-item-bottom u-p-l-32 u-flex">
              认/申购时间：{{ item.createTime }}
            </view>
          </view>
          <!-- </template> -->
        </uni-scrollview-list>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      noticeList: ["存续金额超过300万，认购产品无需再提交投资者认证。"],
      list: [],
      totalAsset: 0
    };
  },
  onLoad(e) {
    this.totalAsset = e.totalAsset
  },
  methods: {
    updateData(data) {
      this.list = data;
    },
    formateMoney(num) {
      return this.$api.util.fmoney(num)
    },
    getList() {
      let that = this;
      that.$api.request
        .holdCurrentList({
          page: that.currentPage,
          size: 10,
        })
        .then((res) => {
          that.list = [...that.list, ...res.data.items];
          that.isEmpty = !that.list.length;
          that.lastPage = res.data.pages;
          that.loadStatus = that.currentPage < res.data.pages ? "loadmore" : "nomore";
          that.$emit("updateData", that.list);
        });
    },
  },
  onReachBottom(e) {
    uni.$emit("uOnReachBottom");
  },
};
</script>

<style scoped lang="scss">
.f-position-wrap {
  height: 100%;
  background-color: $page-bgColor-base; 
}
.f-position-content {
  background-color: $page-bgColor-base;
}
.f-position-top {
  height: 260rpx;
  padding-top: 60rpx;
  padding-bottom: 64rpx;
  background-color: $page-bgColor-dark;
  align-items: center;
}
.f-position-money {
  height: 80rpx;
  font-size: 68rpx;
  font-family: SFProDisplay-Medium, SFProDisplay;
  font-weight: 500;
  color: $font-color-warning;
  line-height: 80rpx;
}
.f-money-text {
  height: 40rpx;
  font-size: $font-md;
  color: rgba(255, 255, 255, 0.7);
  line-height: 40rpx;
}
.f-list-item {
  background: $page-bgColor-white;
  border-radius: 16rpx;
}
.f-item-top {
  display: flex;
  border-bottom: 1rpx solid $border-color-dark;
}
.f-top-left {
  width: 314rpx;
  font-size: $font-lg;
  font-weight: 500;
  color: $font-color-base;
  line-height: 44rpx;
}
.f-top-right {
  text-align: right;
}
.f-item-bottom {
  height: 72rpx;
  font-size: $font-sm;
  font-family: PingFangSC-Regular, PingFang SC;
  color: $font-color-msg;
}
.f-right-money {
  height: 44rpx;
  font-size: $font-lg;
  font-family: SFProDisplay-Medium, SFProDisplay;
  font-weight: 500;
  color: $font-color-base;
  line-height: 44rpx;
}
.f-right-text {
  height: 40rpx;
  font-size: $font-sm;
  font-family: PingFangSC-Regular, PingFang SC;
  color: $font-color-msg;
  line-height: 40rpx;
}
</style>

