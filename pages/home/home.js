// pages/home/home.js
var utils = require("../../utils/util.js")
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    CouponCount: null,
    lastpage: 0
  },

  GetData: function() {
    let that = this;
    var data = {};
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponHomeView/GetHomeCouponCount", "POST", data, app.globalData.appkeyid, that.GetDataBack)
  },
  GetDataBack: function(json) {
    let that = this;
    console.log(json);
    var data = json.data.Data;
    if (data) {
      console.log(data.msg);
      that.setData({
        CouponCount: data
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.GetData();
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