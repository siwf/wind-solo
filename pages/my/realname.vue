<!--
 * @Description: 实名认证页面
 * @Autor: siwenfeng
 * @Date: 2021-10-14 14:40:16
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-30 15:16:30
-->
<template>
  <view class="f-public-smscode u-p-t-76 u-p-x-64">
    <view class="f-smscode-title">
      <view class="u-m-b-32 f-title-value">请上传您的二代身份证照片</view>
      <view class="f-smscode-phone">开通基金交易账户前需完成实名认证</view>
    </view>
    <view class="u-p-l-52 u-p-r-50 u-m-b-80 u-flex-col">
      <view class="u-m-b-48 f-image-wrap">
        <image
          :src="idCard1"
          @tap="selectImg('idCard1')"
          style="height: 300rpx; width: 520rpx"
        />
        <view
          v-if="notIdCard1"
          @tap.stop="uploadImage('idCard1')"
          class="f-image-retry"
          >重新上传</view
        >
      </view>
      <view class="f-image-wrap">
        <image
          slot="addBtn"
          :src="idCard2"
          @tap="selectImg('idCard2')"
          style="height: 300rpx; width: 520rpx"
        />
        <view
          v-if="notIdCard2"
          @tap.stop="uploadImage('idCard2')"
          class="f-image-retry"
          >重新上传</view
        >
      </view>
    </view>
    <view class="f-card-example u-p-t-32 u-flex">
      <view class="f-example-list u-flex-col u-flex-1">
        <image
          v-if="$IMG_URL"
          :src="$IMG_URL + 'normal.png'"
          style="width: 140rpx; height: 88rpx"
          class="u-m-b-8"
        />
        <view class="f-list-bottom">
          <text class="fortune u-m-r-8 icon-fortuneduihao"></text>
          <text>标准拍摄</text>
        </view>
      </view>
      <view class="f-example-list u-flex-col u-flex-1">
        <image
          v-if="$IMG_URL"
          :src="$IMG_URL + 'bkqs.png'"
          style="width: 140rpx; height: 88rpx"
          class="u-m-b-8"
        />
        <view class="f-list-bottom">
          <text class="fortune u-m-r-8 icon-fortuneshanchu"></text>
          <text>边框缺失</text>
        </view>
      </view>
      <view class="f-example-list u-flex-col u-flex-1">
        <image
          v-if="$IMG_URL"
          :src="$IMG_URL + 'zpmh.png'"
          style="width: 140rpx; height: 88rpx"
          class="u-m-b-8"
        />
        <view class="f-list-bottom">
          <text class="fortune u-m-r-8 icon-fortuneshanchu"></text>
          <text>照片模糊</text>
        </view>
      </view>
      <view class="f-example-list u-flex-col u-flex-1">
        <image
          v-if="$IMG_URL"
          :src="$IMG_URL + 'sgql.png'"
          style="width: 140rpx; height: 88rpx"
          class="u-m-b-8"
        />
        <view class="f-list-bottom">
          <text class="fortune u-m-r-8 icon-fortuneshanchu"></text>
          <text>闪光强烈</text>
        </view>
      </view>
    </view>
    <!-- 授权 -->
    <view v-if="showModal" class="f-statement-confirm">
      <realname-statement :showModal="showModal"></realname-statement>
      <view class="f-confirm-btn u-flex">
        <view class="f-btn-value" @click="confirm">确认授权</view>
      </view>
    </view>
    <x-compress ref="xCompress"></x-compress>
     <uni-modal-tip
      :showModal="ageModal"
      width="70%"
      :tipText="ageTipText"
      @confirm="ageConfirm"
    >
    </uni-modal-tip>
    <uni-common-button
      @click="next"
      title="下一步"
      :fixed="true"
      :canClick="isDisabled"
      :isDisabled="isDisabled"
    ></uni-common-button>
  </view>
