// data/detail/detail.js
let utils = require("../../utils/util.js")
const app = getApp();
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
                id: 3,
                txt: '三天内'
            },
            {
                id: 7,
                txt: '一周内'
            },
            {
                id: 30,
                txt: '一个月内'
            }
        ],
        sdate: "选择日期",
        edate: "选择日期",
        idx: 1,
        currentDate: new Date().getTime(),
        minDate: new Date('2020-01-01').getTime(),
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            } else if (type === 'month') {
                return `${value}月`;
            }
            return value;
        },
        databox: [],
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
                txt: '商户名称'
            },
            {
                id: 2,
                txt: '发券数量'
            },
            {
                id: 3,
                txt: '售券数量'
            },
            {
                id: 4,
                txt: '核券数量'
            }
        ],
        mebCell: [],
        shopCell: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       
    },

    GetData: function () {
        wx.showLoading({
          title: '数据加载中...',
        })
        var data = {};
        data.startTime = this.data.sdate;
        data.endTime = this.data.edate;
        data.dayNum = this.data.idx;
        data.AffiliatedGroupID = app.globalData.AppGroupInfo.AffiliatedGroupID;
        utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponHomeView/GetDataAnalysisHome", "POST", data, app.globalData.appkeyid, this.GetDataBack)
    },

    GetDataBack: function (json) {
        wx.hideLoading();
        var json = json.data.Data;
        if (json.flag) {
            this.setData({
                databox: json.DataCount,
                mebCell: json.ShareRanking,
                shopCell: json.SellCouponRanking
            })
        }
    },

    JumpPage: function (e) {
        var tname = e.currentTarget.dataset.tname;
        switch(tname){
            case '首页':
            wx.navigateTo({
              url: '../PageAccessDetails/PageAccessDetails?type=0',
            })
            break;
            case '券详情':
            wx.navigateTo({
              url: '../PageAccessDetails/PageAccessDetails?type=4',
            })
            break;
            case '商户发券':
                wx.navigateTo({
                    url: '../MerchantIssuing/MerchantIssuing',
                })
                break;
            case '会员领券':
                wx.navigateTo({
                    url: '../UserReceiveCoupon/UserReceiveCoupon?type=0',
                })
                break;
            case '券核销':
                wx.navigateTo({
                    url: '../UserReceiveCoupon/UserReceiveCoupon?type=1',
                })
                break;
            case '已退券':
                wx.navigateTo({
                    url: '../UserReceiveCoupon/UserReceiveCoupon?type=2',
                })
                break;
            case '过期券':
                wx.navigateTo({
                    url: '../UserReceiveCoupon/UserReceiveCoupon?type=3',
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
        that.GetData();
    },

    // 显示日期
    showTime(e) {
        let that = this;
        that.setData({
            show: true,
            hidden: true,
            datatype: e.currentTarget.dataset.datetype
        });
    },

    // 日期选择
    confirmDate(e) {
        console.log(e.detail);
        let that = this;
        let timer = e.detail;
        timer = utils.formatTime(timer);
        console.log(timer)
        if (that.data.datatype == 0) {
            that.setData({
                sdate: timer,
                show: false,
                hidden: false,
                idx: 0
            })
        }
        if (that.data.datatype == 1) {
            that.setData({
                edate: timer,
                show: false,
                hidden: false,
                idx: 0
            })            
        }

        that.GetData();
    },
    onClose() {
        this.setData({
            show: false
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.GetData();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})