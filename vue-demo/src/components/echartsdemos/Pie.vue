<template>
  <div class="demo">
    <h1>{{ msg }}</h1>

    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <!-- <div id ="bk"  style = "background:url('图片的url');cursor:pointer ! important;width:100%;height:100%;border:no"> -->
    <div style="position:relative;width: 600px;height:400px;" class="ff">
      <!-- <img
        id="bk"
        src="../../assets/chart_backgroud.png"
        style="position:absolute;left:10px;top:10px ;cursor:pointer ! important;width: 600px;height:400px;border:no ;z-index = 0;"
      />-->
      <div
        id="myChart"
        style="position:absolute;left:10px;top:10px;width: 600px;height:400px;z-index = 1;background: #110a4b;"
        class="fadeInDown animated toShow"
      ></div>
    </div>
    <div style="position:relative;width: 600px;height:400px;" class="ff">
      <!-- <img
        id="bk"
        src="../../assets/chart_backgroud.png"
        style="position:absolute;left:10px;top:10px ;cursor:pointer ! important;width: 600px;height:400px;border:no ;z-index = 0;"
      />-->
      <div
        id="myChart2"
        style="position:absolute;left:10px;top:10px;width: 600px;height:400px;z-index = 1;background: #110a4b;"
        class="fadeInDown animated toShow"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PieDemo",
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
      let defaultSelectIndex = 2; //默认选中高亮

      let selectIndex = -1; // 高亮索引
      let selectIndexHovered = true; //选择的区是否高亮
      let tempIndex = -1; //临时高亮
      // let tempIndexHoved = false; //临时区是否高亮
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let myOption = {
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
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        // legend: {
        //   orient: "vertical",
        //   left: 10,
        //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        // },
        series: [
          {
            name: "访问来源",
            type: "pie",
            hoverOffset: 20,
            radius: ["50%", "70%"],
            avoidLabelOverlap: true,
            // // 高亮样式。

            // itemStyle: {
            //   shadowBlur: 10,
            //   shadowColor: "rgba(25, 100, 150, 0.5)",
            //   shadowOffsetY: 5
            // },
            label: {
              normal: {
                show: false,
                position: "center",
                formatter: "{b}\n {d}%",
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            emphasis: {
              label: {
                show: true,
                color: "#fff",
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 30, name: "搜索引擎" }
            ]
          }
        ]
      };
      // 绘制图表
      myChart.setOption(myOption);

      myChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: defaultSelectIndex
      });

      myChart.on("click", function(e) {
        for (let j = 0; j < myOption.series[0].data.length; j++) {
          myOption.series[0].data[j].itemStyle = { opacity: 0.2 };
        }
        myOption.series[0].data[e.dataIndex].itemStyle.opacity = 1;

        if (e.dataIndex != selectIndex || selectIndex == -1) {
          myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: selectIndex
          });
          myChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: e.dataIndex
          });
          myChart.setOption(myOption);
          selectIndex = e.dataIndex;
          selectIndexHovered = true;
        } else {
          selectIndex = -1;

          for (let j = 0; j < myOption.series[0].data.length; j++) {
            myOption.series[0].data[j].itemStyle.opacity = 1;
          }

          myChart.setOption(myOption);

          myChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: defaultSelectIndex
          });
          // if ( defaultSelectIndexn ==)
          myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: e.dataIndex
          });

          tempIndex = -1;
          selectIndexHovered = false;
          // //重置图表
          // myChart.clear();
          // myChart.setOption(myOption);
        }
      });
      myChart.on("mouseover", function(e) {
        // myOption.series[0].data[params.dataIndex].label.normal= {

        if (e.dataIndex != selectIndex) {
          if (selectIndexHovered == true) {
            if (selectIndex != -1) {
              myChart.dispatchAction({
                type: "downplay",
                seriesIndex: 0,
                dataIndex: selectIndex
              });
            } else {
              myChart.dispatchAction({
                type: "downplay",
                seriesIndex: 0,
                dataIndex: defaultSelectIndex
              });
            }
            selectIndexHovered = false;
          }
          myChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: e.dataIndex
          });
        }
        tempIndex = e.dataIndex;
        // console.log("mouseover:index = " + e.dataIndex);
      });
      myChart.on("mouseout", function(e) {
        if (e.dataIndex == tempIndex) {
          if (selectIndexHovered == false) {
            myChart.dispatchAction({
              type: "downplay",
              seriesIndex: 0,
              dataIndex: e.dataIndex
            });

            selectIndexHovered = true;
          }
          if (selectIndex != -1) {
            myChart.dispatchAction({
              type: "highlight",
              seriesIndex: 0,
              dataIndex: selectIndex
            });
          } else {
            myChart.dispatchAction({
              type: "highlight",
              seriesIndex: 0,
              dataIndex: defaultSelectIndex
            });
          }
        }
        // tempIndex = e.dataIndex;
        // console.log("mouseout:index = " + e.dataIndex);
      });
    },
    draw2() {
      let selectSeriesIndex = -1;
      let selectDataIndex = -1;

      let myChart = this.$echarts.init(document.getElementById("myChart2"));

      let myOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
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
        legend: {
          top: "bottom",
          padding: 5,
          textStyle: {
            color: "#CDD0F5",
            fontSize: 10,
            fontFamily: "PingFang SC"
          },
          icon: "rect",
          // borderWidth: 2,
          inactiveColor: "#8383A9",
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
          right: "3%",
          bottom: "15%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
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
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "#8383a9",
              fontSize: 10,
              fontFamily: "PingFang SC"
            },
            axisLine: { lineStyle: { color: "#8383a9" } },
            axisTick: { show: false, lineStyle: { color: "#8383a9" } },
            splitLine: { lineStyle: { color: "#282750" } },
            nameTextStyle: { color: "#8383a9", fontFamily: "PingFang SC" }
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            markPoint: {
              data: []
            },
            data: [320.1, 332.3, 301.3, 334.3, 390.3, 330.3, 320]
          },
          {
            name: "邮件营销",
            type: "bar",
            stack: "广告",
            markPoint: {
              data: []
            },
            data: [120.3, 132.3, 101.3, 134.3, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "bar",
            stack: "广告",
            markPoint: {
              data: []
            },
            data: [220.3, 182.3, 191.3, 234.3, 290.3, 330.3, 310]
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
            data: [862.3, 1018.3, 964.3, 1026.3, 1679.3, 1600.3, 1570.3],
            markLine: {
              // lineStyle: {
              //   type: "dashed"
              // },
              // data: [[{ type: "min" }, { type: "max" }]]
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

      myChart.on("click", function(e) {
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

          // let icon = require("../../assets/icon1.png");
          // tempMarkPoint.symbol = "image://" + icon;
          tempMarkPoint.symbol =
            "path://M19.9959735,2.13162821e-13 L19.9959733,2.13162821e-13 C15.5255054,0.0642547753 11.9496819,3.73331018 12.0005358,8.20394125 C12.0005358,12.570478 19.1669311,20.3270065 19.4716054,20.6557308 L19.4716054,20.6557308 C19.607518,20.8031751 19.798655,20.8874147 19.999182,20.888249 L20.0152178,20.888249 L20.0152178,20.888249 C20.2214727,20.88581 20.4159678,20.7917949 20.5460031,20.6316767 L23.0283362,17.7163617 C26.3252897,13.5743122 27.9994279,10.3735792 27.9994279,8.20873081 L27.9994282,8.20870554 C28.0520115,3.73346437 24.4710724,0.0607064061 19.9959332,2.13162821e-13 L19.9959735,2.13162821e-13 Z M19.9959735,11.9338767 L19.9959734,11.9338767 C17.9366677,11.9870145 16.2242208,10.3607016 16.1710823,8.30140604 C16.1179444,6.24210032 17.7442574,4.52965339 19.8035529,4.47651488 C21.8628586,4.42337699 23.5753056,6.04968998 23.6284441,8.1089855 C23.6292608,8.14063667 23.6296745,8.17229722 23.629685,8.203959 L23.6296851,8.20397129 C23.6528711,10.2360346 22.0279376,11.9039819 19.9959702,11.9338863 L19.9959735,11.9338767 Z";
          tempMarkPoint.symbolOffset = [0, "-80%"];
          tempMarkPoint.symbolSize = [16, 21];
          tempMarkPoint.silent = true;

          myOption.series[e.seriesIndex].markPoint = tempMarkPoint;

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
                  coord: [0, 0]
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
          tempMarkline.data[0][1].coord[0] = e.dataIndex;
          tempMarkline.data[0][1].coord[1] = marklineYValue;
          //纵线起点
          // tempMarkline.data[1][0].coord[0] = e.dataIndex;
          // tempMarkline.data[1][0].coord[1] = 0;
          //纵线终点
          // tempMarkline.data[1][1].coord[0] = e.dataIndex;
          // tempMarkline.data[1][1].coord[1] = marklineYValue;

          // myOption.series[e.seriesIndex].markLine = tempMarkline;

          //设置chart中所有数据条透明
          for (let i = 0; i < myOption.series.length; i++) {
            for (let j = 0; j < myOption.series[i].data.length; j++) {
              let tempData = myOption.series[i].data[j];
              if (typeof tempData === "number" && !isNaN(tempData)) {
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
          myOption.series[e.seriesIndex].data[
            e.dataIndex
          ].itemStyle.borderColor = "#fff";
          myOption.series[e.seriesIndex].data[
            e.dataIndex
          ].itemStyle.borderWidth = 2;

          myChart.setOption(myOption);
          selectDataIndex = e.dataIndex;
          selectSeriesIndex = e.seriesIndex;
        } else {
          for (let i = 0; i < myOption.series.length; i++) {
            for (let j = 0; j < myOption.series[i].data.length; j++) {
              myOption.series[i].data[j].itemStyle.opacity = 1;
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

ff {
  float: right;
  margin: 0 0 1em 1em;
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
/* 放大效果*/
.enlarge {
  animation-name: enlarge;
  -webkit-animation: enlarge;
}
/*从上到下进入*/
.fadeInDown {
  animation-name: fadeInDown;
  -webkit-animation: fadeInDown;
}
/*从下到上进入*/
.fadeInUpLeft {
  animation-name: fadeInUpLeft;
  -webkit-animation: fadeInUpLeft;
}
/*从右到左进入*/
.fadeInRight {
  animation-name: fadeInRight;
  -webkit-animation: fadeInRight;
}
/*从左到右进入*/
.fadeInLeft {
  animation-name: fadeInLeft;
  -webkit-animation: fadeInLeft;
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
