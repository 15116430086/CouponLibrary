// pages/goodsManager/goodsManager.js
var utils = require("../../utils/util.js")
const app = getApp();

var pageM = [{
  page: 1,
  lastpage: 0,
  state: 0,
  iscleck: true
}, {
  page: 1,
  lastpage: 0,
  state: 1,
  iscleck: true
}];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    stayorderlist: [],
    alreadyorderlist: [],
    currentId: 0,
    section: [{
      name: '上架中',
      typeId: 0
    }, {
      name: '已下架',
      typeId: 1
    }]
  },

  GetData: function() {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var pageindex = pageM[that.data.currentId].page;
    var state = pageM[that.data.currentId].state;

    var data = {};
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    data.pPageIndex = pageindex;
    data.pPageSize = 4;
    data.pState = state
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponProductView/GetPageCouponProduct", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function(json) {
    let that = this;
    var json = json.data.Data;
    if (json.flag) {
      pageM[that.data.currentId].lastpage = json.pageCount
      if (this.data.currentId == 0) {

        pageM[that.data.currentId].iscleck = false;

        if (pageM[that.data.currentId].page == 1) {
          that.setData({
            stayorderlist: json.data
          })
        } else {
          //获取上次加载的数据
          var oldlists = that.data.stayorderlist;
          var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据

          that.setData({
            stayorderlist: newlists
          });
        }
      }

      if (this.data.currentId == 1) {
        pageM[that.data.currentId].iscleck = false;
        if (pageM[that.data.currentId].page == 1) {
          that.setData({
            alreadyorderlist: json.data
          })
        } else {
          //获取上次加载的数据
          var oldlists = that.data.alreadyorderlist;
          var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据

          that.setData({
            alreadyorderlist: newlists
          });
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
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


  Lowershelf: function(event) {
    let that = this;
    console.log(event.currentTarget.dataset.productid);
    wx.showModal({
      title: '提示',
      content: '是否' + (that.data.currentId == 0 ? '下' : '上') + '架【' + event.currentTarget.dataset.productname+'】',
      success: function(res) {
        if (res.confirm) {
          var data = {}
          data.pProductId = event.currentTarget.dataset.productid,
            data.pState = (1 - that.data.currentId);
          utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponProductView/ProductUpperShelfOrLowerShelf", "POST", data, app.globalData.appkeyid, that.LowershelfBack),
            console.log('弹框后点确认')
        } else {
          console.log('弹框后点取消')
        }
      }
    })
  },

  LowershelfBack: function(json) {
    let that = this;   
    var json = json.data.Data;
    if (json.flag) {
      var title = '该商品' + (that.data.currentId == 0 ? '下' : '上') + '架成功'
      wx.showToast({
        title: title,
        icon: "none",
        duration: 2000
      })
      pageM[1 - that.data.currentId].iscleck = true;
    } else {
      var title = '该商品' + (that.data.currentId == 0 ? '下' : '上') + '架失败'
      wx.showToast({
        title: title,
        icon: "none",
        duration: 2000
      })
    }
    if (that.data.stayorderlist.length == 1 && that.data.currentId == 0)
    {
      that.data.stayorderlist=[];
      that.setData({
        stayorderlist: []
      })
    }
    if (that.data.alreadyorderlist.length == 1 && that.data.currentId == 1) {
      that.data.alreadyorderlist = [];
      that.setData({
        alreadyorderlist: []
      })
    }
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
    if (pageM[that.data.currentId].lastpage > pageM[that.data.currentId].page) {
      pageM[that.data.currentId].page++;
      that.GetData();
    } else if (pageM[that.data.currentId].lastpage == pageM[that.data.currentId].page) {
      pageM[that.data.currentId].page++
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