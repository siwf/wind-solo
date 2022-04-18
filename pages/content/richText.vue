<!--
 * @Description: 富文本组件
 * @Autor: siwenfeng
 * @Date: 2021-10-12 16:29:22
 * @LastEditors: siwenfeng
 * @LastEditTime: 2022-04-18 13:47:37
-->
<template>
	<view class="content">
		<rich-text :nodes="richText"></rich-text>
	</view>
</template>

<script>
	// import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import htmlParser from '@/config/html-parser'
	// import {
	// 	mapState,mapMutations
	// } from 'vuex';
	export default {
		components: {
			// uniLoadMore	
		},
		data() {
			return {
				richText:'',
				strings: '<p>点击订单进入订单列表, 在想要退款的订单下点击退款</p>'
			};
		},
		
		onLoad(options){
			console.log(options.content)
			var content = options.content;
			content = content.replace(/<!DOCTYPE html>/g,"").replace(/<html>/g,"").replace(/<\/html>/g,"").replace(/<head>/g,"").replace(/<\/head>/g,"").replace(/<body>/g,"").replace(/<\/body>/g,"")
			// var htmlString = content.replace(/\\/g, "").replace(/<img/g, "<img style=\"display:none;\"");
			this.richText = htmlParser(content);
			
		},
		computed: {
			// ...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			// ...mapMutations(['login']),
			
		},
	}
</script>

<style lang="scss" scoped>
	page, .content{
		background: $page-bgColor-white;
		padding: 20upx;
	}
</style>
