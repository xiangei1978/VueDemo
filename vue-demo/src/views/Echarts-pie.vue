<template>
  <div class="echarts_pie">
    <img alt="Vue logo" src="../assets/logo.png" />
    <PieDemo msg="This is Echarts Demo(Pie) by David" />
  </div>
</template>

<script>
// @ is an alias to /src
import PieDemo from "@/components/echartsdemos/Pie.vue";

export default {
  name: "Pie",
  components: {
    PieDemo
  }
};
</script>
