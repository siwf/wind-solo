<!--
 * @Description: 修改密码输入旧密码
 * @Autor: siwenfeng
 * @Date: 2021-10-18 09:48:24
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-26 11:42:23
-->
<template>
  <view class="f-public-smscode u-p-t-76 u-p-x-64 f-container-white">
    <view class="f-smscode-title">
      <view class="u-m-b-32 f-title-value">输入旧密码 </view>
      <!-- <view class="f-smscode-phone"
        >必须是8-20位的数字、字母组合(不能是纯数字或纯字符)</view
      > -->
    </view>
    <view class="u-m-b-64" style="width: 100%；">
      <u-form
        :rules="rules"
        :model="form"
        ref="uForm"
        :border-bottom="false"
        :error-type="errorType"
      >
        <u-form-item prop="oldPassword" :border-bottom="false">
          <u-input
            inputAlign="left"
            placeholder="请输入旧密码"
            :placeholder-style="placeholderStyle"
            v-model="form.oldPassword"
            type="password"
            focus
            @input="passwordInputChange"
            :height="108"
            border
          />
        </u-form-item>
      </u-form>
    </view>
    <uni-common-button
      @click="modifyPassword"
      title="下一步"
      :isDisabled="isDisabled"
    ></uni-common-button>
  </view>
</template>
<script>
import { validatePassword } from '@/config/util'
export default {
  data() {
    return {
      errorType: ['message', 'border'],
      placeholderStyle1:
        'padding-left: 32rpx;height: 44rpx; line-height: 44rpx; fontSize: 28rpx;fontFamily: PingFangSC-Medium, PingFang SC;fontWeight: 400;color: #999999',
      placeholderStyle:
        'height: 48rpx; line-height: 48rpx; fontSize: 32rpx;fontFamily: PingFangSC-Medium, PingFang SC;fontWeight: 400;color: #C7C7C7',
      rules: {
        oldPassword: [
          {
            validator: (rule, value, callback) => {
              if (!validatePassword(value)) {
                // this.isDisabled = true;
                callback(new Error('请输入8-20位的密码'))
              } else {
                // this.isDisabled = false;
                callback()
              }
            },
            trigger: ['blur'],
          },
        ],
      },
      form: {
        oldPassword: '',
      },
      stepToken: '',
    }
  },
  methods: {
    modifyPassword() {
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          this.isDisabled = true
          this.$api.request
            .enterOldPassword({
              oldPassword: this.$md5.hex_md5_16Upper(this.form.oldPassword),
            })
            .then((res) => {
              if (res.code === '0') {
                this.$Router.replace({
                  path: '/pages/public/password',
                  query: {
                    btnCode: '3',
                    stepToken: res.data.stepToken,
                  },
                })
              } else {
                this.$u.toast(res.msg)
              }
              this.isDisabled = false
            })
            .catch((err) => {
              this.isDisabled = false
            })
        }
      })
    },
    // 密码去掉中文
    passwordInputChange(e) {
      this.$nextTick(() => {
        // const str = e.toString().replace(/[\u4e00-\u9fa5]|[\（\）\《\》\——\；\，\。\“\”\<\>\！]/ig,'')
        this.form.oldPassword = this.$api.util.validatePasswordDel(e)
      })
    },
  },
  computed: {
    isDisabled: {
      set() {},
      get() {
        return !(this.form.oldPassword.length >= 8)
      },
    },
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules)
  },
}
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
}
</style>
