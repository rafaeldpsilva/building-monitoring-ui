<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <card :title="stats.consumption.title" :value="stats.consumption.value"
              :percentage="stats.consumption.percentage" :iconClass="stats.consumption.iconClass"
              :iconBackground="stats.consumption.iconBackground" directionReverse></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card :title="stats.generation.title" :value="stats.generation.value"
              :percentage="stats.generation.percentage" :iconClass="stats.generation.iconClass"
              :iconBackground="stats.generation.iconBackground" directionReverse></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card :title="stats.flexibility.title" :value="stats.flexibility.value"
              :percentage="stats.flexibility.percentage" :iconClass="stats.flexibility.iconClass"
              :iconBackground="stats.flexibility.iconBackground" :percentageColor="stats.flexibility.percentageColor"
               directionReverse></card>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-lg-7 mb-lg">
            <div class="card z-index-2 mb-4">
              <building-overview />
            </div>
            <div class="card z-index-2">
              <building-forecast />
            </div>
          </div>
          <div class="col-lg-5">
            <demand-response-events-card />
          </div>
        </div>
        <!--div class="row">
          <div class="col-lg-7 mb-lg">
            <div class="card z-index-2 mb-4">
              <production-breakdown />
            </div>
          </div>
        </div-->
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
import BuildingOverview from "./components/Dashboard/BuildingOverview.vue";
import BuildingForecast from "./components/Dashboard/BuildingForecast.vue";
import BuildingService from "../services/BuildingService.js"
import DemandResponseEventsCard from "./components/Dashboard/DemandResponseEventsCard.vue";

export default {
  name: "dashboard-default",
  data() {
    return {
      i: 0,
      detail: "updated 5 seconds ago",
      stats: {
        consumption: {
          title: "Consumption",
          value: "",
          iconClass: "fa fa-bolt",
          iconBackground: "bg-gradient-primary",
        },
        generation: {
          title: "Generation",
          value: "",
          iconClass: "fa fa-solar-panel",
          iconBackground: "bg-gradient-danger",
        },
        flexibility: {
          title: "Flexibility",
          value: "W",
          iconClass: "ni ni-sound-wave",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-success",
        },
      },
    };
  },
  methods: {
    async updateMonitoringValues() {
      this.i = -1;
      this.energyNow = await BuildingService.getEnergyNow(localStorage.getItem("uri"));
      this.stats.consumption.value = this.energyNow['consumption'].toFixed(2) + " W";
      this.stats.generation.value = this.energyNow['generation'].toFixed(2) + " W";
      this.stats.flexibility.value = this.energyNow['flexibility'].toFixed(2) + " W";
    }
  },
  async mounted() {
    this.updateMonitoringValues();
    this.stats.consumption.value = "0 W";
    this.stats.generation.value = "0 W";
    this.stats.flexibility.value = "0 W";
    await this.updateMonitoringValues()
    this.monitoringInterval = setInterval(() => {
      this.updateMonitoringValues();
    }, 5000);
    this.detailInterval = setInterval(() => {
      this.i += 1;
      this.detail = "updated " + this.i + " seconds ago"
    }, 1000);
  },
  beforeUnmount() {
    // Clear intervals to prevent memory leaks
    clearInterval(this.monitoringInterval);
    clearInterval(this.detailInterval);
  },
  components: {
    Card,
    BuildingOverview,
    BuildingForecast,
    DemandResponseEventsCard,
    //ProductionBreakdown,
  },
};
</script>
