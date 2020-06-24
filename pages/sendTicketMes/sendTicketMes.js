// pages/sendTicketMes/sendTicketMes.js
var utils = require("../../utils/util.js")
const app = getApp();
var page = 1;
var shoptype = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sumCouponNum: 0,
    sumCouponMoney: 0,
    GiveCouponList: [],
    lastpage: 0,
    GroupID: 0,
    couponType: -1,
    typeName: "全部券",
    GroupName: "全部店铺",
    selectDate: "选择日期",
    currentDate: new Date().getTime(),
    minDate: new Date("2019-10-01").getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else {
        return `${value} 日`;
      }
      return value;
    },
    columns: ["全部券", "代金券", "礼物券"],
    shoplist: [],

    show1: false,
    show2: false,
    show3: false
  },
  GetData: function() {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.pSGroupID = that.data.GroupID;
    data.pPageIndex = page;
    data.pPageSize = 30;
    data.pAffiliatedGroupID = app.globalData.AppGroupInfo.AffiliatedGroupID;
    data.pCouponType = that.data.couponType;
    data.pDateTime = that.data.selectDate;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetCouponItemListPage", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function(json) {
    console.log(json);
    var json = json.data.Data;
    let that = this;
    //隐藏 加载中的提示
    wx.hideLoading();
    if (json.flag) {
      console.log(json.msg);
      if (page == 1) {
        that.setData({
          sumCouponNum: json.sumCouponNum,
          sumSalePrice: json.sumSalePrice,
          GiveCouponList: json.data,
          lastpage: json.pageCount //你的总页数   
        });
      } else {
        //获取上次加载的数据
        var oldlists = that.data.GiveCouponList;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据

        that.setData({
          sumCouponNum: json.sumCouponNum,
          sumCouponMoney: json.sumCouponMoney,
          GiveCouponList: newlists,
          lastpage: json.pageCount //你的总页数   
        });
      }

    } else {
      that.setData({
        sumCouponNum: 0,
        sumCouponMoney: 0,
        GiveCouponList: [],
        lastpage: 0 //你的总页数   
      });
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
    page = 1;

    shoptype = options.shoptype;
    
      that.setData({
        GroupName: app.globalData.AppGroupInfo.GroupName,
        shoptype: shoptype,
        GroupID:app.globalData.AppGroupInfo.GroupID
      })

      if(app.globalData.AppGroupInfo.GroupID == app.globalData.AppGroupInfo.AffiliatedGroupID){
        that.setData({         
          GroupID:0
        })
      }
      
    
    that.GetData(page);
    if(app.globalData.AppGroupInfo.GroupID == app.globalData.AppGroupInfo.AffiliatedGroupID){
    that.GetShopList();
    }
  },
  GetShopList: function() {
    var data = {};
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/GetGroupDrop", "POST", data, app.globalData.appkeyid, this.GetShopListck)

  },
  GetShopListck: function(json) {
    let that = this;
    console.log(json);
    var json = json.data.Data;
    if (json.flag) {
      var shoplist = [{
        GroupName: "全部店铺",
        GroupID: 0
      }];
      shoplist = shoplist.concat(json.data)
      that.setData({
        shoplist: shoplist,
        GroupName:shoplist[0].GroupName
      })
    }
    console.log(that.data.shoplist);
  },
  onClose2(e) {
    let that = this;
    that.setData({
      show3: false
    })

  },
  showPopup1() {
    let that = this;
    if(app.globalData.AppGroupInfo.GroupID == app.globalData.AppGroupInfo.AffiliatedGroupID){
      that.setData({
        show1: true
      })
    }
  },
  showPopup2() {

    let that = this;
    that.setData({
      show2: true
    })
  },
  showPopup3() {

    let that = this;
    that.setData({
      show3: true
    })
  },

  confirm(event) {
    console.log(event.detail); // 打印出了时间
    let timestamp = event.detail;
    console.log(utils.formatTime(timestamp));
    console.log(utils.sysFormatDate(utils.formatTime(timestamp), "yyyy-MM-dd"));

    let that = this;
    that.setData({
      show3: false,
      selectDate: utils.sysFormatDate(utils.formatTime(timestamp), "yyyy-MM-dd")
    })

    page = 1;
    that.GetData(page);
  },
  //券类型选择
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
      couponType: index - 1,
      typeName: value
    })
    page = 1;
    that.GetData(page);
  },
  onCancel(e) {

    let that = this;
    that.setData({
      show2: false
    })
  },
  onClose(e) {

    let that = this;
    that.setData({
      show2: false
    })
  },

  //商铺选择
  onConfirm1(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    console.log(`当前值：${value.GroupName}, 当前索引：${index}`);

    let that = this;
    that.setData({
      show1: false,
      GroupID: value.GroupID,
      GroupName: value.GroupName
    })
    page = 1;
    that.GetData(page);
  },
  onCancel1(e) {
    let that = this;
    that.setData({
      show1: false
    })
  },
  onCancel2(e) {
    let that = this;
    that.setData({
      show3: false
    })
  },
  onClose1(e) {
    let that = this;
    that.setData({
      show1: false
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

  }
})