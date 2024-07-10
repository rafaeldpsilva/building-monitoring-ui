<template>
  <div v-if="this.loading" class="fa-3x text-center">
    <i class="fas fa-circle-notch fa-spin"></i>
  </div>
  <v-chart v-else class="chart" :option="option" autoresize />
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
import BatteryService from "../../services/BatteryService.js"
use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
]);

export default defineComponent({
  name: "batteries-graph-hour",
  components: {
    VChart,
  },
  props: {
    interval: [],
    unit: [],
    stored_energy: [],
  },
  data() {
    return {
      loading: true,
    }
  },
  provide: {
    [THEME_KEY]: 'light',
  },
  async mounted() {
    this.loading = true;
    var batteries = JSON.parse(localStorage.getItem("batteries"));

    while(batteries.length == 0){
      await new Promise(r => setTimeout(r, 500));
      batteries = JSON.parse(localStorage.getItem("batteries"));
    }

    const batteries_historic = JSON.parse(localStorage.getItem("batteries_historic"))

    const now = new Date();
    if (batteries_historic.length != 3 || now.getHours() != batteries_historic[0][23]) {
      await this.loadBatteriesHistoric(batteries);
    } else {
      this.loadFromMemory(batteries, batteries_historic)
      this.loading = false;
    }
  },
  methods: {
    loadFromMemory(batteries, batteries_historic) {
      this.option.xAxis.data = batteries_historic[0];
      this.option.series[0].data = batteries_historic[1];
      //TODO insert batteries get last as date
      var j = 1;
      for (j = 1; j <= batteries.length; j++) {
        this.option.legend.data.push(batteries[j - 1]['name'])
        this.option.series.push({
          name: batteries[j - 1]['name'],
          type: 'line',
          color: this.getRandomHexColor(),
          showSymbol: false,
          data: batteries_historic[2][j - 1]
        });
      }
    },
    async loadBatteriesHistoric(batteries) {
      const historic = await BatteryService.getBatteriesHistoric(localStorage.getItem("uri"))

      let stored_energy = [];
      let hours = [];

      let battery_energy = [];
      for (var i = 0; i < batteries.length; i++) {
        battery_energy.push([]);
      }
      console.log(battery_energy)
      i = 0;
      while (i < historic.length) {
        stored_energy.push(historic[i][0]);
        //TODO insert batteries dynamicaly
        var j = 0;
        for (j = 0; j < batteries.length; j++) {
          battery_energy[j].push(historic[i][j]);
        }
        j++;

        //TODO insert batteries get last as date
        var dateObject = new Date(historic[i][j]);
        hours.push(dateObject.getUTCHours());
        i++;
      }
      this.loading = false;
      this.option.xAxis.data = hours;
      this.option.series[0].data = stored_energy;
      j = 1;
      for (j = 1; j <= batteries.length; j++) {
        this.option.legend.data.push(batteries[j - 1]['name'])
        this.option.series.push({
          name: batteries[j - 1]['name'],
          type: 'line',
          color: this.getRandomHexColor(),
          showSymbol: false,
          data: battery_energy[j - 1]
        });
      }
      localStorage.setItem("batteries_historic", JSON.stringify([hours, stored_energy, battery_energy]))
    },
    getRandomHexColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  },
  setup() {
    const option = ref({
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Total State of Charge']
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
        type: 'value',
        max: 100,
      },
      series: [
        {
          name: 'Total State of Charge',
          type: 'line',
          color: "#825ee4",
          showSymbol: false,
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
  height: 30vh;
}
</style>

