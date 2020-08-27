<template>
  <div id style=" position: relative;   ">
    <div :id="'main-box11'+uid" style="width:400px;height:400px;margin-left:-60px"></div>
  </div>
</template>
<script>
// import echarts from  '../../static/js/echarts.simple.min.js'
import echarts from "../../static/js/echarts.min.js";
export default {
  props: {
    // zzt:Object,
    uid: { type: Number, default: 0 },
    xzl: { type: String, default: 0 }
    // pie: { type: Object, default: null }
  },
  data() {
    return {
      pie: {
        gdata: ["已选", "未选"],
        ydata: [
          { value: 335, name: "直接访问" },
          { value: 310, name: "邮件营销" },
          { value: 234, name: "联盟广告" },
          { value: 135, name: "视频广告" },
          { value: 1548, name: "搜索引擎" }
        ]
      }
    };
  },
  created() {},

  mounted() {
    // this.intChars_ldt()
    // debugger;
    // this.init(this.pie.gdata, this.pie.ydata);
  },
  watch: {
    // pie() {
    //   this.init(this.pie.gdata, this.pie.ydata);
    // }
  },
  methods: {
    xiangqing() {
      this.$emit("change");
    },
    init(x, y) {
      var _this = this;
      this.gdata = x;
      this.ydata = y;
      var zscore = 0;
      y.forEach(element => {
        zscore += element.value;
      });
      setTimeout(() => {
        _this.initChars_zl(zscore);
      }, 0);
    },
    initChars_zl: function(zscore) {
      //饼图
      var _this = this;
      var data = [1, 3]; //饼图的参数，可以设置多个

      var myChart = echarts.init(
        document.getElementById("main-box11" + this.uid), //初始化的div  ID
        "macarons"
      );
      var option = {
        graphic: [
          {
            type: "text",
            left: "center", //左边框的距离
            top: "42%", //上边框的距离
            style: {
              text: _this.xzl, //显示文字
              fill: "#323232", //文字的颜色
              fontSize: 34 //文字的大小
            }
          }
        ],
        animation: false,
        hoverAnimation: false,
        avoidLabelOverlap: false,
        // title: [
        //   {
        //     text:
        //       "表扬" + _this.jiazhanbi + "\n\n\n\n\n待改进" + _this.jianzhanbi, //文字
        //     left: 314, //文字的边距
        //     top: 145, //文字的边距
        //     textStyle: { fontSize: 12 } //文字的大小
        //   },
        //   {
        //     text: "+" + _this.konmontha + "分",
        //     left: 312,
        //     top: 123,
        //     textStyle: { color: "#B4B1FA", fontSize: 14 } //文字的颜色  大小
        //   },
        //   {
        //     text: "\n\n\n\n\n-" + _this.konmonthi + "分",
        //     left: 312,
        //     top: 112,
        //     textStyle: { color: "#F7A9AB", fontSize: 14 }
        //   }
        // ],
        // legend: {
        //   data: _this.gdata, //['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        //   itemGap: 10, //图标的间距
        //   right: 10,
        //   top: 275
        // },
        grid: {
          left: 1
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
          //   show: false
        },
        series: [
          //图形的样式
          {
            name: "选中率",
            type: "pie", //饼图
            radius: ["40%", "60%"], //中空饼图   不设置为实心饼图
            // hoverAnimation: false, // 鼠标悬停的效果
            data: _this.ydata, //上方的参数
            minAngle: 0, //最小角度设置（基本没意义）
            center: ["50%", "45%"], //圆环的中心位置
            itemStyle: {
              normal: {
                label: {
                  //   show: false, //圆环上的参数指示显示
                  //   formatter: "{b} \t{c}",
                  //   formatter: "{b}"
                },
                labelLine: {
                  //   show: false //对应的线显示
                }
              }
            }
          }
        ],
        // color: ["#39C9EF", "#F2F2F2"]
        color: ["#00c2c2", "#008dff"]
        // color: _this.colorArr
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
.c {
  background: rgb(232, 100, 82);
}
</style>

