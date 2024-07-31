<template>
  <div class="card">
    <div class="pb-0 card-header mb-0">
      <h6>{{ title }}</h6>
    </div>
    <div class="p-3 card-body">
      <v-chart ref="chart" class="chart" :option="option" autoresize />
      <input v-model="autoSell" type="checkbox" @click="setSellAuto()">
      <label for="Selling" class="form-label">Selling : {{ selperLabel }}</label>
      <input v-model="selper" type="range" class="form-range" min="0" max="100" step="1" :disabled="autoSell" v-on:mouseup="sendPrices()">
      <input v-model="autoBuy" type="checkbox" @click="setBuyAuto()">
      <label for="Buying" class="form-label">Buying : {{ buyperLabel }}</label>
      <input v-model="buyper" type="range" class="form-range" min="0" max="100" step="1" :disabled="autoBuy" v-on:mouseup="sendPrices()">
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
      autoBuy: true,
      autoSell: true,
      selper: '0',
      buyper: '0',
      sel: [],
      sellPrices: [],
      buyPrices: []
    }
  },
  async mounted() {
    await this.loadMarketPrices();
    this.setSellAuto();
    this.setBuyAuto();
  },
  methods: {
    async loadUserPrices(){
      await PriceService.getP2PPrices().then(prices => {
        let sell = prices['sell'];
        let buy = prices['buy'];
        this.option.series[0].data = buy;
        this.option.series[1].data = sell;
      })
    },
    async loadMarketPrices(){
      await PriceService.getTodayPrices().then(prices => {
        let hours = [];
        let price = [];
        prices.forEach(entry =>{
          hours.push(entry[0]);
          price.push(entry[1]);
        })
        this.option.xAxis.data = hours;
        this.option.series[2].data = price;
      });
    },
    updateBuy(val){
      let buy = [];
      this.buyPrices = [];
      this.option.series[2].data.forEach(entry =>{
        buy.push(entry*-val/100 + entry);
        this.buyPrices.push(entry*-val/100 + entry);
      })
      this.option.series[0].data = buy;
      for(let i = 0; i< this.option.series[2].data.length; i++ ){
        this.option.series[1].data[i] = this.sel[i] + this.option.series[2].data[i] - this.option.series[0].data[i]
      }
    },
    updateSell(val){
      this.sel = [];
      this.sellPrices = [];
      this.option.series[2].data.forEach(entry =>{
        this.sel.push(entry*val/100);
        this.sellPrices.push(entry + entry*val/100)
      })
      
      this.option.series[1].data = []
      for(let i = 0; i< this.option.series[2].data.length; i++ ){
        this.option.series[1].data.push(this.sel[i] + this.option.series[2].data[i] - this.option.series[0].data[i])
      }
    },
    async sendPrices(){
      await PriceService.postPrices(localStorage.getItem("uri"), this.sellPrices, this.buyPrices);
      console.log(this.sellPrices, this.buyPrices);
    },
    setSellAuto(){
      this.updateSell(19); 
      this.selper=19
    },
    setBuyAuto(){
      this.updateBuy(23); 
      this.buyper=23
    }
  },
  provide: {
    [THEME_KEY]: 'light',
  },
  computed: {
    selperLabel() {
      return this.autoSell ? 'automatic' : `${this.selper}%`;
    },
    buyperLabel() {
      return this.autoBuy ? 'automatic' : `${this.buyper}%`;
    }
  },
  watch:{
    buyper(val){
      this.updateBuy(val)
    },
    selper(val){
      this.updateSell(val)
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
      yAxis: {
        name: 'Price (EUR)',
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
          name: 'Buy Price',
          type: 'line',
          emphasis: {
            itemStyle: {
                shadowBlur: 10,
          }},
          lineStyle: {
            opacity: 0
          },
          symbol: 'none',
          stack: 'confidence-band',
          data: [],
        },
        {
          name: 'Sell Price',
          type: 'line',
          lineStyle: {
            opacity: 0
          },
          symbol: 'none',
          areaStyle: {
            color: '#81E6D9'
          },
          stack: 'confidence-band',
          emphasis: {
            itemStyle: {
                shadowBlur: 10,
          }},
          data: [],
        },
        {
          name: 'Market Prices',
          type: 'line',
          stack: 'one',
          color: "#f56036",
          emphasis: {
            itemStyle: {
                shadowBlur: 10,
          }},
          data: []
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 1;
      }
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
