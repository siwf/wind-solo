<!--
 * @Description: 忘记密码，已经实名，证件验证页面
 * @Autor: siwenfeng
 * @Date: 2021-10-18 16:13:48
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-26 11:40:22
-->
<template>
  <view class="f-container-white f-public-smscode u-p-t-76 u-p-x-64">
    <view class="f-smscode-title">
      <view class="u-m-b-32 f-title-value">验证证件</view>
    </view>
    <view class="u-m-b-48" style="width: 100%；">
      <u-form
        :rules="rules"
        :model="form"
        ref="uForm"
        :border-bottom="false"
        :error-type="errorType"
      >
        <u-form-item prop="name" :border-bottom="false">
          <u-input
            inputAlign="left"
            placeholder="请输入姓名"
            :placeholder-style="placeholderStyle"
            v-model="form.name"
            border
            disabled
            :height="108"
          />
        </u-form-item>
        <u-form-item prop="certNo" :border-bottom="false">
          <u-input
            inputAlign="left"
            placeholder="请输入您的大陆身份证号码"
            :placeholder-style="placeholderStyle"
            v-model="form.certNo"
            type="idcard"
            border
            focus
            maxlength="18"
            :height="108"
          />
        </u-form-item>
      </u-form>
    </view>
    <uni-common-button
      @click="next"
      title="下一步"
      :isDisabled="isDisabled"
    ></uni-common-button>
  </view>
</template>
<script>

export default {
  data() {
    return {
      errorType: ["message", "border"],
      placeholderStyle:
        "height: 48rpx; line-height: 48rpx; fontSize: 32rpx;fontFamily: PingFangSC-Medium, PingFang SC;fontWeight: 400;color: #C7C7C7",
      rules: {
        certNo: [
          {
              validator: (rule, value, callback) => {
              if (!this.$api.util.validateCard(value)) {
                callback(new Error("身份证格式不正确"));
              } else {
                callback();
              }
            },
            trigger: ["blur"],
          },
          {
            required: true,
          },
        ],
      },
      form: {
        name: '',
        certNo: "",
      },
      // isDisabled: true,
    };
  },
  computed: {
    isDisabled: {
      set() {},
      get() {
        return this.form.certNo.length < 15
      }
    }
  },
  onLoad() {
    // debugger
    const name = this.$Route.query.clientName || ''
    this.form.name = this.formatName(name)
  },
  methods: {
    next() {
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          this.isDisabled = true
            this.$api.request
            .forgetVerifyCertNo({
              certNo: this.form.certNo,
              stepToken: this.$Route.query.stepToken,
            }).then(res => {
              if (res.code === '0') {
                this.$Router.replace({
                  path: '/pages/public/password',
                  query: {
                    btnCode: '2',
                    stepToken: res.data.stepToken
                  }
                })
              } else {
                this.$u.toast(res.msg)
              }
              this.isDisabled = false
            }).catch(err => {
              this.isDisabled = false
            })
        }
      })
    },
    formatName(str) {
      return new Array(str.length).join('*') + str.substr(-1);
    }
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
      // height: 44rpx;
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