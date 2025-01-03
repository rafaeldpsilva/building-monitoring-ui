<template>
    <div class="card">
      <div class="pb-0 card-header mb-0">
        <h6>{{ title }}</h6>
      </div>
      <div class="p-3 card-body">
        <div class="chart">
          <v-chart class="chart" :option="option" autoresize />
        </div>
      </div>
    </div>
  </template>
  <script>
  import EnergyService from '../../../services/EnergyService.js';
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { PieChart } from 'echarts/charts';
  import {
    TooltipComponent,
    LegendComponent,
    GridComponent,
  } from 'echarts/components';
  import VChart, { THEME_KEY } from 'vue-echarts';
  import { ref, defineComponent } from 'vue';
  use([
    CanvasRenderer,
    PieChart,
    GridComponent,
    TooltipComponent,
    LegendComponent
  ]);
  
  export default defineComponent({
    components: {
      VChart,
    },
    props: {
      title: {
        type: String,
        default: "Last Month Benefits",
      }
    },
    data() {
      return {
        loading: true,
      }
    },
    provide: {
      [THEME_KEY]: 'light',
    },
    mounted() {
      this.getLastMonthBenefits();
    },
    methods: {
      async getLastMonthBenefits(){
        this.option.series[0].data = [{ value: 0, name: 'Retailer'},{ value: 0, name: 'Demand Response' },{ value: 0, name: 'P2P' }]
        await EnergyService.get_last_month_benefits(localStorage.getItem("uri")).then(benefits => {
          console.log(benefits)
          this.option.series[0].data = [{ value: benefits['retailer'], name: 'Retailer'},{ value: benefits['dr'], name: 'Demand Response' },{ value: benefits['p2p'], name: 'P2P' }]
        });
      }
    },
    setup() {
      const option = ref({
        tooltip: {
          trigger: 'item',
        },
        legend: {
          left: 'center',
          data: [
            'Retailer',
            'Demand Response',
            'P2P'
          ]
        },
        series: [
          {
            name: 'Benefit',
            type: 'pie',
            radius: '85%',
            itemStyle: {
              borderRadius: 5
            },
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            data: []
          }
        ]
      });
      return { option };
    },
  });
  </script>
  
  <style scoped>
  .chart {
    height: 40vh;
  }
  </style>
  