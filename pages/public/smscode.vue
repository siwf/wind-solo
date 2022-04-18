<!--
 * @Description: 短信验证码页面
 * @Autor: siwenfeng
 * @Date: 2021-10-15 16:57:58
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-26 11:42:52
-->
<template>
  <view class="f-public-smscode u-p-t-76 u-p-x-64 f-container-white">
    <view class="f-smscode-title">
      <view class="u-m-b-32 f-title-value">输入短信验证码</view>
      <view class="f-smscode-phone">短信验证码已发送至 {{ mobile }}</view>
    </view>
    <view class="u-m-b-64" style="width: 100%；">
      <u-message-input
        :maxlength="6"
        mode="bottomLine"
        font-size="68"
        focus
        ref="msgInput"
        value=""
        @finish="finish"
        active-color="#CCCCCC"
        inactive-color="#282828"
      ></u-message-input>
    </view>
    <view class="f-smscode-timer u-flex u-row-center">
      <text v-if="!isEnd" class="f-timer-num">{{ tips.slice(0, -6) }}</text>
      <!-- 结束重新获取 -->
      <text
        :class="[isEnd ? 'f-smscode-try' : 'f-timer-text']"
        @click="smcode"
        >{{ isEnd ? tips : tips.slice(-6) }}</text
      >
    </view>
    <u-verification-code
      seconds="60"
      :unique-key="smcodeKey"
      ref="uCode"
      @end="end"
      @start="start"
      keep-running
      startText="重新获取验证码"
      endText="重新获取验证码"
      change-text="X秒后重新获取"
      @change="codeChange"
    />
  </view>
</template>
<script>
import { mobileEncrypt } from "@/config/util";
export default {
  data() {
    return {
      // 手机号
      mobile: "",
      // 重新获取或者验证码倒计时显示文字
      tips: "重新获取验证码",
      // 倒计时是否结束
      isEnd: true,
      // 获取短信验证码参数
      params: null,
      // 短信验证码参数
      verifySmsQuery: null,
      // btnCode 用来标识是用来注册还是忘记密码还是修改密码
      btnCode: null,
      mobileReal: null,
      smcodeKey: '',
      canSend: true,
      errorMsg: ''
    };
  },
  onLoad(options) {
    // 接收h5传递的参数 uni-simple-router 会自动解码
    const { jigsawToken, jigsawAuthenticate, btnCode, stepToken, mobile } = options.params;
    // 手机号脱敏
    this.mobile = mobileEncrypt(mobile) || "";
    // 用来查询用户实名认证状态
    this.mobileReal = mobile;
    this.btnCode = btnCode;
    this.params = {
      jigsawToken,
      stepToken,
      jigsawAuthenticate,
    };
    this.smcodeKey = this.btnCode + mobile;
    this.smcode();
  },
  methods: {
    smcode() {
      if (!this.isEnd) {
        return;
      }
      let pThen = null;
      if (this.btnCode == "1") {
        // 注册去获取短信验证码
        pThen = this.$api.request.verifyJigsaw(this.params);
      } else {
        // 忘记密码去获取短信验证码
        pThen = this.$api.request.forgetVerifyJigsaw(this.params);
      }
      this.errorMsg = ''
      pThen.then((res) => {
        if (res.code === "0") {
          this.verifySmsQuery = {
            stepToken: res.data.stepToken,
            smsCodeId: res.data.smsCodeId,
          };
          this.timer();
        } else {
          this.errorMsg = res.msg
          this.$u.toast(res.msg);
        }
      }).catch(err => {})
    },
    codeChange(text) {
      this.tips = text;
    },
    start() {
      this.isEnd = false;
    },
    end() {
      this.isEnd = true;
    },
    finish(e) {
      // debugger
      // 获取验证码失败了 下面的逻辑就没有意义了
      if (!this.verifySmsQuery) {
        // this.$u.toast('验证码获取失败，请重新获取')
        this.errorMsg && this.$u.toast(this.errorMsg)
        return
      }
      // 防止连续发送两次验证码
      if (!this.canSend) {
        return
      }
      this.canSend =  false;
      this.verifySmsQuery.smsCode = e;
      this.$api.request.verifySms(this.verifySmsQuery).then((res) => {
        // debugger
        if (res.code === "0") {
          // 忘记密码
          if (this.btnCode == 2) {
            // 忘记密码还需要验证用户是否已经实名认证了
            // 验证证件信息（若用户未提交实名认证信息，则可免去此步骤）
            this.$store
              .dispatch("RealNameStatus", { mobile: this.mobileReal, stepToken: res.data.stepToken })
              .then((_res) => {
                if (_res.code === "0") {
                  const authStatus = _res.data.authStatus;
                  // 已认证
                  if (authStatus === "2") {
                    this.$Router.replace({
                      path: "/pages/public/cardcheck",
                      query: {
                        stepToken: res.data.stepToken,
                        clientName: _res.data.clientName
                      },
                    });
                  } else {
                    // 忘记密码
                    this.$Router.replace({
                      path: "/pages/public/password",
                      query: {
                        btnCode: "2",
                        stepToken: res.data.stepToken,
                      },
                    });
                  }
                } else {
                  this.$u.toast(res.msg);
                }
              })
              .catch((err) => {});
          } else {
            // 注册
            this.$Router.replace({
              path: "/pages/public/password",
              query: {
                btnCode: '1',
                stepToken: res.data.stepToken,
              },
            });
          }
        } else {
          // 清空输入框的值
          this.$refs.msgInput.clearVal();
          this.$u.toast(res.msg);
        }
        this.canSend = true
      }).catch(err => {
        this.canSend = true
      })
    },
    timer() {
      if (this.$refs.uCode.canGetCode) {
        this.$refs.uCode.start();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.f-public-smscode {
  .f-smscode-title {
    .f-title-value {
      height: 64rpx;
      font-size: $font-xxg;
      font-weight: 500;
      color: $font-color-base;
      line-height: 64rpx;
    }
    margin-bottom: 96rpx;
    .f-smscode-phone {
      // height: 44rpx;
      font-size: $font-md;
      color: $font-color-msg;
      line-height: 44rpx;
    }
  }

  .f-smscode-try {
    height: 44rpx;
    font-size: $font-md;
    color: $font-color-spec;
    line-height: 44rpx;
    text-align: center;
  }
  .f-smscode-timer {
    height: 44rpx;
    font-size: $font-md;
    .f-timer-num {
      color: $font-color-base;
    }
    .f-timer-text {
      color: $font-color-disabled;
    }
  }
}
</style>
