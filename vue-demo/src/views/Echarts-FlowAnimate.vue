<template>
  <div class="echarts_pie">
    <img alt="Vue logo" src="../assets/logo.png" />
    <FlowAnimateDemo msg="This is Echarts FlowTest by David" />
  </div>
</template>

<script>
// @ is an alias to /src
import FlowAnimateDemo from "@/components/echartsdemos/FlowAnimate.vue";

export default {
  name: "FlowAnimate",
  components: {
    FlowAnimateDemo
  }
};
</script>
