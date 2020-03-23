// pages/doorScan/doorScan.js
var utils = require("../../utils/util.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      img:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.shopid)
    {//新增员工二维码
    var datas={
      ShopID: options.shopid
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/StoreQRcode", "POST", datas, app.globalData.appkeyid, this.CouponShopView);
    }
    
    if(options.gid)
    {//店铺分享 小程序码
      var datas = {
        gid: options.gid
      }
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponGroupView/StoreQRcode", "POST", datas, app.globalData.appkeyid, this.CouponShopView);
    }    
  },
  CouponShopView:function(res){
   var json=res.data.Data;
   var chat=this;
    chat.setData({ img:json.QRCodeImg});
  }
})