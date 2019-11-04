// pages/getTicketList/getTicketList.js
var utils = require("../../utils/util.js")
const app = getApp();
var page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    hotTicketBox: [{
        url: "/static/images/swp.png",
        id: 1
      },
      {
        url: "/static/images/swp.png",
        id: 2
      }
    ],
  },
  GetData: function() {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    data.pPageIndex = page;
    data.pPageSize = 30;
    data.pLatitudeX = app.globalData.latitudeX;
    data.pLongitudeY = app.globalData.longitudeY;
    data.pQueryKey = that.data.searchValue;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/QueryCouponInfo", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function(json) {
    console.log(json);
    var json = json.data.Data;
    if (json) {
      console.log(json.msg);
      if (page == 1) {
        this.setData({
          hotTicketBox: json.data,
          lastpage: json.pageCount //你的总页数   
        });
      } else {
        //获取上次加载的数据
        var oldlists = that.data.hotTicketBox;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据

        that.setData({
          hotTicketBox: newlists,
          lastpage: json.pageCount //你的总页数   
        });
      }

    }
    //隐藏 加载中的提示
    wx.hideLoading();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    page = 1;
    that.GetData(page);
  },
  onbindblur: function(e) {
    this.setData({
      searchValue: e.detail.value
    })
  },
  onSearch: function(event) {
    let that = this;
    page = 1;
    that.GetData(page);
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
    let that = this;
    if (that.data.lastpage > page) {
      page++
      that.GetData(page);
    } else if (that.data.lastpage == page) {
      page++;
      wx.showModal({
        title: '到底了',
        content: '请休息一会再看呗！',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})