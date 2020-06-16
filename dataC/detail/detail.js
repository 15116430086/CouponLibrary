// data/detail/detail.js
let utils = require("../../utils/util.js")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        timeBox: [{
                id: 1,
                txt: '今天'
            },
            {
                id: 2,
                txt: '三天内'
            },
            {
                id: 3,
                txt: '一周内'
            },
            {
                id: 4,
                txt: '一个月内'
            }
        ],
        date: "日期",
        idx: 1,
        currentDate: new Date().getTime(),
        minDate: new Date().getTime(),
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            } else if (type === 'month') {
                return `${value}月`;
            }
            return value;
        },
        databox: [{
                name: "访问深度",
                span: "(页面访问人数)",
                data: [{
                        tname: "首页",
                        num: "20" + `人`
                    },
                    {
                        tname: "券详情",
                        num: "80" + `人`
                    },
                    {
                        tname: "店铺页",
                        num: "61" + `人`
                    },
                    {
                        tname: "我的券",
                        num: "20" + `人`
                    },
                    {
                        tname: "订单页",
                        num: "40" + `人`
                    },
                    {
                        tname: "个人中心",
                        num: "60" + `人`
                    },
                ]
            },
            {
                name: "券动态",
                span: "(券/张)",
                data: [{
                        tname: "商户发券",
                        num: "99999" + `张`
                    },
                    {
                        tname: "会员领券",
                        num: "80" + `张`
                    },
                    {
                        tname: "券核销",
                        num: "61" + `张`
                    },
                    {
                        tname: "过期券",
                        num: "20" + `张`
                    },
                    {
                        tname: "过期券",
                        num: "40" + `张`
                    }
                ]
            },
            {
                name: "用户转化",
                span: "(/人员转化数)",
                data: [{
                        tname: "浏览人数",
                        num: "99999" + `人`
                    },
                    {
                        tname: "购券人数",
                        num: "480" + `人`
                    },
                    {
                        tname: "核券人数",
                        num: "561" + `人`
                    }
                ]
            }
        ],
        cell: [{
                id: 1,
                txt: '用户名'
            },
            {
                id: 2,
                txt: '分享次数'
            },
            {
                id: 3,
                txt: '打开次数'
            },
            {
                id: 4,
                txt: '注册人数'
            }
        ],
        cell1: [{
                id: 1,
                txt: '店铺名称'
            },
            {
                id: 2,
                txt: '售券数量'
            },
            {
                id: 3,
                txt: '核券数量'
            },
            {
                id: 4,
                txt: '过期数量'
            }
        ],
        mebCell: [{
                name: "遭不住的夏天已经来了a已经来了已经来了",
                share: 102,
                open: 2000,
                reg: 9999
            },
            {
                name: "遭不住的夏天已经来了a已经来了已经来了",
                share: 102,
                open: 2000,
                reg: 9999
            },
            {
                name: "遭不住的夏天已经来了a已经来了已经来了",
                share: 102,
                open: 2000,
                reg: 9999
            }
        ],
        shopCell: [{
                name: "愿者上钩纸包 鱼",
                share: 102,
                open: 2000,
                reg: 9999
            },
            {
                name: "闽医堂·推拿 养生",
                share: 102,
                open: 2000,
                reg: 9999
            },
            {
                name: "丽车缘汽车服 务中心(入驻)",
                share: 102,
                open: 2000,
                reg: 9999
            }
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    JumpPage:function(e){
        var tname = e.currentTarget.dataset.tname;
        switch(tname){
            case '商户发券':
            wx.navigateTo({
              url: '../MerchantIssuing/MerchantIssuing',
            })
            break;
        }
    },
    
    clkBtn(e) {
        let id = e.currentTarget.dataset.id;
        let that = this;

        that.setData({
            idx: id
        })
    },

    // 显示日期
    showTime(e) {
        let that = this;
        that.setData({ show: true, hidden: true });
    },

    // 日期选择
    confirmDate(e) {
        console.log(e.detail);
        let that = this;
        let timer = e.detail;
        timer = utils.formatTime(timer);
        console.log(timer)
        that.setData({
            date: timer,
            show: false,
            hidden: false
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