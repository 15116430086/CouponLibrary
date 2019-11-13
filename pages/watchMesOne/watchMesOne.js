// pages/watchMesOne/watchMesOne.js
var utils = require("../../utils/util.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist:{},
    ReleaseID:"",
    pageIndex:1,
    Paging: true//是否可以加载下一页
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.ReleaseID = options.releaseid;
      var datas={
        pageIndex:this.data.pageIndex,
        pageSize:5,
        ReleaseID: options.releaseid
      }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetGoupCertificatelist", "POST", datas, app.globalData.appkeyid, this.GetGoupCertificatelist);
  },
  GetGoupCertificatelist:function(res){
    var chat = this;
    var json = res.data.Data;
    if (json.flag) {
      if (chat.data.pageIndex == 1) {
        chat.setData({
          datalist: json.data,
        });
      } else {
        var oldlists = chat.data.datalist;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
        chat.setData({
          datalist: newlists,
        });
      }
      if (json.pageCount <= chat.data.pageIndex) {//说明当前页已经超出总页数了
        chat.setData({ Paging: false });//不能再分页
      }
      chat.setData({
        pageIndex: parseInt(chat.data.pageIndex + 1)
      });

    } else {
      wx.showToast({
        title: "数据加载失败...",
        icon: "none"
      });
    }

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var datas = {
      pageIndex: this.data.pageIndex,
      pageSize: 5,
      ReleaseID: this.data.releaseid
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetGoupCertificatelist", "POST", datas, app.globalData.appkeyid,          this.GetGoupCertificatelist);
  },


})