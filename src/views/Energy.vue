<template>
  <div class="py-4 container-fluid">
    <div class="row mb-4">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-xl-4 mb-xl-0 mb-4">
            <master-card />
          </div>
          
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-5 mb-lg">
            <div class="card z-index-2">
              <energy-discrimination />
            </div>
          </div>
          <div class="col-lg-7 mb-lg">
            <div class="card z-index-2">
              <price-definition />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MasterCard from "@/examples/Cards/MasterCard.vue";
import EnergyDiscrimination from "./components/Energy/EnergyDiscrimination.vue";
import PriceDefinition from "./components/Energy/PriceDefinition.vue";

export default {
  name: "energy",
  components: {
    MasterCard,
    PriceDefinition,
    EnergyDiscrimination,
  },
  data() {
    return {
      i: 0,
      detail: "updated 5 seconds ago",
      stats: {
        consumption: {
          title: "Average Self Consumption",
          value: "",
          iconClass: "fa fa-flash",
          iconBackground: "bg-gradient-primary",
        }
      },
    };
  },
  async mounted() {
  },
  methods: {
  },
};
</script>
