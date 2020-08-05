// pages/sendTicketConfig/sendTicketConfig.js
var utils = require("../../utils/util.js")
const app = getApp();
var page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    couponList: [],
    lastpage: 0,
    section: [],
    IndustryCode:"C1",
    currentId: 'C1', 
    isshow:false,
    startX: 0, //开始坐标
    startY: 0, 
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
    data.pPageSize = 30;
    data.pSearchName = that.data.searchValue;
    data.pIndustryCode= that.data.IndustryCode == "C1" ?"": that.data.IndustryCode,
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetCouponGiveConfig", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function(json) {
    let that = this;
    var json = json.data.Data;
    //隐藏 加载中的提示
    wx.hideLoading();
    if (json.flag) {
      console.log(json.msg);
      if (page == 1) {
        that.setData({
          couponList: json.data,
          isshow:false,
          lastpage: json.pageCount //你的总页数   
        });
      } else {
        //获取上次加载的数据
        var oldlists = that.data.couponList;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据

        that.setData({
          couponList: newlists,
          lastpage: json.pageCount //你的总页数   
        });
      }

    } else {
      if (page == 1) {
        that.setData({
          couponList: [],
          isshow:true 
        });
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
    page = 1;
    that.GetData(page);
    that.GetCouponIndustry();
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
      var couponList = that.data.couponList;
      couponList[index].txtStyle = txtStyle;
      //更新列表的状态
      that.setData({
        couponList: couponList
      });
    }
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.couponList.forEach(function (v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      couponList: this.data.couponList
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
    that.data.couponList.forEach(function (v, i) {
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
      couponList: that.data.couponList
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
  delBtn(e){
    console.log(e)
  },

  onbindblur: function(e) {
    this.setData({
      searchValue: e.detail.value
    })
  },
  onSearch: function(event) {
    let that = this;
    page = 1;
    that.GetData(page);
  },


  UpdateCouponInfoState:function(e){
    let that = this;
    var CouponID = e.currentTarget.dataset.couponid;
    wx.showModal({
      title: '提示',
      content: '确定下架吗？',
      success(res) {
        if (res.confirm) {
          var data = {};
          data.pCouponID = CouponID;
          data.pState = 0;
          utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/UpdateCouponInfoState", "POST", data, app.globalData.appkeyid, that.GetUpdateCouponInfoState)
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
    }
  })
  },

  GetUpdateCouponInfoState:function(json){
    let that = this;
    var json = json.data.Data;
    //隐藏 加载中的提示
    wx.hideLoading();
    if (json.flag) {
      that.GetData();
    }
    wx.showToast({
      title: json.msg,
      icon: 'none',
      duration: 2000
    })
  },

  handleTap: function (e) {
    let that = this
    let id = e.currentTarget.dataset.id;
    var industryCode=id;
    if (id == 1) {
      industryCode = "C1";
    }
      that.setData({
        isshow:false,
        currentId: id,
        IndustryCode: industryCode,
      })      
      page=1,
      that.GetData(page);
  },

  GetCouponIndustry: function () { //获取行业数据
    var datas = {
      pGID: app.globalData.AppGroupInfo.GroupID,
      pGradeID: app.globalData.AppWxUserInfo.GradeID
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponIndustryView/GetCouponIndustry", "POST", datas, app.globalData.appkeyid, this.GetCouponIndustryList);
  },
  GetCouponIndustryList: function (res) {
    var json = res.data.Data;
    var chat = this;
    var section = [{
      IndustryName: "全部",
      IndustryCode: "C1",      
    }];
    if (json.flag) {

      var newlists = section.concat(json.data) //合并数据 res.data 你的数组数据
      chat.setData({
        section: newlists,
        currentId: chat.data.IndustryCode        
      });
      chat.setData({        
        itemindex:chat.data.IndustryCode
      });
    }
   
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
    this.onLoad()
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