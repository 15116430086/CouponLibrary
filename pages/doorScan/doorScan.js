// pages/doorScan/doorScan.js
var utils = require("../../utils/util.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var datas={
      shopID: options.shopid,
      pAppId:"wx8beb26cb65805e7a",
      pSecret:"c64a2a407262e0f6f289c2fc186071b0"
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/AccessToken", "POST", datas, app.globalData.appkeyid, this.CouponShopView);
  },
  CouponShopView:function(res){
   var json=res.data.Data;
    console.log(json);
  },
  addStaff:function(event){
    wx.navigateTo({
      url: '../staffLoginReg/staffLoginReg',
    })
  },
})