// pages/chooseBuyGoods/chooseBuyGoods.js
var utils = require("../../utils/util.js")
const app = getApp();
var page = 1; //初始化页数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    userlist: [],
    lastpage: 0,
    checked: false,
    totalRecords: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


  },
  onupdate: function (event) {
    var type = event.currentTarget.dataset.type;
    var productid = event.currentTarget.dataset.productid;
    wx.navigateTo({
      url: '../goodsEditor/goodsEditor?edit=1&type=' + type + '&productid=' + productid + '',
    })
  },

  onupdate: function(event) {
    var type = event.currentTarget.dataset.type;
    var productid = event.currentTarget.dataset.productid;
    wx.navigateTo({
      url: '../goodsEditor/goodsEditor?edit=1&type=' + type + '&productid=' + productid + '',
    })
  },

  onDeleteProductTap: function(event) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除商品【' + event.currentTarget.dataset.productname + '】?',
      success: function(res) {
        if (res.confirm) {
          var data = {}
          data.pProductID = event.currentTarget.dataset.productid;
          data.pGroupID = app.globalData.AppGroupInfo.GroupID;
          utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponProductView/DeleteProduct", "POST", data, app.globalData.appkeyid, that.DeleteProductBack)
          console.log('弹框后点确认')
        } else {
          console.log('弹框后点取消')
        }
      }
    })
  },
  DeleteProductBack: function(json) {
    let that = this;
    var json = json.data.Data;
    if (json.flag) {
      wx.showToast({
        title: json.msg,
        icon: "none",
        duration: 2000
      })
    } else {
      wx.showToast({
        title: json.msg,
        icon: "none",
        duration: 2000
      })
    }
    
    setTimeout(function () {
      page = 1;
      that.GetData();
    }, 2000);

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
    data.pState = 0;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponProductView/GetPageCouponProduct", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function(json) {
    let that = this;
    var json = json.data.Data;
    wx.hideLoading();
    if (json.flag) {
      console.log(json.msg);
      console.log(json)
      if (page == 1) {
        that.setData({
          totalRecords: json.totalRecords,
          userlist: json.data,
          lastpage: json.pageCount //你的总页数   
        });
        wx.setStorageSync("ProductCount", json.totalRecords);
      } else {
        //获取上次加载的数据
        var oldlists = that.data.userlist;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
        that.setData({
          totalRecords: json.totalRecords,
          userlist: newlists,
          lastpage: json.pageCount //你的总页数   
        });
        wx.setStorageSync("ProductCount", json.totalRecords);
      }
      that.setData({
        result: wx.getStorageSync("pArrProductKey")[0]
      });

    } else {
      if (page == 1) {
        that.setData({
          totalRecords: 0,
          userlist: [],
          lastpage: 0 //你的总页数   

        });
        wx.setStorageSync("ProductCount", 0);
      }
      wx.showToast({
        title: '没有找到相关数据!',
        icon: 'none',
        duration: 2000
      })
    }
  },

  onChange(event) {
    let that = this;

    console.log(event)
    this.setData({
      result: event.detail
    });

  },

  jumpBack(e) {
    let that = this;
    var pages = getCurrentPages()
    let thispage = pages[pages.length - 1]
    let parPage = pages[pages.length - 2] //上级页面
    let result = that.data.result;
    var checked = that.data.checked;
    if (checked) {

      if (that.data.totalRecords == 0) { //说明没有产品
        wx.showToast({
          title: '请新增产品',
          icon: 'none',
          duration: 2000
        })
        return;
      }
      //说明是全部产品
      wx.setStorageSync("ArrProductchecked", checked);
      wx.setStorageSync("pArrProductKey", "");
      wx.navigateBack({
        delta: 1
      })
    } else if (result) {
      parPage.setData({
        pArrProductID: [result]
      })
      wx.setStorageSync("pArrProductKey", [result]);
      wx.setStorageSync("ArrProductchecked", checked);
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.showToast({
        title: '请选择关联商品!',
        icon: 'none',
        duration: 2000
      })
    }

  },



  swChange(e) {
    console.log(e);
    let that = this;
    let detail = e.detail;
    let index = e.currentTarget.dataset.index;
    let checked = !that.data.checked;

    that.setData({
      checked: checked
    })
  },

  addcommodity: function() {
    wx.navigateTo({
      url: "../goodsEditor/goodsEditor?state=0"
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
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
    if (that.data.lastpage > page) {
      page++
      that.GetData(page);
    } else if (that.data.lastpage == page) {
      page++;
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