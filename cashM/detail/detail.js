// cashM/detail/detail.js
let utils = require("../../utils/util.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      DataList:[],
      Unsettled:0,
      Settled:0,
      Totalamount:0,
      pageIndex:1,
      pageCount:0,
      GroupID:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({GroupID:options.GroupID});
  },
  Query:function () {
    wx.showLoading({
      title: '数据加载中...',
    })
    var data={
      GroupID:this.data.GroupID,
      pageIndex:this.data.pageIndex,
      pageSize:this.data.pageSize,
      AffiliatedGroupID:app.globalData.AppGroupInfo.GroupID
    };
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/OperatorfundsView/Detailstobesettled", "POST", data, app.globalData.appkeyid, this.Detailstobesettled)
  },
  Detailstobesettled:function (res) {
      wx.hideLoading();
      var json=res.data.Data;
      var chat=this;
      if (chat.data.pageIndex == 1) {
        chat.setData({
          DataList:json.data,
          Unsettled:json.list[0].Unsettled,
          Settled:json.list[0].Settled,
          Totalamount:json.list[0].Totalamount,
          pageCount:json.pageCount,
        });
      } else {
        //获取上次加载的数据
        var oldlists = chat.data.DataList;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
        chat.setData({
          DataList: newlists,
          pageCount: json.pageCount, //你的总页数   
        });
      }
      chat.setData({pageIndex:chat.data.pageIndex+1});
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.pageIndex>this.data.pageCount){
      return;
    }
    this.Query();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})