</template>
<script>
import xCompress from "./components/x-compress.vue";
import Auth from '@/permission/index.js';
import { API_URL } from "@/env";
import RealnameStatement from './components/realname-statement.vue';
export default {
  components: {
    xCompress,
    RealnameStatement
  },
  data() {
    return {
      idCard1: this.$IMG_URL + "card-z.png",
      idCard2: this.$IMG_URL + "card-f.png",
      // 图片最大size 10MB
      maxSize: 10485760,
      // 弹框控制
      showModal: true,
      // 是否点击了确认授权
      hasConfirm: false,
      // 当前操作的身份证图片
      currentCard: "",
      // 是否在上传中
      isUploading: false,
      idCardObj: {
        idCard1: '',
        idCard2: ''
      },
      ageModal: false,
      ageTipText: "",
    };
  },
  computed: {
    notIdCard1() {
      return this.idCard1 !== this.$IMG_URL + "card-z.png";
    },
    notIdCard2() {
      return this.idCard2 !== this.$IMG_URL + "card-f.png";
    },
    isDisabled: {
      set() {},
      get() {
        // 判断是否上传正反面， 并且没有在上传中
        return !(this.notIdCard1 && this.notIdCard2 && !this.isUploading);
      },
    },
  },
  methods: {
    ageConfirm() {
      this.ageModal = false;
      this.$api.repalceAllUser()
    },
    next() {
      uni.showLoading({
        title: "上传中",
      });
      // 正在上传中 上传按钮禁用
      this.isUploading = true;
      this.$api.request
        .recognition({
          frontFileUrl: this.idCardObj.idCard1,
          backFileUrl: this.idCardObj.idCard2,
        })
        .then((res) => {
          if (res.code === "0") {
            this.$Router.replace({
              path: "/pages/my/cardinfocheck",
              query: res.data,
            });
          } else {
            // this.$u.toast(res.msg);
            // 次数用尽 跳转到我的页面
            if (res.code === '600100') {
              this.ageModal = true;
              this.ageTipText = res.msg;
              // setTimeout(() => {
              //   this.$api.repalceAllUser()
              // }, 3500);
            } else {
              this.$u.toast(res.msg);
            }
          }
          this.isUploading = false;
        })
        .catch((errr) => {
          this.isUploading = false;
        });
    },
    selectImg(idCard) {
      this.currentCard = idCard;
      if (!this.hasConfirm) {
        this.showModal = true;
        // this.$Router.push('/pages/')
        return;
      }
      // 判断是第一次上传还是重传
      if (
        (this.notIdCard1 && idCard === "idCard1") ||
        (this.notIdCard2 && idCard === "idCard2")
      ) {
        this.$api.util.previewImage(this[idCard]);
      } else {
        this.uploadImage(idCard);
      }
    },
    // 提示用户消息
    showToast(message) {
      uni.showToast({
        title: message,
        icon: "none",
      });
    },
    confirm() {
      this.showModal = false;
      this.hasConfirm = true;
      // this.selectImg(this.currentCard);
    },
    // 图片上传
    async uploadImage(idCard) {
      let authState = 0;
			authState += await new Auth('writePhotosAlbum').check();
			if (authState < 1) return;
			authState += await new Auth('camera').check();
			if (authState < 2) return;
      uni.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          // debugger
          const size = res.tempFiles[0].size;
          if (size > this.maxSize) {
            this.$u.toast("图片大小不能超过10MB");
            return;
          }
          uni.getImageInfo({
            src: res.tempFilePaths[0],
            success: (_res) => {
              const { width, height } = _res;
              const piex = width * height;
              const piexMax = 8000 * 8000;
              const piexMin = 200 * 200;
              if (piex < piexMin) {
                this.$u.toast("支持的图片最小是200x200像素");
                return;
              }
              if (piexMax < piexMin) {
                this.$u.toast("支持的图片最大是8000x8000像素");
                return;
              }
              this.compressImage(res)
                .then((v) => {
                  uni.hideLoading();
                  // uni.showToast({
                  //   title: "压缩成功",
                  //   icon: "success",
                  // });
                  this.uploadOss(v, idCard);
                })
                .catch((err) => {
                  uni.hideLoading();
                  // uni.showToast({
                  //   title: "压缩失败",
                  //   icon: "none",
                  // });
                });
            },
          });
        },
      });
    },
    // 图片压缩
    compressImage(res) {
      return this.$refs.xCompress.compress({
        src: res.tempFilePaths[0],
        maxSize: 800,
        quality: 0.6,
        minSize: 640,
      });
    },
    // 上传至oss
    uploadOss(filePath, idCard) {
      uni.uploadFile({
        url: API_URL + "file/uploadIdCard",
        filePath: filePath,
        name: "file",
        header: {
          "Content-Type": "multipart/form-data;",
          Accept: "application/json",
          "Hfax-Auth-Token": uni.getStorageSync("userToken"),
        },
        success: (uploadFileRes) => {
          if (![200, 201, 204].includes(uploadFileRes.statusCode)) {
            this.showToast("上传失败，请重试");
          } else {
            // 上传成功
            const imageUrl = JSON.parse(uploadFileRes.data).data.url;
            this[idCard] = filePath;
            this.idCardObj[idCard] = imageUrl
          }
        },
        complete: () => {
          uni.hideLoading();
          this.isUploading = false;
        },
        fail: (err) => {
          this.showToast("上传失败，请重试");
        },
      });
    },
  },
  onUnload(e) {
    // 注册时候进入实名认证，从我的页面进入实名认证
    // 这个页面返回到我的页面
    // this.$api.repalceAllUser()
  }
};
</script>

