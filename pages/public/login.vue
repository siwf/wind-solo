<!--
 * @Description: 设置登录密码页面
 * @Autor: siwenfeng
 * @Date: 2021-10-18 09:48:24
 * @LastEditors: siwenfeng
 * @LastEditTime: 2022-04-19 10:05:13
-->
<template>
  <view class="f-container-white f-public-smscode u-p-t-76 u-p-x-64">
    <view class="f-smscode-title">
      <view class="u-m-b-32 f-title-value">登录享受更多专属服务</view>
    </view>
    <view class="u-m-b-48" style="width: 100%；">
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
            placeholder="请输入您的手机号"
            :placeholder-style="placeholderStyle"
            v-model="form.mobile"
            type="number"
            border
            focus
            maxlength="11"
            :height="108"
          />
        </u-form-item>
        <u-form-item prop="password" :border-bottom="false">
          <u-input
            inputAlign="left"
            placeholder="请输入您的登录密码"
            :placeholder-style="placeholderStyle"
            v-model="form.password"
            type="password"
            maxlength="20"
            border
            @input="passwordInputChange"
            :height="108"
          />
        </u-form-item>
      </u-form>
      <view class="f-forget-password u-m-t-16">
        <text @tap="passwordForget">忘记密码</text>
      </view>
    </view>
    <uni-common-button
      @click="next"
      title="登录"
      :isDisabled="isDisabled"
    ></uni-common-button>
    <view
      class="u-m-t-48 f-go-register"
      @tap="goRegister"
      >没有账户，去注册</view
    >
  </view>
</template>
<script>
// import { validateMobileNo, validatePassword } from "@/config/util";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      errorType: ["message", "border"],
      placeholderStyle:
        "height: 48rpx; line-height: 48rpx; fontSize: 32rpx;fontFamily: PingFangSC-Medium, PingFang SC;fontWeight: 400;color: #C7C7C7",
      rules: {
        password: [
          {
            validator: (rule, value, callback) => {
              if (!this.$api.util.validatePassword(value)) {
                callback(
                  new Error(
                    "请输入8-20位的登录密码"
                  )
                );
              } else {
                callback();
              }
            },
            trigger: ["blur"],
          },
        ],
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
      form: {
        password: "",
        mobile: "",
      },
      phoneBorderStyle: false,
      passBorderStyle: false,
    };
  },
  methods: {
    ...mapMutations(["login"]),
    // 密码去掉中文
    passwordInputChange(e) {
      this.$nextTick(() => {
        // const str = e.toString().replace(/[\u4e00-\u9fa5]|[\（\）\《\》\——\；\，\。\“\”\<\>\！]/ig,'')
        this.form.password = this.$api.util.validatePasswordDel(e)
      })
    },
    next() {
      this.isDisabled = true;
      this.$u.toast('功能后续开放,敬请期待！');
      return
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          this.$api.request
            .login({
              mobile: this.form.mobile,
              password: this.$md5.hex_md5_16Upper(this.form.password),
            })
            .then((res) => {
              if (res.code === "0") {
                // 登录仅仅是settoken 将haslogin设置成true
                this.$store.commit('login', res.data.token)
                this.$u.toast('登录成功')
                // 拉取用户信息
                this.$store.dispatch("GetInfo").then(() => {
                  this.$api.repalceAllUser()
                }).catch(err => {})
              } else {
                this.$u.toast(res.msg);
              }
              this.isDisabled = false;
            })
            .catch((err) => {
              this.isDisabled = false;
            });
        }
      });
    },
    goRegister() {
      this.$Router.replace({
        path: '/pages/public/register',
        query: {
          mobile: this.$api.util.validateMobileNo(this.form.mobile) ? this.form.mobile : ''
        }
      })
    },
    passwordForget() {
      this.$Router.push({
        path: '/pages/public/phonecheck',
        query: {
          mobile: this.$api.util.validateMobileNo(this.form.mobile) ? this.form.mobile : ''
        }
      })
    }
  },
  computed: {
    isDisabled: {
      set() {},
      get() {
        return !(
          this.form.mobile.length === 11 && this.form.password.length >= 8
        );
      },
    },
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
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
      font-size: $font-md;
      color: $font-color-msg;
      line-height: 44rpx;
    }
  }
  .f-forget-password {
    height: 40rpx;
    font-size: $font-sm;
    color: $font-color-normal;
    text-align: right;
    line-height: 40rpx;
  }
  .f-go-register {
    text-align: center;
    height: 44rpx;
    font-size: $font-md;
    color: $font-color-normal;
    line-height: 44rpx;
  }
}
</style>
