<template>
  <div class="echarts_pie">
    <img alt="Vue logo" src="../assets/logo.png" />
    <LineDemo msg="This is Echarts Demo(Pie) by David" />
  </div>
</template>

<script>
// @ is an alias to /src
import LineDemo from "@/components/echartsdemos/Line.vue";

export default {
  name: "Pie",
  components: {
    LineDemo
  }
};
</script>
