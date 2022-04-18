<!--
 * @Description: 设置登录密码页面
 * @Autor: siwenfeng
 * @Date: 2021-10-18 09:48:24
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-30 16:08:07
-->
<template>
  <view class="f-public-smscode u-p-t-76 u-p-x-64 f-container-white">
    <view class="f-smscode-title">
      <view class="u-m-b-32 f-title-value"
        >{{ titlePlacehoderText().title }}
      </view>
      <view v-if="btnName !== '下一步'" class="f-smscode-phone"
        >至少包含8-20位的数字、字母(不能是纯数字或纯字符)</view
      >
    </view>
    <view class="u-m-b-64" style="width: 100%；">
      <u-form
        :rules="rules"
        :model="form"
        ref="uForm"
        :border-bottom="false"
        :error-type="errorType"
      >
        <u-form-item prop="password" :border-bottom="false">
          <u-input
            inputAlign="left"
            :placeholder="titlePlacehoderText().placeholdertext"
            :placeholder-style="placeholderStyle"
            v-model="form.password"
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
      @click="next"
      :title="btnName"
      :isDisabled="isDisabled"
    ></uni-common-button>
    <uni-modal-dialog
      :showModal="showModal"
      modalTitle="请输入邀请码"
      @cancle="cancle"
      @confirm="success"
    >
      <view
        class="u-p-x-48"
        style="border-radius: 8rpx; background-color: #f5f5f5 !important"
      >
        <u-form
          :rules="rules"
          :model="form1"
          ref="uForm1"
          :border-bottom="false"
          :error-type="errorType"
        >
          <u-form-item prop="inviteCode" :border-bottom="false">
            <u-input
              inputAlign="left"
              placeholder="请输入邀请码"
              :placeholder-style="placeholderStyle1"
              v-model="form1.inviteCode"
              :height="72"
              @input="inviteCodeInputChange"
            />
          </u-form-item>
        </u-form>
      </view>
    </uni-modal-dialog>
  </view>
