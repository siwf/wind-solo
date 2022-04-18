<!--
 * @Description: 投资者认证页面
 * @Autor: siwenfeng
 * @Date: 2021-10-15 10:47:53
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-24 17:14:32
-->
<template>
  <view class="u-p-t-36 f-investorCertification-wrap">
    <view class="f-form-title f-form-tips u-p-x-40 u-m-b-16">
      <text class="u-m-r-15">持卡人：{{ clientName }}</text>
      <text>身份证号：{{ certNo }}</text>
    </view>
    <view class="f-bankcard-wrap u-p-x-40">
      <u-form
        :label-style="labelStyle"
        :rules="rules"
        :model="form"
        ref="uForm"
        label-position="left"
        :error-type="errorType"
      >
        <u-form-item label="职业" prop="positionCode" errorTextAlign="right">
          <u-input
            inputAlign="right"
            placeholder="请选择"
            v-model="form.positionCode"
            :height="86"
            type="select"
            :selectOpen="positionCodeShow"
            @click="positionCodeClick"
            :placeholderStyle="placeholderStyle"
            :custom-style="inputCustomStyle"
          />
          <u-select
            v-model="positionCodeShow"
            safe-area-inset-bottom
            title="职业"
            confirm-color="#575757"
            cancel-color="#575757"
            :default-value="positionCodeDefaultValue"
            mode="single-column"
            :list="positionCode"
            value-name="positionId"
            label-name="positionName"
            @confirm="positionCodeConfirm"
          ></u-select>
        </u-form-item>
        <u-form-item
          label="所在国家/地区"
          label-width="220"
          prop="country"
          errorTextAlign="right"
        >
          <u-input
            inputAlign="right"
            placeholder="请选择"
            v-model="form.country"
            :height="86"
            disabled
            type="select"
            :placeholderStyle="placeholderStyle"
          />
        </u-form-item>
        <u-form-item
          label-width="140"
          label="联系地址"
          prop="areaName"
          errorTextAlign="right"
        >
          <u-input
            inputAlign="right"
            placeholder="请选择"
            v-model="form.areaName"
            :height="86"
            type="select"
            @click="pickerClick"
            :placeholderStyle="placeholderStyle"
          />
        </u-form-item>
        <u-form-item prop="postAddress">
          <u-input
            inputAlign="left"
            placeholder="请填写真实有效的详细地址，详细到门牌号，以便重要材料邮寄。"
            :placeholder-style="placeholderStyle"
            v-model="form.postAddress"
            type="textarea"
            maxlength="100"
            height="112"
          />
        </u-form-item>
        <u-form-item
          label-width="230"
          showLabelLeft
          label="收入来源"
          prop="incomeSource"
          errorTextAlign="right"
        >
          <!-- <text class="f-item-xt" slot="left">(选填)</text> -->
          <u-input
            inputAlign="right"
            placeholder="请选择"
            v-model="form.incomeSource"
            :height="86"
            type="select"
            @click="multiplyClick('incomeSource', '收入来源', 'dictValue', 'dictKey')"
            :placeholderStyle="placeholderStyle"
            :custom-style="inputCustomStyle"
          />
        </u-form-item>
        <u-form-item
          label-width="200"
          showLabelLeft
          label="年收入"
          prop="income"
          errorTextAlign="right"
        >
          <u-input
            inputAlign="right"
            placeholder="请选择"
            v-model="form.income"
            :height="86"
            :selectOpen="incomeShow"
            type="select"
            @click="incomeClick"
            :placeholderStyle="placeholderStyle"
          />
          <u-select
            v-model="incomeShow"
            safe-area-inset-bottom
            title="年收入"
            confirm-color="#575757"
            cancel-color="#575757"
            :default-value="incomeDefaultValue"
            mode="single-column"
            :list="incomeList"
            value-name="dictKey"
            label-name="dictValue"
            @confirm="incomeConfirm"
          ></u-select>
        </u-form-item>
        <u-form-item
          label-width="140"
          label="电子邮箱"
          prop="email"
          errorTextAlign="right"
          :border-bottom="false"
        >
          <u-input
            inputAlign="right"
            placeholder="请填写"
            :placeholder-style="placeholderStyle"
            v-model="form.email"
            maxlength="50"
            :height="86"
            :custom-style="inputCustomStyle"
          />
        </u-form-item>
      </u-form>
    </view>
    <view class="f-bankcard-wrap u-p-x-40 u-m-t-24 u-m-b-24">
      <u-form
        :label-style="labelStyle"
        :rules="rules"
        :model="form"
        ref="uForm1"
        label-position="left"
        :error-type="errorType"
        :border-bottom="false"
      >
        <u-form-item
          label-width="330"
          label="是否存在实际控制关系"
          prop="accountController"
          errorTextAlign="right"
        >
          <u-input
            inputAlign="right"
            placeholder="请选择"
            :placeholder-style="placeholderStyle"
            v-model="form.accountController"
            :height="86"
            :selectOpen="accountControllerShow"
            type="select"
            @click="accountControllerClick"
          />
          <u-select
            v-model="accountControllerShow"
            safe-area-inset-bottom
            title="是否存在实际控制关系"
            confirm-color="#575757"
            cancel-color="#575757"
            :default-value="accountControllerDefaultValue"
            mode="single-column"
            :list="accountBeneficiaryList"
            @confirm="accountControllerConfirm"
          ></u-select>
        </u-form-item>
        <u-form-item v-if="parmJson.accountController === '2'" prop="accountControllerIntro">
          <u-input
            inputAlign="left"
            placeholder="请填写情况说明"
            :placeholder-style="placeholderStyle"
            v-model="form.accountControllerIntro"
            type="textarea"
            maxlength="100"
            height="112"
          />
        </u-form-item>
        <u-form-item
          label-width="300"
          label="交易的实际受益人"
          prop="accountBeneficiary"
          errorTextAlign="right"
        >
          <u-input
            inputAlign="right"
            placeholder="请选择"
            :placeholder-style="placeholderStyle"
            v-model="form.accountBeneficiary"
            :height="86"
            :selectOpen="accountBeneficiaryShow"
            type="select"
            @click="accountBeneficiaryClick"
          />
          <u-select
            v-model="accountBeneficiaryShow"
            safe-area-inset-bottom
            title="交易的实际受益人"
            confirm-color="#575757"
            cancel-color="#575757"
            :default-value="accountBeneficiaryDefaultValue"
            mode="single-column"
            :list="accountBeneficiaryList"
            @confirm="accountBeneficiaryConfirm"
          ></u-select>
        </u-form-item>
       <u-form-item v-if="parmJson.accountBeneficiary === '2'" prop="accountBeneficiaryIntro">
          <u-input
            inputAlign="left"
            placeholder="请填写情况说明"
            :placeholder-style="placeholderStyle"
            v-model="form.accountBeneficiaryIntro"
            type="textarea"
            maxlength="100"
            height="112"
          />
        </u-form-item>
        <u-form-item
          label-width="320"
          label="是否有不良诚信记录"
          prop="badCreditRecord"
          errorTextAlign="right"
        >
          <u-input
            inputAlign="right"
            placeholder="请选择"
            :placeholder-style="placeholderStyle"
            v-model="form.badCreditRecord"
            :height="86"
            :selectOpen="badCreditRecordShow"
            type="select"
            @click="badCreditRecordClick"
          />
          <u-select
            v-model="badCreditRecordShow"
            safe-area-inset-bottom
            title="是否有不良诚信记录"
            confirm-color="#575757"
            cancel-color="#575757"
            :default-value="accountControllerDefaultValue"
            mode="single-column"
            :list="booleanList"
            @confirm="badCreditRecordConfirm"
          ></u-select>
        </u-form-item>
        <u-form-item v-if="parmJson.badCreditRecord === '1'" prop="badCreditRecordIntro">
          <u-input
            inputAlign="left"
            placeholder="请填写情况说明"
            :placeholder-style="placeholderStyle"
            v-model="form.badCreditRecordIntro"
            type="textarea"
            height="112"
            maxlength="100"
          />
        </u-form-item>

        <u-form-item
          label-width="300"
          label="税收居民身份声明"
          prop="taxStatement"
          errorTextAlign="right"
          :border-bottom="false"
        >
          <u-input
            inputAlign="right"
            placeholder="请选择"
            v-model="form.taxStatement"
            :height="86"
            :selectOpen="taxStatementShow"
            type="select"
            @click="taxStatementClick"
            :placeholderStyle="placeholderStyle"
            :custom-style="inputCustomStyle"
          />
          <u-select
            v-model="taxStatementShow"
            safe-area-inset-bottom
            title="年收入"
            confirm-color="#575757"
            cancel-color="#575757"
            :default-value="taxStatementDefaultValue"
            mode="single-column"
            :list="taxStatementList"
            @confirm="taxStatementConfirm"
          ></u-select>
        </u-form-item>
      </u-form>
    </view>
    <!-- <view class="u-p-x-40">
      <view class="f-form-tips">温馨提示：</view>
      <view class="f-form-tips"
        >此卡将作为投资的打款和收款银行卡，请确保您填写每一项信息的准确性</view
      >
    </view> -->
    <uni-select-multiply
      v-model="multiplyShow"
      :data="multiplyList"
      :default-selected="multiplyDefaultSelected"
      @confirm="multiplyConfirm"
      :formKey="multiplyKey"
      :title="multiplyTitle"
      :label-name="labelKey"
      :value-name="valueKey"

    />
    <uni-data-picker
      :localdata="items"
      ref="picker"
      popup-title="地址"
      v-model="areaCode"
      @change="onchange"
      :map="{
        text: 'dicVal',
        value: 'dicKey'
      }"
    ></uni-data-picker>
    <uni-common-button
      @click="submit"
      title="下一步"
      :fixed="true"
      :canClick="isDisabled"
      :isDisabled="isDisabled"
    ></uni-common-button>
  </view>
