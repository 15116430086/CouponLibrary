// pages/chooseTicket/chooseTicket.js
var utils = require("../../utils/util.js")
const app = getApp();
var page = 1; //初始化页数
var apiUrl = app.globalData.apiurl;
var appKeyId = app.globalData.appkeyid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [{
        url: "/static/images/swp.png"
      },
      {
        url: "/static/images/swp.png"
      }
    ],
    lastpage: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    color: "#FFF0DE",
    activeColor: "#E85819",
    imgUrls: [{
        url: "/static/images/swp.png",
        title: "AA"
      },
      {
        url: "/static/images/swp.png",
        title: "BB"
      },
      {
        url: "/static/images/swp.png",
        title: "CC"
      },
      {
        url: "/static/images/swp.png",
        title: "DD"
      },
      {
        url: "/static/images/swp.png",
        title: "EE"
      },
      {
        url: "/static/images/swp.png",
        title: "GG"
      }
    ],
    hotTicketBox: [{
        url: "/static/images/swp.png",
        id: 1
      },
      {
        url: "/static/images/swp.png",
        id: 2
      }
    ],
    BotOne: [{
        url: "/static/images/pt1.png",
        title: "平台选券",
        color: "#E85819",
        id: 1
      },
      {
        url: "/static/images/me2.png",
        title: "我的券",
        color: "#999999",
        id: 2
      }
    ],
    shopArrays: [{
        url: "/static/images/swp.png",
        address: "芙蓉区五一大道人瑞潇湘国际一楼213号",
        name: "123"
      },
      {
        url: "/static/images/swp.png",
        address: "芙蓉区五一大道人瑞潇湘国际一楼213号",
        name: "123"
      }
    ],

  },

  getTicketList: function() {
    wx.navigateTo({
      url: '../getTicketList/getTicketList',
    })
  },

  GetData: function(page) {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    data.pPageIndex = page;
    data.pPageSize = 1;
    data.pLatitudeX = app.globalData.latitudeX;
    data.pLongitudeY = app.globalData.longitudeY;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/QueryCouponInfo", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function(json) {
    let that = this;
    console.log(json);
    var json = json.data.Data;
    if (json.flag) {
      console.log(json.msg);
      if (page == 1) {
        var banner = [];
        var popular = [];
        var extension = [];
        json.data.forEach(item => {
          console.log(JSON.stringify(item));
          if (item.Attribute == 3) {
            banner.push(item);
          }
          if (item.Attribute == 2) {
            popular.push(item);
          }
          if (item.Attribute == 1) {
            extension.push(item);
          }
          if (item.Attribute == 0) {

          }

        });

        that.setData({
          images: json.data,
          imgUrls: json.data,
          shopArrays: json.data,
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
    }

    //隐藏 加载中的提示
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success(res) {
              that.getLocation();
            },
            fail(res)
            {
              page = 1;
              that.GetData(page);
            }
          })
        } 
        else
        {
          that.getLocation();
        }        
      }
    })
  },

  getLocation: function() {
    //显示 加载中的提示
    wx.showLoading({
      title: '正在获取你的地理位置...',
    })
    let that=this;
    wx.getLocation({
      type: 'gcj02',
      altitude:true,
      isHighAccuracy:true,
      success(res) {
        console.log(JSON.stringify(res));
        app.globalData.latitudeX = res.latitude
        app.globalData.longitudeY = res.longitude

        /*wx.chooseLocation({
          latitude,
          longitude,
          success(res) {
            console.log(res);
          }
        })*/
      },
      complete(res) {
        //隐藏 加载中的提示
        wx.hideLoading();
        page = 1;
        that.GetData(page);
      }
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