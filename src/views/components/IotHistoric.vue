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
import IotService from "../../services/IotService.js"
use([
    CanvasRenderer,
    LineChart,
    GridComponent,
    TooltipComponent,
    LegendComponent
]);

export default defineComponent({
    name: "iot-graph-hour",
    components: {
        VChart,
    },
    props: {
        iot: String,
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
        await this.loadIotHistoric();
    },
    methods: {
        async loadIotHistoric() {
            const historic = await IotService.getIotHistoric(localStorage.getItem("uri"), this.iot)
            
            var hours = [];
            var iot_historic = [];
            for (var i = 0; i < historic.length; i++){
                iot_historic.push(historic[i][0].toFixed(2));
                hours.push(new Date(historic[i][1]).getUTCHours());
            }
            this.option.xAxis.data = hours;
            this.option.series[0].data = iot_historic;
            this.loading = false;
        },
    },
    setup() {
        const option = ref({
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['iot']
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
                    name: 'iot',
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
  
  