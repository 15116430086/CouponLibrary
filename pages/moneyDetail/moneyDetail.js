// pages/moneyDetail/moneyDetail.js
var utils = require("../../utils/util.js")
const app = getApp();
var pageM = [{
  page: 1,
  lastpage: 0,
  iscleck: true
}, {
  page: 1,
  lastpage: 0,
  iscleck: true
}];

Page({
    /**
     * 页面的初始数据
     */
    data: {
        userid:'',
        hecoupon:[],
        lingcoupon:[],
        currentId: '0',
        section: [{
            name: '核券记录',
            typeId: '0'
        }, {
            name: '领券记录',
            typeId: '1'
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      let that = this;
      that.setData({
        userid: '10000501'
      })
      that.GetData();
    }, 
    
    //点击每个导航的点击事件
    handleTap: function(e) {
      let that = this;
      let id = e.currentTarget.id;
      if (id) {
        this.setData({
          currentId: id,
        })

        if (pageM[id].iscleck) {
          that.GetData();
        }
      }
    },

  GetData: function () {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var pageindex = pageM[that.data.currentId].page;

    var data = {};
    data.pUserID = that.data.userid;
    data.pPageIndex = pageindex;
    data.pPageSize = 5;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponUserView/GetCouponUserReceiveAndConsume", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function (json) {
    let that = this;
    var json = json.data.Data;
    if (json.flag) {
      //CouponConsume 核销券
      //CouponItem    领券
      pageM[0].lastpage = json.ConsumePageCount;
      pageM[1].lastpage = json.ItemPageCount;

      if (this.data.currentId == 0) {
        pageM[that.data.currentId].iscleck = false;
        if (pageM[that.data.currentId].page == 1) {
          that.setData({
            hecoupon: json.CouponConsume
          })
        }
      }

      if (this.data.currentId == 1) {
        pageM[that.data.currentId].iscleck = false;
        if (pageM[that.data.currentId].page == 1) {
          that.setData({
            lingcoupon: json.CouponItem
          })
        } 
      }
    } else {
      pageM[that.data.currentId].iscleck = false;
      wx.showToast({
        title: '暂无数据!',
        icon: "none",
        duration: 2000
      })
    }
    //隐藏 加载中的提示
    wx.hideLoading();
  },

gethecoupon:function()
{
    let that = this;
    var pageindex = pageM[that.data.currentId].page;
    var data={}
    data.pUserID = that.data.userid;
    data.pPageIndex = pageindex;
    data.pPageSize = 5;
  utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponUserView/GetCouponUserConsume", "POST", data, app.globalData.appkeyid, this.gethecouponBack)
},
  gethecouponBack: function (json) {
    let that = this;
    var json = json.data.Data;
    if (json.flag) {
      //获取上次加载的数据
      var oldlists = that.data.hecoupon;
      var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
      that.setData({
        hecoupon: newlists
      });
    }
    else {
      pageM[that.data.currentId].iscleck = false;
      wx.showToast({
        title: '暂无数据!',
        icon: "none",
        duration: 2000
      })
    }
  },

  getlingcoupon: function () {
    let that = this;
    var pageindex = pageM[that.data.currentId].page;
    var data = {}
    data.pUserID = that.data.userid;
    data.pPageIndex = pageindex;
    data.pPageSize = 5;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponUserView/GetCouponUserReceive", "POST", data, app.globalData.appkeyid, this.getlingcouponBack)
  },
  getlingcouponBack: function (json) {
    let that = this;
    var json = json.data.Data;
    if (json.flag) {
      //获取上次加载的数据
      var oldlists = that.data.lingcoupon;
      var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
      that.setData({
        lingcoupon: newlists
      });
    }
    else {
      pageM[that.data.currentId].iscleck = false;
      wx.showToast({
        title: '暂无数据!',
        icon: "none",
        duration: 2000
      })
    }
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;

    if(that.data.currentId==0){
      if (pageM[that.data.currentId].lastpage > pageM[that.data.currentId].page) {
        pageM[that.data.currentId].page++;
        that.gethecoupon();
      } 
      else if (pageM[that.data.currentId].lastpage == pageM[that.data.currentId].page) {
        pageM[that.data.currentId].page++;
        wx.showToast({
          title: '没有更多数据!',
          icon: 'none',
          duration: 2000
        })
      }
    }
    else
    {
      if (pageM[that.data.currentId].lastpage > pageM[that.data.currentId].page) {
        pageM[that.data.currentId].page++;
        that.getlingcoupon();
      }
      else if (pageM[that.data.currentId].lastpage == pageM[that.data.currentId].page) {
        pageM[that.data.currentId].page++;
        wx.showToast({
          title: '没有更多数据!',
          icon: 'none',
          duration: 2000
        })
      }
    }
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})