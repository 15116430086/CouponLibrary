// pages/staffManagement /staffManagement .js
var utils = require("../../utils/util.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist: {},
    AdministratorsList: [],
    Paging: true,
    pageIndex: 1,
    shopID: "",
    state: false,
    startX: 0, //开始坐标
    startY: 0,
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shopID: options.ShopID
    });
    this.GetData();
  },

  ShopStaff: function (res) {
    var chat = this;
    var json = res.data.Data;

    if (json.flag) {
      let slist = this.data.AdministratorsList;
      slist = slist.concat(json.data)
      chat.setData({
        AdministratorsList: slist
      });
    } else {
      this.setData({
        Paging: false
      })
    }
  },

  GetData: function () {
    var datas = {
      pageIndex: 1,
      pageSize: 20,
      ShopID: this.data.shopID,
      IsShopowner: 1,
      StaffID: app.globalData.AppStaffInfo.StaffID
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/ShopStaff", "POST", datas, app.globalData.appkeyid, this.ShopStaff);

  },


  touchE: function (e) {
    // console.log(e);
    var that = this
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left:0rpx";

      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var AdministratorsList = that.data.AdministratorsList;
      AdministratorsList[index].txtStyle = txtStyle;
      //更新列表的状态
      that.setData({
        AdministratorsList: AdministratorsList
      });
    }
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.AdministratorsList.forEach(function (v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      AdministratorsList: this.data.AdministratorsList
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    that.data.AdministratorsList.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      AdministratorsList: that.data.AdministratorsList
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  // 删除按钮！
  delBtn(e) {
    let that = this;
    var StaffID = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      success(res) {
        if (res.confirm) {
          var datas = {}
          datas.StaffID = StaffID
          utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/deleteShopStaff", "POST", datas, app.globalData.appkeyid, that.deleteShopStaff);
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },

  deleteShopStaff: function (res) {
    let that = this;
    var json = res.data.Data;
    if (json.flag) {
      that.GetData();
    }
    wx.showToast({
      title: json.msg,
      icon: 'none',
      duration: 2000
    })
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
    if (this.data.Paging) {
      var datas = {
        pageIndex: ++this.data.pageIndex,
        pageSize: 20,
        ShopID: this.data.shopID,
        IsShopowner: 1,
        StaffID: app.globalData.AppStaffInfo.StaffID
      }
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/ShopStaff", "POST", datas, app.globalData.appkeyid, this.ShopStaff);
    }
  },
  addStaff: function (event) {
    wx.navigateTo({
      url: '/doorC/doorScan/doorScan?shopid=' + this.data.shopID,
    })
  },
  addAdministrators: function (event) {
    wx.navigateTo({
      url: '/doorC/staffChoose/staffChoose?shopid=' + this.data.shopID,
    })
  },
  Jurisdiction: function (event) { //设置权限
    var StaffID = event.currentTarget.dataset.staffid
    wx.navigateTo({
      url: '/doorC/thronesManagers/thronesManagers?staffid=' + StaffID + "&shopid=" + this.data.shopID,
    })

  }
})