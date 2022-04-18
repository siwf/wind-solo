<!--
 * 风险测评
 * @Description: 
 * @Autor: siwenfeng
 * @Date: 2021-10-15 10:49:24
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-12-01 14:17:06
-->
<template>
  <view class="u-p-x-40 u-p-t-36">
    <view class="step">
      <text class="stepIndex">{{ problemIndex }}</text
      >/
      <text class="stepAll">{{ problemTotal }}</text>
    </view>
    <view class="" v-for="(item, index) in problemList" :key="index">
      <view v-if="index == problemIndex - 1">
        <view class="problem u-m-t-24 u-m-b-48">{{ item.problem }}</view>
        <view class="option" v-for="(e, i) in item.option" :key="i">
          <view
            class="u-m-b-24 u-p-x-40 u-p-y-32"
            :class="e.check == false ? 'optionContent' : 'optionCheck'"
            @click="checked(e, index, i)"
          >
            {{ e.optionContent }}
          </view>
        </view>
      </view>
    </view>
    <view class="u-flex-col" style="align-items: center;">
      <uni-common-button
        class="submit u-m-t-80"
        v-if="checkNum == problemTotal - 1"
        @click="submit"
        title="提交"
        :isDisabled="isDisabled"
      ></uni-common-button>
      <view class="pre u-m-t-48" v-if="checkNum > 0" @click="pre()">上一题</view>
    </view>
  </view>
