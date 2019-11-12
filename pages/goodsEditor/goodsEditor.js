// pages/goodsEditor/goodsEditor.js
var utils = require("../../utils/util.js")
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type:0, //0商品，1业务
        productid:'',
        productName:'',
        show: false
    },

//商品名称ProductName
  ProductNameInput: function (e) {
    this.setData({
      ProductName: e.detail.value
    })
  },
  //价格SalePrice
  SalePriceInput: function (e) {
    this.setData({
      SalePrice: e.detail.value
    })
  },
  //库存StockNum
  StockNumInput: function (e) {
    this.setData({
      StockNum: e.detail.value
    })
  },
  //分组Grouping
  GroupingInput: function (e) {
    this.setData({
      Grouping: e.detail.value
    })
  },
  //运费Postage
  PostageInput: function (e) {
    this.setData({
      Postage: e.detail.value
    })
  },
  //业务收费businesscharge
  BusinesschargeInput: function (e) {
    this.setData({
      Businesscharge: e.detail.value
    })
  },

  asd:function(e){
    wx.showToast({
      title: '请输入商品名称!',
      icon: "none",
      duration: 2000
    })
  },


  //点击发布按钮
  ReleaseProduct: function (event) {
    if (!this.data.ProductName) {
      wx.showToast({
        title: '请输入商品名称!',
        icon: "none",
        duration: 2000
      })
      return;
    }

    if(this.data.type==0){
      if (!this.data.SalePrice) {
        wx.showToast({
          title: '请输入价格!',
          icon: "none",
          duration: 2000
        })
        return;
      }
      if (!this.data.StockNum) {
        wx.showToast({
          title: '请输入库存!',
          icon: "none",
          duration: 2000
        })
        return;
      }
    }
    else if(this.data.type==1){
      if (!this.data.Businesscharge) {
        wx.showToast({
          title: '请输入业务收费!',
          icon: "none",
          duration: 2000
        })
        return;
      }
    }
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.pWriteOffOrderID = this.data.orderid;
    data.pState = 3;
    data.pCourierCompany = this.data.CourierCompany;
    data.pCourierNumber = this.data.CourierNumber;
    data.pExpressTel = this.data.ExpressTel

  },



  GetData: function () {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.pProductID = this.data.productid;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponProductView/GetCouponProductInfo", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function (json) {
    let that = this;
    var json = json.data.Data;
    wx.hideLoading();
    if (json.flag) {
      that.setData({
        productName:json.data[0].ProductName,
        salePrice: json.data[0].SalePrice,
        stockNum: json.data[0].StockNum
      })
    }
  },






    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      let that = this;
      that.setData({
        productid: options.productid,
        type: options.type
      })
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
    showPopup() {
        this.setData({ show: true });
    },

    onClose() {
        this.setData({ show: false });
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