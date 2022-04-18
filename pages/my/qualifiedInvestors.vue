<!--
 * @Description: 合格投资者认证
 * @Autor: siwenfeng
 * @Date: 2021-10-21 09:35:08
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-24 16:05:50
-->
<template>
  <view class="u-p-t-36" style="padding-bottom: 120rpx;">
    <view class="f-form-title f-form-tips u-p-x-40 u-m-b-16">
      认证类型：普通投资者认证
    </view>
    <view class="f-bankcard-wrap u-p-x-40">
      <u-form
        :label-style="labelStyle"
        :rules="rules"
        :model="form"
        ref="uForm"
        label-position="left"
        :error-type="errorType"
        :border-bottom="false"
      >
        <u-form-item
          label="认证方式"
          label-width="140"
          :border-bottom="false"
          prop="fangshi"
        >
          <u-input
            inputAlign="right"
            :selectOpen="fangshiShow"
            placeholder="请选择"
            type="select"
            @click="fangshiClick"
            :height="102"
            v-model="form.fangshi"
          />
          <u-select
            v-model="fangshiShow"
            safe-area-inset-bottom
            title="认证方式"
            confirm-color="#575757 "
            cancel-color="#575757 "
            :default-value="fangshiValue"
            mode="single-column"
            :list="fangshiList"
            @confirm="fangshiConfirm()"
          ></u-select>
        </u-form-item>
      </u-form>
    </view>

      <view v-show="form.fangshi === '收入证明'" class="f-bankcard-wrap u-p-x-40 u-p-y-32 u-m-t-24">
        <view class="f-file-header u-flex u-m-b-16">
          <view class="f-file-name u-flex-1">添加收入证明文件</view>
          <text
            class="f-file-example"
            @click="$Router.push('/pages/my/templatelist')"
            >查看示例</text
          >
        </view>
        <view class="f-file-desc u-m-b-32">
          请提供<text class="f-desc-red">近3个月内</text>开具的<text
            class="f-desc-red"
            >近3年</text
          >年均收入不低于<text class="f-desc-red">50万元</text>的证明
        </view>
        <view>
          <view class="content">
            <upload @upload="incomeCert"></upload>
          </view>
        </view>
      </view>
      <view v-show="form.fangshi === '收入证明'" class="f-bankcard-wrap u-p-x-40 u-p-y-32 u-m-t-24">
        <view class="f-file-header u-flex u-m-b-16">
          <view class="f-file-name u-flex-1">添加银行流水详单</view>
          <text
            class="f-file-example"
            @click="$Router.push('/pages/my/templatelist')"
            >查看示例</text
          >
        </view>
        <view class="f-file-desc u-m-b-32">
          请提供<text class="f-desc-red">近3个月内</text>开具的<text
            class="f-desc-red"
            >近3年</text
          >年均收入不低于<text class="f-desc-red">50万元</text>的证明
        </view>
        <view>
          <view class="content">
            <upload @upload="bankCert"></upload>
          </view>
        </view>
      </view>
      <view v-show="form.fangshi === '金融资产证明'" class="f-bankcard-wrap u-p-x-40 u-p-y-32 u-m-t-24">
        <view class="f-file-header u-flex u-m-b-16">
          <view class="f-file-name u-flex-1">添加金融资产证明文件</view>
          <text
            class="f-file-example"
            @click="$Router.push('/pages/my/templatelist')"
            >查看示例</text
          >
        </view>
        <view class="f-file-desc u-m-b-32">
          请提供<text class="f-desc-red">近20个交易日</text>内不低于<text
            class="f-desc-red"
            >300万元</text
          >的金融资产证明。
        </view>
        <view>
          <view class="content">
            <upload @upload="assetCert"></upload>
          </view>
        </view>
      </view>
    <view class="f-aggrement-box">
      <view style="width: 36rpx; height: 40rpx" class="u-flex u-m-r-4 u-m-b-4">
        <checkbox value="cb" :checked="false" @click="protocol = !protocol" />
      </view>
      <view class="f-file-desc">
        本人承诺符合<text class="f-desc-red">合格投资者</text>条件，资金来源合法，没有非法汇集他人资金投资私募基金，提供的证明材料真实、准确、完整、有效，并且愿意承担因不实材料所造成的一切后果。
      </view>
    </view>
    <uni-common-button
      @click="next"
      title="下一步"
      :fixed="true"
      :canClick="isDisabled"
      :isDisabled="isDisabled"
    ></uni-common-button>
  </view>
