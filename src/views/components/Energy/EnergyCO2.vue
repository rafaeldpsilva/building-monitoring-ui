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
  name: "energy-co2",
  components:{
    VChart
  },
  props: {
    title: {
      type: String,
      default: "CO2",
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
      await EnergyService.get_co2_with_p2p(localStorage.getItem("uri")).then(historic => {
        let co2_with_p2p = [];
        let hours = [];
        historic.forEach(entry => {
          hours.push(new Date(entry['datetime']).getUTCHours());
          co2_with_p2p.push(entry['co2_with_p2p']);
        });
        this.loading = false;
        this.option.xAxis.data = hours
        this.option.series[0].data = co2_with_p2p;
      });
      await EnergyService.get_co2_without_p2p(localStorage.getItem("uri")).then(historic => {
        let co2_without_p2p = [];
        let hours = [];
        historic.forEach(entry => {
          hours.push(new Date(entry['datetime']).getUTCHours());
          co2_without_p2p.push(entry['co2_without_p2p']);
        });
        this.option.series[1].data = co2_without_p2p;
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
    data: ['CO2 With P2P', 'CO2 Without P2P'],
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
  yAxis: {
    name: 'g / W',
    nameLocation: 'middle',
    nameTextStyle:{
      padding: [0, 0, 35, 0]
    },
    min: 0,
  },
  grid: {
    bottom: 30
  },
  series: [
    {
      name: 'CO2 With P2P',
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
      name: 'CO2 Without P2P',
      type: 'bar',
      stack: 'two',
      emphasis: {
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.3)'
      }},
      data: []
    }
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
