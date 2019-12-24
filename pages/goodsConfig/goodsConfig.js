// pages/goodsConfig/goodsConfig.js
var utils = require("../../utils/util.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:[],
    productid:"",
    pageIndex:1,
    datalist:[],
    stat:true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      productid: options.productid
    });
    var datas = {
      pGroupID: app.globalData.AppGroupInfo.GroupID,
      pageIndex: this.data.pageIndex,
      pageSize:10,
      ProductID: options.productid
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetTicketlist", "POST", datas, app.globalData.appkeyid, this.GetTicketlist);
  },
  GetTicketlist:function(res){
      var chat=this;
      var json=res.data.Data;
      if(json.flag){
         if(chat.data.pageIndex==1){
            chat.setData({
              datalist:json.data,
              pageIndex:chat.data.pageIndex+1,
              result: json.sData
            });
         }else{
           //获取上次加载的数据
           var oldlists = chat.data.datalist;
           var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
           var listresult = chat.data.result;
           var newlistresult = listresult.concat(json.sData)
           chat.setData({
             datalist: newlists,
             pageIndex: chat.data.pageIndex + 1,
             result: newlistresult
           });
         }
      }else{
        wx.showToast({
          title: "无数据",
          icon: "none"
        });
        chat.setData({ stat:false})
      }
  },
  onChange(event) {
    console.log(event.detail)
    this.setData({
      result: event.detail
    });
  },
  seve:function(e){
    if (this.data.result.length==0){
      wx.showToast({
        title: "请选择券",
        icon: "none"
      });
      return;
    }
   var data={
     ProductID: this.data.productid,
     pGroupID: app.globalData.AppGroupInfo.GroupID,
     stat: utils.syJsonSafe(this.data.result)
   }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/AddProductConfig", "POST", data, app.globalData.appkeyid, this.AddProductConfig);
  },
  AddProductConfig:function(res){
    var chat=this;
    var json = res.data.Data;
    if(json.flag){
      wx.showToast({
        title: "操作成功",
        icon: "none"
      });
      setTimeout(function(){
        wx.navigateTo({
          url: '../goodsManager/goodsManager',
        })
      },2000);
    }else{
      wx.showToast({
        title: "操作失败",
        icon: "none"
      });

    }
  },
  

  /**
   * 页面触底事件
   */
  onReachBottom: function () {
      if(this.data.stat){
        var datas = {
          pGroupID: app.globalData.AppGroupInfo.GroupID,
          pageIndex: this.data.pageIndex,
          pageSize: 10,
          ProductID: this.data.productid
        }
        utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetTicketlist", "POST", datas, app.globalData.appkeyid, this.GetTicketlist);
      }
  },


})