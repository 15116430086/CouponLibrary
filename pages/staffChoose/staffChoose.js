// pages/staffChoose/staffChoose.js
var utils = require("../../utils/util.js")
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        applyList: [
            {}
        ],
        pageIndex:1,
        Paging: true,
        shopid:"",
        


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      this.setData({shopid:options.shopid});
      var datas = {
        pageIndex: this.data.pageIndex,
        pageSize: 5,
        ShopID: options.shopid,
        IsShopowner: 0
      }
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/ShopStaff", "POST", datas, app.globalData.appkeyid, this.ShopStaffList);
    },
  ShopStaffList: function (res) {
    var chat = this;
    var json = res.data.Data;
    if (json.flag) {
      if (chat.data.pageIndex == 1) {
        chat.setData({
          applyList: json.data || null,
        });
      } else {
        //获取上次加载的数据
        var oldlists = chat.data.datalist;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
        chat.setData({
          applyList: newlists,
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
        title: json.msg,
        icon: "none"
      });
    }
  },
    selectApply: function(e) {
        var index = e.currentTarget.dataset.index;
        let that = this;
        let applyList = that.data.applyList;
        var item = applyList[index];
        item.isSelect = !item.isSelect;
        this.setData({
            applyList: this.data.applyList,
        });
    },
  onReachBottom: function () {
    if (this.data.Paging) {
      var datas = {
        pageIndex: this.data.pageIndex,
        pageSize: 5,
        ShopID: this.data.shopID,
        IsShopowner: 0
      }
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/ShopStaff", "POST", datas, app.globalData.appkeyid, this.ShopStaffList);
    }
  },
  addStaff: function (event) {
    wx.navigateTo({
      url: '../doorScan/doorScan?shopid=' + this.data.shopID,
    })
  },

})