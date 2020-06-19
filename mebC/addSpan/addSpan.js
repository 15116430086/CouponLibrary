// pages/addSpan/addSpan.js
var utils = require("../../utils/util.js")
const app = getApp();
Page({
    data: {
        show: false,
        LabelName:''
    },


  //会员等级名称
  LabelNameInput: function (e) {
    this.setData({
      LabelName: e.detail.value
    })
  },

  //添加等级
  Determinetap: function () {
    let that = this;
    if (that.data.LabelName == "") {
      wx.showToast({
        title: '会员标签名称不能为空！',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    var data = {}
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    data.pLabelName = that.data.LabelName;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponUserMemberView/AddCouponLabelInfo", "POST", data, app.globalData.appkeyid, that.DeterminetapBack)
  },

  DeterminetapBack: function (json) {
    let that = this;
    var json = json.data.Data;
    if (json.flag) {
      wx.navigateBack({
        url: '/mebC/spanList/spanList',
      })      
    }
    wx.showToast({
      title: json.msg,
      icon: 'none',
      duration: 2000
    })
  },






    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    addNews(e) {
        this.setData({
            show: true
        })
    },

    onClose() {
        this.setData({
            show: false
        })
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