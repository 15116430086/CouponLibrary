// pages/sendTicketMes/sendTicketMes.js
var utils = require("../../utils/util.js")
const app = getApp();
var page = 1;
var pageM = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentId:0,
    img1: [
      {
        txt: "推广订单",
        id:0
      },
      {
        txt: "推广会员",
        id:1
      }
    ],
    Odernumber: 0,
    TruePayMoneyCount: 0,
    FirstConsumeCount: 0,
    FirstConsumeMoneryCount: 0,
    PromotionorderList: [],
    PromotionmembersList:[],
    lastpage: 0,
    GroupID: 0,
    couponType: -1,
    shopID:0,
    selectDateStart: "开始日期",
    GroupName: "全部店铺",
    selectDate: "结束日期",
    currentDateStart: new Date().getTime(),
    currentDate: new Date().getTime(),
    maxDate: new Date().getTime(),
    minDate: new Date("2020-01-01").getTime(),
    formatterStart(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else {
        return `${value} 日`;
      }
      return value;
    },
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
 
  clkTab(e){
    let id = e.currentTarget.dataset.id;
    if(id==0){

    }else{

    }
    let that = this;
    that.setData({
      currentId: id
    })
    that.GetData();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    page = 1;
    //that.GetData(page);

    var timestamp = new Date().getTime();
    var dateEnd = utils.sysFormatDate(utils.formatTime(timestamp), "yyyy-MM-dd");

    var dataTime = timestamp - 24 * 60 * 60 * 6 * 1000;
    var dataStart = utils.sysFormatDate(utils.formatTime(dataTime), "yyyy-MM-dd");
    that.setData({
      GroupName: app.globalData.AppGroupInfo.GroupName,
      GroupID:app.globalData.AppGroupInfo.GroupID,
      selectDate: dateEnd,     
      selectDateStart:dataStart,
      currentDateStart:dataTime,
    })

    if(app.globalData.AppGroupInfo.GroupID == app.globalData.AppGroupInfo.AffiliatedGroupID){
      that.setData({         
        shopID:0
      })
    }
    if(app.globalData.AppGroupInfo.GroupID == app.globalData.AppGroupInfo.AffiliatedGroupID){
    that.GetShopList();
    }
  },
 
  GetData: function() {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var pageindex = pageM[that.data.currentId].page;
    var state = pageM[that.data.currentId].state;

    var data = {};
    data.pageIndex = pageindex;
    data.pageSize = 20;    
    data.AffiliatedGroupID = app.globalData.AppGroupInfo.AffiliatedGroupID;
    data.ShopID = that.data.shopID;
    data.startCreateDate = that.data.selectDateStart;
    data.endCreateDate = that.data.selectDate;
    if(state==1){      
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/OperatorfundsView/Promotionorder", "POST", data, app.globalData.appkeyid, that.GetDataBack)
    }
    else
    {
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/OperatorfundsView/Promotionmembers", "POST", data, app.globalData.appkeyid, that.GetDataBack)
    }    
  },
  GetDataBack: function(json) {
    let that = this;
    //隐藏 加载中的提示
    wx.hideLoading();
    var json = json.data.Data;
    if (json.flag) {
      pageM[that.data.currentId].lastpage = json.pageCount
      if (that.data.currentId == 0) {

        pageM[that.data.currentId].iscleck = false;

        if (pageM[that.data.currentId].page == 1) {
          that.setData({
            PromotionorderList: json.data,
            Odernumber: json.Odernumber,
            TruePayMoneyCount: json.TruePayMoneyCount,
            FirstConsumeCount: json.FirstConsumeCount,
            FirstConsumeMoneryCount: json.FirstConsumeMoneryCount
          })
        } else {
          //获取上次加载的数据
          var oldlists = that.data.PromotionorderList;
          var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据

          that.setData({
            PromotionorderList: newlists
          });
        }
      }

      if (that.data.currentId == 1) {
        pageM[that.data.currentId].iscleck = false;
        if (pageM[that.data.currentId].page == 1) {
          that.setData({
            PromotionmembersList: json.data
          })
        } else {
          //获取上次加载的数据
          var oldlists = that.data.PromotionmembersList;
          var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据

          that.setData({
            PromotionmembersList: newlists
          });
        }
      }
    } else {
      if (that.data.currentId == 0) {
        if (pageM[that.data.currentId].page == 1) {
            that.setData({
              PromotionorderList:[],
              Odernumber: 0,
              TruePayMoneyCount: 0,
              FirstConsumeCount: 0,
              FirstConsumeMoneryCount: 0
            })
        }
      }
      else if (that.data.currentId == 1) {
        if (pageM[that.data.currentId].page == 1) {
          that.setData({
            PromotionmembersList:[]
          })
        }
      }
      pageM[that.data.currentId].iscleck = false;
      wx.showToast({
        title: '暂无数据!',
        icon: "none",
        duration: 2000
      })
    }    
  },

  GetShopList: function() {
    var data = {};
    data.pAffiliatedGroupID = app.globalData.AppGroupInfo.AffiliatedGroupID;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/GetAffiliatedGroupIDShopList", "POST", data, app.globalData.appkeyid, this.GetShopListck)

  },
  GetShopListck: function(json) {
    let that = this;
    console.log(json);
    var json = json.data.Data;
    if (json.flag) {
      var shoplist = [{
        ShopName: "全部店铺",
        ShopID: 0
      }];
      shoplist = shoplist.concat(json.data)
      that.setData({
        shoplist: shoplist,
        ShopName:shoplist[0].ShopName
      })
    }
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

    pageM[that.data.currentId].page=1
    that.GetData();
  },

  confirmStart(event) {
    console.log(event.detail); // 打印出了时间
    let timestamp = event.detail;
    console.log(utils.formatTime(timestamp));
    console.log(utils.sysFormatDate(utils.formatTime(timestamp), "yyyy-MM-dd"));

    let that = this;
    that.setData({
      show2: false,
      selectDateStart: utils.sysFormatDate(utils.formatTime(timestamp), "yyyy-MM-dd")
    })

    pageM[that.data.currentId].page=1
    that.GetData();
  },

  //商铺选择
  onConfirm1(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    console.log(`当前值：${value.ShopName}, 当前索引：${index}`);

    let that = this;
    that.setData({
      show1: false,
      shopID: value.ShopID,
      ShopName: value.ShopName
    })
   pageM[that.data.currentId].page=1
    that.GetData();
  },
  onCancel1(e) {
    let that = this;
    that.setData({
      show1: false
    })
  },
  onClose1(e) {
    let that = this;
    that.setData({
      show1: false
    })
  },
  onCancel2(e) {
    let that = this;
    that.setData({
      show2: false
    })
  },
  onClose2(e) {
    let that = this;
    that.setData({
      show2: false
    })
  },
  onCancel3(e) {
    let that = this;
    that.setData({
      show3: false
    })
  },  
  onClose3(e) {
    let that = this;
    that.setData({
      show3: false
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
    let that = this;
    pageM = [{
      page: 1,
      lastpage: 0,
      state: 1,
      iscleck: true
    }, {
      page: 1,
      lastpage: 0,
      state: 2,
      iscleck: true
    }];    
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
    if (pageM[that.data.currentId].lastpage > pageM[that.data.currentId].page) {
      pageM[that.data.currentId].page++;
      that.GetData();
    } else if (pageM[that.data.currentId].lastpage == pageM[that.data.currentId].page) {
      pageM[that.data.currentId].page++
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