</template>
<script>
import { validatePassword } from '@/config/util'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      errorType: ['message', 'border'],
      placeholderStyle1:
        'padding-left: 32rpx;height: 44rpx; line-height: 44rpx; fontSize: 28rpx;fontFamily: PingFangSC-Medium, PingFang SC;fontWeight: 400;color: #999999',
      placeholderStyle:
        'height: 48rpx; line-height: 48rpx; fontSize: 32rpx;fontFamily: PingFangSC-Medium, PingFang SC;fontWeight: 400;color: #C7C7C7',
      rules: {
        password: [
          {
            validator: (rule, value, callback) => {
              if (!validatePassword(value)) {
                // this.isDisabled = true;
                callback(new Error('登录密码至少包含8-20位的数字、字母'))
              } else {
                // this.isDisabled = false;
                callback()
              }
            },
            trigger: ['blur'],
          },
        ],
        inviteCode: [
          {
            required: true,
            message: "请输入邀请码",
          },
        ],
      },
      form: {
        password: '',
      },
      form1: {
        inviteCode: '',
      },
      btnName: '',
      btnCode: '1', // 默认是注册页面
      showModal: false,
      stepToken: '',
      timer: null,
      // 用于注册的时候用户，中断了绑定理财师操作，直接点击返回，或则触发手势返回
      navbackType: 0, // 默认是0,即手势返回，或者点击返回键， 1下一步跳转
    }
  },
  methods: {
    ...mapMutations(['logOut']),
    // 密码禁止输入中文
    passwordInputChange(e) {
      this.$nextTick(() => {
        // const str = e.toString().replace(/[\u4e00-\u9fa5]|[\（\）\《\》\——\；\，\。\“\”\<\>\！]/ig,'')
        this.form.password = this.$api.util.validatePasswordDel(e)
      })
    },
    // 邀请码禁止输入中文
    inviteCodeInputChange(e) {
      this.$nextTick(() => {
        // const str = e.toString().replace(/[\u4e00-\u9fa5]|[\（\）\《\》\——\；\，\。\“\”\<\>\！]/ig,'')
        this.form1.inviteCode = this.$api.util.validatePasswordDel(e)
      })
    },
    next() {
      // 注册绑定理财师
      if (this.btnCode == '1') {
        this.register()
        // 修改密码
      } else if (this.btnCode == '3') {
        this.modifyPassword()
      } else {
        // 忘记密码
        this.forgetPassword()
      }
    },
    cancle() {
      this.closeDialog()
    },
    closeDialog() {
      this.navbackType = 1;
      this.showModal = false
      this.$Router.replace('/pages/public/success')
    },
    success() {
      this.$refs.uForm1.validate((valid) => {
        if (valid) {
          this.$api.request
            .bindInviteCode({
              inviteCode: this.form1.inviteCode,
            })
            .then((res) => {
              if (res.code === '0') {
                // 成功绑定理财师处理
                this.closeDialog()
              } else {
                this.$u.toast(res.msg)
              }
            })
        }
      })
    },
    register() {
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          this.isDisabled = true
          this.$api.request
            .register({
              password: this.$md5.hex_md5_16Upper(this.form.password),
              stepToken: this.$Route.query.stepToken,
            })
            .then((res) => {
              if (res.code === '0') {
                const tokenId = res.data.token
                this.$u.toast('注册成功')
                this.navbackType = 2;
                // 自动登录
                this.$store.commit('login', tokenId)
                // 拉取用户信息
                this.$store.dispatch("GetInfo").then().catch(err => {})
                // 绑定理财师
                this.showModal = true
              } else {
                // this.showModal = true;
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
    // 忘记密码
    forgetPassword() {
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          this.isDisabled = true
          this.$api.request
            .updatePassword({
              password: this.$md5.hex_md5_16Upper(this.form.password),
              stepToken: this.$Route.query.stepToken,
            })
            .then((res) => {
              if (res.code === '0') {
                this.$u.toast('修改登录密码成功')
                this.timer = setTimeout(() => {
                  // 返回入口的 第2个页面也就是登录页面, 第一个页面是我的页面
                  this.$Router.replaceAll('/pages/public/login')
                }, 800)
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
    modifyPassword() {
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          this.isDisabled = true
          this.$api.request
            .submitNewPassword({
              newPassword: this.$md5.hex_md5_16Upper(this.form.password),
              stepToken: this.$Route.query.stepToken,
            })
            .then((res) => {
              if (res.code === '0') {
                this.$u.toast('修改登录密码成功')
                this.logOut()
                this.timer = setTimeout(() => {
                  this.$Router.replace('/pages/public/login')
                }, 800)
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
    titlePlacehoderText() {
      const obj = {
        title: '',
        placeholdertext: '',
      }
      // 注册
      if (this.btnCode == '1') {
        obj.title = '设置登录密码'
        obj.placeholdertext = '请输入您的登录密码'
      } else {
        // 忘记密码和修改密码
        obj.title = '输入新的密码'
        obj.placeholdertext = '请设置新的登录密码'
      }
      return obj
    },
    btnText() {
      this.btnCode = this.$Route.query.btnCode || '1'
      // 1默认是注册 2忘记密码 3 修改密码
      if (this.btnCode == '1') {
        this.btnName = '注册'
      } else {
        this.btnName = '提交'
      }
    },
  },
  computed: {
    isDisabled: {
      set() {},
      get() {
        return !(this.form.password.length >= 8)
      },
    },
  },
  onLoad() {
    this.btnText()
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules)
    this.$refs.uForm1.setRules(this.rules)
  },
  onUnload() {
    // 注册页面，只是注册成功,没有绑定理财师，就返回了，这个时候是已经登录了，跳转到我的页面
    if (this.btnCode == '1' && this.navbackType === 2) {
      this.$api.repalceAllUser()
    }
    // 注册页面，还没有注册成功，点击返回，或者手势按钮，返回到上一级
    // if (this.btnCode == '1' && this.navbackType === 0) {
    //   // uni.navigateBack()
    // }
    this.timer && clearTimeout(this.timer)
  }
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
