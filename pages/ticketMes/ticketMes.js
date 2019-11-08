// pages/ticketMes/ticketMes.js
var utils = require("../../utils/util.js")
const app=getApp();
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
            },
            {
                url: "/static/images/swp.png"
            }
        ],
        height: "426rpx",
        ticketBox: [{
                num: "456",
                name: "临时停车收费券"
            },
            {
                num: "123",
                name: "临时停车收费券"
            }
        ],
      CouponID:"100110",
      ReceiveID:"4558897"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
       // this.data.CouponID=options.CouponID;
       // this.data.ReceiveID=options.ReceiveID;
      var datas = {
        ReceiveID: this.data.ReceiveID,
        groupId: 100001,//app.globalData.pGroupID,
        couponId: this.data.CouponID,
        LatitudeX: app.globalData.LatitudeX || "28.22778",
        LongitudeY: app.globalData.LongitudeY || "112.93886"

      }
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/collarCouponDetail", "POST", datas, app.globalData.appkeyid, this.collarCouponDetail)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
      
    },

  collarCouponDetail:function(json){
    console.log(json);

  }
})