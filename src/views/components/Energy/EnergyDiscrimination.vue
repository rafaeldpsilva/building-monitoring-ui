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
import EnergyService from "../../../services/EnergyService.js"
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
    }
  },
  async mounted() {
    await this.loadEnergy();
  },
  methods: {
    async loadEnergy() {
      await EnergyService.get_energy_from_retailer(localStorage.getItem("uri")).then(historic => {
        let retailer = [];
        let hours = [];
        historic.forEach(entry => {
          hours.push(new Date(entry['datetime']).getUTCHours());
          retailer.push(entry['retailer']);
        });
        this.loading = false;
        this.option.xAxis.data = hours
        this.option.series[0].data = retailer;
      });
      await EnergyService.get_self_consumption(localStorage.getItem("uri")).then(historic => {
        let selfconsumption = [];
        let hours = [];
        historic.forEach(entry => {
          hours.push(new Date(entry['datetime']).getUTCHours());
          selfconsumption.push(entry['self_consumption']);
        });
        this.option.series[1].data = selfconsumption;
      });
      //this.option.series[2].data = p2p;
      //this.option.series[1].data = demandresponse;
    },
  },
  provide: {
    [THEME_KEY]: 'light',
  },
  setup() {
    const option = ref({
  legend: {
    data: ['Retailer', 'Self-Consumption', 'P2P'],
    left: '10%'
  },
  tooltip: {
    valueFormatter: (value) => Math.abs(parseFloat(value))
  },
  xAxis: {
    data: [0],
    name: 'Hours (h)',
    axisLine: { onZero: true },
    splitLine: { show: false },
    splitArea: { show: false }
  },
  yAxis: {
    name: 'Energy (Wh)',
    nameLocation: 'middle',
    nameTextStyle:{
      padding: [0, 0, 35, 0]
    }
  },
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
      name: 'Self-Consumption',
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
