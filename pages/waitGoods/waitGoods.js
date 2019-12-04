// pages/waitGoods/waitGoods.js
var utils = require("../../utils/util.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderstate:"",
    orderid: "",
    type: "",
    Addressee:"",//收货人
    AddressInfo:"",//收货人地址
    Telephone:"",//联系电话
    TruePayMoney:"",//收款总额
    CouponName:"",//券名称
    CouponMoney:"",//券面额
    ReceivableMoney:"",//商品总价
    Postage:"",//运费
    Number:"",//购买总数
    WriteOffOrderID:"",//订单号
    CreateTime:"",//创建时间
    //商品图片
    ProductName:"",//商品名称
    SalePrice:"",//单价
    GroupName:"",//集团名称
    ImageOne:"",//图片
  },

  GetData: function () {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.pOrderID = that.data.orderid;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/GetOneOrderDetails", "POST", data, app.globalData.appkeyid, that.GetDataBack)
  },
  GetDataBack: function (json) {
    let that = this;
    var json = json.data.Data;
    wx.hideLoading();
    if (json.flag) {
      that.setData({
        Addressee: json.data[0].Addressee,//收货人
        AddressInfo: json.data[0].AddressInfo,//收货人地址
        Telephone: json.data[0].Telephone,//联系电话
        TruePayMoney: json.data[0].TruePayMoney,//收款总额
        CouponName: json.data[0].CouponName,//券名称
        CouponMoney: json.data[0].CouponMoney,//券面额
        ReceivableMoney: json.data[0].ReceivableMoney,//商品总价
        Postage: json.data[0].Postage,//运费
        Number: json.data[0].Number,//购买总数
        WriteOffOrderID: json.data[0].WriteOffOrderID,//订单号
        CreateTime: json.data[0].CreateTime,//创建时间
        ProductName: json.data[0].ProductName,//商品名称
        SalePrice: json.data[0].SalePrice,//单价
        GroupName:app.globalData.AppGroupInfo.GroupName,//集团名称
        ImageOne: json.data[0].ImageOne,//图片
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      orderstate: options.orderstate,
      orderid: options.orderid,
      type: options.type
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})