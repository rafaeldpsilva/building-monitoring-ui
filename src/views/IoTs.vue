<template>
  <div class="py-4 container-fluid">
    <div class="row mb-4">
      <div class="col-12">
        <iots-table />
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-12">
        <instructions-table />
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-12">
        <shared-iots-table />
      </div>
    </div>
  </div>
</template>

<script>
import IotsTable from "./components/IoT/IotsTable.vue";
import SharedIotsTable from "./components/IoT/SharedIotsTable.vue";
import InstructionsTable from "./components/IoT/InstructionsTable.vue";


export default {
  name: "iots",
  components: {
    IotsTable,
    SharedIotsTable,
    InstructionsTable
  },
  data() {
    return {
      stats: {
        titleColor: "opacity-7 text-white",
        descColor: "text-white",
      },
    };
  },
};
</script>
