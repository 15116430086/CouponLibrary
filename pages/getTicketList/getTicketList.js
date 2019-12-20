// pages/getTicketList/getTicketList.js
var utils = require("../../utils/util.js")
const app = getApp();
var page = 1;
var quick = 0;
var regionData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    lastpage: 0,
    hotTicketBox: [{
        url: "/static/images/swp.png",
        id: 1
      },
      {
        url: "/static/images/swp.png",
        id: 2
      }
    ],
    qData: null,
    industryName: "全部行业",
    industryCode: "",
    multiArray: [],
    multiIndex: [17, 0, 0],
    coupontype: ["全部券种", "代金券", "礼物券"],
    typeName: "全部券种",
    show2: false,
    tshow: false,
    couponType: -1,
  },

  showtPopup() {

    let that = this;
    that.setData({
      tshow: true
    })
  },

  //券类型选择
  ontConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    console.log(`当前值：${value}, 当前索引：${index}`);

    let that = this;
    that.setData({
      tshow: false,
      couponType: index - 1,
      typeName: value
    })

  },
  ontCancel(e) {
    let that = this;
    that.setData({
      tshow: false
    })
  },
  ontClose(e) {

    let that = this;
    that.setData({
      tshow: false
    })
  },


  showPopup() {
    let that = this;
    that.setData({
      show2: true
    })
  },

  //行业选择
  onConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    console.log(`当前值：${value}, 当前索引：${index}`);

    let that = this;
    that.setData({
      show2: false,
      industryName: value.IndustryName,
      industryCode: value.IndustryCode
    })
  },
  onCancel(e) {

    let that = this;
    that.setData({
      show2: false
    })
  },
  GetData: function() {
    let that = this;
    var multiArray = that.data.multiArray;
    var multiIndex = that.data.multiIndex;
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
    data.pRegionID = that.data.RegionName != '' ? that.data.RegionName : "";
    data.pIndustryCode = that.data.industryCode;
    data.pCouponType = that.data.couponType;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/QueryCouponInfo", "POST", data, app.globalData.appkeyid, this.GetQueryCouponBack)
  },
  GetQueryCouponBack: function(json) {
    let that = this;
    console.log(json);
    var json = json.data.Data;
    //隐藏 加载中的提示
    wx.hideLoading();
    if (json.flag) {
      console.log(json.msg);
      if (page == 1) {
        that.setData({
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

    } else {
      if (page == 1) {
        that.setData({
          hotTicketBox: [],
          lastpage: 0 //你的总页数   
        })
      }
      wx.showToast({
        title: '没有找到相关数据!',
        icon: 'none',
        duration: 2000
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      RegionName: "所有地区"
    })
    that.GetRegionIndustry();
    page = 1;
    if (options.quick == 0) {

      that.GetData(page);
    } else {
      quick = options.quick;
      var data = JSON.parse(options.data);
      that.setData({
        qData: data
      })
      that.QuickQueryCoupon(page);
    }
  },
  QuickQueryCoupon: function(page) {
    let that = this;
    var multiArray = that.data.multiArray;
    var multiIndex = that.data.multiIndex;
    var data = that.data.qData;
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    data.pPageIndex = page;
    data.pPageSize = 30;
    data.pLatitudeX = app.globalData.latitudeX;
    data.pLongitudeY = app.globalData.longitudeY;
    data.pQueryKey = that.data.searchValue;
    data.pRegionID = that.data.RegionName != '' ? that.data.RegionName : app.globalData.regionName;
    data.pIndustryCode = that.data.industryCode;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/QuickQueryCouponInfo", "POST", data, app.globalData.appkeyid, that.GetQueryCouponBack)
  },

  onbindblur: function(e) {
    this.setData({
      searchValue: e.detail.value
    })
  },
  onSearch: function(event) {
    let that = this;
    page = 1;
    if (quick == 0) {
      that.GetData(page);
    } else {
      that.QuickQueryCoupon(page);
    }
  },
  onBindReceiveTap: function(event) {
    wx.navigateTo({
      url: '../ticketMes/ticketMes?CouponID=' + event.currentTarget.dataset.couponid + '&ReleaseID=' + event.currentTarget.dataset.releaseid,
    })
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

  },

  GetRegionIndustry: function() {
    let that = this;

    regionData = wx.getStorageSync('Region');
    var industrylist = wx.getStorageSync('Industry');
    var multiArray = wx.getStorageSync('multiArray');
    if (regionData && industrylist) {
      this.setData({
        columns: industrylist,
        multiArray: multiArray
      });

      return;
    }
    utils.GetRegionIndustry(app.globalData.apiurl + "CouponView/LoginView/GetRegionIndustry", "POST", app.globalData.appkeyid, that.GetRegionIndustry)
  },

  bindMultiPickerCancel: function() {
    //console.log('picker发送取消，携带值为', e.detail.value)
    this.setData({
      RegionName: "所有地区"
    })
  },
  bindMultiPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: e.detail.value
    };

    this.setData({
      multiIndex: data.multiIndex,
      RegionName: data.multiArray[2][data.multiIndex[2]].RegionName
    })
  },
  bindMultiPickerColumnChange: function(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        data.multiArray[1] = regionData[data.multiIndex[0]].LevelCoupon_Region;
        data.multiArray[2] = regionData[data.multiIndex[0]].LevelCoupon_Region[0].LevelCoupon_Region

        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        data.multiArray[2] = regionData[data.multiIndex[0]].LevelCoupon_Region[data.multiIndex[1]].LevelCoupon_Region

        data.multiIndex[2] = 0;
        break;
    }
    console.log(data.multiIndex);
    this.setData({
      multiArray: data.multiArray
      //multiIndex: data.multiIndex,
      //RegionName: data.multiArray[2][data.multiIndex[2]].RegionName
    });
  }
})