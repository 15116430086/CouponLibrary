// pages/classRoom/classRoom.js
var utils = require("../../utils/util.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,
    pageSize: 10,
    datalist: {},
    isRefresh: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: app.globalData.sysName + '讲堂'
  })
    var data = {
      pPageIndex: this.data.pageIndex,
      pPageSize: this.data.pageSize
    };
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponHomeView/GetQuestionBank", "POST", data, app.globalData.appkeyid, this.GetQuestionBank)
  },
  jumpWeb(e) {
    var url = e.currentTarget.dataset.url;

    let index = url.lastIndexOf(".");
    let ext = url.substr(index + 1);
    console.log(ext)
    if (ext == "png") {
      wx.navigateTo({
        url: '../imageView/imageView?url=' + url,
      })

    } else {
      wx.navigateTo({
        url: '../webView/webView?url=' + url,
      })
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  GetQuestionBank: function(res) {
    var chat = this;
    var json = res.data.Data;
    if (json.flag) {
      if (chat.data.pageIndex == 1) {
        chat.setData({
          pageIndex: chat.data.pageIndex + 1,
          datalist: json.data
        });
      } else {
        var list = chat.data.datalist
        var newlists = list.concat(json.data) //合并数据 res.data 你的数组数据
        chat.setData({
          datalist: newlists,
          pageIndex: chat.data.pageIndex + 1
        });
      }
    } else {
      if (chat.data.pageIndex == 1) {
        wx.showToast({
          title: json.msg,
          icon: "暂无数据"
        });
      } else {
        chat.setData({
          isRefresh: false
        });

      }

    }
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
    var data = {
      pPageIndex: this.data.pageIndex,
      pPageSize: this.data.pageSize
    };
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponHomeView/GetQuestionBank", "POST", data, app.globalData.appkeyid, this.GetQuestionBank)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})