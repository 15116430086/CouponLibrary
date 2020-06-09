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
    
    timeBox: [
      {
        id: 1,
        txt: '近一周'
      },
      {
        id: 2,
        txt: '近一个月'
      }
    ],
    img1: [
      {
        txt: "券领用走势图",
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
          return `核销:` + value
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
          return `核销:` + value
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
        data: [48, 56, 75, 50, 18, 30, 23]
      }]
    },
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
    show: false,

  },

  onLoad() {

  },
  clkTab(e){
    let id = e.currentTarget.dataset.id;
    let that = this;
    that.setData({
      idc: id
    })
  },

  clkBtn(e) {
    let id = e.currentTarget.dataset.id;
    let that = this;
    let option = that.data.option;
    console.log(option)
    that.setData({
      idx: id
    })
    if (id == 1) {
      option.xAxis.data = ['第一周', '第二周', '第三周', '第四周'],
        option.series.data = [280, 136, 25, 330]
      Chart.setOption(option);
    } else {
      option.xAxis.data = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        option.series.data = [18, 36, 65, 30, 78, 40, 33]
      Chart.setOption(option);
    }
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

  onReady() {
    setTimeout(this.getData, 2000);
  },


  getData(e) {
    //获取到折线图 <ec-canvas> 的id，然后再获取数据塞就可以了。
    let that = this;
    let option = that.data.option;
    Chart.setOption({ option });

    Chart.on('click', function (e) {
      let ename = e.name;//日期
      let value = e.value;//张数
      wx.navigateTo({
        url: '../shopDetail/shopDetail?name=' + ename + "&value=" + value,
      })

    });
    
    //   return Chart;
    // });
  },
  onShareAppMessage: function (res) {

  },
});


