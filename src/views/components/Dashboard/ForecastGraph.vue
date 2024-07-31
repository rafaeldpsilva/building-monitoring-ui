<template>
    <div v-if="this.loading" class="fa-3x text-center">
      <i class="fas fa-circle-notch fa-spin" ></i>
    </div>
    <v-chart v-else class="chart" :option="option" autoresize/>
</template>
<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
    TooltipComponent,
    LegendComponent,
    GridComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, defineComponent } from 'vue';
import BuildingService from "../../../services/BuildingService.js"

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
]);

export default defineComponent({
  components: {
    VChart,
  },
  data(){
    return {
      labels: [],
      consumption: [],
      generation: [],
      loading: true,
    }
  },
  provide: {
    [THEME_KEY]: 'light',
  },
  async mounted(){
    this.loading = true;
    await this.loadBuildingForecast();
    this.loading = false;
  },
  methods: {  
    async loadBuildingForecast() {
      await BuildingService.getForecastConsumption(localStorage.getItem("uri")).then( forecast => {
        let consumption = [];
        let hours = [];
        let i = 0;
        while (i < forecast.length) {
            consumption.push(forecast[i].toFixed(2));
            hours.push(i);
            i++;
        }
        this.loading = false;
        this.option.xAxis.data = hours;
        this.option.series[0].data = consumption;
      });
      await BuildingService.getForecastGeneration(localStorage.getItem("uri")).then( forecast => {
        console.log(forecast)
        let generation = [];
        let i = 0;
        while (i < forecast.length) {
          generation.push(forecast[i].toFixed(2));  
          i++;
        }
        this.option.series[1].data = generation;
      });
    },
  },
  setup() {
    const option = ref({
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Consumption', 'Generation']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
          name: 'Hours (h)',
          nameLocation: 'middle',
          nameTextStyle:{
              padding: [5, 0, 0, 0]
          },
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          name: 'Energy (Wh)',
          nameLocation: 'middle',
          nameTextStyle:{
            padding: [0, 0, 35, 0]
          },
          type: 'value'
        },
        series: [
            {
              name: 'Consumption',
              type: 'line',
              color: "#825ee4",
              showSymbol: false,
              data: []
            },
            {
              name: 'Generation',
              type: 'line',
              color: "#f5365c",
              showSymbol: false,
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
