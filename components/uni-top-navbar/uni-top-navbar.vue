<!--
 * @Description: 首页自定义导航组件
 * @Autor: siwenfeng
 * @Date: 2021-10-13 17:07:20
 * @LastEditors: siwenfeng
 * @LastEditTime: 2022-04-18 11:37:33
-->
<template>
  <view>
    <u-navbar
      :is-back="false"
      :border-bottom="false"
      :background="{
        background: '#3C276F',
      }"
    >
      <slot/>
    </u-navbar>
  </view>
</template>

<script>
export default {};
</script>

<style>
</style>