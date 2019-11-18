// pages/startTicket/startTicket.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        contents: [{
                id: '001',
                title: '自营店铺',
                isSel: false
            },
            {
                id: '002',
                title: '指定商户',
                isSel: false
            }
        ],
        idx: "",
        shows: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    selChoose(e) {
        let that = this;
        let id = e.currentTarget.dataset.id;
        that.setData({
            idx: id
        })
        if (id == "002") {
            wx.navigateTo({
                url: "../shopChoose/shopChoose"
            })
        }
    },
    showHide(e) {
        let that = this;
        that.setData({
            shows: (!that.data.shows)
        })

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