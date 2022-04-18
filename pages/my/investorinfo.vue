<!--
 * @Description: 投资者信息页面
 * @Autor: siwenfeng
 * @Date: 2021-10-25 17:47:32
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-26 11:39:11
-->
<template>
  <view class="u-p-t-36 f-certification-info">
    <view class="f-bankcard-wrap u-p-x-40 u-m-b-24">
      <u-form
        :label-style="labelStyle"
        :model="form"
        ref="uForm"
        label-position="left"
        :border-bottom="false"
      >
        <u-form-item label="姓名">
          <u-input
            inputAlign="right"
            placeholder="未填写"
            v-model="form.clientName"
            :height="86"
            disabled
            :placeholderStyle="placeholderStyle"
          />
        </u-form-item>
        <u-form-item
          label="证件号"
          label-width="130"
        >
          <u-input
            inputAlign="right"
            placeholder="未填写"
            v-model="form.certNo"
            :height="86"
            disabled
            :placeholderStyle="placeholderStyle"
          />
        </u-form-item>
        <u-form-item
          label-width="180"
          label="证件有效期"
        >
          <u-input
            inputAlign="right"
            placeholder="未填写"
            v-model="form.certExpireDate"
            :height="86"
            disabled
            :placeholderStyle="placeholderStyle"
          />
        </u-form-item>
        <u-form-item
          label-width="140"
          label="证件照片"
          :border-bottom="false"
        >
          <u-input
            inputAlign="right"
            placeholder="未填写"
            v-model="form.authStatus"
            :height="86"
            disabled
            :placeholderStyle="placeholderStyle"
          />
        </u-form-item>
      </u-form>
    </view>
    <view class="f-bankcard-wrap u-p-x-40 u-m-b-24">
      <u-form
        :label-style="labelStyle"
        :model="form"
        ref="uForm2"
        label-position="left"
        :border-bottom="false"
      >
        <u-form-item label="职业">
          <u-input
            inputAlign="right"
            placeholder="未填写"
            v-model="form.positionCode"
            :height="86"
            disabled
            :placeholderStyle="placeholderStyle"
            :custom-style="inputCustomStyle"
          />
        </u-form-item>
        <u-form-item
          label="联系地址"
          label-width="140"
        >
          <u-input
            inputAlign="right"
            placeholder="未填写"
            v-model="form.areaName"
            :height="86"
            disabled
            :custom-style="inputCustomStyle"
            :placeholderStyle="placeholderStyle"
          />
        </u-form-item>
        <u-form-item
          label-width="140"
          label="收入来源"
        >
          <u-input
            inputAlign="right"
            placeholder="未填写"
            v-model="form.incomeSource"
            :height="86"
            disabled
            :placeholderStyle="placeholderStyle"
          />
        </u-form-item>
        <u-form-item
          label-width="130"
          label="年收入"
        >
          <u-input
            inputAlign="right"
            placeholder="未填写"
            v-model="form.income"
            :height="86"
            disabled
            :placeholderStyle="placeholderStyle"
          />
        </u-form-item>
        <u-form-item
          label-width="140"
          label="电子邮箱"
          :border-bottom="false"
        >
          <u-input
            inputAlign="right"
            placeholder="未填写"
            v-model="form.email"
            :height="86"
            disabled
            :placeholderStyle="placeholderStyle"
            :custom-style="inputCustomStyle"
          />
        </u-form-item>
      </u-form>
    </view>
    <view class="f-bankcard-wrap u-p-x-40 u-m-b-24">
      <u-form
        :label-style="labelStyle"
        :model="form"
        ref="uForm1"
        label-position="left"
        :border-bottom="false"
      >
        <u-form-item label="是否存在实际控制关系" label-width="330">
          <u-input
            inputAlign="right"
            placeholder="未填写"
            v-model="form.accountController"
            :height="86"
            disabled
            :placeholderStyle="placeholderStyle"
          />
        </u-form-item>
        <u-form-item
          label="交易的实际受益人"
          label-width="320"
        >
          <u-input
            inputAlign="right"
            placeholder="未填写"
            v-model="form.accountBeneficiary"
            :height="86"
            disabled
            :placeholderStyle="placeholderStyle"
          />
        </u-form-item>
        <u-form-item
          label-width="320"
          label="是否有不良诚信记录"
        >
          <u-input
            inputAlign="right"
            placeholder="未填写"
            v-model="form.badCreditRecord"
            :height="86"
            disabled
            :placeholderStyle="placeholderStyle"
          />
        </u-form-item>
        <u-form-item
          label-width="300"
          label="税收居民身份声明"
          :border-bottom="false"
        >
          <u-input
            inputAlign="right"
            placeholder="未填写"
            v-model="form.taxStatement"
            :height="86"
            disabled
            :custom-style="inputCustomStyle"
            :placeholderStyle="placeholderStyle"
          />
        </u-form-item>
      </u-form>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        
      },
      labelStyle: {
        fontSize: "32rpx",
        height: "48rpx",
        fontFamily: "PingFangSC-Regular, PingFang SC",
        fontWeight: 400,
        lineHeight: "48rpx",
        color: "#575757",
      },
      inputCustomStyle: {
        "white-space": 'nowrap',
        overflow: "hidden",
        "text-overflow": 'ellipsis'
      },
      placeholderStyle:
        "height: 48rpx; line-height: 48rpx; fontSize: 32rpx;fontFamily: PingFangSC-Regular, PingFang SC;fontWeight: 400;color: #C7C7C7",
    };
  },
  methods: {
    getInvestCertInfo() {
      this.$api.request.getInvestCertInfo().then(res => {
        if (res.code === '0') {
          const {
            positionName,
            country, 
            areaName, 
            postAddress, 
            incomeDesc,
            incomeSourceDesc,
            email, 
            badCreditRecordDesc,
            accountControllerDesc,
            accountBeneficiaryDesc,
            taxStatementDesc,
            clientName,
            certNo,
            authStatus,
            certExpireDate
          } = res.data;
          this.form = {
            clientName,
            certNo,
            certExpireDate,
            positionCode: positionName,
            country,
            authStatus: authStatus === '0' ? '未上传' : '已上传', 
            areaName: areaName ?  areaName.split(',').join('/') + postAddress : '',
            // postAddress, // 详细联系地址
            incomeSource: incomeSourceDesc ? incomeSourceDesc : '' , // 收入来源
            income: incomeDesc ? incomeDesc : '', // 年收入
            email, // 邮箱
            accountController: accountControllerDesc, //是否存在实际控制关系
            accountBeneficiary: accountBeneficiaryDesc, // 交易的实际受益人
            badCreditRecord: badCreditRecordDesc, // 是否有不良诚信记录
            taxStatement: taxStatementDesc

          }
        } else {
          this.$u.toast(res.msg)
        }
      })
    }
  },
  onLoad() {
    this.getInvestCertInfo()
  }
};
</script>

<style scoped lang="scss">
.f-bankcard-wrap {
  background-color: $page-bgColor-white;
}
</style>
