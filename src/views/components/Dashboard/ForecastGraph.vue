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
  props: {
    labels: [],
    consumption: [],
  },
  data(){
    return {
      loading: true,
    }
  },
  provide: {
    [THEME_KEY]: 'light',
  },
  async mounted(){
    this.loading = true;
    this.option.xAxis.data = this.labels;
    this.option.series[0].data = this.consumption;
    const forecast = JSON.parse(localStorage.getItem("forecast"))
    if (forecast.length != 2){
      await this.loadBuildingForecast();
    } else {
      this.option.xAxis.data = forecast[0];
      this.option.series[0].data = forecast[1];
      this.loading = false;
    }
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
        localStorage.setItem("forecast", JSON.stringify([hours, consumption]))
      });
    },
  },
  setup() {
    const option = ref({
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Consumption']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            name: 'Consumption',
            type: 'line',
            color: "#825ee4",
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
  height: 30vh;
}
</style>
