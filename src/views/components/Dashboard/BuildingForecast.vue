<template>
  <div class="card">
    <div class="pb-0 card-header mb-0">
      <h6>{{ title }}</h6>
    </div>
    <div class="p-3 card-body">
      <Graph />
    </div>
  </div>
</template>

<script>
import Graph from './ForecastGraph.vue'

export default {
  name: "building-forecast",
  components:{
    Graph
  },
  props: {
    title: {
      type: String,
      default: "Energy Forecast",
    }
  },
  data() {
    return {
    }
  },
};
</script>
