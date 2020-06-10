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
    <div style="position:relative;width: 600px;height:400px;">
      <!-- <img
        id="bk"
        src="../../assets/chart_backgroud.png"
        style="position:absolute;left:10px;top:10px ;cursor:pointer ! important;width: 600px;height:400px;border:no ;z-index = 0;"
      />-->
      <div
        id="myChart3"
        style="position:absolute;left:10px;top:10px;width: 600px;height:400px;z-index = 1;"
        class="fadeInDown animated toShow div-chart"
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
    this.draw3();
  },
  methods: {
    draw() {
      let selectDataIndex = -1;
      let selectSeriesIndex = -1;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let myOption = {
        // title: {
        //   text: "折线图堆叠"
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
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        xAxis: {
          type: "category",
          // boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
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
          }
        },
        yAxis: {
          name: "吨",
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
        },
        series: [
          {
            symbol: "circle",
            name: "邮件营销",
            type: "line",
            // stack: "总量",
            markPoint: {
              data: []
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            symbol: "circle",
            name: "联盟广告",
            type: "line",
            // stack: "总量",
            markPoint: {
              data: []
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            symbol: "circle",
            name: "视频广告",
            type: "line",
            // stack: "总量",
            markPoint: {
              data: []
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            symbol: "circle",
            name: "直接访问",
            type: "line",
            // stack: "总量",
            markPoint: {
              data: []
            },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            symbol: "circle",
            name: "搜索引擎",
            type: "line",
            // stack: "总量",
            markPoint: {
              data: []
            },

            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };

      //设置chart中所有数据条状态为
      for (let i = 0; i < myOption.series.length; i++) {
        //所有series透明、变细
        myOption.series[i].lineStyle = {};
        myOption.series[i].lineStyle.opacity = 1;
        myOption.series[i].lineStyle.width = 2;
        myOption.series[i].zlevel = 10;
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
                opacity: 1,
                borderWidth: 2
              }
            };
            tempItemAll.value = tempData;
            myOption.series[i].data[j] = tempItemAll;
          } else {
            myOption.series[i].data[j].itemStyle.borderWidth = 2;
            myOption.series[i].data[j].itemStyle.opacity = 1;
            myOption.series[i].data[j].symbol = "circle";
            myOption.series[i].data[j].symbolSize = 4;
          }
        }
      }

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
              myOption.series[i].data[j].symbolSize = 4;
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
            data: [{ name: "", xAxis: 7, yAxis: 183 }]
            // label: { color: "#F00", fontSize: 18 }
          };
          // tempMarkPoint.data[0].name = "当前联动项";
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

          // tempMarkPoint.data[0].yAxis = e.value;
          let icon = require("../../assets/icon.png");
          tempMarkPoint.symbol = "image://" + icon;
          tempMarkPoint.symbolOffset = [0, "-80%"];
          tempMarkPoint.symbolSize = [17, 21];
          tempMarkPoint.silent = true;

          myOption.series[e.seriesIndex].markPoint = tempMarkPoint;

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

          //当前选中series，数据点变大
          for (let j = 0; j < myOption.series[e.seriesIndex].data.length; j++) {
            myOption.series[e.seriesIndex].data[j].symbolSize = 6;
            myOption.series[e.seriesIndex].data[j].itemStyle.opacity = 1;
          }

          let tempItemSelected = {
            value: null,
            //自定义标签样式，仅对该数据项有效
            label: {},
            symbolSize: 8,
            symbol: "circle",
            //  "image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7",
            //自定义特殊 itemStyle，仅对该数据项有效
            itemStyle: {
              // color: "#FFFFFF",
              borderWidth: 3
              // borderColor: "#F00"
            }
          };

          // tempItem.label = tempLabel;
          tempItemSelected.value = e.value;
          //设置选中点的样式
          myOption.series[e.seriesIndex].data[e.dataIndex] = tempItemSelected;

          //当前series 不透明
          myOption.series[e.seriesIndex].lineStyle.opacity = 1;
          myOption.series[e.seriesIndex].lineStyle.width = 2;

          //添加标志线

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
                  coord: [3, 0]
                },
                {
                  coord: [3, 934]
                }
              ]
            ]
          };
          //计算设置横向起点
          let x = myChart.convertToPixel({ xAxisIndex: 0 }, 0);
          let x1 = myChart.convertToPixel({ xAxisIndex: 0 }, 1);
          tempMarkline.data[0][0].x = x - (x1 - x) / 2;
          let y = myChart.convertToPixel({ yAxisIndex: 0 }, e.value);
          tempMarkline.data[0][0].y = y;

          tempMarkline.data[0][0].label.formatter = "" + e.value;
          //设置其他点
          //横线终点
          tempMarkline.data[0][1].coord[0] = e.dataIndex;
          tempMarkline.data[0][1].coord[1] = e.value;
          //纵线起点
          tempMarkline.data[1][0].coord[0] = e.dataIndex;
          tempMarkline.data[1][0].coord[1] = 0;
          //纵线终点
          tempMarkline.data[1][1].coord[0] = e.dataIndex;
          tempMarkline.data[1][1].coord[1] = e.value;

          myOption.series[e.seriesIndex].markLine = tempMarkline;
          myOption.series[e.seriesIndex].markLine.zlevel = 0;
          //重置图表
          myChart.setOption(myOption);
          selectDataIndex = e.dataIndex;
          selectSeriesIndex = e.seriesIndex;
        } else {
          //点击已选中的数据，选中状态还原
          //设置chart中所有数据条状态为
          for (let i = 0; i < myOption.series.length; i++) {
            //所有series透明、变细
            myOption.series[i].lineStyle = {};
            myOption.series[i].lineStyle.opacity = 1;
            myOption.series[i].lineStyle.width = 2;
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
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
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
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
            }
          }
        ],
        yAxis: [
          {
            name: "吨",
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
            barWidth: "40%",
            itemStyle: {
              barBorderRadius: [3, 3, 0, 0],
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: "rgba(54, 189, 253, 0.9)" },
                  // { offset: 0.5, color: "rgba(54, 189, 253, 0.7)" },
                  // { offset: 0.5, color: "#188df0" },
                  { offset: 1, color: "rgba(25, 136, 250, 0.2)" }
                ],
                global: false // 缺省为 false
              }
            },
            data: [10, 52, 200, 334, 390, 330, 220]
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
        //清空markPoint
        for (let i = 0; i < myOption.series.length; i++) {
          myOption.series[i].markPoint = { data: [] };
          myOption.series[i].zlevel = 10;
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

          let icon = require("../../assets/icon.png");
          tempMarkPoint.symbol = "image://" + icon;
          tempMarkPoint.symbolOffset = [0, "-80%"];
          tempMarkPoint.symbolSize = [17, 21];
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

          myOption.series[e.seriesIndex].markLine = tempMarkline;
          myOption.series[e.seriesIndex].markLine.zlevel = 0;
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
    },
    draw3() {
      //选中条

      let selectSeriesIndex = -1;

      let selectDataIndex = -1;

      // 默认高亮

      // let selectIndex = 0; // 高亮索引
      // let selectIndexHovered = true; //选择的区是否高亮
      // let tempIndex = -1; //临时高亮
      // let tempIndexHoved = false; //临时区是否高亮
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart3"));
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
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        itemStyle: { barBorderRadius: [10, 10, 0, 0] },
        xAxis: [
          {
            type: "category",
            data: ["2012", "2013", "2014", "2015", "2016"],
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
            }
          }
        ],
        yAxis: [
          {
            name: "吨",
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
        // series: [
        //   {
        //     name: "直接访问",
        //     type: "bar",
        //     barWidth: "40%",
        //     itemStyle: {
        //       barBorderRadius: [3, 3, 0, 0],
        //       color: {
        //         type: "linear",
        //         x: 0,
        //         y: 0,
        //         x2: 0,
        //         y2: 1,
        //         colorStops: [
        //           { offset: 0, color: "rgba(54, 189, 253, 0.9)" },
        //           // { offset: 0.5, color: "rgba(54, 189, 253, 0.7)" },
        //           // { offset: 0.5, color: "#188df0" },
        //           { offset: 1, color: "rgba(25, 136, 250, 0.2)" }
        //         ],
        //         global: false // 缺省为 false
        //       }
        //     },
        //     data: [10, 52, 200, 334, 390, 330, 220]
        //   }
        // ]
        series: [
          {
            name: "Forest",
            type: "bar",
            barGap: "60%",
            barWidth: "10%",
            // label: labelOption,
            data: [320, 332, 301, 334, 390]
          },
          {
            name: "Steppe",
            type: "bar",
            // label: labelOption,

            barWidth: "10%",
            data: [220, 182, 191, 234, 290]
          },
          {
            name: "Desert",
            type: "bar",

            barWidth: "10%",
            // label: labelOption,
            data: [150, 232, 201, 154, 190]
          },
          {
            name: "Wetland",
            type: "bar",

            barWidth: "10%",
            // barWidth: "30%",
            // label: labelOption,
            data: [98, 77, 101, 99, 40]
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
        //清空markPoint
        for (let i = 0; i < myOption.series.length; i++) {
          myOption.series[i].markPoint = { data: [] };
          // myOption.series[i].markPoint.data = [];
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
          //设置当前选中项markPoint
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

          let icon = require("../../assets/icon.png");
          tempMarkPoint.symbol = "image://" + icon;
          tempMarkPoint.symbolOffset = [0, "-80%"];
          tempMarkPoint.symbolSize = [17, 21];
          tempMarkPoint.silent = true;

          myOption.series[e.seriesIndex].markPoint = tempMarkPoint;
          //------------------------------
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

          myOption.series[e.seriesIndex].markLine = tempMarkline;

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
