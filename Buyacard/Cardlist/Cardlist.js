// Buyacard/Cardlist/Cardlist.js
var utils = require("../../utils/util.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentId:1,
    img1: [
      {
        txt: "按活动",
        id:1
      },
      {
        txt: "按店铺",
        id:2
      }
      
    ],
    startCreateDate:"",
    endCreateDate:"",
    pageIndex:1,
    pageCount:1,
    DataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      startCreateDate:options.StartTime,
      endCreateDate:options.EndTime
    });
  },
  Query:function(){
    wx.showLoading({
      title: '数据加载中...',
    })
    var data={
      pPageIndex: this.data.pageIndex,
      pPageSize: 20,
      startCreateDate: this.data.startCreateDate,
      endCreateDate: this.data.endCreateDate,
      pAffiliatedGroupID:app.globalData.AppGroupInfo.AffiliatedGroupID,
      pGroupby: this.data.currentId,
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponUserMemberView/GetMembershipCardStatistics", "POST", data, app.globalData.appkeyid, this.QueryList)
  },
  QueryList:function(res){
    wx.hideLoading();
    var json=res.data.Data;
    var chat=this;
    if(json.flag){
      if (chat.data.pageIndex == 1) {
        chat.setData({
          DataList: json.data,
          pageCount: json.pageCount,
          pageIndex: chat.data.pageIndex + 1
        });
      } else {
        //获取上次加载的数据
        var oldlists = chat.data.DataList;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
        chat.setData({
          DataList: newlists,
          pageCount: json.pageCount, //你的总页数,
          pageIndex: chat.data.pageIndex + 1
        });
      }
    }else{
      if (chat.data.pageIndex == 1) {
        chat.setData({
          DataList: []
        });
      }
    }
  },
  Jumps:function (e) {
   var shopid=e.currentTarget.dataset.shopid;
   var PayData=e.currentTarget.dataset.time;
   wx.navigateTo({
    url: "../CardDetails/CardDetails?shopid="+shopid+"&PayData="+PayData+"&types=2",
    })
  },
  Jumpa:function (e) {
    var ActivityID=e.currentTarget.dataset.activityid;
    var PayData=e.currentTarget.dataset.time;
    wx.navigateTo({
      url: "../CardDetails/CardDetails?ActivityID="+ActivityID+"&PayData="+PayData+"&types=1",
      })
  },
  clkTab(e){
    let id = e.currentTarget.dataset.id;
    let that = this;
    that.setData({
      currentId: id,
      pageIndex:1
    })
    that.Query();
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
    this.Query();
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
    if (this.data.pageIndex > this.data.pageCount) {
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