</template>

<script>
import { mapGetters } from "vuex";
import UniSelectMultiply from "../../components/uni-select-mutiply/uni-select-multiply.vue";
export default {
  components: { UniSelectMultiply },
  data() {
    return {
      areaCode: '',
      // 中文名称
      form: {
        positionCode: "", // 职业
        country: "中国", // 国家
        areaName: "", // 省市区
        areaCode: "", // 省市区编码
        postAddress: "", // 详细联系地址
        incomeSource: "", // 收入来源
        income: "", // 年收入
        email: "", // 邮箱
        accountControllerIntro: "",
        accountController: "否", //是否存在实际控制关系
        accountBeneficiaryIntro: "",
        accountBeneficiary: "本人", // 交易的实际受益人
        badCreditRecord: "否", // 是否有不良诚信记录
        badCreditRecordIntro: "",
        taxStatement: "仅为中国税收居民", // 税收居民身份声明

      },
      // 真正传递的参数
      parmJson: {
        positionCode: "",
        country: "中国",
        areaName: "", // 省市区
        areaCode: "", // 省市区编码
        postAddress: "",
        incomeSource: "",
        income: "",
        email: "",
        accountControllerIntro: "",
        accountController: "0", // 是否存在控制关系 默认是否
        accountBeneficiaryIntro: "",
        accountBeneficiary: "1", // 交易的实际受益人 默认是本人
        badCreditRecordIntro: "",
        badCreditRecord: "0", // 是否有不良诚信记录 默认是否
        taxStatement: "1", // 税收居民收入声明，默认是仅为中国税收居民
      },
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
      rules: {
        positionCode: {
          required: true,
          message: "请选择职业",
          trigger: ["blur", 'change'],
        },
        areaName: {
          required: true,
          message: "请选择联系地址",
          trigger: ["blur", 'change'],
        },
        postAddress: {
          required: true,
          message: "请填写详细地址",
          trigger: ['blur']
        },
        email: [
          {
              validator: (rule, value, callback) => {
              if (!this.$api.util.validateEamil(value)) {
                callback(new Error("您输入的邮箱格式不正确"));
              } else {
                callback();
              }
            },
            trigger: ["blur"],
          },
          {
            required: true,
            message: "请填写电子邮箱",
            trigger: ['blur']
          }
        ],
        accountController: {
          required: true,
          message: "请选择是否存在控制关系",
          trigger: ["blur"],
        },
        // 是否存在实际控制关系
        accountControllerIntro: {
          message: '请输入情况说明',
          max: 100,
          required: true,
          trigger: ["blur"],
        },
        // 交易的实际受益人
        accountBeneficiaryIntro: {
          message: '请输入情况说明',
          max: 100,
          required: true,
          trigger: ["blur"],
        },
        accountBeneficiary: {
          message: "请选择交易的实际受益人",
          required: true,
          trigger: ['blur']
        },
        // 不良诚信记录说明
        badCreditRecordIntro: {
          message: '请输入情况说明',
          max: 100,
          required: true,
          trigger: ["blur"],
        },
        badCreditRecord: {
          message: '请选择是否有不良诚信记录',
          required: true,
          trigger: ['blur']
        },
        taxStatement: {
          message: '请选择税收居民身份声明',
          required: true,
          trigger: ['blur']
        }
      },
      // 职业字典
      positionCode: [],
      // 收入来源字典
      incomeSource: [],
      // 省市区字典
      items: [],
      multiplyDefaultSelected: [],
      multiplyTitle: "",
      multiplyList: [],
      multiplyShow: false,
      multiplyKey: "",
      positionCodeShow: false,
      positionCodeDefaultValue: [0],
      // 年收入下拉控制
      incomeShow: false,
      // 年收入下拉选择默认选中值
      incomeDefaultValue: [0],
      // 年收入下拉列表选项
      incomeList: [],
      accountControllerShow: false,
      booleanList: [
        {
          label: "否",
          value: "0",
        },
        {
          label: "是",
          value: "1",
        },
      ],
      accountControllerDefaultValue: [0],
      accountBeneficiaryShow: false,
      accountBeneficiaryDefaultValue: [0],
      accountBeneficiaryList: [
        {
          label: "本人",
          value: "1",
        },
        {
          label: "其他",
          value: "2",
        },
      ],
      badCreditRecordShow: false,
      badCreditRecordDefaultValue: [0],
      taxStatementShow: false,
      taxStatementDefaultValue: [0],
      taxStatementList: [
        {
          label: "仅为中国税收居民",
          value: "1",
        },
        {
          label: "仅为非中国税收证明",
          value: "2"
        },
        {
          label: "既是中国税收居民，又是其他国家税收居民",
          value: "3"
        }
      ],
      valueKey: null,
      labelKey: null,
      inputCustomStyle: {
        "white-space": 'nowrap',
        overflow: "hidden",
        "text-overflow": 'ellipsis'
      }
      // isDisabled: false
    };
  },
  onLoad() {
    // 职位字典
    this.initDict('positionList').then(data => {
      this.positionCode = data.items;
    })
    // 城市字典
    this.initDict('cityTree').then(data => {
      this.items = data.items;
    })
    // 基础字典
    this.initDict('loadDictMap').then(data => {
      // 收入来源
      this.incomeSource = data.income_type;
      this.incomeList = data.year_income
    })
    this.getInvestCertInfo()
  },
  computed: {
    isDisabled: {
      set() {},
      get() {
        return !(this.form.positionCode && this.form.areaName && this.form.postAddress && this.form.email)
      }
    },
    ...mapGetters(["userInfo", 'clientName']),
    // 身份证脱敏
    certNo() {
      return this.userInfo.clientIdentifyInfo.certNo.replace(/(\d{4})\d*(\d{4})/,'$1**************$2')
      // return this.userInfo.clientIdentifyInfo.certNo.replace(/(\d{3})\d*(\d{4})/,'$1 **** **** **** $2')
    }
  },
  methods: {
    getInvestCertInfo() {
      this.$api.request.getInvestCertInfo().then(res => {
        if (res.code === '0') {
          const { 
            positionCode,
            positionName,
            country,
            areaName, 
            areaCode, 
            postAddress, 
            incomeSource, 
            incomeDesc,
            incomeSourceDesc,
            income, 
            email, 
            accountControllerIntro, 
            accountController, 
            accountBeneficiaryIntro, 
            accountBeneficiary, 
            badCreditRecord, 
            badCreditRecordIntro,
            badCreditRecordDesc,
            accountControllerDesc,
            accountBeneficiaryDesc,
            taxStatement,
            taxStatementDesc
          } = res.data;
          this.form = {
            positionCode: positionName,
            country: country ? country : '中国',
            areaName: areaName.split(',').join('/'), // 省市区
            areaCode, // 省市区编码
            postAddress, // 详细联系地址
            incomeSource: incomeSourceDesc, // 收入来源
            income: incomeDesc, // 年收入
            email, // 邮箱
            accountControllerIntro,
            accountController: accountControllerDesc ? accountControllerDesc : '否', //是否存在实际控制关系
            accountBeneficiaryIntro,
            accountBeneficiary: accountBeneficiaryDesc ? accountBeneficiaryDesc : '本人', // 交易的实际受益人
            badCreditRecord: badCreditRecordDesc ? badCreditRecordDesc : '否', // 是否有不良诚信记录
            badCreditRecordIntro,
            taxStatement: taxStatementDesc ? taxStatementDesc : '仅为中国税收居民'
          }
          this.parmJson = {
            positionCode,
            country: '中国',
            areaName: areaName.split(',').join('/'),
            areaCode,
            postAddress,
            incomeSource,
            income,
            email,
            accountControllerIntro,
            accountController: accountController ? accountController : '0',
            accountBeneficiaryIntro,
            accountBeneficiary: accountBeneficiary ? accountBeneficiary : '1',
            badCreditRecord: badCreditRecord ? badCreditRecord : '0',
            badCreditRecordIntro,
            taxStatement: taxStatement ? taxStatement : '1'
          }
          // 默认值
          this.areaCode = areaCode ?  areaCode.split(',').pop() : '' 
          
        } else {
          this.$u.toast(res.msg)
        }
      })
    },
    // 多选值控制器
    /**
     * key 数据， 弹框标题， labelkey, vlauekey数据list的key, value
     */
    multiplyClick(key, title, labelKey = null, valueKey = null) {
      // debugger
      this.closeKeyBoard()
      this.valueKey = valueKey;
      this.labelKey = labelKey
      this.multiplyKey = key;
      this.multiplyList = this[key];
      this.multiplyShow = true;
      this.multiplyTitle = title;
      // 默认选中值 用来回显
      this.multiplyDefaultSelected = this.parmJson[key] ? this.parmJson[key].split(',') : []
      // debugger
    },
    // 控制省市级联
    pickerClick() {
      this.closeKeyBoard()
      this.$refs.picker.show();
    },
    // 省市级联变动事件
    onchange(e) {
      this.form.areaName = e.detail.value
        .map((v) => {
          return v.text;
        })
        .join("/");
      this.parmJson.areaName = e.detail.value.map(v => v.text).join(',');
      this.form.areaCode = e.detail.value.map(v => v.value).join(',');
      this.parmJson.areaCode = this.form.areaCode;
    },
    // 职业点击
    positionCodeClick() {
      if (this.form.positionCode) {
        this.positionCodeDefaultValue = [
          this.positionCode.findIndex((v) => v.positionName === this.form.positionCode),
        ];
      }
      this.closeKeyBoard();
      this.positionCodeShow = true;
    },
    positionCodeConfirm(e) {
      this.form.positionCode = e[0].label;
      this.parmJson.positionCode = e[0].value;
    },
    // 年收入点击
    incomeClick() {
      // 用来做值的回显
      if (this.form.income) {
        this.incomeDefaultValue = [
          this.incomeList.findIndex((v) => v.dictValue === this.form.income),
        ];
      }
      this.closeKeyBoard();
      this.incomeShow = true;
    },
    // 年收入确认
    incomeConfirm(e) {
      this.form.income = e[0].label;
      this.parmJson.income = e[0].value;
    },
    // 税收居民身份点击事件
    taxStatementClick() {
      if (this.form.taxStatement) {
        this.taxStatementDefaultValue = [
          this.taxStatementList.findIndex((v) => v.label === this.form.taxStatement),
        ];
      }
      this.closeKeyBoard();
      this.taxStatementShow = true;
    },
    //税收居民身份确认事件
    taxStatementConfirm(e) {
      this.form.taxStatement = e[0].label;
      this.parmJson.taxStatement = e[0].value;
    },
    // 交易的实际受益人点击
    accountBeneficiaryClick() {
      if (this.form.accountBeneficiary) {
        this.accountBeneficiaryDefaultValue = [
          this.accountBeneficiaryList.findIndex((v) => v.label === this.form.accountBeneficiary),
        ];
      }
      this.closeKeyBoard();
      this.accountBeneficiaryShow = true;
    },
    // 交易实际受益人确认
    accountBeneficiaryConfirm(e) {
      this.form.accountBeneficiary = e[0].label;
      this.parmJson.accountBeneficiary = e[0].value;
    },
    // 不良诚信记录点击
    badCreditRecordClick() {
      if (this.form.badCreditRecord) {
        this.badCreditRecordDefaultValue = [
          this.booleanList.findIndex((v) => v.label === this.form.badCreditRecord),
        ];
      }
      this.closeKeyBoard();
      this.badCreditRecordShow = true;
    },
    // 不良诚信记录确认
    badCreditRecordConfirm(e) {
      this.form.badCreditRecord = e[0].label;
      this.parmJson.badCreditRecord = e[0].value;
    },
    // 是否存在实际控制关系点击
    accountControllerClick() {
      if (this.form.accountController) {
        this.accountControllerDefaultValue = [
          this.accountBeneficiaryList.findIndex((v) => v.label === this.form.accountController),
        ];
      }
      this.closeKeyBoard();
      this.accountControllerShow = true;
    },
    // 是否存在实际控制关系确认
    accountControllerConfirm(e) {
      this.form.accountController = e[0].label;
      this.parmJson.accountController = e[0].value;
    },
    submit() {
      const params = {
        ...this.parmJson,
        areaName: this.form.areaName.split('/').join(','),
        email: this.form.email,
        postAddress: this.form.postAddress,
        accountControllerIntro: this.form.accountControllerIntro,
        accountBeneficiaryIntro: this.form.accountBeneficiaryIntro,
        badCreditRecordIntro: this.form.badCreditRecordIntro

      }
      console.log(params)
      const p1 = new Promise((resolve, reject) => {
        this.$refs.uForm.validate(valid => {
          if (valid) resolve()
        })
      })
      const p2 = new Promise((resolve, reject) => {
        this.$refs.uForm1.validate(valid => {
          if (valid) resolve()
        })
      })
      Promise.all([p1, p2]).then(res => {
        this.isDisabled = true;
        this.$api.request.submitWechatClientInvestCertFirst(params).then(res => {
          if (res.code === '0') {
            this.$u.toast('投资者信息提交成功');
            setTimeout(()=>{
							this.$Router.push('/pages/my/qualifiedInvestors')
						}, 800)
          } else {
            this.$u.toast(res.msg)
          }
          this.isDisabled = false
        }).catch(err => {
          this.isDisabled = false
        })
      })
    },
    closeKeyBoard() {
      uni.hideKeyboard();
    },    
    multiplyConfirm(data, key, labelName, valueName) {
      // debugger
      this.parmJson[key] = data.map(el => el[valueName]).join(',')
      this.form[key] = data.map((el) => el[labelName]).join(",");
    },
    // 初始化省市字典
    initDict(funckey) {
      return this.$api.util.dictCacheInit(funckey)
    }
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
    this.$refs.uForm1.setRules(this.rules);
  },
};
</script>

<style lang="scss">
page {
  background: $page-bgColor-base;
}
</style>
<style lang="scss" scoped>
.f-investorCertification-wrap {
  padding-bottom: 120rpx;
}
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
