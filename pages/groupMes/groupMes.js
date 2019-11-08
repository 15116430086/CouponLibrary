// pages/groupMes/groupMes.js
var utils = require("../../utils/util.js")
const app = getApp();
var mSendGroupID = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupInfo:[{
      GroupName:"湖南券库",
      Introduction:"/static/images/swp.png"
    }],
    images: [{
        url: "/static/images/swp.png"
      },
      {
        url: "/static/images/swp.png"
      },
      {
        url: "/static/images/swp.png"
      }
    ],
    shopArrays: [{
        url: "/static/images/swp.png",
        address: "芙蓉区五一大道人瑞潇湘国际一楼213号"
      },
      {
        url: "/static/images/swp.png",
        address: "芙蓉区五一大道人瑞潇湘国际一楼213号"
      }
    ],
    ticketBox: [{
        num: "456",
        name: "临时停车收费券"
      },
      {
        num: "123",
        name: "临时停车收费券"
      }
    ],
  },
  GetData: function(page) {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    data.pPageIndex = page;
    data.pPageSize = 1;
    data.pLatitudeX = app.globalData.latitudeX;
    data.pLongitudeY = app.globalData.longitudeY;
    data.pSendGroupID = mSendGroupID;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponGroupView/QueryGroupGroupDetails", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function(json) {
    let that = this;
    console.log(json);
    var json = json.data.Data;
    if (json.flag) {
      console.log(json.msg);
      if (json.pictures.length==0)
      {
        json.pictures = [{
          ImageOne:json.data[0].ImageOne
        }];
      }
      that.setData({
        images: json.pictures,       
        shopArrays: json.shops,
        ticketBox: json.data,
        lastpage: json.pageCount //你的总页数
      });

    }

    //隐藏 加载中的提示
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    mSendGroupID=options.GroupID;
    let that = this;
    that.GetData(1);
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})