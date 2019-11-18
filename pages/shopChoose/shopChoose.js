// pages/shopChoose/shopChoose.js
var utils = require("../../utils/util.js")
const app = getApp();
var page = 1;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        result: [],
        Grouplist: [], //集团数组对象
        huanlist: [],
        lastpage: 0,
        number: 0,
        shoplist: [],
        show2: false,
        industryName: "全部行业",
        industryCode: "",
        contactsOrTelephone: "",
        columns: [],
        showMask: false
    },

    //商品名称ProductName
    contactsOrTelephoneInput: function(e) {
        this.setData({
            contactsOrTelephone: e.detail.value
        })
    },

    search: function() {
        let that = this;
        that.GetData();
    },


    GetData: function() {
        let that = this;
        //显示 加载中的提示
        wx.showLoading({
            title: '数据加载中...',
        })
        var data = {};
        data.pageIndex = page;
        data.pageSize = 10;
        data.industryCode = that.data.industryCode;
        data.contactsOrTelephone = that.data.contactsOrTelephone;
        utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponGroupView/GetManagerGroupPage", "POST", data, app.globalData.appkeyid, this.GetDataBack)
    },
    GetDataBack: function(json) {
        let that = this;
        var json = json.data.Data;
        wx.hideLoading();
        if (json.flag) {
            console.log(json.msg);
            if (page == 1) {
                this.setData({
                    Grouplist: json.data,
                    lastpage: json.pageCount //你的总页数   
                });
            } else {
                //获取上次加载的数据
                var oldlists = that.data.Grouplist;
                var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
                that.setData({
                    Grouplist: newlists,
                    lastpage: json.pageCount //你的总页数   
                });
            }

            var checkdeList = wx.getStorageSync("resultkey")
            that.setData({
                result: checkdeList
            });

        } else {
            wx.showToast({
                title: '没有找到相关数据!',
                icon: 'none',
                duration: 2000
            })
        }
    },


    GetCouponIndustry: function() {
        let that = this;
        var data = {};
        data.State = 0
        utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponIndustryView/GetCouponIndustry", "POST", data, app.globalData.appkeyid, that.CouponIndustryBack)
    },

    CouponIndustryBack: function(json) {
        console.log(json);
        var json = json.data.Data;
        if (json) {
            console.log(json.msg);
            if (json.flag) {
                var columns = [{
                    text: "全部行业",
                    IndustryName: "全部行业",
                    IndustryCode: ""
                }];
                columns = columns.concat(json.data)
                this.setData({
                    columns: columns
                });
            }
        }
    },




    showPopup2() {

        let that = this;
        that.setData({
            show2: true
        })
    },


    //券类型选择
    onConfirm(event) {
        const {
            picker,
            value,
            index
        } = event.detail;
        console.log(`当前值：${value}, 当前索引：${index}`);

        let that = this;
        that.setData({
            show2: false,
            industryName: value.IndustryName,
            industryCode: value.IndustryCode
        })
    },
    onCancel(e) {

        let that = this;
        that.setData({
            show2: false
        })
    },


    isChoice: function(e) {
        let that = this;
        that.data.huanlist = [];
        for (let i in that.data.result) {
            that.setData({
                huanlist: that.data.huanlist.concat(that.data.Grouplist[that.data.result[i]])

            })
        }
        wx.setStorageSync("Groupkey", that.data.huanlist);
        wx.setStorageSync("resultkey", that.data.result);
        wx.navigateBackMiniProgram();
        console.log(that.data.huanlist);
        wx.navigateBack();
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        that.GetCouponIndustry();
        page = 1;
        that.GetData();
        var checkdeList = wx.getStorageSync("resultkey");
        this.setData({
            number: checkdeList.length
        });

    },

    shoptap: function(e) {
        let that = this;
        that.data.huanlist = [];
        for (let i in that.data.result) {
            that.setData({
                huanlist: that.data.huanlist.concat(that.data.Grouplist[that.data.result[i]])
            })
        }
        wx.setStorageSync("Groupkey", that.data.huanlist);
        wx.setStorageSync("resultkey", that.data.result);
        that.setData({
            showMask: (!that.data.showMask)
        })
    },
    downMask(e) {
        let that = this;
        that.setData({
            showMask: false
        })
    },
    onChange(event) {
        let that = this;
        that.setData({
            result: event.detail,
            number: event.detail.length,
        });
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
        let that = this;
        if (that.data.lastpage > page) {
            page++
            that.GetData(page);
        } else if (that.data.lastpage == page) {
            page++;
            wx.showToast({
                title: '没有更多数据!',
                icon: 'none',
                duration: 2000
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})