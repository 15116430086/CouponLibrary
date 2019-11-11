// pages/sendTicketConfigChild/sendTicketConfigChild.js
var utils = require("../../utils/util.js")
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        checked: true,
        checked1: true,
        radio: '1',
        list: ['a', 'b', 'c'],
        result: ['a', 'b'],
        itemList: [
            { id: 1, name: 'C语言', isSelected: false, },
            { id: 2, name: 'Java', isSelected: false, },
            { id: 3, name: 'C++', isSelected: false, },
        ],
        memberList: [{
                id: 1,
                name: 'B语言',
                isSelected: true,
                invalidActivty: [{
                    cdName: "哈LOL",
                    cdId: 1,
                    cdType: true,
                }, {
                    cdName: "bbbb",
                    cdId: 2,
                    cdType: true,
                }, {
                    cdName: "ccc",
                    cdId: 3,
                    cdType: true,
                }]
            },
            {
                id: 1,
                name: 'Java',
                isSelected: true,
                invalidActivty: [{
                    cdName: "eee",
                    cdId: 1,
                    cdType: true,
                }, {
                    cdName: "ffff",
                    cdId: 2,
                    cdType: true,
                }, {
                    cdName: "gggg",
                    cdId: 3,
                    cdType: true,
                }]
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    // onChange({ detail,e }) {
    //     console.log(detail,e)
    //         // 需要手动对 checked 状态进行更新
    //     this.setData({ checked: detail });
    // },
    onChange(e) {
        console.log(e);
        let that = this;
        let detail = e.detail;
        let index = e.currentTarget.dataset.index;
        let checked1 = that.data.checked1;
        if (index == 1) {
            that.setData({
                checked: detail
            })
        } else {
            // 需要手动对 checked 状态进行更新
            that.setData({
                checked1: detail,
                radio: 1
            });
        }

    },
    radioChange(event) {
        console.log(event)
        this.setData({
            radio: event.detail
        });
    },
    checkChange(event) {
        console.log(event)
        this.setData({
            result: event.detail
        });
    },
    toggle(event) {
        const { index } = event.currentTarget.dataset;
        const checkbox = this.selectComponent(`.checkboxes-${index}`);
        checkbox.toggle();
    },
    onClick(event) {
        const { name } = event.currentTarget.dataset;
        this.setData({
            radio: name
        });
    },
    noop() {},
    itemSelected: function(e) {
        console.log(e)
        var index = e.currentTarget.dataset.index;
        var item = this.data.itemList[index];
        item.isSelected = !item.isSelected;
        this.setData({
            itemList: this.data.itemList,
        });
    },
    isOpen(e) {
        var that = this;
        var idx = e.currentTarget.dataset.index;
        console.log(idx);
        var memberList = that.data.memberList;
        console.log(memberList);
        for (let i in memberList) {
            let invalidActivty = memberList[i].invalidActivty;
            for (let i in invalidActivty) {
                invalidActivty[i].fName = "";
                console.log(invalidActivty[i].cdName.substr(0, 1))
                invalidActivty[i].fName = invalidActivty[i].cdName.substr(0, 1)
            }
        }


        for (let i = 0; i < memberList.length; i++) {
            if (idx == i) {
                memberList[i].isSelected = !memberList[i].isSelected;
            } else {
                memberList[i].isSelected = true;
            }
        }
        that.setData({ memberList: memberList });
        return true;

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