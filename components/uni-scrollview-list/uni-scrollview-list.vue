<!--
 * @Description: 滚动加载list组件
 * @Autor: siwenfeng
 * @Date: 2021-10-26 09:35:09
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-19 10:11:28
-->
<template>
    <scroll-view
      scroll-y="true"
      enable-back-to-top
      @scrolltolower="loadMore"
      class="scroll-box"
    >
      <slot> </slot>
      <!-- 空白 -->
      <uni-empty-data
        v-if="isEmpty"
        tipText="暂无数据"
      ></uni-empty-data>
      <!-- 加载更多 -->
      <u-loadmore
        v-if="!isEmpty"
        height="80rpx"
        :status="loadStatus"
        icon-type="flower"
        color="#ccc"
        :load-text="loadText"
      />
    </scroll-view>
</template>

<script>
export default {
    props: {
        // 返回一个promise对象
        getList: {
            type: Function,
            default: () => {}
        }
    },
    created() {
        uni.$on("uOnReachBottom", this.refresh.bind(this));
        this.getList()
    },
    data() {
        return {
            list: [],
            isEmpty: true,
            loadStatus: "loadmore", //loadmore-加载前的状态，loading-加载中的状态，nomore-没有更多的状态
            currentPage: 1,
            lastPage: 1,
            loadText: {
                loadmore: '轻轻上拉',
                loading: '加载中',
                nomore: '已经到底了~'
            }
        }
    },
    methods: {
        refresh() {
            if (this.currentPage < this.lastPage) {
                this.currentPage += 1;
                this.getList();
            }
        }
    }
}
</script>
<style scoped lang="scss">
.scroll-box {
    // background-color: $page-bgColor-base;
    margin-top: 24rpx;
}
</style>
