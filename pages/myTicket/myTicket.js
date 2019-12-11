// pages/myTicket/myTicket.js
var utils = require("../../utils/util.js")
const app = getApp();
var page = 1; //初始化页数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: "",
    currentID: "2",
    receiveList: [],
    lastpage: 0,
    BotOne: [{
        url: "/static/images/pt2.png",
        title: "平台选券",
        color: "#999999",
        id: 1
      },
      {
        url: "/static/images/me1.png",
        title: "我的券",
        color: "#E85819",
        id: 2
      }
    ],
    show: -1
  },

  onBindBotOneTap: function(event) {
    let that = this;
    if (event.target.id != that.data.currentID)
      wx.redirectTo({
        url: '../chooseTicket/chooseTicket'
      })
  },
  onBindReceiveTap: function(event) {
    wx.navigateTo({
      url: '../ticketMes/ticketMes?CouponID=' + event.currentTarget.dataset.couponid + '&ReleaseID=' + event.currentTarget.dataset.releaseid,
    })
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
    data.pPageSize = 20;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetListReceiveInfo", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function(json) {
    console.log(json);
    var json = json.data.Data;
    //隐藏 加载中的提示
    wx.hideLoading();
    if (json.flag) {
      if (page == 1) {
        this.setData({
          couponNUM: json.CouponNUM,
          receiveNUM: json.ReceiveNUM,
          receiveList: json.data,
          lastpage: json.pageCount //你的总页数   
        });
      } else {
        //获取上次加载的数据
        var oldlists = that.data.receiveList;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据

        that.setData({
          couponNUM: json.CouponNUM,
          receiveNUM: json.ReceiveNUM,
          receiveList: newlists,
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

  },

  onInputBlur: function(e) {
    let value = e.detail.value;
    this.setData({
      backnum: value == '' ? 0 : value
    });
  },
  showPop(e) {
    let index = e.target.dataset.index
    this.setData({
      show: index,
      backnum: ''
    })
  },
  onClose() {
    this.setData({
      show: -1
    });
  },
  onEnterBack: function(e) {
    let that = this;
    let ReceiveID = e.target.dataset.receiveid
    let ReceiveNUM = e.target.dataset.receivenum
    let GiveNUM = e.target.dataset.givenum
    let oBalanceNum = ReceiveNUM - GiveNUM
    let backnum = this.data.backnum
    if (backnum <= 0) {
      wx.showToast({
        title: '请输入退券数量！',
        icon: 'none',
        duration: 2000
      })

      return;
    }
    if (oBalanceNum < backnum) {
      wx.showToast({
        title: '退券数量不能大于(' + oBalanceNum + ')',
        icon: 'none',
        duration: 2000
      })

      return;
    }
    //显示 加载中的提示
    wx.showLoading({
      title: '退券中...',
    })
    var data = {
      pGroupID: app.globalData.AppGroupInfo.GroupID,
      pReceiveID: ReceiveID,
      pBackNUM: backnum
    }

    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponGroupView/BackReceiveCouponInfo", "POST", data, app.globalData.appkeyid, that.ReceiveCouponInfoBack)

  },

  ReceiveCouponInfoBack: function(json) {
    let that = this;
    var json = json.data.Data;
    //隐藏 加载中的提示
    wx.hideLoading();
    if (json.flag) {
      wx.showToast({
        title: json.msg,
        icon: 'none',
        duration: 2000
      })
      that.setData({
        show: -1
      });
      setTimeout(function () {
        page = 1;
        that.GetData(page);
      }, 2000);  

    } else {
      wx.showToast({
        title: json.msg,
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    let that = this;
    that.setData({
      GroupName: app.globalData.AppGroupInfo.GroupName
    })
    page = 1;
    that.GetData(page);
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
    let that = this;
    page = 1;
    that.GetData(page);
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
      wx.showToast({
        title: '没有更多数据!',
        icon: 'success',
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