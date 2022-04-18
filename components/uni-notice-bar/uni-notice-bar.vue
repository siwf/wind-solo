<!--
 * @Description: 首页通知组件
 * @Autor: siwenfeng
 * @Date: 2021-10-14 09:36:57
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-24 16:54:18
-->
<template>
    <view class="f-home-notice">
        <u-notice-bar mode="horizontal" :list="list" border-radius="16" color="#99591F"></u-notice-bar>
    </view>
</template>

<script>

export default {
    props: {
        list: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            // list: [
            //     '您的身份证照片即将到期，请及时更换新身份！'
            // ]
        }
    }
}
</script>

<style scoped lang="scss">
.f-home-notice {
    height: 80rpx;
    // margin-top: 24rpx;
}
</style>
