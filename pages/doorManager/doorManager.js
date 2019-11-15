// pages/doorManager/doorManager.js
var utils = require("../../utils/util.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     shopid:"",
     datalist:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shopid: options.ShopID
    });
    var datas = {
      pGroupID: app.globalData.AppGroupInfo.GroupID,
      shopID: options.ShopID
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/GetGroupShop", "POST", datas, app.globalData.appkeyid, this.CouponShopView);
  },
  CouponShopView:function(res){
    var chat=this;
    var json = res.data.Data;
    if(json.flag){
      chat.setData({
        datalist:json.data
      });
    }
  },
  Jump:function(event){
    wx.navigateTo({
      url: '../staffManagements/staffManagements?ShopID=' + this.data.shopid,
    })
  }
})