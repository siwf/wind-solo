<!--
 * @Description: 注册组件
 * @Autor: siwenfeng
 * @Date: 2021-10-15 13:35:06
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-12-01 09:28:33
-->
<template>
  <view class="f-public-register f-container-white">
    <view class="f-register-title">注册惠融资产</view>
    <view class="f-register-wrap u-m-b-80">
      <u-form
        :rules="rules"
        :model="form"
        ref="uForm"
        :border-bottom="false"
        :error-type="errorType"
      >
        <u-form-item prop="mobile" :border-bottom="false">
          <u-input
            inputAlign="left"
            placeholder="请输入手机号码"
            :placeholder-style="placeholderStyle"
            v-model="form.mobile"
            type="number"
            maxlength="13"
            border
            focus
            @input="inputChange"
            :height="108"
            :trim="false"
          />
        </u-form-item>
      </u-form>
    </view>
    <view class="u-flex f-register-aggremnet u-m-b-32">
      <view style="width: 36rpx; height: 40rpx" class="u-flex u-m-r-4 u-m-b-4">
        <checkbox value="cb" :checked="false" @click="protocol = !protocol" />
      </view>
      <view class="f-aggrement-text">我已阅读并同意</view>
      <view class="f-text-value" @tap="showProtocal = true">
        《平台相关服务协议》
      </view>
    </view>
    <uni-common-button
      @click="next"
      title="下一步"
      :canClick="isDisabled"
      :isDisabled="isDisabled"
    ></uni-common-button>
    <view class="u-m-t-48 f-go-login" @tap="$Router.replace('/pages/public/login')"
      >已有账户，去登录</view
    >

    <u-popup
      v-model="showProtocal"
      :custom-style="customStyle"
      safe-area-inset-bottom
      mode="bottom"
      :bgStyle="{
        background: 'none',
      }"
    >
      <view class="f-agreement-wrap u-flex-col">
        <view class="f-agreement-list u-m-b-16">
          <view class="f-list-item f-list-border" @tap="privacyPolicy"> 隐私政策 </view>
          <view class="f-list-item" @tap="registrationAgreement"> 用户注册与使用协议 </view>
        </view>
        <view class="f-agreement-list u-m-b-16">
          <view class="f-list-item" @tap="showProtocal = false"> 取消 </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
// import { validateMobileNo } from "@/config/util";
export default {
  data() {
    return {
      showProtocal: false,
      protocol: false,
      customStyle: {
        backgroundColor: "none",
      },
      form: {
        mobile: "",
      },
      mobile: '',
      //   isDisabled: true,
      errorType: ["message", "border"],
      placeholderStyle:
        "height: 48rpx; line-height: 48rpx; fontSize: 32rpx;fontFamily: PingFangSC-Medium, PingFang SC;fontWeight: 400;color: #C7C7C7",
      rules: {
        mobile: [
          {
            validator: (rule, value, callback) => {
              if (!this.$api.util.validateMobileNo(value)) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            },
            trigger: ["blur"],
          },
        ],
      },
    };
  },
  methods: {
    privacyPolicy() {
      const url = this.$IMG_URL + 'PrivacyPolicy.html'
      this.$tools.routerTo(url)
    },
    registrationAgreement() {
      const url = this.$IMG_URL + 'RegistrationAgreement.html'
      this.$tools.routerTo(url)
    },
    // 手机号格式化
    inputChange(e) {
      this.$nextTick(() => {
        let str = e.toString().replace(/ /g, "");
        let len = str.length;
        switch (true) {
          case len > 11:
            str =
              str.substr(0, 3) +
              " " +
              str.substr(3, 4) +
              " " +
              str.substr(7, 4);
            break;
          case len > 7:
            str =
              str.substr(0, 3) + " " + str.substr(3, 4) + " " + str.substr(7);
            break;
          case len > 3:
            str = str.substr(0, 3) + " " + str.substr(3);
            break;
          default:
        }
        this.form.mobile = str;
      });             
    },
    next() {
      if (!this.protocol) {
        this.$u.toast('请先阅读并勾选平台相关服务协议')
        return
      }
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          const mobile = this.form.mobile.replace(/\s*/g,"")
          this.$api.request.enterMobile({
            mobile
          }).then(res => {
            if (res.code === '0') {
              // 上线时要根据环境去访问html文件
              // btnCode = 1 为注册
              // btnCode = 2 忘记密码
              // btnCode = 3 修改密码
              const params = {
                btnCode: 1,
                mobile,
                stepToken: res.data.stepToken
              }
              const url = this.$IMG_URL + 'index.html?params=' + `${encodeURIComponent(JSON.stringify(params))}`
              // const url = 'http://localhost:8089/?params=' + `${encodeURIComponent(JSON.stringify(params))}`
              this.$tools.routerTo(url)
            } else {
              this.$u.toast(res.msg);
            }
          })
        }
      })
    },
  },
  computed: {
    isDisabled() {
      return !(this.form.mobile.length === 13);
    },
  },
  onLoad(options) {
   options.mobile && this.inputChange(options.mobile)
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
};
</script>


<style scoped lang="scss">
.f-public-register {
  padding: 76rpx 64rpx 0;
  background: $font-color-light;
  .f-register-wrap {
    //   box-shadow: 0px -2px 0px 0px rgba(240,240,240,1);
  }
  .f-register-title {
    height: 64rpx;
    font-size: $font-xxg;
    font-weight: 500;
    color: $font-color-base;
    line-height: 64rpx;
    margin-bottom: 96rpx;
  }
  .f-register-aggremnet {
    font-size: $font-sm;
    height: 40rpx;
    .f-aggrement-text {
      color: $font-color-msg;
    }
    .f-text-value {
      color: $font-color-spec;
    }
  }
  .f-go-login {
    text-align: center;
    height: 44rpx;
    font-size: $font-md;
    color: $font-color-normal;
    line-height: 44rpx;
  }
}
.f-agreement-wrap {
  padding: 0 18rpx 16rpx;
}
.f-agreement-list {
  background: $font-color-light;
  border-radius: 28rpx;
  .f-list-item {
    height: 112rpx;
    text-align: center;
    line-height: 112rpx;
    color: $font-color-spec;
    font-size: $font-xxl;
  }
  .f-list-border {
    border-bottom: 1px solid $border-color-dark;
  }
}
</style>