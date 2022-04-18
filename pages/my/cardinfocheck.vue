<!--
 * @Description: 实名信息核实页面
 * @Autor: siwenfeng
 * @Date: 2021-10-15 10:54:53
 * @LastEditors: siwenfeng
 * @LastEditexpTime: 2021-10-21 17:40:01
-->
<template>
  <view class="f-public-smscode u-p-t-76 u-p-x-64">
    <view class="f-smscode-title">
      <view class="u-m-b-32 f-title-value">请核实以下实名信息</view>
      <view class="f-smscode-phone">如有误请手动修改</view>
    </view>
    <view class="u-m-b-64" style="width: 100%；">
      <u-form
        :label-style="labelStyle"
        :rules="rules"
        :model="form"
        ref="uForm"
        :border-bottom="false"
        :error-type="errorType"
      >
        <u-form-item
          label="姓名"
          label-width="100"
          prop="userName"
          errorTextAlign="right"
          :border-bottom="false"
        >
          <u-input
            inputAlign="right"
            placeholder="请填写您的姓名"
            v-model="form.userName"
            :height="102"
            maxlength="30"
            :placeholderStyle="placeholderStyle"
          />
        </u-form-item>
        <u-form-item
          label="证件号"
          label-width="130"
          prop="certNo"
          errorTextAlign="right"
        >
          <u-input
            inputAlign="right"
            placeholder="请填写证件号"
            v-model="form.certNo"
            :height="102"
            disabled
            :disabledStyle="disabledStyle"
            :placeholderStyle="placeholderStyle"
          />
        </u-form-item>
        <u-form-item
          label-width="180"
          label="证件有效期"
          prop="expTime"
          errorTextAlign="right"
        >
          <u-input
            disabled
            inputAlign="right"
            placeholder="请填写证件有效期"
            v-model="form.expTime"
            :height="102"
            @input="inputChange"
            :disabledStyle="disabledStyle"
            :placeholderStyle="placeholderStyle"
          />
        </u-form-item>
      </u-form>
    </view>
    <uni-modal-tip
      :showModal="showModal"
      cancelText="取消"
      width="70%"
      :tipText="tipText"
      @confirm="modialConfirm"
    >
    </uni-modal-tip>
    <uni-common-button
      @click="next"
      title="提交"
      :fixed="true"
      :isDisabled="isDisabled"
    ></uni-common-button>
  </view>
</template>
<script>
import { validateCardName } from '@/config/util'
export default {
  data() {
    return {
      errorType: ["message"],
      disabledStyle: {
        color: "#c7c7c7",
      },
      showModal: false,
      labelStyle: {
        fontSize: '32rpx',
        height: '48rpx',
        fontFamily: 'PingFangSC-Regular, PingFang SC',
        fontWeight: 400,
        lineHeight: '48rpx',
        color: '#575757',
      },
      tipText: "",
      placeholderStyle:
        "height: 48rpx; line-height: 48rpx; fontSize: 32rpx;fontFamily: PingFangSC-Medium, PingFang SC;fontWeight: 400;color: #C7C7C7",
      rules: {
        userName: [
          {
            validator: (rule, value, callback) => {
              if (!validateCardName(value)) {
                callback(new Error('姓名格式不正确'))
              } else {
                callback()
              }
            },
            required: true,
            message: "姓名格式不正确",
            trigger: ["blur"],
          },
        ],
      },
      form: {
        userName: "",
        certNo: "",
        expTime: "",
      },
      navbarType: 0
    };
  },
  methods: {
    inputChange(e) {
      this.$nextTick(() => {
        this.form.userName = e.replace(/[^\d]/g, "");
      })
    },
    next() {
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          this.$api.request
            .realnameSubmit({
              certNo: this.form.certNo,
              expTime: this.form.expTime,
              userName: this.form.userName,
            })
            .then((res) => {
              if (res.code === "0") {
                this.navbarType = 1;
                this.$Router.replace({
                  path: "/pages/my/authentication",
                  query: {
                    image: "rzcg",
                    tooltipTitle: "认证成功",
                    tiptextTop: "恭喜您，您已经完成实名认证",
                    tiptextBottom: "",
                    btnText: "知道了",
                  },
                });
                // "实名信息人工审核中,等待处理
              } else if (res.code === '510127') {
                this.navbarType = 1;
                  this.$Router.replace({
                  path: "/pages/my/authentication",
                  query: {
                    image: "tjcg",
                    tooltipTitle: "提交成功",
                    tiptextTop: "实名信息审核中，我们将在2个工作日内致电",
                    tiptextBottom: "核实实名信息，请保持电话畅通。",
                    btnText: "知道了",
                  },
                });
                // 小于18岁
              }  else if (res.code === '510103') {
                const tipText = '抱歉，您的年龄低于18周岁，无法认证。'
                this.modalDialog(tipText)
                // 身份证号在别的账号注册账号使用
              } else if (res.code === '510102') {
                const tipText = '该身份证号已在别的注册账户使用,无法再认证。'
                this.modalDialog(tipText)
              }
               else {
                this.$u.toast(res.msg);
              }
            })
            .catch((err) => {});
        }
      });
    },
    modalDialog(tip) {
      this.showModal = true;
      this.tipText = tip;
    },
    modialConfirm() {
      this.showModal = false
      this.toMyPage()
    },
    toMyPage() {
      this.$api.repalceAllUser()
    }
  },
  computed: {
    isDisabled: {
      set() {},
      get() {
        return !(this.form.userName !== null && this.form.userName !== '')
      }
    }
  },
  onLoad(e) {
    const { expTime, idName, idNo } = e;
    this.form = {
      userName: idName,
      expTime,
      certNo: idNo,
    };
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
  onUnload() {
    this.navbarType === 0  && this.toMyPage()
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
}
// .f-financial-planner {
//   .f-modal-header {
//     border-bottom: 1px solid $border-color-base;
//     padding: 32rpx 32rpx 30rpx 32rpx;
//     .f-modal-title {
//       height: 56rpx;
//       line-height: 56rpx;
//       font-size: $font-xxl;
//       text-align: center;
//       font-weight: 500;
//     }
//   }
//   .f-modal-footer {
//     .f-footer-view {
//       flex: 1;
//       height: 96rpx;
//       line-height: 96rpx;
//       text-align: center;
//       color: $font-color-spec;
//       font-size: $font-xl;
//       position: relative;
//     }
//   }
// }
</style>
