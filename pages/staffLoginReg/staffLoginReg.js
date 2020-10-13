// pages/staffLoginReg/staffLoginReg.js
var app = getApp();
let utils = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ShopID: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var data = decodeURIComponent(options.q).split('=');
    if (data.length == 2) {
      var shopID = data[1];
      this.setData({
        ShopID: shopID
      });
    } else {
      wx.reLaunch({
        url: '../login/login',
      })
    }
  },
  authorization: function(enent) {
    var chat = this;
    // 登录
    wx.login({
      success: res => {
        let that = this;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId      
        app.globalData.logincode = res.code;

        wx.getUserInfo({
          success: res => {
            // 登录
            var detail = res;
            if (detail.errMsg == "getUserInfo:ok") {
              app.globalData.userInfo = res.userInfo
              chat.AddShopStaff(res);
            }
          }
        })
      }
    })

  },
  AddShopStaff: function(res) {
    var data = {};
    data.Text = res.encryptedData;
    data.AesIV = res.iv;
    data.code = app.globalData.logincode;   
    data.ShopID = this.data.ShopID;
    data.AppId=app.globalData.sysaAppid;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/AddStaff", "POST", data, app.globalData.appkeyid, this.getUserInfoBack)
  },

  getUserInfoBack: function(res) {
    var json = res.data.Data;
    if (json.flag) {
      if (json.flag && json.state == 3) {
        wx.setStorageSync('miniappkeyid', json.data)
        var appkeyid = wx.getStorageSync('miniappkeyid');
        if (appkeyid && appkeyid.FSessionKey && appkeyid.FContent) {
          app.globalData.appkeyid = appkeyid.FSessionKey;
          var loginInfo = JSON.parse(appkeyid.FContent);
          app.globalData.AppWxUserInfo = loginInfo.AppWxUserInfo;
          app.globalData.AppStaffInfo = loginInfo.AppStaffInfo;
          app.globalData.AppGroupInfo = loginInfo.AppGroupInfo;
          app.globalData.AppShopInfo = loginInfo.AppShopInfo;
          wx.reLaunch({
            url: '../home/home',
          })
        }
      }
    } else {
      wx.showToast({
        title: json.msg,
        icon: "none"
      });
    }
  }
})