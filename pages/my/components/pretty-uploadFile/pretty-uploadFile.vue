<template>
	<view>
		<!-- 上传文件 begin -->
		<view class="display_flex">
			<view class="img_list" v-for="(item,index) in fileList" :key="index">
				<image class="img_item" :src="item.preUrl" @click="preview(item.preUrl)" mode="aspectFill" v-if="item.book == 'img'"></image>
				<view class="upload" @click="prePdf(item.preUrl)" v-else>
					<text class="fortune icon-fortunePdf" style="color:#FF6969;font-size:44px"></text>
				</view>
				<view class="fortune deleteicon icon-fortuneshanchu1" @click.stop="delteFile(index)"></view>
			</view>
			<view class="upload img_list" v-if="fileList.length < limitnumber" @click="showProtocal = true">
				<view class="fortune icon-fortuneplus" style="font-size:20px;"></view>
				<!-- 上传图片或文件 -->
			</view>
			<!-- <view class="upload img_list" @click="upload('file')">
				<view class="iconfont iconshangchuanwenjian fileicon"></view>
				上传文件
			</view> -->
			    <u-popup
				v-model="showProtocal"
				custom-style
				safe-area-inset-bottom
				mode="bottom"
				:bgStyle="{
					background: 'none',
				}"
				>
				<view class="f-agreement-wrap u-flex-col">
					<view class="f-agreement-list u-m-b-16">
					<view class="f-list-item f-list-border" @click="upload('img')"> 图片</view>
					<view class="f-list-item" @click="upload('file')"> pdf </view>
					</view>
					<view class="f-agreement-list u-m-b-16">
					<view class="f-list-item" @tap="showProtocal = false"> 取消 </view>
					</view>
				</view>
				</u-popup>
		</view>
		<!-- 上传文件 end -->
	</view>
</template>

<script>
	import {
		uploadImage,
		uploadPdf
	} from '../utils/uploadimage.js'
	import {
		previepdf
	} from '../utils/openpdf.js'
	export default {
		name: 'upload',
		model: {
			prop: "showPop",
			event: "change"
		},
		props: {
			limitnumber: {
				type: Number,
				default: 20
			}
		},
		data() {
			return {
				fileList: [],
				showProtocal: false
			}
		},
		methods: {
			/**
			 * @description 上传文件
			 */
			upload(book) {
				if (this.fileList.length == this.$props.limitnumber) {
					uni.showToast({
						title: '文件上传已上限',
						icon: 'none'
					})
					return
				}
				this.showProtocal = false
				if (book == 'img') {
					uploadImage().then(res => {
						this.fileList.push({
							url: res.url,
							preUrl: res.preUrl,
							// id: res.uploadId,
							book: 'img'
						})
						this.$emit('upload',this.fileList)
					})
				} else {
					uploadPdf().then(res => {
						console.log(res)
						this.fileList.push({
							url: res.url,
							preUrl: res.preUrl,
							book: 'file'
						})
						console.log(this.fileList)
					})
					this.$emit('upload',this.fileList)
				}
			},

			/**
			 * @description 预览图片
			 */
			preview(url) {
				uni.previewImage({
					urls: [url],
					current: url
				})
			},
			/**
			 * @description 预览pdf
			 */
			
			prePdf(e) {
	
				previepdf(e)
			},
			/**
			 * @description 删除上传的文件
			 */
			delteFile(index) {
				this.fileList.splice(index, 1)
				this.$emit('deletefile',this.fileList)
			},
		}
	}
</script>

<style>
	/* @import "./pretty-uploadFile.css"; */

	.display_flex {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
	}

	.fileicon {
		font-size: 32rpx;
	}

	/* 上传图片 */
	.img_list {
		width: 130rpx;
		height: 130rpx;
		/* border-radius: 5px; */
		margin: 32rpx 18rpx;
		/* margin-right: 18rpx; */
		position: relative;
	}

	.img>image {
		width: 130rpx;
		height:130rpx;
		/* border-radius: 5px; */
	}

	.img_item {
		width: 130rpx;
		height: 130rpx;
		/* border-radius: 5px; */
	}

	.upload {
		height: 130rpx;
		width: 130rpx;
		/* background-color: #f7f7f7; */
		border: 1px dashed rgb(224, 223, 223);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		color: #aaa;
		word-break: break-all;
		overflow: hidden;
	}

	.deleteicon {
		position: absolute;
		font-size: 26rpx;
		color: #F93313;
		top: -4px;
		right: -3px;
		background-color: #fff;
		border-radius: 50%;
	}
	
</style>

<style scoped lang="scss">
.f-agreement-wrap {
  padding: 0 18rpx 16rpx;
}
.f-agreement-list {
  background: $font-color-light;
  border-radius: 28rpx;
  .f-list-item {
    height: 112rpx;
    text-align: center;
    line-height: 112rpx;
    color: $font-color-spec;
    font-size: $font-xxl;
  }
  .f-list-border {
    border-bottom: 1px solid $border-color-dark;
  }
}
</style>
