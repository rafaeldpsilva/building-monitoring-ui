<template>
  <div class="card">
    <div class="pb-0 card-header mb-0">
      <h6>{{ title }}</h6>
    </div>
    <div class="p-3 card-body">
      <v-chart class="chart" :option="option" autoresize />
    </div>
  </div>
</template>

<script>
import BuildingService from "../../../services/BuildingService.js"
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, defineComponent } from 'vue';
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BrushComponent
} from 'echarts/components';
use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BrushComponent,
  BarChart,
  CanvasRenderer
]);
export default defineComponent({
  name: "energy-discrimination",
  components:{
    VChart
  },
  props: {
    title: {
      type: String,
      default: "Energy Usage",
    }
  },
  data() {
    return {
      data1: [],
      data2: [],
      data3: [],
      data4: [],
    }
  },
  async mounted() {
    await this.loadBuildingOverview();
  },
  methods: {
    async loadBuildingOverview() {
      await BuildingService.getOverview(localStorage.getItem("uri")).then(historic => {
        let p2p = [];
        let demandresponse = [];
        let retailer = [];
        let balance = [];
        let hours = [];
        historic.forEach(entry => {
          const r = Math.random();
          const r2 = Math.random();
          hours.push(new Date(entry[0]).getUTCHours());
          p2p.push(entry[1]*(1-r)*(r2));
          demandresponse.push(entry[1]*(1-r)*(1-r2));
          retailer.push(entry[1]*r);
          balance.push(entry[1]-entry[2]);
        });
        this.loading = false;
        this.option.xAxis.data = hours
        this.option.series[2].data = p2p;
        this.option.series[1].data = demandresponse;
        this.option.series[0].data = retailer;
        this.option.series[3].data = balance;
      });
    },
  },
  provide: {
    [THEME_KEY]: 'light',
  },
  setup() {
    const option = ref({
  legend: {
    data: ['Retailer', 'Demand Response', 'P2P', 'Balance'],
    left: '10%'
  },
  tooltip: {
    valueFormatter: (value) => Math.abs(parseFloat(value))
  },
  xAxis: {
    data: [0],
    name: 'Hours',
    axisLine: { onZero: true },
    splitLine: { show: false },
    splitArea: { show: false }
  },
  yAxis: {},
  grid: {
    bottom: 30
  },
  series: [
    {
      name: 'Retailer',
      type: 'bar',
      stack: 'one',
      emphasis: {
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.3)'
      }},
      data: []
    },
    {
      name: 'Demand Response',
      type: 'bar',
      stack: 'one',
      emphasis: {
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.3)'
      }},
      data: []
    },
    {
      name: 'P2P',
      type: 'bar',
      stack: 'one',
      emphasis: {
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.3)'
      }},
      data: []
    }, 
    {
      name: 'Balance',
      type: 'line',
      symbolSize: 8,
      emphasis: {
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.3)'
      }},
      data: []
    },
     
  ]
}
    );
    return { option };
  },
});
</script>
<style scoped>
.chart {
  height: 40vh;
}
</style>
