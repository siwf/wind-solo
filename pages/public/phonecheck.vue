<!--
 * @Description: 找回密码 手机号验证页面
 * @Autor: siwenfeng
 * @Date: 2021-10-18 13:42:08
 * @LastEditors: siwenfeng
 * @LastEditTime: 2022-04-19 10:08:03
-->
<template>
  <view class="f-public-smscode u-p-t-76 u-p-x-64 f-container-white">
    <view class="f-smscode-title">
      <view class="u-m-b-32 f-title-value">验证手机</view>
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
            @input="inputChange"
            focus
            maxlength="13"
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
// import { validateMobileNo } from "@/config/util";
export default {
  data() {
    return {
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
      form: {
        mobile: "",
      },
    };
  },
  watch: {
    // "form.mobile": function (newValue, oldValue) {
    //   this.form.mobile = newValue.length > oldValue.length ? newValue.replace(/\s/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3') : this.form.mobile.trim()
    // },
  },
  computed: {
    isDisabled() {
      return !(this.form.mobile.length === 13);
    },
  },
  methods: {
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
            // this.form.mobile = str;
            break;
          case len > 7:
            str =
              str.substr(0, 3) + " " + str.substr(3, 4) + " " + str.substr(7);
            // this.form.mobile  = str;
            break;
          case len > 3:
            str = str.substr(0, 3) + " " + str.substr(3);
            // this.form.mobile  = str;
            break;
          default:
          // this.form.mobile  = str;
        }
        this.form.mobile = str;
      });
    },
    next() {
      this.$u.toast('功能后续开放,敬请期待！');
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          const mobile = this.form.mobile.replace(/\s*/g, "");
          this.$api.request
            .forgeEnterMobile({
              mobile,
            })
            .then((res) => {
              if (res.code === "0") {
                // 上线时要根据环境去访问html文件
                // btnCode = 1 为注册
                // btnCode = 2 忘记密码
                // btnCode = 3 修改密码
                const params = {
                  btnCode: 2,
                  mobile,
                  stepToken: res.data.stepToken,
                };
                const url =
                  this.$IMG_URL +
                  "index.html?params=" +
                  `${encodeURIComponent(JSON.stringify(params))}`;
                // const url = 'http://localhost:8089/?params=' + `${encodeURIComponent(JSON.stringify(params))}`
                this.$tools.routerTo(url);
              } else {
                this.$u.toast(res.msg);
              }
            });
        }
      });
    },
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  onLoad(options) {
    options.mobile && this.inputChange(options.mobile)
  } 
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
