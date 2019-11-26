// pages/scanCheck/scanCheck.js
var utils = require("../../utils/util.js")
const app = getApp();
var mCouponCode = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [{
        url: "/static/images/swp.png"
      },
      {
        url: "/static/images/swp.png"
      }
    ],
    couponiteminfo: null,
    pictures: [],
    userInfo: null,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    color: "#FFF0DE",
    activeColor: "#E85819",
    scrollTop: 0
  },
  onShowDs: function() {
    let that = this;
    that.setData({
      flag: !that.data.flag
    })
    wx.pageScrollTo({
      scrollTop: this.data.scrollTop + 300
    })

  },
  onCouponWriteOffTap: function(e) {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '核券处理中...',
    })
    const {
      couponcode,
      userid
    } = e.currentTarget.dataset;
    var data = {};
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    data.pStaffID = app.globalData.AppStaffInfo.StaffID
    data.pUserID = userid;
    data.pCouponCode = couponcode;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/AddCouponSweepCodeWriteOffOrder", "POST", data, app.globalData.appkeyid, this.CouponWriteOffBack)
  },
  CouponWriteOffBack: function(json) {
    console.log(json);
    var json = json.data.Data;
    //隐藏 加载中的提示
    wx.hideLoading();
    if (json.flag) {
      wx.showToast({
        title: json.msg,
        icon: 'success',
        duration: 2000
      })
      setTimeout(function () {
        wx.reLaunch({
          url: '../home/home',
        })},2000);  
    } else {
      wx.showToast({
        title: json.msg,
        icon: 'none',
        duration: 2000
      })
    }
  },

  GetData: function() {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.CouponCode = mCouponCode;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/GetCheckCouponDetail", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function(json) {
    console.log(json);
    var json = json.data.Data;
    //隐藏 加载中的提示
    wx.hideLoading();
    if (json.flag) {
      console.log(json.msg);
      this.setData({
        images: [{
          url: json.data[0].ImageOne
        }],
        couponiteminfo: json.data[0],
        pictures: json.pictures,
        userInfo: json.userinfo
      });
    } else {
      wx.showToast({
        title: '没有找到相关数据!',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    mCouponCode = options.CouponCode
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
  onPageScroll: function(e) { // 获取滚动条当前位置  
    console.log(e.scrollTop) //获取滚动条当前位置的值  
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})