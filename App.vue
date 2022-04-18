<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-ui/index.scss";
</style>
<script>
import wechat from "@/wechat/wechat";
export default {
  onLaunch: function (options) {
    console.log("onlaunch");
    // #ifdef MP-WEIXIN
    // 检测小程序更新(如果从朋友圈场景进入则无此API)
    options.scene !== 1154 && wechat.checkMiniProgramUpdate();
    // #endif
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang='scss'>
@import "./static/css/style.css";
</style>
<style lang='scss'>
@import "./static/css/iconfont.css";
</style>
<style lang='scss'>

// .container {
//   // height: 100%;
//   // background-color: $page-bgColor-base;
//   color: $font-color-base;
//   font-size: $font-ml;
//   overflow-y: auto;
// }
.f-container-white {
  height: 100vh;
  background: $page-bgColor-white;
}
</style>