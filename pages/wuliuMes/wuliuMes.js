//pages/wuliuMes/wuliuMes.js
var utils = require("../../utils/util.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    expressList:[],
    EC_ID: "",//快递公司编码
    CourierNumber: "",//快递单号
  },

  GetData: function () {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.EC_ID = that.data.EC_ID;
    data.LogisticsNumber = that.data.CourierNumber;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/Logisticsinformation", "POST", data, app.globalData.appkeyid, that.GetDataBack)
  },
  GetDataBack: function (json) {
    let that = this;
    var json = json.data.Data;
    var ht = JSON.parse(json.html);
    wx.hideLoading();
    if (ht.Traces.length > 0) {
      that.setData({
        expressList: ht.Traces.reverse(),
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      EC_ID: options.EC_ID,
      CourierNumber: options.LogisticsNumber,
    })
    that.GetData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})