import * as echarts from '../../ec-canvas/echarts';
let Chart = null;
let utils = require("../../utils/util.js")
const app = getApp();



Page({
  data: {
    ec: {
      onInit: function (canvas, width, height) {
        // 初始化图表
        Chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(Chart);
        return Chart
      }
    },
    datime:new Date().getTime(),
    xAxisdataList:[],
    timeBox: [
      {
        id: 1,
        txt: '近一个月'
      },
      {
        id: 2,
        txt: '近一周'
      }
    ],
    img1: [
      {
        txt: "新增会员走势图",
        id:1
      },
      {
        txt: "券领用走势图",
        id:2
      }
    ],
    idx: 1,   //月,周
    idc:1,
    date: "日期",
    hidden: false,
    // 第一条数据
    option: {
      title: {
        text: '点击数字查看详情',
        top: 25,
        right: 10,
        textStyle: {
          fontSize: 14,
          color: '#E85819',
          fontWeight: 500
        }
      },
      color: ["#E85819"],
      // legend: {
      //   data: ['A'],
      //   top: 25,
      //   left: 'center',
      //   backgroundColor: '#FFF0DE',
      //   z: 100
      // },
      grid: {
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        backgroundColor: '#FFF0DE',
        textStyle: {
          color: '#E85819',

        },

        axisPointer: {
          label: {

          }
        },
        position: function (point, params, dom, rect, size) {
          // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
          // 提示框位置
          var x = 0; // x坐标位置
          var y = 0; // y坐标位置

          // 当前鼠标位置
          var pointX = point[0];
          var pointY = point[1];

          // 外层div大小
          // var viewWidth = size.viewSize[0];
          // var viewHeight = size.viewSize[1];

          // 提示框大小
          var boxWidth = size.contentSize[0];
          var boxHeight = size.contentSize[1];

          // boxWidth > pointX 说明鼠标左边放不下提示框
          if (boxWidth > pointX) {
            x = pointX + 50;
          } else { // 左边放的下
            x = pointX - 20;
          }

          // boxHeight > pointY 说明鼠标上边放不下提示框
          if (boxHeight > pointY) {
            y = 5;
          } else { // 上边放得下
            y = pointY + 30;
          }

          return [x, y];


        },
        formatter: function (params, ) {
          let value = params[0].value
          return `新增:` + value
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        color: '#666666',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#ccc'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#666666'
          }
        },
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        name: '数量/人',
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#ccc'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#666666'
          }
        },
        // show: false
      },
      series: [{
        name: 'A',
        type: 'line',
        itemStyle: {
          normal: {
            color: '#E85819',
            lineStyle: {
              color: '#E85819'
            }
          }
        },
        smooth: false,
        data: [18, 36, 65, 30, 78, 40, 33]
      }]

    },
    option2: {
      title: {
        text: '点击数字查看详情',
        top: 25,
        right: 10,
        textStyle: {
          fontSize: 14,
          color: '#E85819',
          fontWeight: 500
        }
      },
      color: ["#E85819"],
      // legend: {
      //   data: ['A'],
      //   top: 25,
      //   left: 'center',
      //   backgroundColor: '#FFF0DE',
      //   z: 100
      // },
      grid: {
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        backgroundColor: '#FFF0DE',
        textStyle: {
          color: '#E85819',

        },

        axisPointer: {
          label: {

          }
        },
        position: function (point, params, dom, rect, size) {
          // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
          // 提示框位置
          var x = 0; // x坐标位置
          var y = 0; // y坐标位置

          // 当前鼠标位置
          var pointX = point[0];
          var pointY = point[1];

          // 外层div大小
          // var viewWidth = size.viewSize[0];
          // var viewHeight = size.viewSize[1];

          // 提示框大小
          var boxWidth = size.contentSize[0];
          var boxHeight = size.contentSize[1];

          // boxWidth > pointX 说明鼠标左边放不下提示框
          if (boxWidth > pointX) {
            x = pointX + 50;
          } else { // 左边放的下
            x = pointX - 20;
          }

          // boxHeight > pointY 说明鼠标上边放不下提示框
          if (boxHeight > pointY) {
            y = 5;
          } else { // 上边放得下
            y = pointY + 30;
          }

          return [x, y];


        },
        formatter: function (params, ) {
          let value = params[0].value
          return `张数:` + value
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        color: '#666666',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#ccc'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#666666'
          }
        },
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        name: '数量/张',
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#ccc'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#666666'
          }
        },
        // show: false
      },
      series: [{
        name: 'A',
        type: 'line',
        itemStyle: {
          normal: {
            color: '#E85819',
            lineStyle: {
              color: '#E85819'
            }
          }
        },
        smooth: false,
        data: [48, 56, 75, 50, 18, 30, 23]
      }]
    },
    currentDate: new Date().getTime(),
    minDate: 2020,
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    show: false,

  },

  onLoad() {
   
  },
  clkTab(e){
    let id = e.currentTarget.dataset.id;
    if(id==1){
    this.UserQuery();
    }else{
      this.CouponQuery();
    }
    let that = this;
    that.setData({
      idc: id,
      date:"日期"
    })
  },

  clkBtn(e) {
    let id = e.currentTarget.dataset.id;
    let that = this;
    let option = that.data.option;
    console.log(option)
    that.setData({
      idx: id,
      date:"日期"
    })
    if(that.data.idc==1){
      that. UserQuery();
    }else{
      that.CouponQuery();
    }
    
    // if (id == 1) {
     
    //   option.xAxis.data = ['5月(1-7)日', '5月(8-15)日', '第三周', '第四周'],
    //     option.series[0].data = [30, 40, 50, 200]
    //     that.setData({option:option})
    //   Chart.setOption(that.data.option);
    // } else {
      
    //   option.xAxis.data = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    //     option.series[0].data = [18, 36, 65, 30, 78, 40, 33]
    //     that.setData({option:option})
    //   Chart.setOption(that.data.option);
    // }
  },


  UserQuery:function(){
      wx.showLoading({
        title: '数据加载中...',
      })
      var data={
        endtime:utils.formatTime(this.data.datime),
        time:this.data.date=="日期"?'':this.data.date,
        pGroupID:app.globalData.AppGroupInfo.GroupID,
        type:this.data.idx
      }
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/withdrawalAccountView/GetNewUserCount", "POST", data, app.globalData.appkeyid, this.GetNewUserCount)
  },

  GetNewUserCount:function(res){
    var chat=this;
    wx.hideLoading();
      
   
  var json=res.data.Data;
  let option = chat.data.option;
   if(chat.data.idx==1){
      var arr=[];
      arr[0]=json.data[0].week1;
      arr[1]=json.data[0].week2;
      arr[2]=json.data[0].week3;
      arr[3]=json.data[0].week4;
   }else{
    var arr=[];
    arr[0]=json.data[0].week1;
    arr[1]=json.data[0].week2;
    arr[2]=json.data[0].week3;
    arr[3]=json.data[0].week4;
    arr[4]=json.data[0].week5;
    arr[5]=json.data[0].week6;
    arr[6]=json.data[0].week7;
   }
   option.xAxis.data =json.xAxisdata;
   option.series[0].data=arr;
   chat.setData({option:option,xAxisdataList:json.xAxisdataList})
   Chart.setOption(chat.data.option);
   chat.getData()
  },
  CouponQuery:function(){
    wx.showLoading({
      title: '数据加载中...',
    })
    var data={
      endtime:utils.formatTime(this.data.datime),
      time:this.data.date=="日期"?'':this.data.date,
      pGroupID:app.globalData.AppGroupInfo.GroupID,
      type:this.data.idx
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/withdrawalAccountView/GetCouponCount", "POST", data, app.globalData.appkeyid, this.GetCouponCount)
  },

  GetCouponCount:function(res) {
    var chat=this;
    wx.hideLoading();
  var json=res.data.Data;
  let option = chat.data.option2;
   if(chat.data.idx==1){
      var arr=[];
      arr[0]=json.data[0].week1;
      arr[1]=json.data[0].week2;
      arr[2]=json.data[0].week3;
      arr[3]=json.data[0].week4;
   }else{
    var arr=[];
    arr[0]=json.data[0].week1;
    arr[1]=json.data[0].week2;
    arr[2]=json.data[0].week3;
    arr[3]=json.data[0].week4;
    arr[4]=json.data[0].week5;
    arr[5]=json.data[0].week6;
    arr[6]=json.data[0].week7;
   }
   option.xAxis.data =json.xAxisdata;
   option.series[0].data=arr;
   chat.setData({option2:option,xAxisdataList:json.xAxisdataList})
   Chart.setOption(chat.data.option2);
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
    timer = utils.formatTimeyears(timer);
    console.log(timer)
    that.setData({
      date: timer,
      show: false,
      hidden: false
    })
    if(that.data.idc==1){
      that. UserQuery();
    }else{
      that.CouponQuery();
    }
  },

  onReady() {
    var chat=this;
    setTimeout(function(){chat.getData()},500);
  },


  getData(e) {
    //获取到折线图 <ec-canvas> 的id，然后再获取数据塞就可以了。
    let that = this;
    let option = that.data.option;
    Chart.setOption({ option });

    Chart.on('click', function (e) {
      let ename = e.name;//日期
      let value = e.value;//张数
      let index=e.dataIndex;

      wx.navigateTo({
        url: '../shopDetail/shopDetail?name=' + that.data.xAxisdataList[index] + "&value=" + value+"&time="+that.data.date+"&types="+that.data.idc,
      })

    });
    
    //   return Chart;
    // });
  },
  onShow: function() {
    this.setData({
      idc: 1,
      date:"日期"
    })
    var chat=this;

  setTimeout(function(){chat.UserQuery()},500);
  },
  GroupList:function () {
    wx.navigateTo({
      url: '../GroupList/GroupList',
    })
  },
  onShareAppMessage: function (res) {

  },
});


