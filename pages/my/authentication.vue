<template>
  <view class="f-container-white">
    <uni-status-tooltip
      :image="strive.image"
      :tooltipTitle="strive.tooltipTitle"
      :tiptextTop="strive.tiptextTop"
      :tiptextBottom="strive.tiptextBottom"
      ref="tooltip"
      @click="btn"
    />
  </view>
</template>

<script>
/**
 * 通过路由传参，所有的认证结果全部共用一个页面
 */
// import tooltip from '@/components/uni-status-tooltip/uni-status-tooltip.vue'
export default {
  name: '',
  // components: {
  //   tooltip,
  // },
  data() {
    return {
      strive: {
        image: '',
        tooltipTitle: '',
        tiptextTop: '',
        tiptextBottom: '',
        btnText: '',
        btnUrl: '',
        code: '', // 是否成功用来标识是否刷新银行卡列表页面
      },
      navbarType: 0, // 默认是手势返回
    }
  },
  onLoad(e) {
    this.strive = e
  },
  methods: {
    btn() {
      this.navbarType = 1;
      // 从银行卡认证跳转进来
      if (this.strive.btnUrl === 'myCard') {
        // 刷新银行卡列表
        this.$api.prePage(2).cardlist() 
        this.$api.prePageDelta()
      } else {
        // 从实名认证信息确认页面跳转进来
        this.$api.repalceAllUser()
      }
    },
  },
  onUnload() {
    if (this.navbarType === 0) {
      if (this.strive.btnUrl !== 'myCard') {
        this.$api.repalceAllUser()
      } else {
        this.$api.prePage(2).cardlist()
      }
    }
  }
}
</script>
