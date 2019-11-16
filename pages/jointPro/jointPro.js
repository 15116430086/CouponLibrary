// pages/jointPro/jointPro.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentId: '1',
        section: [{
            name: '联名促销产品',
            typeId: '1'
        }, {
            name: '联名促销券',
            typeId: '2'
        }],
        result: ['b'],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    //点击每个导航的点击事件
    handleTap: function(e) {
        let id = e.currentTarget.id;
        console.log(id)
        if (id) {
            this.setData({
                currentId: id
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