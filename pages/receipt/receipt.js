// pages/receipt/receipt.js
var utils = require("../../utils/util.js")
const app = getApp();
var pageM = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Monthlist: [],
    Daylist: [],
    section: [{
      name: '按月汇总',
      typeId: '0',
      GroupBy: 7,
    }, {
      name: '按日汇总',
      typeId: '1',
      GroupBy: 10,
    }],
    show: false,
    currentId: 0,
    Month: '',
    ShopID: 0,
    ShopName: "",
    sdate: utils.formatTime(new Date().getTime()- (90 * 24 * 60 * 60 * 1000)),
    edate: utils.formatTime(new Date().getTime()),
    idx: 0,
    currentDate: new Date().getTime(),
    minDate: new Date('2020-01-01').getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
  },

  // 显示日期
  showTime(e) {
    let that = this;
    that.setData({
      show: true,
      hidden: true,
      datatype: e.currentTarget.dataset.datetype
    });
  },

  // 日期选择
  confirmDate(e) {
    console.log(e.detail);
    let that = this;
    let timer = e.detail;
    timer = utils.formatTime(timer);
    console.log(timer)
    if (that.data.datatype == 0) {
      that.setData({
        sdate: timer,
        show: false,
        hidden: false,
        idx: 0
      })
    }
    if (that.data.datatype == 1) {
      that.setData({
        edate: timer,
        show: false,
        hidden: false,
        idx: 0
      })
    }

    that.GetData();
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  GetData: function () {
    let that = this;
    var quantity = that.data.currentId;
    var pageindex = pageM[0].page;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.pageIndex = pageindex,
      data.pageSize = 10,
      data.pShopID = that.data.ShopID,
      data.pGroupBy = that.data.section[quantity].GroupBy,
      data.pMonth = that.data.Month,
      data.sDateTime = that.data.sdate,
      data.eDateTime = that.data.edate,
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponProductView/GetMonthWriteOffOrder", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function (json) {
    let that = this;
    var json = json.data.Data;
    if (json.flag) {
      if (that.data.currentId == 0) {
        that.setData({
          Monthlist: json.data
        })
      }

      if (that.data.currentId == 1) {
        if (that.data.Month != '') {
          that.setData({
            Daylist: json.data
          })
        } else {
          pageM[0].lastpage = json.pageCount;
          if (pageM[0].page == 1) {
            that.setData({
              Daylist: json.data
            })
          } else {
            //获取上次加载的数据
            var oldlists = that.data.Daylist;
            var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据

            that.setData({
              Daylist: newlists
            });
          }
        }
      }
    } else {
      wx.showToast({
        title: '暂无数据!',
        icon: "none",
        duration: 2000
      })
    }
    //隐藏 加载中的提示
    wx.hideLoading();
  },


  DaySummary: function (e) {
    let that = this;
    let time = e.currentTarget.dataset.time;
    that.setData({
      Month: time,
      currentId: 1
    })
    that.GetData();
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let shopid = options.ShopID || '';
    let shopname = options.shopname || app.globalData.AppShopInfo.ShopName;
    wx.setNavigationBarTitle({
      title: shopname
    });
    if (shopid == "") {
      shopid = app.globalData.AppStaffInfo.ShopID;

    }
    this.setData({
      ShopID: shopid,
      ShopName: shopname
    });
  },
  //点击每个导航的点击事件
  handleTap: function (e) {
    let that = this;
    let id = e.currentTarget.id;
    if (id) {
      this.setData({
        currentId: id,
        Month: ''
      })
    }
    pageM[0].page = 1;
    that.GetData();
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
    pageM = [{
      page: 1,
      lastpage: 0
    }];
    let that = this;
    that.GetData();
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
    if (pageM[0].lastpage > pageM[0].page) {
      pageM[0].page++;
      that.GetData();
    } else if (pageM[0].lastpage == pageM[0].page) {
      pageM[0].page++
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