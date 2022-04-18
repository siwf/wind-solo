<!--
 * @Description: 银行卡认证组件
 * @Autor: siwenfeng
 * @Date: 2021-10-15 10:54:53
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-24 17:14:08
-->
<template>
  <view class="u-p-t-36">
    <view class="f-form-title f-form-tips u-p-x-40 u-m-b-16">
      持卡人：{{ clientName }}
    </view>
    <view class="f-bankcard-wrap u-p-x-40">
      <u-form
        :label-style="labelStyle"
        :rules="rules"
        :model="req"
        ref="uForm"
        label-position="left"
        :error-type="errorType"
      >
        <u-form-item
          label="银行卡号"
          label-width="140"
          prop="bankNo"
          errorTextAlign="right"
        >
          <u-input
            inputAlign="right"
            placeholder="请填写银行卡号"
            v-model="req.bankNo"
            type="number"
            maxlength="20"
            :height="102"
            :placeholderStyle="placeholderStyle"
            @blur="bankname"
          />
        </u-form-item>
        <u-form-item
          label="发卡行"
          prop="bankName"
          label-width="120"
          errorTextAlign="right"
        >
          <u-input
            inputAlign="right"
            placeholder="请选择支持的银行"
            type="select"
            @click="bankselect"
            v-model="req.bankName"
            :height="102"
            :placeholderStyle="placeholderStyle"
          />
        </u-form-item>
        <u-form-item
          label-width="140"
          label="开户省市"
          prop="bankAddress"
          errorTextAlign="right"
        >
          <u-input
            inputAlign="right"
            placeholder="请选择银行开户省市"
            v-model="req.bankAddress"
            :height="102"
            type="select"
            @click="pickerClick"
            :placeholderStyle="placeholderStyle"
          />
        </u-form-item>
        <u-form-item
          label-width="140"
          label="支行信息"
          prop="bankBranchName"
          errorTextAlign="right"
        >
          <u-input
            inputAlign="right"
            placeholder="请填写支行信息"
            v-model="req.bankBranchName"
            maxlength="20"
            :height="112"
            :placeholderStyle="placeholderStyle"
          />
        </u-form-item>
      </u-form>
    </view>
    <view class="f-bankcard-wrap u-p-x-40 u-m-t-24 u-m-b-24">
      <u-form
        :label-style="labelStyle"
        :model="req"
        ref="uForm1"
        :rules="rules"
        label-position="left"
        :error-type="errorType"
      >
        <u-form-item
          label-width="240"
          label="银行预留手机号"
          prop="bankMobile"
          errorTextAlign="right"
        >
          <u-input
            inputAlign="right"
            placeholder="请输入银行预留手机号"
            v-model="req.bankMobile"
            type="number"
            maxlength="11"
            :height="102"
            :placeholderStyle="placeholderStyle"
          />
        </u-form-item>
      </u-form>
    </view>
    <view class="u-p-x-40">
      <view class="f-form-tips">温馨提示：</view>
      <view class="f-form-tips"
        >此卡将作为投资的打款和收款银行卡，请确保您填写每一项信息的准确性</view
      >
    </view>
    <uni-data-picker
      :localdata="items"
      ref="picker"
      popup-title="开户省市"
      @change="onchange"
      @nodeclick="onnodeclick"
      :map="{
        text: 'dicVal',
        value: 'dicKey',
      }"
    ></uni-data-picker>
    <uni-common-button
      @click="next"
      title="提交"
      :fixed="true"
      :canClick="isDisabled"
      :isDisabled="isDisabled"
    ></uni-common-button>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
