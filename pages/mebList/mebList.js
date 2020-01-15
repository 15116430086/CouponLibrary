// pages/mebList/mebList.js
var utils = require("../../utils/util.js")
const app = getApp();
var page = 1;
Page({
    /**
     * 页面的初始数据
     */
    data: {
      datalist:[],
      lastpage: 0,
      labelid:''
    },

  GetData: function () {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    data.pPageIndex = page;
    data.pPageSize = 20;
    data.pLabelID = that.data.labelid;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponUserMemberView/GetCouponUserLabel", "POST", data, app.globalData.appkeyid, that.GetDataBack)
  },
  GetDataBack: function (json) {
    let that = this;
    var json = json.data.Data;
    //隐藏 加载中的提示
    wx.hideLoading();
    if (json.flag) {
      if (page == 1) {
        that.setData({
          datalist: json.data,
          lastpage: json.pageCount //你的总页数   
        });
      }
      else {
        //获取上次加载的数据
        var oldlists = that.data.datalist;
        //合并数据 res.data 你的数组数据
        var newlists = oldlists.concat(json.data)
        that.setData({
          datalist: newlists,
          lastpage: json.pageCount //你的总页数   
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
      let that = this;
      that.setData({
        labelid: options.labelid
      })
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

    jumpAddList(e) {
      let that = this;
        wx.navigateTo({
          url: '../addMembers/addMembers?labelid=' + that.data.labelid,
        })
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
      let that = this;
      if (that.data.lastpage > page) {
        page++
        that.GetData(page);
      } else if (that.data.lastpage == page) {
        page++;
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