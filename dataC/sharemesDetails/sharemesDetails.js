// dataC/sharemesDetails/sharemesDetails.js
var utils = require("../../utils/util.js")
const app = getApp();
var page = 1; //初始化页数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    DataList:[],
    TotalNumber:0,
    StartTime:'',
    EndTime:'',
    lastpage: 0,
    userid:'',
  },

  GetData: function () {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.pAffiliatedGroupID = app.globalData.AppGroupInfo.AffiliatedGroupID;
    data.pUserID=that.data.userid
    data.pPageIndex = page;
    data.pPageSize = 20;
    data.pStartTime='',
    data.pEndTime='',
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponDataAnalysisView/GetGetPageVisitShareNumberDetailed", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function (json) {
    let that = this;
    var json = json.data.Data;    
    if (json.flag) {
      console.log(json.msg);
      if (page == 1) {
        that.setData({
          DataList: json.data,
          lastpage: json.pageCount //你的总页数   
        });
      } else {
        //获取上次加载的数据
        var oldlists = that.data.DataList;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
        that.setData({
          DataList: newlists,
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
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var StartTime = options.starttime||'';
    var EndTime = options.endtime||'';
    var userid = options.userid||'';
    that.setData({
      StartTime:StartTime,
      EndTime:EndTime,
      userid:userid
    })
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
    let that = this;
    page=1;
    that.GetData(page);
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
  onShareAppMessage: function () {

  }
})