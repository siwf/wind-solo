/*
 * @Description: 微信分享
 * @Autor: siwenfeng
 * @Date: 2021-11-09 13:43:49
 * @LastEditors: siwenfeng
 * @LastEditTime: 2021-11-23 15:04:10
 */

export  default  {
    data () {
        return {
            shareData: {
                title: '惠融资产',
                path: '/pages/index/index',
                imageUrl: '',
                content: '',
                desc: ''
            }
        }
    },

    //#ifdef MP-WEIXIN
    onShareAppMessage (e) {
        console.log(e)
        return {
            title: this.shareData.title,
            path: this.shareData.path,
            imageUrl: this.shareData.imageUrl,
            content: this.shareData.content,
            desc: this.shareData.desc,
            success: res => {
                this.$u.toast('分享成功')
            },
            fail: res => {
                this.$u.toast('分享失败')
            }
        }
    },
    //#endif

    onShareTimeline() {}
}
