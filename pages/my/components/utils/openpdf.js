
function previepdf(url) {
  uni.showLoading({
    title: '加载中'
  });
  uni.downloadFile({
    url: url,

    success(res) {
      let path = res.tempFilePath;
      uni.openDocument({
        filePath: path,
        fileType: "pdf",

        success() {
          uni.hideLoading(); 
        },

        fail() {
          uni.hideLoading();
        }

      });
    }

  });
}

module.exports = {
  previepdf
};