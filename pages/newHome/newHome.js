// pages/newHome/newHome.js
var utils = require("../../utils/util.js")
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(app.globalData.AppGroupInfo.AffiliatedGroupID);
        let that = this;
        that.getData();
    },

    getData(e) {
        let data = {};
        let that = this;
        data.AffiliatedGroupID = app.globalData.AppGroupInfo.AffiliatedGroupID;
        utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponGroupView/ChannelHomepage", "POST", data, app.globalData.appkeyid, that.GetDataBack)
    },
    GetDataBack: function(json) {
        let that = this;
        console.log(json);
        let data = json.data.Data;
        if (data) {
            console.log(data.msg);
            that.setData({
                CouponCount: data,
                GroupName: app.globalData.AppShopInfo.ShopName
            })
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