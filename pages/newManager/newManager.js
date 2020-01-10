// pages/newManager/newManager.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        flag: false,
        show: false,
        showLevel: false,
        isFlag: false,
        list: [{
                imageOne: "/static/images/swp.png",
                name: "噢噢啊搜傲视OAOS撒是傲视噢噢啊搜傲视OAOS撒是傲视",
                isSel: false,
                block: [
                    { span: "潜在客户" },
                    { span: "一周多次消费" }
                ]
            },
            {
                imageOne: "/static/images/swp.png",
                name: "达摩无敌厉害啊",
                isSel: false,
                block: [

                ]
            },
        ],
        allSel: false,
        level: [{
                id: 1,
                title: "钻石渣渣"
            },
            {
                id: 2,
                title: "白金大神"
            },
            {
                id: 3,
                title: "黄金高手"
            }

        ],
        idx: ""
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

    //展开隐藏会员块 
    selBlock(e) {
        let that = this;
        let isFlag = that.data.isFlag;
        if (!isFlag) {
            that.setData({
                isFlag: !isFlag
            })
        } else {
            that.setData({
                isFlag: !isFlag
            })
        }
    },


    // 跳转会员等级管理
    jumpLevel(e) {
        wx.navigateTo({
            url: '../levelManager/levelManager?id=1&page=4',
        })
    },

    //跳转标签列表
    jumpSpan(e) {
        wx.navigateTo({
            url: '../spanList/spanList',
        })
    },

    //全选会员
    allSel(e) {
        let that = this;
        let allSel = that.data.allSel;
        let list = that.data.list;
        if (!allSel) {
            for (let i in list) {
                let newli = 'list[' + i + '].isSel';
                that.setData({
                    [newli]: true,
                    allSel: true
                })
            }
        } else {
            for (let i in list) {
                let newli = 'list[' + i + '].isSel';
                that.setData({
                    [newli]: false,
                    allSel: false
                })
            }
        }
    },

    //单选
    isSel(e) {
        let that = this;

        let index = e.currentTarget.dataset.index;
        let list = that.data.list
        let newli = 'list[' + index + '].isSel';
        that.setData({
            [newli]: !that.data.list[index].isSel
        })
    },


    //设置会员等级
    showLevel(e) {
        let that = this;
        that.setData({
            showLevel: true
        })
    },
    //隐藏会员等级
    onClose(e) {
        let that = this;
        that.setData({
            showLevel: false
        })
    },
    //单选等级
    isLevel(e) {
        let that = this;

        let id = e.currentTarget.dataset.id;
        that.setData({
            idx: id
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