<template>
  <!-- 我的银行卡 -->
  <view class="u-p-x-40 u-p-y-36">
    <!-- 我的银行卡 -->
    <!-- 1:已认证   2 未认证 -->
    <view class="">
      <view
        class="cardCss u-m-b-24 u-p-x-32 u-p-y-32"
        v-for="(item, i) in courselist"
        :key="i"
        :style="{ backgroundImage: item.bgWechatColor }"
      >
        <view class="cardTop">
          <view class="left">
            <view class="cardLogo u-p-x-8 u-p-y-8">
              <image
                :src="item.bankLogoUrl"
                mode=""
                style="width: 48rpx; height: 48rpx"
              ></image>
            </view>
            <view class="cardName u-m-l-16 u-m-r-10">
              {{ item.bankName }}
            </view>
            <view class="cardUse u-p-x-8 u-p-y-4" v-if="item.useState == true">
              使用中
            </view>
          </view>
          <view
            class="cardStatus u-p-x-16 u-p-y-5"
            v-if="item.authStatus == '1'"
          >
            已认证
          </view>
          <view
            class="cardStatus u-p-x-16 u-p-y-5"
            v-if="item.authStatus == '0'"
          >
            未认证
          </view>
        </view>
        <view class="cardNum u-m-t-32 u-m-b-16">
          {{
            item.bankNo
              .replace(/\s/g, '')
              .replace(/(\d{4})\d+(\d{4})$/, '$1 **** **** $2')
          }}
        </view>
      </view>
      <view class="addCard u-p-y-80" @click="addCard">
        <text class="fortune icon-fortunea-plus1 u-m-r-16"></text>
        <text>添加银行卡</text>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: '',
  data() {
    return {
      courselist: [],
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  onLoad() {
    this.cardlist()
  },
  methods: {
    // 银行卡列表
    cardlist() {
      // 银行卡列表
      this.$api.request.bankCardList().then((res) => {
        if (res.code === '0') {
          this.courselist = res.data.items
        } else {
          this.$u.toast(res.msg)
        }
      })
    },
    // 添加
    addCard() {
      this.$Router.push('/pages/my/bankcard')
    },
  },
}
</script>

<style lang="scss" scoped>
.cardCss {
  height: 224rpx;
  border-radius: 16rpx;
  .cardTop {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      .cardLogo {
        width: 64rpx;
        height: 64rpx;
        border-radius: 50%;
        background: $page-bgColor-white;
      }
      .cardName {
        font-size: $font-xl;
        color: $font-color-light;
      }
      .cardUse {
        font-size: $font-sm;
        border-radius: 4rpx;
        border: 1rpx solid rgba(255, 255, 255, 0.2);
        color: $font-color-light;
      }
    }
    .cardStatus {
      border-radius: 4rpx;
      font-size: $font-sm;
      color: $font-color-light;
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .cardNum {
    font-size: $font-xxg;
    color: $font-color-light;
  }
}
.addCard {
  background: $page-bgColor-white;
  border-radius: 16rpx;
  border: 2rpx dashed $border-color-base;
  text-align: center;
  color: $font-color-confirm;
}
</style>
