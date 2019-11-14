// pages/watchMes/watchMes.js
var utils = require("../../utils/util.js")
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      pageIndex:1,
     pCouponID:"",
     datalist:[{}],
    CouponInfo:{},
    Paging: true//是否可以加载下一页
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ pCouponID: options.CouponID});
    var datas = {
      pCouponID: options.CouponID,
      pPageIndex: this.data.pageIndex,
      pPageSize: 5
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetCouponReleaseInfo", "POST", datas, app.globalData.appkeyid, this.GetCouponReleaseInfo);
  },

  GetCouponReleaseInfo:function(res){
    var chat=this;
      var json=res.data.Data;
      if(json.flag){
        if(chat.data.pageIndex==1){
            chat.setData({
            datalist: json.ReleaseList,
            CouponInfo: json.CouponInfo
          });
        }else{
          var oldlists = chat.data.datalist;
          var newlists = oldlists.concat(json.ReleaseList) //合并数据 res.data 你的数组数据
          chat.setData({
            datalist: newlists,
          });
        }
        if (json.pageCount <= chat.data.pageIndex) {//说明当前页已经超出总页数了
          chat.setData({ Paging: false });//不能再分页
        }
        chat.setData({
          pageIndex: parseInt(chat.data.pageIndex + 1)
        });

          
      }else{
        wx.showToast({
          title: json.msg,
          icon: "none"
        });
      }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    if (this.data.Paging){
      var datas = {
        pCouponID: this.data.pCouponID,
        pPageIndex: this.data.pageIndex,
        pPageSize: 5
      }
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetCouponReleaseInfo", "POST", datas, app.globalData.appkeyid, this.GetCouponReleaseInfo);
    }
  },
  See:function(event){
    var releaseid = event.currentTarget.dataset.releaseid
   wx.navigateTo({
     url: '../watchMesOne/watchMesOne?releaseid=' + releaseid,
   })
  }
})