</template>
<script>
// import { richOnlyTags } from '../../uview-ui/components/u-parse/libs/config'
export default {
  data() {
    return {
      isDisabled: true,
      problemList: [
        // 1
        {
          problem: '您的年龄介于？',
          option: [
            {
              optionContent: 'A. 18-30岁',
              check: false,
              value: '0',
            },
            {
              optionContent: 'B. 31-50岁',
              check: false,
              value: '1',
            },
            {
              optionContent: 'C. 51-65岁',
              check: false,
              value: '2',
            },
            {
              optionContent: 'D. 高于65岁',
              check: false,
              value: '3',
            },
          ],
        },
        // 2
        {
          problem: '你的学历？',
          option: [
            {
              optionContent: 'A. 高中及以下',
              check: false,
              value: '0',
            },
            {
              optionContent: 'B. 中专或大专',
              check: false,
              value: '1',
            },
            {
              optionContent: 'C. 本科',
              check: false,
              value: '2',
            },
            {
              optionContent: 'D. 硕士及以上',
              check: false,
              value: '3',
            },
          ],
        },
        // 3
        {
          problem: '您的职业为？',
          option: [
            {
              optionContent: 'A. 无固定职业',
              check: false,
              value: '0',
            },
            {
              optionContent: 'B. 专业技术人员',
              check: false,
              value: '1',
            },
            {
              optionContent: 'C. 一般企事业单位员工',
              check: false,
              value: '2',
            },
            {
              optionContent: 'D. 金融行业一般从业人员',
              check: false,
              value: '3',
            },
          ],
        },
        // 4
        {
          problem: '您目前的个人及家庭财务状况属于以下哪一种？',
          option: [
            {
              optionContent: 'A. 有较大数额未到期负债',
              check: false,
              value: '0',
            },
            {
              optionContent: 'B. 收入和支出相抵',
              check: false,
              value: '1',
            },
            {
              optionContent: 'C. 有一定积蓄',
              check: false,
              value: '2',
            },
            {
              optionContent: 'D. 有较为丰厚的积蓄并有一定的投资',
              check: false,
              value: '3',
            },
            {
              optionContent: 'E. 比较富裕且有相当的投资',
              check: false,
              value: '4',
            },
          ],
        },
        // 5
        {
          problem:
            '您个人目前已经或者准备投资的基金金额占您或者家庭所拥有总资产的比重是多少：（备注：总资产包括存款、证券投资、房地产及实业等）？',
          option: [
            {
              optionContent: 'A. 80-100%',
              check: false,
              value: '0',
            },
            {
              optionContent: 'B. 50-80%',
              check: false,
              value: '1',
            },
            {
              optionContent: 'C. 20-50%',
              check: false,
              value: '2',
            },
            {
              optionContent: 'D. 10-20%',
              check: false,
              value: '3',
            },
            {
              optionContent: 'E. 0-10%',
              check: false,
              value: '4',
            },
          ],
        },
        // 6
        {
          problem: '您的年收入是多少？',
          option: [
            {
              optionContent: 'A. 20万元以下',
              check: false,
              value: '0',
            },
            {
              optionContent: 'B. 20万元至50万元',
              check: false,
              value: '1',
            },
            {
              optionContent: 'C. 50万元至150万元',
              check: false,
              value: '2',
            },
            {
              optionContent: 'D. 150万元至500万元',
              check: false,
              value: '3',
            },
            {
              optionContent: 'E. 500万元以上',
              check: false,
              value: '4',
            },
          ],
        },
        // 7
        {
          problem: '您计划中的投资期限是多长？',
          option: [
            {
              optionContent: 'A. 少于1年',
              check: false,
              value: '0',
            },
            {
              optionContent: 'B. 1-2年',
              check: false,
              value: '1',
            },
            {
              optionContent: 'C. 2-3年',
              check: false,
              value: '2',
            },
            {
              optionContent: 'D. 3-5年',
              check: false,
              value: '3',
            },
            {
              optionContent: 'E. 5年以上',
              check: false,
              value: '4',
            },
          ],
        },
        // 8
        {
          problem:
            '您是否有过基金专户、券商理财计划、信托计划等产品的投资经历，如有投资时间是多长？',
          option: [
            {
              optionContent: 'A. 没有',
              check: false,
              value: '0',
            },
            {
              optionContent: 'B. 有，但是少于1年',
              check: false,
              value: '1',
            },
            {
              optionContent: 'C. 有，在1－3年之间',
              check: false,
              value: '2',
            },
            {
              optionContent: 'D. 有，在3－5年之间',
              check: false,
              value: '3',
            },
            {
              optionContent: 'E. 有，长于5年',
              check: false,
              value: '4',
            },
          ],
        },
        // 9
        {
          problem:
            '您投资基金专户、券商理财计划、信托计划等产品主要用于什么目的？',
          option: [
            {
              optionContent: 'A. 平时生活保障，赚点补贴家用',
              check: false,
              value: '0',
            },
            {
              optionContent: 'B. 养老',
              check: false,
              value: '',
            },
            {
              optionContent: 'C. 子女教育',
              check: false,
              value: '2',
            },
            {
              optionContent: 'D. 资产增值',
              check: false,
              value: '3',
            },
            {
              optionContent: 'E. 家庭富裕',
              check: false,
              value: '4',
            },
          ],
        },
        // 10
        {
          problem: '您希望获得的年收益率是多少？',
          option: [
            {
              optionContent: 'A. 相当于储蓄存款收益率',
              check: false,
              value: '0',
            },
            {
              optionContent: 'B. 相当于通货膨胀率',
              check: false,
              value: '1',
            },
            {
              optionContent: 'C. 高于通货膨胀率，只要保值并略有增值即可',
              check: false,
              value: '2',
            },
            {
              optionContent: 'D. 接近或相当于股票市场平均收益率',
              check: false,
              value: '3',
            },
            {
              optionContent: 'E. 大大超过股票市场平均收益率',
              check: false,
              value: '4',
            },
          ],
        },
        // 11
        {
          problem: '以下几种投资模式，您更偏好哪种模式？',
          option: [
            {
              optionContent: 'A. 收益只有5%，但不亏损',
              check: false,
              value: '0',
            },
            {
              optionContent: 'B. 收益15%，但可能亏损5%',
              check: false,
              value: '1',
            },
            {
              optionContent: 'C. 收益是30%，但可能亏损15%',
              check: false,
              value: '2',
            },
            {
              optionContent: 'D. 收益50%，但可能亏损30%',
              check: false,
              value: '3',
            },
            {
              optionContent: 'E. 收益100%，但可能亏损60%',
              check: false,
              value: '4',
            },
          ],
        },
        // 12
        {
          problem: '如果您的股票型基金投资暂时亏损了30％，你怎么办？',
          option: [
            {
              optionContent: 'A. 无法承受风险，准备赎回或卖掉',
              check: false,
              value: '0',
            },
            {
              optionContent:
                'B. 3 个月到6 个月内如果还是亏损30％，就准备赎回或卖掉',
              check: false,
              value: '1',
            },
            {
              optionContent: 'C. 1 年之内还是亏损30％，就准备赎回或卖掉',
              check: false,
              value: '2',
            },
            {
              optionContent: 'D. 2－3 年之内都可以持有，等待机会',
              check: false,
              value: '3',
            },
            {
              optionContent: 'E. 没关系，可以长期持有，等待机会',
              check: false,
              value: '4',
            },
          ],
        },
        // 13
        {
          problem: '您认为您在投资中是什么样的风险承担者？',
          option: [
            {
              optionContent: 'A. 无法承受风险',
              check: false,
              value: '0',
            },
            {
              optionContent: 'B. 虽然厌恶风险但愿意承担一些风险',
              check: false,
              value: '1',
            },
            {
              optionContent: 'C. 在深思熟虑后愿意承担一定的风险',
              check: false,
              value: '2',
            },
            {
              optionContent: 'D. 敢冒风险，比较激进',
              check: false,
              value: '3',
            },
            {
              optionContent: 'E. 爱好风险，相当激进',
              check: false,
              value: '4',
            },
          ],
        },
      ],
      problemIndex: 1,
      problemTotal: 0,
      checkNum: '',
      // timer: '',
      answerList: [],
      oldValOption: [],
      // checkTime: '',
      answerChange: null,
      // answerClick: null
    }
  },
  created() {
    this.answerChange = this.$api.util.debounce(this.dataIndex, 300);
    // this.answerClick = this.$api.util.debounce(this.checked, 1000, true)
  },
  watch: {
    problemList: {
      handler(val, oldVal) {
        if (this.problemIndex === this.problemTotal) {
          const a = oldVal[this.problemIndex - 1].option.filter(
            (e) => e.check === true
          )
          if (a) {
            this.isDisabled = false
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    onShow() {
      this.problemTotal = this.problemList.length
    },
    dataIndex() {
      if (this.problemIndex >= this.problemTotal) {
        this.problemIndex = this.problemIndex
      } else {
        this.checkNum = this.checkNum + 1
        this.problemIndex = Number(this.problemIndex) + 1
      }
    },
    checked(e, index, i) {
      this.checkNum = index
      this.problemList[index].option[i].check = true;
      this.problemList[index].option.map((v, _i) => {
        if (i !== _i) {
          v.check = false
        }
      })
      this.answerChange()
    },
    pre() {
      this.problemIndex = Number(this.problemIndex) - 1
      this.checkNum = this.checkNum - 1
    },
    submit() {
      this.answerList = []
      this.problemList.forEach((r, i) => {
        const option = r.option.filter((e) => e.check == true)
        this.answerList.push({
          index: i + 1 + '',
          value: option[0].value,
        })
      })
      this.$api.request
        .submitRiskInfo({ answerList: this.answerList })
        .then((res) => {
          if (res.code === '0') {
            this.$Router.push({
              path: '/pages/my/evaluationResults',
              query: {
                status: '1',
              },
            })
          } else {
            this.$u.toast(res.msg)
          }
        })
    },
  },
}
</script>
<style lang="scss" scoped>

  .step {
    color: $font-color-msg;
    font-size: $font-lg;
    .stepIndex {
      font-size: $font-xxxl;
      color: $font-color-base;
    }
  }
  .problem {
    font-size: $font-ml;
    color: $font-color-base;
    line-height: 2;
    font-weight: bold;
  }
  .optionContent {
    border-radius: 8rpx;
    background: $page-bgColor-white;
  }
  .optionCheck {
    background: $font-color-warning;
    color: $font-color-light;
    border-radius: 8rpx;
  }
  .u-btn--defaulte {
    background: $btn-bgColor-base;
    color: $font-color-light;
    border: none;
  }
  .submit {
    text-align: center;
    background: $btn-bgColor-base !important;
    color: $font-color-light;
    border: none;
    border-radius: 50rpx;
    width: 100%;
  }
  .pre {
    width: 140rpx;
    text-align: center;
    color: $font-color-normal;
  }

</style>
