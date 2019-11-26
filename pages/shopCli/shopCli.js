// pages/shopCli/shopCli.js
var utils = require("../../utils/util.js")
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        itemsList: [],
      todaySumMoney:0,
      todayOrderNUM:0,
      totalOrderNUM:0,
      totalSumMoney:0,
      toBeShippedNUM:0
    },

  GetData: function () {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponProductView/GetWriteOffOrderCount", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function (json) {
    let that = this;
    var json = json.data.Data;
    wx.hideLoading();
    if (json.flag) {
      that.setData({
        totalOrderNUM: json.totalOrderNUM,                        //totalOrderNUM 总订单量
        totalSumMoney: utils.syFormatMoney(json.totalSumMoney),   //totalSumMoney 总金额
        todayOrderNUM:json.todayOrderNUM,                         //todayOrderNUM 今日订单量
        todaySumMoney: utils.syFormatMoney(json.todaySumMoney),   //todaySumMoney 今日成交金额
        toBeShippedNUM:json.toBeShippedNUM,                       //toBeShippedNUM 待处理订单数量
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