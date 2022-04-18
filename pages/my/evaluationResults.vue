<template>
  <view class="f-container-white u-p-x-64 u-p-t-70">
    <view class="content">您的风险承受类型为</view>
    <view class="type u-p-y-32">{{ data.riskLevel }}</view>
    <view class="content u-p-y-24"
      >您适合参与风险评级为<span>{{ data.riskLevelRecommend }}</span
      >的金融产品或金融服务</view
    >
    <view class="content">到期日{{ data.validityPeriodEStrWechat }}</view>
    <view class="again u-p-y-26" v-if="status === '2'" @click="again()"
      >重新测评</view
    >
    <view v-if="status === '1'">
      <view class="know u-p-y-26" @click="ok()">知道了</view>
      <view class="agains u-m-t-48" @click="again()">重新测评</view>
    </view>
  </view>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      // 1 结果  2已有结果
      status: '',
      data: {
        riskLevel: '',
        riskLevelRecommend: '',
        validityPeriodEStrWechat: ''
      },
    }
  },
  computed: {},
  onLoad() {
    this.status = this.$Route.query.status
    this.$api.request.getRiskInfo().then((res) => {
      if (res.code === '0') {
        this.data = res.data
      } else {
        this.$u.toast(res.msg)
      }
    })
  },
  methods: {
    again() {
      this.$Router.push('/pages/my/riskAssessment')
    },
    ok() {
      this.$api.repalceAllUser()
    },
    onUnload() {
      // 测评提交成功后跳转该页面
      if (this.status === '1') {
        this.$api.repalceAllUser()
      }
    },
  },
  watch: {},
}
</script>

<style lang="scss" scoped>
  .content {
    font-size: $font-md;
    color: $font-color-msg;
    line-height: 60rpx;
    span {
      color: $font-color-red;
    }
  }
  .type {
    color: $font-color-confirm;
    font-weight: bold;
    font-size: $font-xxxl;
  }
  .again {
    text-align: center;
    background: $btn-bgColor-base !important;
    color: $font-color-light;
    border: none;
    border-radius: 50rpx;
    margin-top: 160rpx;
  }
  .know {
    text-align: center;
    background: $btn-bgColor-base;
    color: $font-color-light;
    border: none;
    border-radius: 50rpx;
    margin-top: 160rpx;
  }
  .agains {
    text-align: center;
    color: $font-color-normal;
  }
</style>
