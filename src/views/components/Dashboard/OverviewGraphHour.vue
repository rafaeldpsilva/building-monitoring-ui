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
    await this.loadBuildingOverview();
    this.loading = false;
  },
  methods: {
    async loadBuildingOverview() {
      await BuildingService.getOverview(localStorage.getItem("uri")).then(historic => {
        let consumption = [];
        let generation = [];
        let flexibility = [];
        let hours = [];

        var startDay = new Date();
        startDay.setHours(0, 0, 0, 0);
        console.log("historic",historic)
        let i = 0;
        while (i < historic.length) {
          var date = new Date(historic[i][0]);
          console.log(date)
          if(date > startDay){
            var hour = date.getUTCHours()
            hours.push(hour);
            console.log(hour)
            consumption.push(historic[i][1].toFixed(2));
            generation.push(historic[i][2].toFixed(2));
            flexibility.push(historic[i][3].toFixed(2));
          }
          i++;
        }
        this.loading = false;
        this.option.series[0].data = consumption;
        this.option.series[1].data = generation;
        this.option.series[2].data = flexibility;
      });

    },
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
        this.option.series[3].data = consumption;
        let flexibility = [];
        for(let i = 0; i< 7; i++){
          flexibility.push(0)
        }
        for(i = 7; i< 19; i++){
          flexibility.push(consumption[i]*0.2)
        }
        for(i = 19; i< 24; i++){
          flexibility.push(0)
        }
        this.option.series[4].data = flexibility;
      });
      await BuildingService.getForecastGeneration(localStorage.getItem("uri")).then( forecast => {
        let generation = [];
        let i = 0;
        while (i < forecast.length) {
          generation.push(forecast[i].toFixed(2));  
          i++;
        }
        this.option.series[5].data = generation;
      });
    },
  },
  setup() {
    const option = ref({
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Consumption', 'Generation','Flexibility']
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
            },
            {
              name: 'Flexibility',
              type: 'line',
              color: "#2dce89",
              showSymbol: false,
              data: []
            },
            {
              name: 'Consumption',
              type: 'line',
              lineStyle: {
                color: '#825ee4',
                width: 1,
                type: 'dashed'
              },
              showSymbol: false,
              data: []
            },
            {
              name: 'Generation',
              type: 'line',
              lineStyle: {
                color: '#f5365c',
                width: 1,
                type: 'dashed'
              },
              showSymbol: false,
              data: []
            },
            {
              name: 'Flexibility',
              type: 'line',
              lineStyle: {
                color: '#2dce89',
                width: 1,
                type: 'dashed'
              },
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
