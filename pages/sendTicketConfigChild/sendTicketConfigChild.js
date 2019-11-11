// pages/sendTicketConfigChild/sendTicketConfigChild.js
var utils = require("../../utils/util.js")
const app = getApp();
var mCouponID = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberchecked: true,
    staffchecked: true,
    AppointStaff:0,
    radio: '1',
    shopList: [{
        id: 1,
        name: 'B语言',
        isSelected: true,
        invalidActivty: [{
          cdName: "哈LOL",
          cdId: 1,
          cdType: true,
        }, {
          cdName: "bbbb",
          cdId: 2,
          cdType: true,
        }, {
          cdName: "ccc",
          cdId: 3,
          cdType: true,
        }]
      },
      {
        id: 1,
        name: 'Java',
        isSelected: true,
        invalidActivty: [{
          cdName: "eee",
          cdId: 1,
          cdType: true,
        }, {
          cdName: "ffff",
          cdId: 2,
          cdType: true,
        }, {
          cdName: "gggg",
          cdId: 3,
          cdType: true,
        }]
      }
    ]
  },

  GetData: function() {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    data.pCouponID = mCouponID;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetCouponGiveConfigItem", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function(json) {
    console.log(json);
    var json = json.data.Data;
    //隐藏 加载中的提示
    wx.hideLoading();
    if (json.flag) {
      console.log(JSON.stringify(json.data));
      this.setData({
        memberchecked: json.data.MemberCollar == 1,
        staffchecked: json.data.AppointStaff > 0,
        radio: json.data.AppointStaff.toString(),
        shopList: json.data.ListCoupon_ShopInfo
        
      });
    } else {
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
    mCouponID = options.CouponID;

    let that = this;
    that.GetData();
  },
  // onChange({ detail,e }) {
  //     console.log(detail,e)
  //         // 需要手动对 checked 状态进行更新
  //     this.setData({ checked: detail });
  // },
  onChange(e) {
    console.log(e);
    let that = this;
    let detail = e.detail;
    let index = e.currentTarget.dataset.index;
    if (index == 1) {
      that.setData({
        memberchecked: detail
      })
    } else {
      // 需要手动对 checked 状态进行更新
      that.setData({
        staffchecked: detail,
        radio: "1"
      });
    }

  },
  radioChange(event) {
    console.log(event)
    this.setData({
      radio: event.detail
    });
  },
  onClick(event) {
    const {
      name
    } = event.currentTarget.dataset;
    this.setData({
      radio: name
    });
  },
  noop() {},
  itemSelected: function(e) {
    console.log(e)
    var findex = e.currentTarget.dataset.findex;
    var index = e.currentTarget.dataset.index;

    this.data.shopList[findex].ListCoupon_GiveConfigStaff[index].cdType = !this.data.shopList[findex].ListCoupon_GiveConfigStaff[index].cdType;

    this.setData({
      shopList: this.data.shopList,
    });
  },
  isOpen(e) {
    var that = this;
    var idx = e.currentTarget.dataset.index;
    console.log(idx);
    that.data.shopList[idx].IsSelected = !that.data.shopList[idx].IsSelected;
    var isSelected = that.data.shopList[idx].IsSelected ;
    var shopStaffConfig = that.data.shopList[idx].ListCoupon_GiveConfigStaff
    for (let i in shopStaffConfig) {
      that.data.shopList[idx].ListCoupon_GiveConfigStaff[i].cdType = isSelected
    }
    that.setData({
      shopList: that.data.shopList
    });
    return true;

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