// pages/doorManager/doorManager.js
var utils = require("../../utils/util.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     shopid:"",
     datalist:{},
    Popup:true,
    shopname:""
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
  },
  updateshop:function(event){
    this.setData({ Popup:false});

  },
  coles:function(event){
    this.setData({ Popup: true });
  },
  nocoles:function(event){
    this.setData({ Popup: false });
  },
  blurs:function(event){
    this.setData({
      shopname: event.detail.value
    });
  },
  shopUpdate:function(event){
    if (this.data.shopname == "") {

      wx.showToast({
        title: "店铺名称不能为空",
        icon: "none"
      });
      return;
    }
    this.setData({ repeat: false });
    wx.showLoading({
      title: "数据提交中...",
      mask: true
    });

    var datas = {
      shopId: this.data.shopid,
      ShopName: this.data.shopname
    };
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/UpdateShopName", "POST", datas, app.globalData.appkeyid, this.updateStaff);
  },
  updateStaff:function(res){
    var chat=this;
    wx.hideLoading();
    var json=res.data.Data;
    if(json.flag){
      wx.showToast({
        title: "修改成功",
        icon: "none"
      });
      chat.setData({Popup: true});
      var datas = {
        pGroupID: app.globalData.AppGroupInfo.GroupID,
        shopID: chat.data.shopid
      }
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/GetGroupShop", "POST", datas, app.globalData.appkeyid, chat.CouponShopView);

    }else{
      wx.showToast({
        title: "修改失败",
        icon: "none"
      });
    }
  }
})