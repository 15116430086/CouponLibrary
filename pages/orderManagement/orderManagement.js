// pages/orderManagement/orderManagement.js
var utils = require("../../utils/util.js")
const app = getApp();
var ordertype = 0;
var pageM = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    stayorderlist: [],
    alreadyorderlist: [],
    completedorderlist: [],
    currentId: 0,
    section: [{
      name: '待发货/受理',
      typeId: '0'
    }, {
      name: '已发货/已受理',
      typeId: '1'
    }, {
      name: '已完成',
      typeId: '2'
    }],
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
    data.pPageSize = 20;
    data.pState = state
    data.pOrderType = ordertype
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponGroupView/GetCouponWriteOffOrderPage", "POST", data, app.globalData.appkeyid, this.GetDataBack)
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


      if (this.data.currentId == 2) {
        pageM[that.data.currentId].iscleck = false;
        if (pageM[that.data.currentId].page == 1) {
          that.setData({
            completedorderlist: json.data
          })
        } else {
          //获取上次加载的数据
          var oldlists = that.data.completedorderlist;
          var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据

          that.setData({
            completedorderlist: newlists
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

  JumpwaitGoods: function(e) {
    var type = e.currentTarget.dataset.type;
    var orderid = e.currentTarget.dataset.orderid;
    var orderstate = e.currentTarget.dataset.orderstate;
    var writeofftype = e.currentTarget.dataset.writeofftype;
    if (writeofftype == 0) {
      wx.navigateTo({
        url: '../waitGoods/waitGoods?type=' + type + '&orderid=' + orderid + '&orderstate=' + orderstate,
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    ordertype = options.ordertype;
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    pageM = [{
      page: 1,
      lastpage: 0,
      state: 2,
      iscleck: true
    }, {
      page: 1,
      lastpage: 0,
      state: 3,
      iscleck: true
    }, {
      page: 1,
      lastpage: 0,
      state: 4,
      iscleck: true
    }];
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