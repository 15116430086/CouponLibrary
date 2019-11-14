//index.js
//获取应用实例

var utils = require("../../utils/util.js")
const app = getApp();
Page({
  data: {
    primarySize: 'default',
    motto: '绑定手机登录',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getPhoneNumber(res) {
    // 登录
    var detail = res.detail;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId      
        app.globalData.logincode = res.code;
        this.GetWxLoginAuth(detail);
      }
    })    
 
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.GetWxLoginAuth(res);
        }
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })

        this.GetWxLoginAuth(res);
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.GetWxLoginAuth(res);
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    }) 

    app.onLaunch();
  },
  GetWxLoginAuth: function (res) {
    var data = {};
    data.Text = res.encryptedData;
    data.AesIV = res.iv;
    data.code = app.globalData.logincode
    data.appkeyid = wx.getStorageSync('appkeyid');
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/LoginView/GetWxLoginAuth", "POST", data, app.globalData.appkeyid, this.getUserInfoBack)
  },
  getUserInfoBack: function(json) {
    console.log(json);
    var json = json.data.Data;
    if (json) {
      console.log(json.msg);
      if (json.flag && json.state == 3) {
        wx.setStorageSync('appkeyid', json.data)
        wx.navigateTo({
          url: '../login/login',
        })
      }
    }
  }
})