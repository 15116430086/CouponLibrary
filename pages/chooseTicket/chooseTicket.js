// pages/chooseTicket/chooseTicket.js
var utils = require("../../utils/util.js")
const app = getApp();
var page = 1; //初始化页数
var regionData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    multiArray: [],
    multiIndex: [17, 0, 0],
    lastpage: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    color: "#FFF0DE",
    activeColor: "#E85819",
    imgUrls: [],
    section: [],
    IndustryCode:"C1",
    currentIds: 'C1', 
    hotTicketBox: [],
    currentID: "1",
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
    shopArrays: [],

  },
  bindcancel: function() {
    wx.showLoading({
      title: '数据加载中...',
    })
  },
  onQuickTap: function() {
    wx.navigateTo({
      url: '../fastGet/fastGet',
    })
  },
  getTicketList: function() {
    wx.navigateTo({
      url: '../getTicketList/getTicketList?quick=0&data=""',
    })
  },
  onBindReceiveTap: function(event) {
    wx.navigateTo({
      url: '../ticketMes/ticketMes?CouponID=' + event.currentTarget.dataset.couponid + '&ReleaseID=' + event.currentTarget.dataset.releaseid,
    })
  },
  onGroupDetailsTap: function(event) {
    var oGroupID = event.currentTarget.dataset.groupid;
    if (oGroupID != "") {
      wx.navigateTo({
        url: '../groupMes/groupMes?GroupID=' + event.currentTarget.dataset.groupid
      })
    }
  },
  onBindBotOneTap: function(event) {
    let that = this;
    if (event.target.id != that.data.currentID)
      wx.redirectTo({
        url: '../myTicket/myTicket'
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
    data.pAffiliatedGroupID = app.globalData.AppGroupInfo.AffiliatedGroupID;
    data.pPageIndex = page;
    data.pPageSize = 20;
    data.pLatitudeX = app.globalData.latitudeX;
    data.pLongitudeY = app.globalData.longitudeY;
    data.pIndustryCodeSingle= that.data.IndustryCode == "C1" ?"": that.data.IndustryCode,
    data.pRegionID = that.data.RegionName != '' ? that.data.RegionName : app.globalData.regionName;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/QueryCouponInfo", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function(json) {
    let that = this;
    //console.log(json);
    var json = json.data.Data;
    //隐藏 加载中的提示
    wx.hideLoading();
    if (json.flag) {
      //console.log(json.msg);
      if (page == 1) {
        var banner = [];
        var popular = [];
        var extension = [];
        json.data.forEach(item => {
          //console.log(JSON.stringify(item));
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

        if (json.bflag) {
          banner = banner.concat(json.Banner);
        }

        that.setData({
          images: banner,
          imgUrls: popular,
          shopArrays: extension,
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
        var banner = [];
        if (json.bflag) {
          banner = banner.concat(json.Banner);
        }
        that.setData({
          images: banner,
          imgUrls: [],
          shopArrays: [],
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
    console.log(app.globalData.regionName);
    that.setData({
      RegionName: "所有地区"
    })

    page = 1;
    that.GetData(page);
    that.GetRegionIndustry();
    that.GetCouponIndustry();
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
        currentIds: id,
        IndustryCode: industryCode,
      })      
      page=1,
      that.GetData(page);
  },

  GetCouponIndustry: function () { //获取行业数据
    var datas = {
      pGID: app.globalData.AppGroupInfo.GroupID,
      pGradeID: app.globalData.AppWxUserInfo.GradeID,
      State: 0
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
        currentIds: chat.data.IndustryCode        
      });
      chat.setData({        
        itemindex:chat.data.IndustryCode
      });
    }   
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

    page = 1;
    this.GetData(page);
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

    page = 1;
    this.GetData(page);
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
  },
  getLocation: function() {
    //显示 加载中的提示
    wx.showLoading({
      title: '正在获取你的地理位置...',
    })
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      isHighAccuracy: true,
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