// import { validateMobileNo } from '@/config/util'
export default {
  components: {},
  data() {
    return {
      req: {
        bankNo: '',
        bankName: '',
        bankAddress: '',
        bankBranchName: '',
        bankMobile: '',
        bankCode: ''
      },
      errorType: ['message'],
      labelStyle: {
        fontSize: '32rpx',
        height: '48rpx',
        fontFamily: 'PingFangSC-Regular, PingFang SC',
        fontWeight: 400,
        lineHeight: '48rpx',
        color: '#575757',
      },
      placeholderStyle:
        'height: 48rpx; line-height: 48rpx; fontSize: 32rpx;fontFamily: PingFangSC-Regular, PingFang SC;fontWeight: 400;color: #C7C7C7',
      rules: {
        bankNo: [
          {
            validator: (rule, value, callback) => {
              if (!this.$api.util.validateBankCard(value)) {
                callback(new Error('只允许输入8-20位数字'))
              } else {
                callback()
              }
            },
            trigger: ['blur'],
          },
        ],
        bankBranchName: [
          {
            required: true,
            min: 3,
            max: 20,
            message: '最少需填写3个字，最多可填写20个字',
            trigger: ['blur'],
          },
        ],
        bankAddress: [
          {
            required: true,
            message: '请选择银行开户省市',
            trigger: ['blur', 'change'],
          }
        ],
        bankName: [
          {
            required: true,
            message: '请选择支持的银行',
            trigger: ['blur', 'change'],
          }
        ],
        bankMobile: [
          {
            validator: (rule, value, callback) => {
              if (!this.$api.util.validateMobileNo(value)) {
                callback(new Error('请输入正确的手机号'))
              } else {
                callback()
              }
            },
            trigger: ['blur'],
          },
        ],
      },
      items: [],
      // binBankName: '',
    }
  },
  onLoad() {
    // 省市
    this.initDict('cityTree').then((data) => {
      this.items = data.items
    })
    // 初始化银行卡列表页面
    this.initDict('bankList');
  },
  methods: {
    initDict(funckey) {
      return this.$api.util.dictCacheInit(funckey)
    },
    // 卡号输入后显示发行卡
    bankname() {
      if (this.req.bankNo.length < 8) {
        return
      } else {
        this.$api.request
          .getBankInfo({ bankNo: this.req.bankNo })
          .then((res) => {
            if (res.code === '0') {
              this.req.bankName = res.data.bankName ? res.data.bankName : ''
              // this.binBankName = res.data.bankName ? res.data.bankName : ''
              this.req.bankCode = res.data.bankCode ? res.data.bankCode : ''
            } else {
              this.$u.toast(res.msg)
            }
          })
      }
    },
    // 开户省市
    pickerClick() {
      this.closeKeyBoard()
      this.$refs.picker.show()
    },
    onnodeclick() {},
    onchange(e) {
      //   this.form.bankAddress = ''
      this.req.bankAddress = e.detail.value
        .map((v) => {
          return v.text
        })
        .join('/')
    },
    // 选择支持的银行
    bankselect() {
      this.closeKeyBoard()
      this.$Router.push({
        path: '/pages/my/cardlist',
        query: {
          bankName: this.req.bankName
        }
      })
    },
    closeKeyBoard() {
      uni.hideKeyboard()
    },
    // 提交
    next() {
      const uForm = new Promise((resolve, reject) => {
        this.$refs.uForm.validate((valid) => {
          if (valid) resolve()
        })
      })
      const uForm1 = new Promise((resolve, reject) => {
        this.$refs.uForm1.validate((valid) => {
          if (valid) resolve()
        })
      })
      Promise.all([uForm, uForm1]).then((res) => {
        const reqForm = JSON.parse(JSON.stringify(this.req))
        // if (reqForm.bankName !== this.binBankName) {
        //   reqForm.bankName = this.binBankName
        // }
        this.isDisabled = true
        this.$api.request
          .submitClientBankIdentify(this.req)
          .then((res) => {
            if (res.code === '0') {
              this.$Router.replace({
                path: '/pages/my/authentication',
                query: {
                  image: 'rzcg',
                  tooltipTitle: '提交成功',
                  tiptextTop: '恭喜您，您已经完成银行卡认证',
                  tiptextBottom: '',
                  btnText: '知道了',
                  btnUrl: 'myCard',
                },
              })
            } else if (res.code === '40200') {
              this.$u.toast(res.msg)
            } else {
              this.$Router.replace({
                path: '/pages/my/authentication',
                query: {
                  image: 'rzcg',
                  tooltipTitle: '认证失败',
                  tiptextTop: res.msg,
                  tiptextBottom: '',
                  btnText: '知道了',
                  btnUrl: 'myCard',
                },
              })
            }
          })
          .catch((err) => {})
      })
    },
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules)
    this.$refs.uForm1.setRules(this.rules)
  },
  onShow() {
    // uni.$on('bank', (data) => {
    //   this.req.bankName = data.bankName
    //   this.req.bankCode = data.bankCode
    // })
  },
  computed: {
    ...mapGetters(['clientName']),
    isDisabled: {
      set() {},
      get() {
        return !(
          this.req.bankMobile.length === 11 &&
          this.req.bankNo.length >= 8 &&
          this.req.bankBranchName.length >= 3 &&
          this.req.bankName.length >= 1 &&
          this.req.bankAddress.length >= 1
        )
      },
    },
  },
}
</script>

<style lang="scss">
page {
  background: $page-bgColor-base;
}
</style>
<style lang="scss" scoped>
.f-bankcard-wrap {
  background-color: $page-bgColor-white;
}
.f-form-tips {
  color: $font-color-msg;
  line-height: 40rpx;
  font-size: $font-sm;
}
.f-form-title {
  font-size: $font-md;
}
</style>
