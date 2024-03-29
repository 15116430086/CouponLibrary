
var utils = require("../../utils/util.js")
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Capitaldetailslist: [],
    State:1,
    pageIndex:1,
    pageCount:1,
    CouponID:""
  },

  GetData: function() {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.GroupID = app.globalData.AppGroupInfo.GroupID;
    data.pageIndex = that.data.pageIndex;
    data.pageSize = 20;
    data.State=that.data.State,
    data.CouponID=that.data.CouponID;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/MerchantCapitalDetails", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function(json) {
    let that = this;
    var json = json.data.Data;
    wx.hideLoading();
    if (json.flag) {
      console.log(json.msg);
      if (that.data.pageIndex == 1) {
        this.setData({
          Capitaldetailslist: json.data,
          pageCount:json.pageCount 
        });
      } else {
        //获取上次加载的数据
        var oldlists = that.data.Capitaldetailslist;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
        that.setData({
          Capitaldetailslist: newlists,
          pageCount: json.pageCount, //你的总页数,
        });
      }
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
   this.setData({
    CouponID:options.CouponID,
    State:options.State
   });
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
    this.data.pageIndex = 1;
    this.GetData();
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
    if (this.data.pageCount > this.data.pageIndex) {
      this.data.pageIndex++
      that.GetData();
    } else if (this.data.pageCount <= this.data.pageIndex) {
      wx.showToast({
        title: '没有更多数据!',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})