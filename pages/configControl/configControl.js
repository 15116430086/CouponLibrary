// pages/configControl/configControl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    checked1: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  onChange(e) {
    //console.log(e);
    let that = this;
    let detail = e.detail;
    let index = e.currentTarget.dataset.index;
    if (index == 0) {
      that.setData({
        checked: detail
      })
      if (detail) {
        wx.requestSubscribeMessage({
          tmplIds: ['i2IVNqj5k05F-mBNOEtM7HMwdSoEJBhHKKC49r1zpkc'],
          success: function(e) {

          }
        })
      }
    } else {
      // 需要手动对 checked 状态进行更新
      that.setData({
        checked1: detail
      });
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})