// pages/spanList/spanList.js
var utils = require("../../utils/util.js")
const app = getApp();
var page = 1;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      datalist: [],
      lastpage: 0,
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
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponUserMemberView/GetCouponLabelInfo", "POST", data, app.globalData.appkeyid, that.GetDataBack)
  },
  GetDataBack: function (json) {
    let that = this;
    var json = json.data.Data;
    //隐藏 加载中的提示
    wx.hideLoading();
    if (json.flag) {      
        that.setData({
          datalist: json.data,  
        });
      }      
     else {
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
     
    },

    //跳转添加标签
    jumpAddList(e) {
        wx.navigateTo({
            url: '../addSpan/addSpan',
        })
    },

    //跳转成员
    jumpAddMeb(e) {
        wx.navigateTo({
          url: '../mebList/mebList?labelid=' + e.currentTarget.dataset.labelid,
        })
    },

     //跳转查看标签
     jumpSeeSpan(e){
      wx.navigateTo({
          url: '../seeSpan/seeSpan?labelid=' + e.currentTarget.dataset.labelid,
      })
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
      let that = this;
      that.GetData();
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})