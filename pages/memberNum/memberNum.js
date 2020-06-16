// pages/memberNum/memberNum.js
let utils = require("../../utils/util.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types:0,//0代表会员1券
    State:0,//0会员总数1新会员数   0已领1核销
   DataList:{},
   Pgaecount:1,
   Count:0,
   time:"",
   pageIndex:1,
   pGroupID:0,
   search:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        types:options.types,
        time:options.time||"",
        State:options.State,
        pGroupID:options.GroupID
      });
        if(options.types==0){
          this.UserQuery();
        }else{
          this.CouponQuery();
        }
  },
  username:function(event){
    this.setData({
      search:event.detail.value
    });
  },
  seacrh:function(){
    if(this.data.types==1){
      this.UserQuery();
    }else{
      this.CouponQuery();
    }
  },
UserQuery:function(){
  wx.showLoading({
    title: '数据加载中...',
  })
  var data={
    pageIndex:this.data.pageIndex,
    pageSize:10,
    GroupID:this.data.pGroupID,
    time:this.data.time,
    search:this.data.search
  };
  utils.AjaxRequest(app.globalData.apiurl + "CouponView/withdrawalAccountView/UserdetailsList", "POST", data, app.globalData.appkeyid, this.UserdetailsList)
},
UserdetailsList:function(res){
  wx.hideLoading();
  var json=res.data.Data;
  var chat=this;
  if(json.flag){
    if (chat.data.pageIndex == 1) {
      chat.setData({
        DataList: json.data || null,
        Count: json.count,
        Pgaecount: json.pageCount //你的总页数   
      });
    } else {
      //获取上次加载的数据
      var oldlists = chat.data.DataList;
      var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
      chat.setData({
        DataList: newlists,
        Pgaecount: json.pageCount, //你的总页数   
        Count: json.count,
      });
    }
    chat.setData({pageIndex:chat.data.pageIndex+1});
  }

},

CouponQuery:function(){
  wx.showLoading({
    title: '数据加载中...',
  })
  var data={
    pageIndex:this.data.pageIndex,
    pageSize:10,
    GroupID:this.data.pGroupID,
    time:this.data.time,
    State:this.data.State,
    search:this.data.search
  };
  utils.AjaxRequest(app.globalData.apiurl + "CouponView/withdrawalAccountView/CoupondetailsList", "POST", data, app.globalData.appkeyid, this.UserdetailsList)
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
      if(this.data.pageIndex>this.data.Pgaecount){
        return;
      }
      if(this.data.types==0){
        this.UserQuery();
      }else{
        this.CouponQuery();
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})