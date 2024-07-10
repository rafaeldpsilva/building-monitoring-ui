<template>
    <v-chart class="chart" :option="option" autoresize/>
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
  name: "overview-graph-second",
  components: {
    VChart,
  },
  props: {
    interval: [],
    unit: [],
    consumption: [],
    generation: [],
    flexibility: [],
  },
  provide: {
    [THEME_KEY]: 'light',
  },
  async mounted(){
    this.labels= ['-'+this.interval*10+this.unit, '-'+this.interval*9+this.unit,'-'+this.interval*8+this.unit, '-'+this.interval*7+this.unit, '-'+this.interval*6+this.unit,'-'+this.interval*5+this.unit, '-'+this.interval*4+this.unit, '-'+this.interval*3+this.unit, '-'+this.interval*2+this.unit, '-'+this.interval*1+this.unit];
    this.option.xAxis.data = this.labels;
    this.option.series[0].data = this.consumption
    this.option.series[1].data = this.generation
    this.option.series[2].data = this.flexibility
    await this.updateMonitoringValues()
    this.monitoringInterval = setInterval(() => {
      this.updateMonitoringValues();
    }, 5000);
  },
  beforeUnmount(){
    clearInterval(this.monitoringInterval);
  },
  methods: {
      async updateMonitoringValues() {
        var now = new Date();
        var data = now.getHours()+':' + now.getMinutes()+':' + now.getSeconds()
        this.energyNow = await BuildingService.getEnergyNow(localStorage.getItem("uri"));
        this.updateData(data, this.energyNow['consumption'],this.energyNow['generation'],this.energyNow['flexibility'])
      },
      updateData(data, consumption, generation, flexibility){
        this.option.xAxis.data.shift(0);
        this.option.series[0].data.shift(0);
        this.option.series[1].data.shift(0);
        this.option.series[2].data.shift(0);
        this.option.xAxis.data.push(data);
        this.option.series[0].data.push(consumption);
        this.option.series[1].data.push(generation);
        this.option.series[2].data.push(flexibility);
      },
  },
  setup() {
    const option = ref({
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Consumption', 'Generation', 'Flexibility']
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
            data: [],
            smooth: true
            },
            {
            name: 'Generation',
            type: 'line',
            color: "#f5365c",
            showSymbol: false,
            data: [],
            smooth: true
            },
            {
            name: 'Flexibility',
            type: 'line',
            color: "#2dce89",
            showSymbol: false,
            data: [],
            smooth: true
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
