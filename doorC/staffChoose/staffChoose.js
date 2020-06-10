// pages/staffChoose/staffChoose.js
var utils = require("../../utils/util.js")
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        applyList: [
            {}
        ],
        pageIndex:1,
        Paging: true,
        shopid:"",
        


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      this.setData({shopid:options.shopid});
      var datas = {
        pageIndex: this.data.pageIndex,
        pageSize: 5,
        ShopID: options.shopid,
        IsShopowner: 0
      }
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/ShopStaff", "POST", datas, app.globalData.appkeyid, this.ShopStaffList);
    },
  ShopStaffList: function (res) {
    var chat = this;
    var json = res.data.Data;
    if (json.flag) {
      if (chat.data.pageIndex == 1) {
        chat.setData({
          applyList: json.data || null,
        });
      } else {
        //获取上次加载的数据
        var oldlists = chat.data.datalist;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
        chat.setData({
          applyList: newlists,
        });
      }
      if (json.pageCount <= chat.data.pageIndex) {//说明当前页已经超出总页数了
        chat.setData({ Paging: false });//不能再分页
      }
      chat.setData({
        pageIndex: parseInt(chat.data.pageIndex + 1)
      });
      console.log(chat.data.applyList);
    } else {
      wx.showToast({
        title: json.msg,
        icon: "none"
      });
    }
  },
    selectApply: function(e) {
        var index = e.currentTarget.dataset.index;
        let that = this;
        let applyList = that.data.applyList;
        var item = applyList[index];
      if (item.isSelect =='false'){
        item.isSelect ='true'
      }else{
        item.isSelect = 'false'
      }
        //item.isSelect = !item.isSelect;
        this.setData({
            applyList: this.data.applyList,
        });
    },
  onReachBottom: function () {
    if (this.data.Paging) {
      var datas = {
        pageIndex: this.data.pageIndex,
        pageSize: 5,
        ShopID: this.data.shopID,
        IsShopowner: 0
      }
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/ShopStaff", "POST", datas, app.globalData.appkeyid, this.ShopStaffList);
    }
  },
  addStaff: function (event) {
    wx.navigateTo({
      url: '/doorC/doorScan/doorScan?shopid=' + this.data.shopID,
    })
  },
  addAdministration:function(event){
    var list="";
    for (var s in this.data.applyList){
      if (this.data.applyList[s].isSelect=='true'){
        list+=this.data.applyList[s].StaffID+",";
      }
    }
    if(list!=""){
      wx.showLoading({
        title: "数据提交中...",
        mask: true
      });
      var datas={
        item: list,
        shopID:this.data.shopid
      }
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/updateStaff", "POST", datas, app.globalData.appkeyid, this.updateStaff);
    }else{
      wx.showToast({
        title: "请选择店员",
        icon: "none"
      });

    }
  },
  updateStaff:function(res){
    var chat=this;
    var json=res.data.Data;
    if(json.flag){
      wx.showToast({
        title: "添加成功",
        icon: "none"
      });
      wx.redirectTo({
        url: "/doorC/staffManagements/staffManagements?ShopID=" + chat.data.shopid
      })
    }else{
      wx.showToast({
        title: "添加失败",
        icon: "none"
      });
    }
  }
})