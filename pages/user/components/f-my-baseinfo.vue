<!--
 * @Description: 我的页面，顶部基本信息组件
 * @Autor: siwenfeng
 * @Date: 2021-10-14 10:44:58
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-24 15:02:01
-->
<template>
  <view class="f-my-baseinfo u-m-b-24">
    <view class="f-baseinfo-wrap u-p-t-12">
      <view class="f-baseinfo-top u-p-l-48">
        <view class="f-baseinfo-avatar u-m-r-32 u-flex">
          <!-- 未登录状态 -->
          <template v-if="!hasLogin">
            <image
              @tap="$Router.push('/pages/public/login')"
              style="width: 112rpx; height: 112rpx"
              src="@/static/image/home/unlogin.png"
              mode="scaleToFill"
              class="u-m-r-32"
            />
            <view
              class="f-baseinfo-unlogin"
              @tap="$Router.push('/pages/public/login')"
            >
              未登录
            </view>
          </template>
          <template v-else>
            <image
              style="width: 112rpx; height: 112rpx"
              src="@/static/image/home/avatar.png"
              mode="scaleToFill"
              class="u-m-r-32"
            />
            <!-- 个人信息 -->
            <view class="f-baseinfo-phone u-flex-col u-flex-1">
              <view class="f-phone-value">{{ regMobile }}</view>
              <view class="f-real-name u-flex u-row-center u-m-t-4">
                <template v-if="!hasRealName">
                  <text
                    class="u-m-r-6 u-iconfont-sm fortune icon-fortuneAlert"
                  />
                  <text class="f-name-status">未实名</text>
                </template>
                <template v-else>
                  <text
                    class="u-m-r-6 u-iconfont-sm fortune icon-fortuneyirenzheng"
                  />
                  <text class="f-name-status">已实名</text>
                </template>
              </view>
            </view>
          </template>
        </view>
      </view>
    </view>
    <view class="f-property-wrap u-p-x-32">
      <template v-if="!hasLogin">
        <!-- 未登录 -->
        <view class="f-property-no f-my-property u-flex-col">
          <view
            class="f-real-property u-m-b-24"
            @tap="$Router.push('/pages/public/login')"
            >点击登录</view
          >
          <view class="f-real-text">登录查看更多个人信息</view>
        </view>
      </template>
      <!-- 已登录 -->
      <template v-else>
        <!-- 未实名 -->
        <view
          class="f-property-no f-my-property u-flex-col"
          v-if="!hasRealName"
        >
          <view class="f-real-property u-m-b-24" @tap="realname">实名认证</view>
          <view class="f-real-text">实名认证后才能查看个人资产</view>
        </view>
        <!-- 已实名 -->
        <view v-else class="f-property-yes f-my-property u-flex-col">
          <view class="f-property-total u-flex-col">
            <view class="f-total-text u-m-b-16">
              <text>总资产</text>
              <text>（元）</text>
            </view>
            <view class="f-total-number">{{
              formateMoney(userInfo.totalAsset)
            }}</view>
          </view>
          <view class="f-property-mode u-flex">
            <view class="u-flex-1 f-mode-text" @tap="toCurrentPosition"
              >当前持仓</view
            >
            <view
              class="u-flex-1 f-mode-text"
              @tap="$Router.push('/pages/my/historicalInv')"
              >历史投资</view
            >
          </view>
        </view>
      </template>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      // hasRealName: true, // 是否已经实名认证标识
    }
  },
  computed: {
    ...mapGetters(['hasLogin', 'userInfo']),
    hasRealName() {
      return this.userInfo.authStatus === 2
      // return true
    },
    regMobile() {
      return this.$api.util.mobileEncrypt(this.userInfo.regMobile || '') || ''
    },
  },
  methods: {
    realname() {
      const { authStatus, certExpireDate, clientName, certNo } = this.userInfo.clientIdentifyInfo;
      // 未认证 跳转到实名认证页面
      if (authStatus === 0) {
        this.$Router.push('/pages/my/realname')
        // 已上传 直接进入实名信息确认页；
      } else if (authStatus === 1) {
          this.$Router.push({
            path: '/pages/my/cardinfocheck',
            query: {
              expTime: certExpireDate,
              idName: clientName,
              idNo: certNo,
            }
          });
        // 已认证 跳转到投资者信息页面
      } else {
        this.$Router.push('/pages/my/investorinfo');
      }
    },
    formateMoney(num) {
      return this.$api.util.fmoney(num)
    },
    // 去当前持仓页面
    toCurrentPosition() {
      this.$Router.push({
        path: '/pages/my/position',
        query: {
          totalAsset: this.formateMoney(this.userInfo.totalAsset),
        },
      })
    },
  },
}
</script>

<style scoped lang="scss">
.f-my-baseinfo {
  position: relative;
  padding-bottom: 104rpx;
}
.f-baseinfo-wrap {
  height: 328rpx;
  background-color: $page-bgColor-dark;
}
.f-property-wrap {
  width: 100%;
  position: absolute;
  top: 172rpx;
  z-index: 11;
}
.f-phone-value {
  height: 56rpx;
  font-size: $font-xxl;
  font-weight: 500;
  color: $font-color-light;
  line-height: 56rpx;
}
.f-real-name {
  width: 134rpx;
  height: 40rpx;
  padding: 8prx 16rpx;
  background-color: rgba(0, 0, 0, 0.19);
  border-radius: 64rpx;
}
.f-my-property {
  height: 260rpx;
  border-radius: 16rpx;
  background: $page-bgColor-light;
  color: $font-color-base;
}
.f-property-no {
  align-items: center;
  justify-content: center;
}
.f-name-status {
  color: $font-color-warning;
  font-size: $font-sm;
}
.f-real-property {
  width: 240rpx;
  height: 72rpx;
  background: $btn-bgColor-base;
  box-shadow: 0px 6rpx 12rpx 0px rgba(225, 174, 127, 0.5);
  border-radius: 64rpx;
  color: $font-color-light;
  line-height: 72rpx;
  font-size: $font-lg;
  text-align: center;
}
.f-real-text {
  height: 40rpx;
  font-size: $font-sm;
  color: $font-color-base;
  line-height: 40rpx;
}
.f-property-total {
  height: 172rpx;
  padding: 32rpx 0 32rpx 48rpx;
}
.f-total-text {
  font-size: $font-md;
  height: 40rpx;
  line-height: 40rpx;
}
.f-total-number {
  height: 52rpx;
  font-size: $font-xxxl;
  font-family: SFProDisplay-Medium, SFProDisplay;
  font-weight: 500;
  line-height: 52rpx;
}
.f-property-mode {
  background: $page-bgColor-gray;
  height: 88rpx;
  border-radius: 0px 0px 16rpx 16rpx;
}
.f-mode-text {
  text-align: center;
  font-size: $font-md;
  position: relative;
}
.f-mode-text:first-child::after {
  position: absolute;
  content: '';
  width: 2rpx;
  height: 32rpx;
  right: 0;
  background: #d0c4b9;
}
.f-baseinfo-unlogin {
  height: 112rpx;
  line-height: 112rpx;
  font-size: $font-xxl;
  font-weight: 500;
  color: $font-color-light;
}
</style>
