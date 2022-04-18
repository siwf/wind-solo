<!--
 * @Description: 我的页面点击项目
 * @Autor: siwenfeng
 * @Date: 2021-10-14 16:53:25
 * @LastEditors: siwenfeng
 * @LastEditTime: 2022-04-18 10:32:17
-->
<template>
  <view class="f-my-cell">
    <view class="f-cell-wrap">
      <view
        class="f-cell-item u-flex"
        v-for="(item, index) in list1.slice(0, 2)"
        :key="index"
        @tap="toPage(item)"
      >
        <view class="f-item-left">
          <text class="fortune u-font-48" :class="item.icon"></text>
        </view>
        <view class="f-item-right u-flex">
          <text>{{ item.title }}</text>
          <text class="fortune icon-fortuneArrow-01 m-l-auto u-m-r-32"></text>
        </view>
      </view>
    </view>
    <view class="f-cell-wrap">
      <view
        class="f-cell-item u-flex"
        v-for="(item, index) in list1.slice(2)"
        :key="index"
        @tap="toPage(item)"
      >
        <view class="f-item-left">
          <text class="fortune u-font-48" :class="item.icon"></text>
        </view>
        <view class="f-item-right u-flex">
          <text>{{ item.title }}</text>
          <text class="fortune icon-fortuneArrow-01 m-l-auto u-m-r-32"></text>
        </view>
      </view>
    </view>
    <uni-modal-dialog
      :showModal="showModal"
      cancelText="取消"
      width="75%"
      confirmText="确定"
      modalTitle="提示"
      @cancle="showModal = false"
      @confirm="success"
    >
      <view class="f-logout-text">{{ tipText }} </view>
    </uni-modal-dialog>
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
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      tipText: '',
      ageTipText: "",
      showModal: false,
      ageModal: false,
      list1: [
        {
          icon: 'icon-fortuneshimingxinxi',
          title: '我的电影票',
          path: 'investorinfo',
        },
        {
          icon: 'icon-fortuneyinhangka',
          title: '我的兑换券',
          path: 'myCard',
        },
        {
          icon: 'icon-fortunetouzizherenzheng',
          title: '我的收藏',
          path: 'certificationDetail',
        },
        {
          icon: 'icon-fortunefengxianceping',
          title: '想看、看过的电影',
          path: 'riskAssessment',
        },
        {
          icon: 'icon-fortunesetting-011',
          title: '设置',
          path: 'setting',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['hasLogin', 'userInfo']),
  },
  methods: {
    toPage(item) {
      const url = `/pages/my/${item.path}`
      if (!this.hasLogin) {
        this.$Router.push('/pages/public/login')
        return
      }

      const { risKStatus } = this.userInfo;
      const { authStatus, clientName, certNo, certExpireDate, birthDay } = this.userInfo.clientIdentifyInfo
      // 未认证 需要认证的页面 设置页面不需要走实名认证
      if (authStatus === 0 && item.path !== 'setting') {
          this.showModal = true
          // 获取弹框提示文本信息
          this.tipText = this.getTipText(item.path)
        // 已上传跳转到实名信息确认页面
      } else if (authStatus === 1 && item.path !== 'setting') {
        this.$Router.push({
          path: '/pages/my/cardinfocheck',
          query: {
            expTime: certExpireDate,
            idName: clientName,
            idNo: certNo,
          },
        })
        // 已经实名认证
      } else {
        if (item.path === 'riskAssessment') {
          this.riskAssessment(url, risKStatus)
        } else {
          // 已经实名认证正常跳转
          // this.$Router.push(url)
          this.routerTo(url)
        }
      }
    },
    success() {
      this.showModal = false
      // this.$Router.push('/pages/my/realname')
      this.routerTo('/pages/my/realname')
    },
    getTipText(path) {
      let tipText = ''
      if (path === 'myCard') {
        tipText = '您需要完成实名认证才可进行银行卡认证'
      } else if (path === 'certificationDetail') {
        tipText = '您需要完成实名认证才进行投资者认证'
      } else if (path === 'riskAssessment') {
        tipText = '您需要完成实名认证才可进行风险测评'
      } else if (path === 'investorinfo') {
        tipText = '您需要完成实名认证才可查看投资者信息'
      }
      return tipText
    },
    // 年龄
    async riskAssessment(url,risKStatus) {
      const age = await this.$api.util.getUserAge()
      if (age !== null) {
        if (age <= 65) {
          if (risKStatus === 1) {
            // 已做过测评
            this.$Router.push({
              path: '/pages/my/evaluationResults',
              query: {
                status: '2',
              },
            })
          } else {
            this.routerTo(url)
          }
        } else {
          const tipText = '65岁以上用户不支持在线风险测评，请联系您的理财师线下测评' 
          this.ageDialog(tipText)
        }
      }
    },
    // 页面跳转
    routerTo(url) {
      this.$Router.push(url)
    },
    // 年龄判断弹框
    ageDialog(tip) {
      this.ageModal = true;
      this.ageTipText = tip
    },
    ageConfirm() {
      this.ageModal = false
    }
  },
}
</script>

<style scoped lang="scss">
.u-font-48 {
  font-size: 48rpx;
}
.f-cell-wrap {
  border-radius: 16rpx;
  background-color: $page-bgColor-white;
  margin-bottom: 24rpx;
  .f-cell-item {
    // height: 100rpx;
    .f-item-left {
      width: 112rpx;
      height: 100rpx;
      line-height: 100rpx;
      text-align: center;
    }
    .f-item-right {
      flex: 1;
      height: 100rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400 !important;
      border-bottom: 1rpx solid #f0f0f0;
    }
  }
  .f-my-cell .f-item-right:last-child {
    border-width: 0;
  }
}
</style>
