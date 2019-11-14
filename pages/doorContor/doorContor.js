// pages/doorContor/doorContor.js
var utils = require("../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoplist: {},
    repeat: true,
    Popup: true,
    Repeat: true,
    shopname:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var datas = {
      pGroupID: app.globalData.AppGroupInfo.GroupID
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/GetGroupShop", "POST", datas, app.globalData.appkeyid, this.CouponShopView);
  },
  CouponShopView: function(res) {
    var chat = this;
    var json = res.data.Data;
    if (json.flag) {
      chat.setData({
        shoplist: json.data
      });
    }
  },
  add: function() {
    this.setData({
      Popup: false
    });
  },
  blurs: function(event) {
      this.setData({
        shopname: event.detail.value
      });
  },
  coles: function () { 
    this.setData({
      Popup: true
    });

  },
  nocoles: function () {
    this.setData({
      Popup: false
    });

  },
  shopAdd:function(event){
    if (this.data.shopname==""){

      wx.showToast({
        title: "店铺名称不能为空",
        icon: "none"
      });
      return;
    }
    if (this.data.Repeat) {
      this.setData({ repeat: false });
      wx.showLoading({
        title: "数据提交中...",
        mask: true
      });
     
      var datas = {
        pGroupID: app.globalData.AppGroupInfo.GroupID,
        ShopName: this.data.shopname
      };
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/Addshop", "POST", datas, app.globalData.appkeyid, this.Addshop);
    } else {
      wx.showToast({
        title: "请勿重复点击",
        icon: "none"
      });
    }
  },
  
  Addshop:function(res){
    wx.hideLoading();
    var chat=this;
    chat.setData({ repeat: true });
    var json=res.data.Data;
    if(json.flag){
      wx.showToast({
        title: json.msg,
        icon: "none"
      });
      chat.setData({
        Popup: true
      });
      var datas = {
        pGroupID: app.globalData.AppGroupInfo.GroupID
      }
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/GetGroupShop", "POST", datas, app.globalData.appkeyid, chat.CouponShopView);
    }else{
      wx.showToast({
        title: json.msg,
        icon: "none"
      });
    }
  }
})