</template>

<script>
import upload from "./components/pretty-uploadFile/pretty-uploadFile.vue";
export default {
  components: {
    upload,
  },
  data() {
    return {
      form: {
        fangshi: "收入证明",
      },
      protocol: false,
      errorType: ["message"],
      labelStyle: {
        fontSize: "32rpx",
        height: "48rpx",
        fontFamily: "PingFangSC-Regular, PingFang SC",
        fontWeight: 400,
        lineHeight: "48rpx",
        color: "#575757",
      },
      placeholderStyle:
        "height: 48rpx; line-height: 48rpx; fontSize: 32rpx;fontFamily: PingFangSC-Regular, PingFang SC;fontWeight: 400;color: #C7C7C7",
      fangshiShow: false,
      fangshiValue: [0],
      fangshiList: [
        {
          label: "收入证明",
          value: "srzm",
        },
        {
          label: "金融资产证明",
          value: "srzm1",
        },
      ],
      params: {
        incomeCert: [],
        bankCert: [],
        assetCert: []
      }
    };
  },
  methods: {
    // 收入证明
    incomeCert(e) {
      this.params.incomeCert = e;
    },
    // 银行流水证明
    bankCert(e) {
      this.params.bankCert = e;
    },
    // 金融资产证明
    assetCert(e) {
      this.params.assetCert = e;
    },
    fangshiClick() {
      this.closeKeyBoard();
      this.fangshiShow = true;
    },
    fangshiConfirm(e) {
      this.form.fangshi = e[0].label;
    },
    closeKeyBoard() {
      uni.hideKeyboard();
    },
    next() {
      const params = {
        "assetCert": this.params.assetCert.map(v => v.url),
        "bankCert": this.params.bankCert.map(v => v.url),
        "certType": "1",
        "incomeCert": this.params.incomeCert.map(v => v.url)
      }
      // 文件是否为空
      if (!(this.incomeBankEmpty || this.assetCertEmpty)) {
        if (!this.params.incomeCert.length) {
          this.$u.toast('请上传收入证明')
          return
        }
        if (!this.params.bankCert.length) {
          this.$u.toast('请上传银行流水详单')
          return
        }
        if (!this.assetCertEmpty) {
          this.$u.toast('请上传金融资产证明')
          return
        }
      }

      if (!this.protocol) {
        this.$u.toast('请勾选本人承诺框')
        return
      }
      console.log(params)
      this.isDisabled = true
      this.$api.request.submitWechatClientInvestCertSecond(params).then(res => {
        if (res.code === '0') {
          setTimeout(()=>{
            this.$u.toast('投资者认证成功');
            this.$api.prePage(3).investCertList();
            this.$api.prePageDelta(2)
						}, 800)
        } else {
          this.$u.toast(res.msg)
        }
        this.isDisabled = false
      }).catch(err => {
        this.isDisabled = false
      })
    },
  },
  computed: {
    isDisabled: {
      set() {},
      get() {
         return !(this.protocol && (this.incomeBankEmpty || this.assetCertEmpty))
      }
    },
    // 收入证明, 银行流水 是否为空
    incomeBankEmpty() {
      return this.params.incomeCert.length && this.params.bankCert.length
    },
    // 金融资产是否为空
    assetCertEmpty() {
      return this.params.assetCert.length
    }
  }
};
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
.f-file-example {
  color: $font-color-spec;
  font-size: $font-md;
}
.f-file-desc {
  color: $font-color-msg;
  font-size: $font-sm;
  line-height: 44rpx;
}
.f-desc-red {
  color: $font-color-red;
}
.f-file-name {
  font-size: $font-lg;
}
.content {
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
.f-aggrement-box {
  margin-top: 40rpx;
  padding: 0  40rpx 112rpx;
  display: flex;
}
</style>