<!--
 * @Description: 
 * @Autor: siwenfeng
 * @Date: 2021-10-20 15:14:55
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-09 11:29:17
-->
<template>
  <view class="">
    <u-row
      gutter="10"
      v-for="(item, index) in courselist"
      :key="index"
      @click="tapCourse(index, item)"
      class="item acea-row row-between-wrapper u-p-y-34"
    >
      <u-col span="10">
        <view class="address u-padding-left-30">
          <image
            lazy-load
            :src="item.bankLogoUrl"
            style="width: 59rpx; height: 58rpx"
          ></image>

          <view class="name" :class="active == index ? 'font-color' : ''">{{
            item.bankName
          }}</view>
        </view>
      </u-col>
      <u-col span="2" text-align="center">
        <text class="fortune icon-fortunea-duihao1" v-if="item.checked"></text>
      </u-col>
    </u-row>
  </view>
</template>
<script>
export default {
  data() {
    return {
      courselist: [],
      course: [],
      lastClickIndex: ''
    }
  },
  onLoad(e) {
    const bankName = e.bankName || ''
    this.initCardList(bankName)
  },
  methods: {
    initCardList(bankName) {
     const bankList = this.$api.util.getStorage('bankList')
     if (bankList) {
       this.courselist = bankList.items;
        bankName && this.courselist.map(v => {
        if (v.bankName === bankName) {
          v.checked = true
        }
      })
     }
    },
    tapCourse(index, item) {
      if (this.lastClickIndex !== '') {
        this.courselist[this.lastClickIndex]['checked'] = false;
      } 
      this.courselist[index]['checked'] = true
      this.course = [item]
      this.lastClickIndex = index;
      this.$api.prePageDelta()
    },
    onUnload() {
      const prePage = this.$api.prePage()
      if (this.course[0] !== undefined) {
        const data = this.course[0]
        prePage.req.bankName = data.bankName;
        prePage.req.bankCode = data.bankCode;
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.item {
  display: block;
  width: 95%;
  border-bottom: 1px solid $border-color-dark;
  margin: 0 auto;
  .address {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    .name {
      margin-left: 18rpx;
    }
  }
}
</style>
