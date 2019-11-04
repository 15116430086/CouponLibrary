// pages/chooseTicket/chooseTicket.js
var utils = require("../../utils/util.js")
const app = getApp();
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
                address: "芙蓉区五一大道人瑞潇湘国际一楼213号"
            },
            {
                url: "/static/images/swp.png",
                address: "芙蓉区五一大道人瑞潇湘国际一楼213号"
            }
        ],

    },

    GetData: function () {
      var data = {};
      data.pGroupID = 100001;
      utils.AjaxRequest(apiUrl + "CouponView/CoupoInfoView/QueryCouponInfo", "POST", data, appKeyId, this.GetDataBack)
    },
    GetDataBack: function (json) {
      console.log(json);
      var data = json.data.Data;
      if (data) {
        console.log(data.msg);
      }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        console.log(that.data.imgUrls)
        that.setData({
            imgUrls: that.data.imgUrls
        })      
      that.GetData();
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})