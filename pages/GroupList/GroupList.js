var utils = require("../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Grouplist: {},
    flags: true,
    pageIndex:1,
    pageCount:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Query();
  },
  Query(){
    var datas = {
      pGroupID: app.globalData.AppGroupInfo.GroupID,
      pageIndex: this.data.pageIndex
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponGroupView/GetGroupListpage", "POST", datas, app.globalData.appkeyid, this.CouponGroupView);
  },
  CouponGroupView: function (res) {
    var chat = this;
    var json = res.data.Data;
    if (json.flag) {
      if(chat.data.pageIndex==1){
        chat.setData({
          Grouplist: json.data,
          flags: false
        });
      }else{
        //获取上次加载的数据
        var oldlists = that.data.Grouplist;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
        that.setData({
          Grouplist: newlists,
          pageCount: json.pageCount //你的总页数   
        });
      }
      chat.setData({ pageIndex: chat.data.pageIndex+1});
    }
  },
  Jump: function (event) {
    wx.navigateTo({
      url: '../shopList/shopList?GroupID=' + event.currentTarget.dataset.groupid,
    })
  },
  add:function(){
    wx.navigateTo({
      url: '../AddGroup/AddGroup',
    })
  },
  update:function(event){
    wx.navigateTo({
      url: '../AddGroup/AddGroup?pGroupID=' + event.currentTarget.dataset.groupid,
    })

  },
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {

    if (this.data.pageIndex > this.data.pageCount){
      return;
    }
    this.Query();
  }
})