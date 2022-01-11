// pages/staffLoginReg/staffLoginReg.js
var app = getApp();
let utils = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ShopID: "",
    isCode: true,
    sendMes: "发送验证码",
    time: "60",
    code: "",
    phone:"",
    StaffName:""
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
    } 
    else {
      wx.reLaunch({
        url: '../login/login',
      })
    }
  },
  //发送验证码
  sendCode(e) {
    if (this.data.phone == "") {
      wx.showToast({
        title: '请输入手机号码!',
        icon: "none",
        duration: 2000
      })
      return;
    }
    var data = {
      Phone:  this.data.phone
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/LoginView/Getverificationcode", "POST", data, app.globalData.appkeyid, this.Getverificationcode)
  },

  Getverificationcode: function (res) {
    var chat = this;
    var json = res.data.Data;
    if (json.flag) {
      let promise = new Promise((resolve, reject) => {
        let setTimer = setInterval(
          () => {
            chat.setData({
              isCode: false,
              time: chat.data.time - 1
            })
            if (chat.data.time <= 0) {
              chat.setData({
                time: 60,
                isCode: true,
                sendMes: "重新发送"
              })
              resolve(setTimer)
            }
          }, 1000)
      })
      promise.then((setTimer) => {
        clearInterval(setTimer)
      })

    } else {
      wx.showToast({
        title: json.msg,
        icon: "none",
        duration: 3000
      })

    }
  },


 
 //手机号码
 phoneinput: function (e) {
  let that = this;
  that.setData({
    phone: e.detail.value
  })
},
  //验证码
  codeinput: function (e) {
    let that = this;
    that.setData({
      code: e.detail.value,
    })
  },
  nameinput: function (e) {
    let that = this;
    that.setData({
      StaffName: e.detail.value,
    })
  },

  isConfirmLogin: function () {
    let that = this;
    if (that.data.StaffName == "") {
      wx.showToast({
        title: '请输入姓名!',
        icon: "none",
        duration: 2000
      })
      return;
    }

    if (that.data.phone == "") {
      wx.showToast({
        title: '请输入手机号码!',
        icon: "none",
        duration: 2000
      })
      return;
    }
    if (that.data.code == "") {
      wx.showToast({
        title: '请输入验证码!',
        icon: "none",
        duration: 2000
      })
      return;
    }
    wx.showLoading({
      title: '数据加载中...',
    })
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
              var data = {};
              data.Text = detail.encryptedData;
              data.AesIV = detail.iv;
              data.code = app.globalData.logincode;
              data.pCheckCode = that.data.code;
              data.AppId = app.globalData.sysaAppid;
              data.StaffName=that.data.StaffName;
              data.ShopID = that.data.ShopID;
              data.Telephone=that.data.phone;
              utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/AddStaff", "POST", data, app.globalData.appkeyid, that.getUserInfoBack)
            }
          }
        })
      }
    })
  },
  getUserInfoBack: function(res) {
    var json = res.data.Data;
    wx.hideLoading();
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