<style scoped lang="scss">
.f-public-smscode {
  .f-smscode-title {
    .f-title-value {
      height: 64rpx;
      font-size: $font-xxg;
      font-weight: 500;
      color: $font-color-base;
      line-height: 64rpx;
    }
    margin-bottom: 96rpx;
    .f-smscode-phone {
      // height: 44rpx;
      font-size: $font-md;
      color: $font-color-msg;
      line-height: 44rpx;
    }
  }
  .f-image-wrap {
    position: relative;
  }
  .f-image-retry {
    position: absolute;
    width: 144rpx;
    height: 48rpx;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 26rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $font-sm;
    // text-align: center;
    // line-height: 48rpx;
    color: $font-color-light;
    left: 50%;
    transform: translateX(-50%);
    bottom: 64rpx;
  }
  .f-card-example {
    border-top: 1rpx solid rgba(240, 240, 240, 1);
    height: 168rpx;
    margin-bottom: 278rpx;
  }
  .f-list-bottom {
    height: 40rpx;
    font-size: $font-sm;
    color: $font-color-msg;
    line-height: 40rpx;
  }
}
.f-financial-planner {
  .f-modal-header {
    border-bottom: 1px solid $border-color-base;
    padding: 32rpx 32rpx 30rpx 32rpx;
    .f-modal-title {
      height: 56rpx;
      line-height: 56rpx;
      font-size: $font-xxl;
      text-align: center;
      font-weight: 500;
    }
  }
  .f-modal-footer {
    .f-footer-view {
      flex: 1;
      height: 96rpx;
      line-height: 96rpx;
      text-align: center;
      color: $font-color-spec;
      font-size: $font-xl;
      position: relative;
    }
  }
}
// 实名认证授权
.f-statement-confirm {
  position: relative;
  // width: 100%;
  // height: 100vh;
}
.f-confirm-btn {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  height: 164rpx;
  justify-content: center;
  z-index: 11111;
  background: $page-bgColor-white;
  box-shadow: 0px 1px 0px 0px rgba(240, 240, 240, 1);
  padding-top: 10rpx;
  padding-bottom: calc(10rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
  .f-btn-value {
    width: 622rpx;
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    background: linear-gradient(270deg, #eebf85 0%, #e08f45 100%);
    box-shadow: 0px 6rpx 12rpx 0px rgba(225, 174, 127, 0.5);
    border-radius: 50rpx;
    font-weight: 500;
    color: $font-color-light;
    font-size: $font-lg;
  }
}
</style>