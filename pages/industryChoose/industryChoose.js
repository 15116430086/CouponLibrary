Page({
    data: {
        idx: "",
        content: [{
                id: '01',
                title: '金融业',
                contents: [{
                        id: '001',
                        title: '银行',
                        isSel: false
                    },
                    {
                        id: '002',
                        title: '证券',
                        isSel: false
                    }
                ],
                mes: "银行 l 证券 l 保险 l 基金 l 股权投资",
                shows: false
            },
            {
                id: '02',
                title: 'IT/互联网',
                contents: [{
                        id: '011',
                        title: '企业级软件内',
                        isSel: false
                    },
                    {
                        id: '034',
                        title: '游戏开发/运营',
                        isSel: false
                    }
                ],
                mes: "互联网 l IT l 游戏 l 软件",

                shows: false
            }
        ]
    },
    onLoad() {
        console.log(this.data.content[0].contents)
    },
    showHide(e) {
        let that = this;
        let index = e.currentTarget.dataset.index;
        console.log(index)
        let item = that.data.content[index];
        item.shows = !item.shows;
        that.setData({
            content: that.data.content
        })

        // for (var i = 0; i < contentFor.length; i++) {　　
        //     if (e.currentTarget.dataset.changeid == contentFor[i].id) {　　　　
        //         var printPrice = "content[" + i + "].shows";　　　　
        //         if (contentFor[i].shows) {　　　　　　
        //             that.setData({　　　　　　　　
        //                 [printPrice]: false　　　　　　
        //             });　　　　
        //         } else {　　　　　　
        //             that.setData({　　　　　　　　
        //                 [printPrice]: true　　　　　　
        //             });　　　　
        //         }　　
        //     } else {　　　　　　
        //         var printPrice1 = "content[" + i + "].shows";　　　　　　
        //         this.setData({　　　　　　　　
        //             [printPrice1]: false　　　　　　
        //         });　　　　
        //     }　　
        // }
    },

    clickTrue(e) {
        let that = this;
        var contentFor = that.data.content;
        let selId = e.currentTarget.dataset.id;
        let index = e.currentTarget.dataset.index;
        let contents = contentFor[index].contents;
        console.log(selId)
        that.setData({
            idx: selId
        })



    }
})

// Page({
//     data: {

//         list01: [
//             { item_id: 1 }, { item_id: 11 }, { item_id: 11 },
//         ],
//         list02: [

//         ],
//         list03: [
//             { item_id: 11 }, { item_id: 11 }
//         ],
//         list04: [
//             { item_id: 11 }, { item_id: 11 }, { item_id: 11 }
//         ],

//         // 展开折叠
//         selectedFlag: [false, false, false, false],

//     },
//     // 展开折叠选择 
//     changeToggle: function(e) {
//         var index = e.currentTarget.dataset.index;
//         if (this.data.selectedFlag[index]) {
//             this.data.selectedFlag[index] = false;
//         } else {
//             this.data.selectedFlag[index] = true;
//         }

//         this.setData({
//             selectedFlag: this.data.selectedFlag
//         })
//     },

// })