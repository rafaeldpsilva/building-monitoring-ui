<template>
  <div class="card">
    <div class="pb-0 card-header mb-0">
      <h6>{{ title }}</h6>
    </div>
    <div class="p-3 card-body">
      <v-chart ref="chart" class="chart" :option="option" autoresize />
      <label for="Selling" class="form-label">Selling : {{ selper }}%</label>
      <input v-model="selper" type="range" class="form-range" min="-100" max="100" step="5" id="Selling">
      <label for="Buying" class="form-label">Buying : {{ buyper }}%</label>
      <input v-model="buyper" type="range" class="form-range" min="-100" max="100" step="5" id="Buying">
    </div>
  </div>
</template>

<script>
import PriceService from '../../../services/PriceService';
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
      default: "Price Definition",
    }
  },
  data() {
    return {
      selper: '0',
      buyper: '0',
    }
  },
  async mounted() {
    await this.loadMarketPrices();
  },
  methods: {
    async loadMarketPrices(){
      await PriceService.getTodayPrices().then(prices => {
        console.log(prices)
        let hours = [];
        let price = [];
        let buy = [];
        let sel = [];
        prices.forEach(entry =>{
          hours.push(entry[0]);
          price.push(entry[1]);
          sel.push(entry);
          buy.push(entry);
        })
        this.option.xAxis.data = hours;
        this.option.series[0].data = price;
        this.option.series[1].data = buy;
        this.option.series[2].data = sel;
      });
    }
  },
  provide: {
    [THEME_KEY]: 'light',
  },
  watch:{
    buyper(val){
      let buy = [];
      this.option.series[0].data.forEach(entry =>{
        buy.push(entry+entry*val/100);
      })
      this.option.series[1].data = buy;
    },
    selper(val){
      let sel = [];
      this.option.series[0].data.forEach(entry =>{
        sel.push(entry+entry*val/100);
      })
      this.option.series[2].data = sel;
    },
  },
  setup() {
    const option = ref({
  legend: {
    data: ['Market Prices', 'Sell Price', 'Buy Price'],
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
      name: 'Market Prices',
      type: 'bar',
      stack: 'one',
      color: "#f56036",
      emphasis: {
        itemStyle: {
            shadowBlur: 10,
      }},
      data: []
    },
    {
      name: 'Sell Price',
      type: 'bar',
      emphasis: {
        itemStyle: {
            shadowBlur: 10,
      }},
      data: []
    },
    {
      name: 'Buy Price',
      type: 'bar',
      emphasis: {
        itemStyle: {
            shadowBlur: 10,
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
