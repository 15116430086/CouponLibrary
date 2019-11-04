// pages/sendTicketMes/sendTicketMes.js
const time = require("../../utils/util.js"); //根据自己项目的位置而定
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentDate: new Date().getTime(),
        minDate: new Date().getTime(),
        columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
        columns1: ["长沙", "长安", "长春", "嘉兴", "湖州"],

        show1: false,
        show2: false,
        show3: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    onClose(e) {
        let that = this;
        that.setData({
            show3: false
        })

    },
    showPopup1() {

        let that = this;
        that.setData({
            show1: true
        })
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
        console.log(time.formatTime(timestamp));

        let that = this;
        that.setData({
            show3: false
        })
    },
    //券选择
    onConfirm(event) {
        const { picker, value, index } = event.detail;
        console.log(`当前值：${value}, 当前索引：${index}`);

        let that = this;
        that.setData({
            show2: false
        })

    },
    onCancel(e) {

        let that = this;
        that.setData({
            show2: false
        })
    },
    onClose(e) {

        let that = this;
        that.setData({
            show2: false
        })
    },

    //商铺选择
    onConfirm1(event) {
        const { picker, value, index } = event.detail;
        console.log(`当前值：${value}, 当前索引：${index}`);

        let that = this;
        that.setData({
            show1: false
        })

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