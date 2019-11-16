// pages/staffLoginReg/staffLoginReg.js
var app=getApp();
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

  },
  authorization:function(enent){
    wx.getUserInfo({
      success: res => {
        // 登录
        var detail = res;
        if (detail.errMsg == "getUserInfo:ok") {
          app.globalData.userInfo = res.userInfo
          this.AddShopStaff(res);
        }
      }
    })

  },
  AddShopStaff:function(res){
    var data = {};
    data.Text = res.encryptedData;
    data.AesIV = res.iv;
    data.code = app.globalData.logincode
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/AddStaff", "POST", data, app.globalData.appkeyid, this.getUserInfoBack)
  },

  getUserInfoBack:function(res){
    var json=res.data.Data;
    if (json.flag){
      wx.reLaunch({
        url: '../home/home',
      })
    }else{
      wx.showToast({
        title: json.msg,
        icon: "none"
      });
    }
  }
})