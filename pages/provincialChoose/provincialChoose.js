Page({
  data: {
    idx: "",
    idb: "",
    index: 0,
    content: [{
        id: '01',
        title: '金融业',
        contents: [{
            id: '001',
            title: '银行',
            isSel: false,
            shows: false,
            list: [{
                id: '021',
                title: '基金',
                isSel: false
              },
              {
                id: '003',
                title: '股权投资',
                isSel: false
              }
            ]
          },
          {
            id: '002',
            title: '长沙',
            isSel: false,
            shows: false,
            list: [{
                id: '038',
                title: '雨花区',
                isSel: false
              },
              {
                id: '049',
                title: '芙蓉区',
                isSel: false
              }
            ]
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
            isSel: false,
            shows: false,
            list: [{
                id: '145',
                title: 'IT',
                isSel: false
              },
              {
                id: '156',
                title: '硬件设置',
                isSel: false
              }
            ]
          },
          {
            id: '034',
            title: '游戏开发/运营',
            isSel: false,
            shows: false,
            list: [{
                id: '028',
                title: '软件',
                isSel: false
              },
              {
                id: '149',
                title: '职业',
                isSel: false
              }
            ]
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

  // 省
  showHide(e) {
    let that = this;
    let mindex = e.currentTarget.dataset.mindex;

    let content = that.data.content;
    let item = content[mindex];
    item.isSel = !item.isSel;

    let contents = item.contents
    for (let i in contents) {
      contents[i].isSel = item.isSel;
      let list = contents[i].list;
      for (let j in list) {
        list[j].isSel = item.isSel
      }
    }

    that.setData({
      content: content

    })


  },
  showMask(e) {
    var contentFor = this.data.content;

    for (var i = 0; i < contentFor.length; i++) {　　
      if (e.currentTarget.dataset.changeid == contentFor[i].id) {　　　　
        var printPrice = "content[" + i + "].shows";　　　　
        if (this.data.content[i].shows) {　　　　　　
          this.setData({　　　　　　　　
            [printPrice]: false　　　　　　
          });　　　　
        } else {　　　　　　
          this.setData({　　　　　　　　
            [printPrice]: true　　　　　　
          });　　　　
        }　　
      } else {　　　　　　
        var printPrice1 = "content[" + i + "].shows";　　　　　　
        this.setData({　　　　　　　　
          [printPrice1]: false　　　　　　
        });　　　　
      }　　
    }
  },


  // 市
  clickTrue(e) {
    let that = this;
    let content = that.data.content;
    let mindex = e.currentTarget.dataset.mindex;
    let sindex = e.currentTarget.dataset.sindex;
    console.log(mindex);
    let contents = content[mindex].contents[sindex];
    contents.isSel = !contents.isSel
    let list = contents.list;
    for (let i in list) {
      list[i].isSel = contents.isSel
    }

    let ocontents = content[mindex].contents
    let count = 0
    for (let i in ocontents) {
      if (!ocontents[i].isSel) {
        count++;
      }
    }

    content[mindex].isSel = true
    if (count == ocontents.length)
      content[mindex].isSel = false

    that.setData({
      content: content
    })
  },

  showMaskChild(e){
    let that = this;
    let content = that.data.content;
    let mindex = e.currentTarget.dataset.mindex;
    let sindex = e.currentTarget.dataset.sindex;
    let contents = content[mindex].contents;
    let id = e.currentTarget.dataset.id;
    console.log(contents)
    for (let i in contents){
      console.log(contents[i])
      if (contents[i].id == id){
        var printPrice = "contents[" + i + "].shows";
        if (contents[i].shows) {
          this.setData({
            [printPrice]: false
          });
        } else {
          this.setData({
            [printPrice]: true
          });
        }
      } else {
        var printPrice1 = "contents[" + i + "].shows";
        this.setData({
          [printPrice1]: false
        });
      }
      }
    
  },



  // 区
  clickTwo(e) {
    let that = this;
    console.log(e);
    let content = that.data.content;
    let mindex = e.currentTarget.dataset.mindex;
    let sindex = e.currentTarget.dataset.sindex;
    let cindex = e.currentTarget.dataset.cindex;
    let list = content[mindex].contents[sindex].list[cindex];
    list.isSel = !list.isSel;

    let olist = content[mindex].contents[sindex].list
    let count = 0
    for (let i in olist) {
      if (!olist[i].isSel) {
        count++
      }
    }

    content[mindex].contents[sindex].isSel = true
    if (count == olist.length) {
      content[mindex].contents[sindex].isSel = false
    }


    let ocontents = content[mindex].contents
    let ccount = 0
    for (let i in ocontents) {
      if (!ocontents[i].isSel) {
        ccount++
      }
    }
    content[mindex].isSel = true
    if (ccount == ocontents.length) {
      content[mindex].isSel = false
    }

    that.setData({
      content: content
    })

  }
})