<!--
 * @Description: 投资者认证列表页面
 * @Autor: siwenfeng
 * @Date: 2021-10-25 16:03:49
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-30 17:03:49
-->
<template>
  <view class="f-certification-list u-p-x-40 u-p-t-36 u-p-b-64">
    <view class="f-list-item u-flex-col u-p-x-32" v-for="(item, index) in list" :key="index">
      <view class="u-p-y-32">
        <view class="u-flex">
          <view class="u-flex-1 u-flex">
            <view class="f-list-name u-m-r-8">{{ item.clientName }}</view>
            <view v-if="item.detail.certType === '1'" class="f-certification-type f-type-norml">普通投资者</view>
            <view v-else class="f-certification-type f-type-professional">专业投资者</view>
          </view>
          <view v-if="item.applyStatus === '1'" class="f-list-status f-status-loading">审核中</view>
          <view v-else-if="item.applyStatus === '-1'" class="f-list-status f-status-error">审核驳回</view>
          <view v-else-if="item.applyStatus === '2'" class="f-list-status f-status-pass">审核通过</view>
          <view v-else-if="item.applyStatus === '0'" class="f-list-status f-status-back">已撤回</view>
        </view>
        <view class="u-m-t-28 f-list-card">{{ certNoFormate(item.certNo) }}</view>
      </view>
      <view v-if="item.applyStatus === '-1'" class="u-p-y-16 f-list-card f-reason-border">
        驳回原因： {{ item.comments }}
      </view>
    </view>
    <view
      class="f-certification-add u-flex u-row-center"
      @tap="newCertification"
    >
      <text class="fortune icon-fortunea-plus1 u-m-r-16"></text>
      <text>添加新的认证</text>
    </view>
    <view class="f-certification-notice">
      <view class="f-notice-title">温馨提示:</view>
      <view class="f-notice-content">
        <view>
          1.小程序目前仅支持普通投资者认证，专业投资者认证请联系您的客户经理；
        </view>
        <view>
           2.若您在深圳惠融资产管理有限公司持有金额达300万，再买产品则无需再次提交合格投资者认证。
        </view>
      </view>
    </view>
    <uni-modal-tip
      :showModal="ageModal"
      width="70%"
      :tipText="ageTipText"
      @confirm="ageConfirm"
    >
    </uni-modal-tip>
  </view>
</template>

<script>
export default {
  data() {
    return {
      ageModal: false,
      ageTipText: "",
      list: [],
    };
  },
  methods: {
    // 获取投资者认证列表
    investCertList() {
      this.$api.request.investCertList().then(res => {
        if (res.code === '0') {
          console.log(res)
          this.list = res.data.items;
        }
      })
    },
    certNoFormate(str) {
      return str.replace(/(\d{3})\d*(\d{4})/,'$1 **** **** **** $2')
    },
    ageConfirm() {
      this.ageModal = false
    },
        // 投资者认证
    async newCertification() {
      const age = await this.$api.util.getUserAge()
      if (age !== null) {
        let tipText = ''
        if (age < 18 ) {
          tipText = '年龄低于18周岁，弹窗提示“您的年龄低于18周岁，不满足投资者认证条件' 
          this.ageDialog(tipText)
        } else if ((age >= 18 && age < 25) || age > 65) {
          tipText = '18-25周岁及65周岁以上用户暂不支持线上完成投资者认证，请联系您的理财师。' 
          this.ageDialog(tipText)
        } else {
            const hasCheckPending = this.list.find(v => v.applyStatus === '1');
            if (hasCheckPending) {
              this.$u.toast('有待审核的投资者认证，审核通过后可提交新的认证')
              return
            }
            this.$Router.push('/pages/my/investorCertification')
        }
      }
    },
    ageDialog(tip) {
      this.ageModal = true;
      this.ageTipText = tip
    },
  },
  onLoad() {
    this.investCertList()
  }
};
</script>


<style scoped lang="scss">
.f-certification-list {
  position: relative;
  height: 100vh;
}
.f-certification-add {
  height: 180rpx;
  background: $font-color-light;
  border-radius: 16rpx;
  border: 2rpx dashed $border-color-base;
  color: $font-color-confirm;
  font-size: $font-lg;
}
.f-list-item {
  background: $font-color-light;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
}
.f-list-name {
  height: 48rpx;
  font-size: $font-xl;
  font-weight: 500;
  color: $font-color-base;
  line-height: 48rpx;
}
.f-certification-type {
  padding: 2rpx 8rpx;
  border-radius: 4rpx;
  font-size: $font-sm;
  // text-align: center;
}
.f-list-status {
  padding: 2rpx 16rpx;
  font-size: $font-sm;
  color: $font-color-light;
  border-radius: 4rpx;
}
.f-list-card {
//   height: 44rpx;
  font-size: $font-md;
  font-family: SFProDisplay-Regular, SFProDisplay;
  color: $font-color-msg;
  line-height: 44rpx;
}
.f-reason-border {
    border-top: 1rpx solid $border-color-dark;
}
.f-type-norml {
    color: $font-color-spec;
    background-color: $page-bgColor-normal;
}
.f-type-professional {
    color: $font-colr-pro;
    background-color: $page-bgColor-pro;
}
.f-status-loading {
  background-color: $page-bgColor-loading;
  min-width: 128rpx;
  text-align: center;
}
.f-status-error {
    background-color: $page-bgColor-error;
}
.f-status-pass {
    background-color: $page-bgColor-pass;
}
.f-status-back {
  background-color: $page-bgColor-back;
  min-width: 128rpx;
  text-align: center;
}
.f-certification-notice {
  // margin-top: 370rpx;
  position: absolute;
  left: 40rpx;
  bottom: 40rpx;
  padding-right: 40rpx;
  .f-notice-title {
    height: 34rpx;
    font-size: $font-sm;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: $font-color-msg;
    line-height: 34rpx;
  }
  .f-notice-content {
    margin-top: 16rpx;
    font-size: $font-sm;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: $font-color-msg;
    line-height: 40rpx;
  }
}
</style>