<template>
  <div class="demo">
    <h1>{{msg}}</h1>

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
        class="fadeInDown animated toShow div-chart"
      ></div>
    </div>
    <div style="position:relative;width: 600px;height:400px;">
      <!-- <img
        id="bk"
        src="../../assets/chart_backgroud.png"
        style="position:absolute;left:10px;top:10px ;cursor:pointer ! important;width: 600px;height:400px;border:no ;z-index = 0;"
      />-->
      <div
        id="myChart2"
        style="position:absolute;left:10px;top:10px;width: 600px;height:400px;z-index = 1;"
        class="fadeInDown animated toShow div-chart"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FunnelDemo",
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
      let selectDataIndex = -1;
      let selectSeriesIndex = -1;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let myOption = {
        // title: {
        //   text: "漏斗图"
        // },
        color: [
          "#1988FA",
          "#FEDB65",
          "#2BD1C0",
          "#8B48EF",
          "#FE9E01",
          "#C6EF37",
          "#00E7FF",
          "#FF3F73",
          "#95DF68",
          "#FFC484"
        ],
        tooltip: {
          trigger: "axis"
        },
        legend: {
          // inactiveColor: "#000",
          top: "bottom",
          padding: 5,
          textStyle: {
            color: "#CDD0F5",
            fontSize: 10,
            fontFamily: "PingFang SC"
          },
          // icon: "arrow",
          // borderWidth: 2,
          inactiveColor: "#8383A9",
          data: ["展现", "点击", "访问", "咨询", "订单"]
        },
        emphasis: { label: { color: "#F00", formatter: "{b}({c})" } },

        series: [
          {
            name: "漏斗图",
            type: "funnel",
            left: "10%",
            top: 60,
            //x2: 80,
            bottom: 60,
            // width: "80%",
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: "0%",
            maxSize: "100%",
            // sort: "descending",
            gap: -1,
            label: {
              show: true,
              position: "inside",
              color: "#FFFFFF",
              fontSize: 16,
              fontFamily: "PingFangSC-Regular,PingFang SC"
            },
            // labelLine: {
            //   length: 10,
            //   lineStyle: {
            //     width: 1,
            //     type: "solid"
            //   }
            // },
            // itemStyle: {
            //   borderColor: "#fff",
            //   borderWidth: 1
            // },
            // emphasis: {
            //   label: {
            //     fontSize: 20
            //   }
            // },
            data: [
              {
                value: 20,
                itemStyle: { color: "#FE9E01", borderWidth: 0 },
                name: "订单"
              },
              {
                value: 33,
                itemStyle: { color: "#8B48EF", borderWidth: 0 },
                name: "咨询"
              },
              {
                value: 45,
                itemStyle: { color: "#2BD1C0", borderWidth: 0 },
                name: "访问"
              },
              {
                value: 75,
                itemStyle: { color: "#FEDB65", borderWidth: 0 },
                name: "点击"
              },
              {
                value: 100,
                itemStyle: { color: "#1988FA", borderWidth: 0 },
                name: "展现"
              }
            ]
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
          //设置chart中所有数据条状态为
          for (let i = 0; i < myOption.series.length; i++) {
            //所有series透明、变细
            for (let j = 0; j < myOption.series[i].data.length; j++) {
              myOption.series[i].data[j].itemStyle.opacity = 0.2;
              myOption.series[i].data[j].label = null;
            }
          }

          myOption.series[e.seriesIndex].data[
            e.dataIndex
          ].itemStyle.opacity = 1;
          myOption.series[e.seriesIndex].data[e.dataIndex].label = {};
          myOption.series[e.seriesIndex].data[e.dataIndex].label.position =
            "right";
          //重置图表
          myChart.setOption(myOption);
          selectDataIndex = e.dataIndex;
          selectSeriesIndex = e.seriesIndex;
        } else {
          //点击已选中的数据，选中状态还原
          //设置chart中所有数据条状态为
          //设置chart中所有数据条状态为
          for (let i = 0; i < myOption.series.length; i++) {
            //所有series透明、变细
            for (let j = 0; j < myOption.series[i].data.length; j++) {
              myOption.series[i].data[j].itemStyle.opacity = 1;
              myOption.series[i].data[j].label = null;
            }
          }
          selectDataIndex = -1;
          selectSeriesIndex = -1;
          //重置图表
          myChart.clear();
          myChart.setOption(myOption);
        }
      });
    },
    draw2() {
      let selectDataIndex = -1;
      let selectSeriesIndex = -1;

      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart2"));
      let myOption = {
        // title: {
        //   text: "漏斗图"
        // },
        color: [
          "#1988FA",
          "#FEDB65",
          "#2BD1C0",
          "#8B48EF",
          "#FE9E01",
          "#C6EF37",
          "#00E7FF",
          "#FF3F73",
          "#95DF68",
          "#FFC484"
        ],
        // tooltip: {
        //   trigger: "axis"
        // },
        legend: {
          // inactiveColor: "#000",
          top: "bottom",
          padding: 5,
          textStyle: {
            color: "#CDD0F5",
            fontSize: 10,
            fontFamily: "PingFang SC"
          },
          // icon: "arrow",
          // borderWidth: 2,
          inactiveColor: "#8383A9",
          data: ["1990", "2015"]
        },
        // emphasis: { label: { color: "#F00", formatter: "{b}({c})" } },
        xAxis: {
          axisLabel: {
            color: "#CDD0F5",
            fontSize: 14,
            fontFamily: "PingFang SC"
          },
          axisLine: { show: true, lineStyle: { color: "#8383a9" } },
          axisTick: { show: false },
          axisPointer: {
            type: "line",
            lineStyle: { color: "#1988FA", type: "dashed" }
          },
          splitLine: {
            show: false,
            lineStyle: {
              type: "dashed"
            }
          }
        },
        yAxis: {
          // splitLine: {
          //   lineStyle: {
          //     type: "dashed"
          //   }
          // },
          axisLabel: {
            color: "#8383a9",
            fontSize: 10,
            fontFamily: "PingFang SC"
          },
          axisLine: { lineStyle: { color: "#8383a9" } },
          axisTick: { show: false, lineStyle: { color: "#8383a9" } },
          splitLine: { lineStyle: { color: "#282750" } },

          scale: false
        },
        series: [
          {
            name: "1990",
            data: [
              [28604, 77, 17096869, "Australia", 1990],
              [31163, 77.4, 27662440, "Canada", 1990],
              [1516, 68, 1154605773, "China", 1990],
              [13670, 74.7, 10582082, "Cuba", 1990],
              [28599, 75, 4986705, "Finland", 1990],
              [29476, 77.1, 56943299, "France", 1990],
              [31476, 75.4, 78958237, "Germany", 1990],
              [28666, 78.1, 254830, "Iceland", 1990],
              [1777, 57.7, 870601776, "India", 1990],
              [29550, 79.1, 122249285, "Japan", 1990],
              [2076, 67.9, 20194354, "North Korea", 1990],
              [12087, 72, 42972254, "South Korea", 1990],
              [24021, 75.4, 3397534, "New Zealand", 1990],
              [43296, 76.8, 4240375, "Norway", 1990],
              [10088, 70.8, 38195258, "Poland", 1990],
              [19349, 69.6, 147568552, "Russia", 1990],
              [10670, 67.3, 53994605, "Turkey", 1990],
              [26424, 75.7, 57110117, "United Kingdom", 1990],
              [37062, 75.4, 252847810, "United States", 1990]
            ],
            type: "scatter",
            symbolSize: function(data) {
              return Math.sqrt(data[2]) / 5e2;
            },
            emphasis: {
              label: {
                show: true,
                formatter: function(param) {
                  if (param.data instanceof Array) {
                    return param.data[3];
                  } else {
                    return param.data.value[3];
                  }
                },
                color: "#fff",
                position: "top"
              }
            },
            itemStyle: {
              // shadowBlur: 10,
              // shadowColor: "rgba(120, 36, 50, 0.5)",
              // shadowOffsetY: 5
              // color: new this.$echarts.graphic.RadialGradient(0.4, 0.3, 1, [
              //   {
              //     offset: 0,
              //     color: "rgb(251, 118, 123)"
              //   },
              //   {
              //     offset: 1,
              //     color: "rgb(204, 46, 72)"
              //   }
              // ])
            }
          },
          {
            name: "2015",
            data: [
              [44056, 81.8, 23968973, "Australia", 2015],
              [43294, 81.7, 35939927, "Canada", 2015],
              [13334, 76.9, 1376048943, "China", 2015],
              [21291, 78.5, 11389562, "Cuba", 2015],
              [38923, 80.8, 5503457, "Finland", 2015],
              [37599, 81.9, 64395345, "France", 2015],
              [44053, 81.1, 80688545, "Germany", 2015],
              [42182, 82.8, 329425, "Iceland", 2015],
              [5903, 66.8, 1311050527, "India", 2015],
              [36162, 83.5, 126573481, "Japan", 2015],
              [1390, 71.4, 25155317, "North Korea", 2015],
              [34644, 80.7, 50293439, "South Korea", 2015],
              [34186, 80.6, 4528526, "New Zealand", 2015],
              [64304, 81.6, 5210967, "Norway", 2015],
              [24787, 77.3, 38611794, "Poland", 2015],
              [23038, 73.13, 143456918, "Russia", 2015],
              [19360, 76.5, 78665830, "Turkey", 2015],
              [38225, 81.4, 64715810, "United Kingdom", 2015],
              [53354, 79.1, 321773631, "United States", 2015]
            ],
            type: "scatter",
            symbolSize: function(data) {
              return Math.sqrt(data[2]) / 5e2;
            },
            emphasis: {
              label: {
                show: true,
                formatter: function(param) {
                  if (param.data instanceof Array) {
                    return param.data[3];
                  } else {
                    return param.data.value[3];
                  }
                },
                color: "#fff",
                position: "top"
              }
            },
            itemStyle: {
              // shadowBlur: 10,
              // shadowColor: "rgba(25, 100, 150, 0.5)",
              // shadowOffsetY: 5
              // color: new this.$echarts.graphic.RadialGradient(0.4, 0.3, 1, [
              //   {
              //     offset: 0,
              //     color: "rgb(129, 227, 238)"
              //   },
              //   {
              //     offset: 1,
              //     color: "rgb(25, 183, 207)"
              //   }
              // ])
            }
          }
        ]
      };

      // 绘制图表
      myChart.setOption(myOption);

      myChart.on("click", function(e) {
        //清空markPoint
        for (let i = 0; i < myOption.series.length; i++) {
          myOption.series[i].markPoint = { data: [] };
          myOption.series[i].zlevel = 10;
          // myOption.series[i].markPoint.data = [];
          for (let j = 0; j < myOption.series[i].data.length; j++) {
            if (typeof myOption.series[i].data[j].label != "undefined") {
              myOption.series[i].data[j].label = null;
              myOption.series[i].data[j].itemStyle = {};
            }
          }
        }
        //清除所有标志线
        for (let i = 0; i < myOption.series.length; i++) {
          myOption.series[i].markLine = null;
        }
        if (
          e.dataIndex != selectDataIndex ||
          e.seriesIndex != selectSeriesIndex
        ) {
          //设置当前选中项
          let tempMarkPoint = {
            symbol: "",
            symbolOffset: [],
            symbolSize: [],
            silent: true,
            data: [{ name: "", xAxis: 7, yAxis: 183 }],
            label: { color: "#F00", fontSize: 18 }
            // itemStyle: { color: "#FF0" }
          };
          tempMarkPoint.data[0].name = "当前联动项";
          // tempMarkPoint.data[0].value = e.seriesName + "\n" + e.value;
          tempMarkPoint.data[0].xAxis = e.value[0];

          // if (typeof myOption.series[e.seriesIndex].stack != "undefined") {
          //   let tempValue = 0;
          //   for (let i = 0; i < e.seriesIndex + 1; i++) {
          //     if (
          //       myOption.series[i].stack == myOption.series[e.seriesIndex].stack
          //     ) {
          //       let tempV = myOption.series[i].data[e.dataIndex];
          //       if (typeof tempV === "number" && !isNaN(tempV)) {
          //         tempValue = tempValue + myOption.series[i].data[e.dataIndex];
          //       } else {
          //         tempValue =
          //           tempValue + myOption.series[i].data[e.dataIndex].value;
          //       }
          //     }
          //   }
          //   tempMarkPoint.data[0].yAxis = tempValue;
          // } else {
          //   tempMarkPoint.data[0].yAxis = e.value;
          // }
          tempMarkPoint.data[0].yAxis = e.value[1];

          let icon = require("../../assets/icon.png");
          tempMarkPoint.symbol = "image://" + icon;
          tempMarkPoint.symbolOffset = [0, "-80%"];
          tempMarkPoint.symbolSize = [17, 21];
          tempMarkPoint.silent = true;

          // myOption.series[e.seriesIndex].markPoint = tempMarkPoint;

          let tempMarkline = {
            symbol: "none",
            silent: true,
            animation: true,
            lineStyle: { color: "#8383a9" },
            // markLine 也是同理
            data: [
              [
                {
                  //横线起点坐标因为要定位到Y轴，所以采用绝对坐标
                  x: 0,
                  y: 0,
                  label: {
                    formatter: "",
                    position: "insideStartTop"
                  }
                },
                {
                  coord: [3, 934]
                }
              ],
              [
                {
                  coord: [0, 0]
                },
                {
                  coord: [0, 0],
                  label: {
                    formatter: "22222",
                    position: "insideStartTop"
                  }
                }
              ]
            ]
          };
          let marklineYValue = tempMarkPoint.data[0].yAxis;
          //计算设置横向起点
          let x = myChart.convertToPixel({ xAxisIndex: 0 }, 0);
          let x1 = myChart.convertToPixel({ xAxisIndex: 0 }, 1);
          tempMarkline.data[0][0].x = x - (x1 - x) / 2;
          let y = myChart.convertToPixel({ yAxisIndex: 0 }, marklineYValue);
          tempMarkline.data[0][0].y = y;

          tempMarkline.data[0][0].label.formatter = "" + marklineYValue;
          //设置其他点
          //横线终点
          tempMarkline.data[0][1].coord[0] = e.value[0];
          tempMarkline.data[0][1].coord[1] = marklineYValue;
          //纵线起点
          tempMarkline.data[1][0].coord[0] = e.value[0];
          tempMarkline.data[1][0].coord[1] = 0;
          //纵线终点
          tempMarkline.data[1][1].coord[0] = e.value[0];
          tempMarkline.data[1][1].coord[1] = marklineYValue;
          tempMarkline.data[1][1].label.formatter = "" + e.value[0];
          myOption.series[e.seriesIndex].markLine = tempMarkline;
          myOption.series[e.seriesIndex].markLine.zlevel = 0;
          //设置chart中所有数据条透明
          for (let i = 0; i < myOption.series.length; i++) {
            for (let j = 0; j < myOption.series[i].data.length; j++) {
              let tempData = myOption.series[i].data[j];
              if (tempData instanceof Array) {
                let tempItemAll = {
                  value: null,
                  //自定义标签样式，仅对该数据项有效
                  label: {},
                  //自定义特殊 itemStyle，仅对该数据项有效
                  itemStyle: {
                    opacity: 0.2
                  }
                };
                tempItemAll.value = tempData;
                myOption.series[i].data[j] = tempItemAll;
              } else {
                myOption.series[i].data[j].itemStyle.opacity = 0.2;
              }
            }
          }

          // let tempItemSelected = {
          //   value: null,
          //   //自定义标签样式，仅对该数据项有效
          //   label: {},
          //   //自定义特殊 itemStyle，仅对该数据项有效
          //   itemStyle: {
          //     color: "#FFFF00",
          //     borderColor: "#fff",
          //     borderType: "dashed"
          //   }
          // };

          // // tempItem.label = tempLabel;
          // tempItemSelected.value = e.value;

          myOption.series[e.seriesIndex].data[
            e.dataIndex
          ].itemStyle.opacity = 1;

          // myOption.series[e.seriesIndex].data[e.dataIndex].name = e.value[3];
          // myOption.series[e.seriesIndex].data[e.dataIndex].name = "fadsffdafaf";
          myOption.series[e.seriesIndex].data[e.dataIndex].label = {
            show: true,
            formatter: "",
            color: "#FFF",
            position: "top"
          };
          myOption.series[e.seriesIndex].data[e.dataIndex].label.formatter =
            "" + e.value[3];
          // myOption.series[e.seriesIndex].data[
          //   e.dataIndex
          // ].itemStyle.borderColor = "#fff";
          // myOption.series[e.seriesIndex].data[
          //   e.dataIndex
          // ].itemStyle.borderWidth = 2;

          myChart.setOption(myOption);
          selectDataIndex = e.dataIndex;
          selectSeriesIndex = e.seriesIndex;
        } else {
          for (let i = 0; i < myOption.series.length; i++) {
            for (let j = 0; j < myOption.series[i].data.length; j++) {
              myOption.series[i].data[j].itemStyle.opacity = 0.8;
            }
          }
          selectDataIndex = -1;
          selectSeriesIndex = -1;
          //重置图表
          myChart.clear();
          myChart.setOption(myOption);
        }
      });
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

.div-chart {
  background: #110a4b;
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
