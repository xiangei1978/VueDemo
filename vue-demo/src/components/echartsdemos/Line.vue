<template>
  <div class="demo">
    <h1>{{ msg }}</h1>

    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <!-- <div id ="bk"  style = "background:url('图片的url');cursor:pointer ! important;width:100%;height:100%;border:no"> -->
    <div style="position:relative;width: 600px;height:400px;">
      <!-- <img
        id="bk"
        src="../../assets/chart_backgroud.png"
        style="position:absolute;left:10px;top:10px ;cursor:pointer ! important;width: 600px;height:400px;border:no ;z-index = 0;"
      />-->
      <div
        id="myChart"
        style="position:absolute;left:10px;top:10px;width: 600px;height:400px;z-index = 1;"
        class="fadeInDown animated toShow"
      ></div>
    </div>
    <div style="position:relative;width: 600px;height:400px;">
      <img
        id="bk"
        src="../../assets/chart_backgroud.png"
        style="position:absolute;left:10px;top:10px ;cursor:pointer ! important;width: 600px;height:400px;border:no ;z-index = 0;"
      />
      <div
        id="myChart2"
        style="position:absolute;left:10px;top:10px;width: 600px;height:400px;z-index = 1;"
        class="fadeInDown animated toShow"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LineDemo",
  props: {
    msg: String
  },
  data() {
    return {
      msg1: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    this.draw();
    this.draw2();
  },
  methods: {
    draw() {
      // 默认高亮
      // let selectIndex = 0; // 高亮索引
      // let selectIndexHovered = true; //选择的区是否高亮
      // let tempIndex = -1; //临时高亮
      // let tempIndexHoved = false; //临时区是否高亮
      let selectDataIndex = -1;
      let selectSeriesIndex = -1;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let myOption = {
        title: {
          text: "折线图堆叠"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            markPoint: {
              data: []
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            markPoint: {
              data: []
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            markPoint: {
              data: []
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            markPoint: {
              data: []
            },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            markPoint: {
              data: []
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      // 绘制图表
      myChart.setOption(myOption);

      myChart.on("click", function(e) {
        if (
          e.dataIndex != selectDataIndex ||
          e.seriesIndex != selectSeriesIndex
        ) {
          //清空markPoint
          for (let i = 0; i < myOption.series.length; i++) {
            myOption.series[i].markPoint.data = [];
            for (let j = 0; j < myOption.series[i].data.length; j++) {
              if (typeof myOption.series[i].data[j].label != "undefined") {
                myOption.series[i].data[j].label.show = false;
                myOption.series[i].data[j].itemStyle = {};
              }
            }
          }

          //设置当前选中项
          let tempMarkPoint = {
            symbol: "",
            symbolOffset: [],
            symbolSize: [],
            silent: true,
            data: [{ name: "", value: 182.2, xAxis: 7, yAxis: 183 }],
            label: { color: "#F00", fontSize: 18 }
          };
          tempMarkPoint.data[0].name = "当前联动项";
          tempMarkPoint.data[0].value = e.seriesName + "\n" + e.value;
          tempMarkPoint.data[0].xAxis = e.dataIndex;

          if (typeof myOption.series[e.seriesIndex].stack != "undefined") {
            let tempValue = 0;
            for (let i = 0; i < e.seriesIndex + 1; i++) {
              if (
                myOption.series[i].stack == myOption.series[e.seriesIndex].stack
              ) {
                let tempV = myOption.series[i].data[e.dataIndex];
                if (typeof tempV === "number" && !isNaN(tempV)) {
                  tempValue = tempValue + myOption.series[i].data[e.dataIndex];
                } else {
                  tempValue =
                    tempValue + myOption.series[i].data[e.dataIndex].value;
                }
              }
            }
            tempMarkPoint.data[0].yAxis = tempValue;
          } else {
            tempMarkPoint.data[0].yAxis = e.value;
          }

          // tempMarkPoint.data[0].yAxis = e.value;
          let icon = require("../../assets/label.png");
          tempMarkPoint.symbol = "image://" + icon;
          tempMarkPoint.symbolOffset = [0, "-50%"];
          tempMarkPoint.symbolSize = [88, 64];
          tempMarkPoint.silent = true;

          // myOption.series[e.seriesIndex].markPoint = tempMarkPoint;

          // myOption.series[e.seriesIndex].markPoint.label.formatter =
          //   "{c}  {name|{a}}";

          // let tempLabel = {
          //   show: true,
          //   position: "top",
          //   distance: 50,
          //   color: "#8B4513",
          //   align: "center",
          //   verticalAlign: "middle",
          //   rotate: 0,
          //   // formatter: "{c}  {name|{a}}",
          //   formatter: "{name|{a}}",
          //   fontSize: 13,
          //   rich: {
          //     // name: {
          //     //   textBorderColor: "#fff"
          //     // }
          //   }
          // };

          //设置chart中所有数据条状态为
          for (let i = 0; i < myOption.series.length; i++) {
            //所有series透明、变细
            myOption.series[i].lineStyle = {};
            myOption.series[i].lineStyle.opacity = 0.2;
            myOption.series[i].lineStyle.width = 2;
            for (let j = 0; j < myOption.series[i].data.length; j++) {
              let tempData = myOption.series[i].data[j];
              if (typeof tempData === "number" && !isNaN(tempData)) {
                let tempItemAll = {
                  value: null,
                  //自定义标签样式，仅对该数据项有效
                  label: {},
                  symbol: "circle",
                  symbolSize: 4,
                  //自定义特殊 itemStyle，仅对该数据项有效
                  itemStyle: {
                    opacity: 0.2
                  }
                };
                tempItemAll.value = tempData;
                myOption.series[i].data[j] = tempItemAll;
              } else {
                myOption.series[i].data[j].itemStyle.opacity = 0.2;
                myOption.series[i].data[j].symbol = "circle";
                myOption.series[i].data[j].symbolSize = 4;
              }
            }
          }

          let tempItemSelected = {
            value: null,
            //自定义标签样式，仅对该数据项有效
            label: {},
            symbolSize: 20,
            symbol: "arrow",
            //  "image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7",
            //自定义特殊 itemStyle，仅对该数据项有效
            itemStyle: {
              color: "#FFFF00",
              borderWidth: 3,
              borderColor: "#F00"
            }
          };

          // tempItem.label = tempLabel;
          tempItemSelected.value = e.value;

          myOption.series[e.seriesIndex].data[e.dataIndex] = tempItemSelected;

          //当前series 不透明
          myOption.series[e.seriesIndex].lineStyle.opacity = 1;
          myOption.series[e.seriesIndex].lineStyle.width = 3;

          // myOption.series[e.seriesIndex].markPoint.label.show = false;
          // myOption.series[e.seriesIndex].markPoint.label.position = [
          //   "50%",
          //   "20%"
          // ];

          myChart.setOption(myOption);
          // //切换高亮
          // myChart.dispatchAction({
          //   type: "downplay",
          //   seriesIndex: selectSeriesIndex,
          //   dataIndex: selectDataIndex
          // });
          // myChart.dispatchAction({
          //   type: "highlight",
          //   seriesIndex: e.selectIndex,
          //   dataIndex: e.dataIndex
          // });
          // selectDataIndex = e.dataIndex;
          // selectSeriesIndex = e.seriesIndex;

          // selectIndexHovered = true;
        }
      });
    },
    draw2() {
      //选中条

      let selectSeriesIndex = -1;

      let selectDataIndex = -1;

      // 默认高亮

      // let selectIndex = 0; // 高亮索引
      // let selectIndexHovered = true; //选择的区是否高亮
      // let tempIndex = -1; //临时高亮
      // let tempIndexHoved = false; //临时区是否高亮
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart2"));
      // let myOption1 = {
      //   title: {
      //     text: "某地区蒸发量和降水量",
      //     subtext: "纯属虚构"
      //   },
      //   tooltip: {
      //     trigger: "axis"
      //   },
      //   legend: {
      //     data: ["蒸发量", "降水量"]
      //   },
      //   toolbox: {
      //     show: true,
      //     feature: {
      //       dataView: { show: true, readOnly: false },
      //       magicType: { show: true, type: ["line", "bar"] },
      //       restore: { show: true },
      //       saveAsImage: { show: true }
      //     }
      //   },
      //   calculable: true,
      //   xAxis: [
      //     {
      //       type: "category",
      //       data: [
      //         "1月",
      //         "2月",
      //         "3月",
      //         "4月",
      //         "5月",
      //         "6月",
      //         "7月",
      //         "8月",
      //         "9月",
      //         "10月",
      //         "11月",
      //         "12月"
      //       ]
      //     }
      //   ],
      //   yAxis: [
      //     {
      //       type: "value"
      //     }
      //   ],
      //   series: [
      //     {
      //       name: "蒸发量",
      //       type: "bar",
      //       emphasis: {
      //         itemStyle: {
      //           // color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //           //   { offset: 0, color: "#2378f7" },
      //           //   { offset: 0.7, color: "#2378f7" },
      //           //   { offset: 1, color: "#83bff6" }
      //           // ])
      //         }
      //       },
      //       data: [
      //         2.0,
      //         4.9,
      //         7.0,
      //         23.2,
      //         25.6,
      //         76.7,
      //         135.6,
      //         162.2,
      //         32.6,
      //         20.0,
      //         6.4,
      //         3.3
      //       ],
      //       markPoint: {
      //         data: []
      //       },
      //       markLine: {
      //         data: [{ type: "average", name: "平均值" }]
      //       }
      //     },
      //     {
      //       name: "降水量",
      //       type: "bar",
      //       emphasis: {
      //         itemStyle: {
      //           // color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
      //           //   { offset: 0, color: "#2378f7" },
      //           //   { offset: 0.7, color: "#2378f7" },
      //           //   { offset: 1, color: "#83bff6" }
      //           // ])
      //         }
      //       },
      //       data: [
      //         2.6,
      //         5.9,
      //         9.0,
      //         26.4,
      //         28.7,
      //         70.7,
      //         175.6,
      //         182.2,
      //         48.7,
      //         18.8,
      //         6.0,
      //         2.3
      //       ],
      //       markPoint: {
      //         data: []
      //       },
      //       markLine: {
      //         data: [{ type: "average", name: "平均值" }]
      //       }
      //     }
      //   ]
      // };
      let myOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: [
            "直接访问",
            "邮件营销",
            "联盟广告",
            "视频广告",
            "搜索引擎",
            "百度",
            "谷歌",
            "必应",
            "其他"
          ]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            markPoint: {
              data: []
            },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "邮件营销",
            type: "bar",
            stack: "广告",
            markPoint: {
              data: []
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "bar",
            stack: "广告",
            markPoint: {
              data: []
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "bar",
            stack: "广告",
            markPoint: {
              data: []
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "搜索引擎",
            type: "bar",
            markPoint: {
              data: []
            },
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            markLine: {
              lineStyle: {
                type: "dashed"
              },
              data: [[{ type: "min" }, { type: "max" }]]
            }
          },
          {
            name: "百度",
            type: "bar",
            barWidth: 2,
            stack: "搜索引擎",
            markPoint: {
              data: []
            },
            data: [620, 732, 701, 734, 1090, 1130, 1120]
          },
          {
            name: "谷歌",
            type: "bar",
            stack: "搜索引擎",
            markPoint: {
              data: []
            },
            data: [120, 132, 101, 134, 290, 230, 220]
          },
          {
            name: "必应",
            type: "bar",
            stack: "搜索引擎",
            markPoint: {
              data: []
            },
            data: [60, 72, 71, 74, 190, 130, 110]
          },
          {
            name: "其他",
            type: "bar",
            stack: "搜索引擎",
            markPoint: {
              data: []
            },
            data: [62, 82, 91, 84, 109, 110, 120]
          }
        ]
      };
      // 绘制图表
      myChart.setOption(myOption);

      // myChart.dispatchAction({
      //   type: "highlight",
      //   seriesIndex: 0,
      //   dataIndex: 6
      // });

      myChart.on("click", function(e) {
        if (
          e.dataIndex != selectDataIndex ||
          e.seriesIndex != selectSeriesIndex
        ) {
          //清空markPoint
          for (let i = 0; i < myOption.series.length; i++) {
            myOption.series[i].markPoint.data = [];
            for (let j = 0; j < myOption.series[i].data.length; j++) {
              if (typeof myOption.series[i].data[j].label != "undefined") {
                myOption.series[i].data[j].label.show = false;
                myOption.series[i].data[j].itemStyle = {};
              }
            }
          }

          //设置当前选中项
          let tempMarkPoint = {
            symbol: "",
            symbolOffset: [],
            symbolSize: [],
            silent: true,
            data: [{ name: "", value: 182.2, xAxis: 7, yAxis: 183 }],
            label: { color: "#F00", fontSize: 18 }
          };
          tempMarkPoint.data[0].name = "当前联动项";
          tempMarkPoint.data[0].value = e.seriesName + "\n" + e.value;
          tempMarkPoint.data[0].xAxis = e.dataIndex;

          if (typeof myOption.series[e.seriesIndex].stack != "undefined") {
            let tempValue = 0;
            for (let i = 0; i < e.seriesIndex + 1; i++) {
              if (
                myOption.series[i].stack == myOption.series[e.seriesIndex].stack
              ) {
                tempValue = tempValue + myOption.series[i].data[e.dataIndex];
              }
            }
            tempMarkPoint.data[0].yAxis = tempValue;
          } else {
            tempMarkPoint.data[0].yAxis = e.value;
          }

          // tempMarkPoint.data[0].yAxis = e.value;
          let icon = require("../../assets/label.png");
          tempMarkPoint.symbol = "image://" + icon;
          tempMarkPoint.symbolOffset = [0, "-50%"];
          tempMarkPoint.symbolSize = [88, 64];
          tempMarkPoint.silent = true;

          myOption.series[e.seriesIndex].markPoint = tempMarkPoint;

          // myOption.series[e.seriesIndex].markPoint.label.formatter =
          //   "{c}  {name|{a}}";

          // let tempLabel = {
          //   show: true,
          //   position: "top",
          //   distance: 50,
          //   color: "#8B4513",
          //   align: "center",
          //   verticalAlign: "middle",
          //   rotate: 0,
          //   // formatter: "{c}  {name|{a}}",
          //   formatter: "{name|{a}}",
          //   fontSize: 13,
          //   rich: {
          //     // name: {
          //     //   textBorderColor: "#fff"
          //     // }
          //   }
          // };
          let tempItem = {
            value: null,
            //自定义标签样式，仅对该数据项有效
            label: {},
            //自定义特殊 itemStyle，仅对该数据项有效
            itemStyle: {
              color: "#FFFF00",
              borderColor: "#fff",
              borderType: "dashed"
            }
          };

          // tempItem.label = tempLabel;
          tempItem.value = e.value;

          myOption.series[e.seriesIndex].data[e.dataIndex] = tempItem;

          // myOption.series[e.seriesIndex].markPoint.label.show = false;
          // myOption.series[e.seriesIndex].markPoint.label.position = [
          //   "50%",
          //   "20%"
          // ];

          myChart.setOption(myOption);
          // //切换高亮
          // myChart.dispatchAction({
          //   type: "downplay",
          //   seriesIndex: selectSeriesIndex,
          //   dataIndex: selectDataIndex
          // });
          // myChart.dispatchAction({
          //   type: "highlight",
          //   seriesIndex: e.selectIndex,
          //   dataIndex: e.dataIndex
          // });
          // selectDataIndex = e.dataIndex;
          // selectSeriesIndex = e.seriesIndex;

          // selectIndexHovered = true;
        }
      });
      // myChart.on("mouseover", function(e) {
      //   // myOption.series[0].data[params.dataIndex].label.normal= {

      //   if (e.dataIndex != selectIndex) {
      //     if (selectIndexHovered == true) {
      //       myChart.dispatchAction({
      //         type: "downplay",
      //         seriesIndex: 0,
      //         dataIndex: selectIndex
      //       });
      //       selectIndexHovered = false;
      //     }
      //     myChart.dispatchAction({
      //       type: "highlight",
      //       seriesIndex: 0,
      //       dataIndex: e.dataIndex
      //     });
      //   }
      //   tempIndex = e.dataIndex;
      //   // console.log("mouseover:index = " + e.dataIndex);
      // });
      // myChart.on("mouseout", function(e) {
      //   if (e.dataIndex == tempIndex) {
      //     if (selectIndexHovered == false) {
      //       myChart.dispatchAction({
      //         type: "downplay",
      //         seriesIndex: 0,
      //         dataIndex: e.dataIndex
      //       });

      //       selectIndexHovered = true;
      //     }
      //     myChart.dispatchAction({
      //       type: "highlight",
      //       seriesIndex: 0,
      //       dataIndex: selectIndex
      //     });
      //   }
      //   // tempIndex = e.dataIndex;
      //   // console.log("mouseout:index = " + e.dataIndex);
      // });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* @import "../../css/myAnimate.css"; */
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#myChart123 {
  /* animation: rotateoutLT 5s, flip 4s; */
  animation: fadeInDown 5s;
}
.div-relative {
  position: relative;
  color: #000;
  border: 1px solid #000;
  width: 500px;
  height: 400px;
}
.div-a {
  position: absolute;
  left: 30px;
  top: 30px;
  background: #f00;
  width: 200px;
  height: 100px;
}
/* css注释说明： 背景为红色 */
.div-b {
  position: absolute;
  left: 50px;
  top: 60px;
  background: #ff0;
  width: 400px;
  height: 200px;
}
/* 背景为黄色 */
.div-c {
  position: absolute;
  left: 80px;
  top: 80px;
  background: #00f;
  width: 300px;
  height: 300px;
}

/*动画-start*/
.animated {
  animation-duration: 1.5s !important;
  -webkit-animation-duration: 1.5s !important;
  animation-fill-mode: both !important;
  -webkit-animation-fill-mode: both !important;
}
.animated02 {
  animation-duration: 1s !important;
  -webkit-animation-duration: 1s !important;
  animation-fill-mode: both !important;
  -webkit-animation-fill-mode: both !important;
}
/*逐渐显示*/
.toShow {
  position: absolute;
  animation: toShow 1.5s 0.5s;
  animation: toShow 1.5s 0.5s;
  animation-fill-mode: both !important;
  -webkit-animation-fill-mode: both !important;
}

/*中心旋转*/
.coreRotate {
  animation-name: coreRotate;
  -webkit-animation-name: coreRotate;
}

@keyframes toShow {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes toShow {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes enlarge {
  from {
    opacity: 0;
    -ms-transform: scale(0.1, 0.1); /* IE 9 */
    -webkit-transform: scale(0.1, 0.1); /* Safari */
    transform: scale(0.1, 0.1); /* 标准语法 */
  }
  to {
    opacity: 1;
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
}

@-webkit-keyframes enlarge /* Safari 与 Chrome */ {
  from {
    opacity: 0;
    -ms-transform: scale(0.1, 0.1); /* IE 9 */
    -webkit-transform: scale(0.1, 0.1); /* Safari */
    transform: scale(0.1, 0.1); /* 标准语法 */
  }
  to {
    opacity: 1;
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
}

/*从上到下*/
@keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate(0, -1000px); /* Safari */
    transform: stranslate(0, -1000px); /* 标准语法 */
  }
  to {
    opacity: 1;
    -webkit-transform: translate(0, 10px); /* Safari */
    transform: stranslate(0, 10px); /* 标准语法 */
  }
}

@-webkit-keyframes fadeInDown /* Safari 与 Chrome */ {
  from {
    opacity: 0;
    -webkit-transform: translate(0, -1000px); /* Safari */
    transform: stranslate(0, -1000px); /* 标准语法 */
  }
  to {
    opacity: 1;
    -webkit-transform: translate(0, 10px); /* Safari */
    transform: stranslate(0, 10px); /* 标准语法 */
  }
}
/*从左下到右上*/
@keyframes fadeInUpLeft {
  from {
    opacity: 0;
    -webkit-transform: translate(-1000px, 1000px); /* Safari */
    transform: stranslate(-1000px, 1000px); /* 标准语法 */
  }
  to {
    opacity: 1;
    -webkit-transform: translate(0, 10px); /* Safari */
    transform: stranslate(0, 10px); /* 标准语法 */
  }
}

@-webkit-keyframes fadeInUpLeft /* Safari 与 Chrome */ {
  from {
    opacity: 0;
    -webkit-transform: translate(-1000px, 1000px); /* Safari */
    transform: stranslate(-1000px, 1000px); /* 标准语法 */
  }
  to {
    opacity: 1;
    -webkit-transform: translate(0, 10px); /* Safari */
    transform: stranslate(0, 10px); /* 标准语法 */
  }
}
/*从右到左进入*/
@keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate(1000px, 0);
    transform: stranslate(1000px, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate(10px, 0);
    transform: stranslate(10px, 0);
  }
}

@-webkit-keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate(1000px, 0);
    transform: stranslate(1000px, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate(10px, 0);
    transform: stranslate(10px, 0);
  }
}
/*从左到右进入*/
@keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate(-1000px, 0);
    transform: stranslate(-1000px, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate(10px, 0);
    transform: stranslate(10px, 0);
  }
}

@-webkit-keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate(-1000px, 0);
    transform: stranslate(-1000px, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate(10px, 0);
    transform: stranslate(10px, 0);
  }
}

/*绕中心旋转*/
@keyframes coreRotate {
  5% {
    transform: rotate(5deg);
    -ms-transform: rotate(5deg); /* IE 9 */
    -webkit-transform: rotate(5deg); /* Safari and Chrome */
  }
  30% {
    transform: rotate(-5deg);
    -ms-transform: rotate(-5deg);
    -webkit-transform: rotate(-5deg);
  }
  60% {
    transform: rotate(5deg);
    -ms-transform: rotate(5deg);
    -webkit-transform: rotate(5deg);
  }
  90% {
    transform: rotate(-5deg);
    -ms-transform: rotate(-5deg);
    -webkit-transform: rotate(-5deg);
  }
}
@-webkit-keyframes coreRotate {
  5% {
    transform: rotate(5deg);
    -ms-transform: rotate(5deg); /* IE 9 */
    -webkit-transform: rotate(5deg); /* Safari and Chrome */
  }
  30% {
    transform: rotate(-5deg);
    -ms-transform: rotate(-5deg);
    -webkit-transform: rotate(-5deg);
  }
  60% {
    transform: rotate(5deg);
    -ms-transform: rotate(5deg);
    -webkit-transform: rotate(5deg);
  }
  90% {
    transform: rotate(-5deg);
    -ms-transform: rotate(-5deg);
    -webkit-transform: rotate(-5deg);
  }
}
/*动画-end*/
</style>
