<template>
  <div class="echarts_pie">
    <img alt="Vue logo" src="../assets/logo.png" />
    <FunnelDemo msg="This is Echarts Demo(Pie) by David" />
  </div>
</template>

<script>
// @ is an alias to /src
import FunnelDemo from "@/components/echartsdemos/Funnel.vue";

export default {
  name: "Funnel",
  components: {
    FunnelDemo
  }
};
</script>
