<template>
  <div class="py-4 container-fluid">
    <div class="row mb-4">
      <div class="col-12">
        <iots-table />
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
import IotsTable from "./components/IotsTable.vue";
import SharedIotsTable from "./components/SharedIotsTable.vue";

export default {
  name: "iots",
  components: {
    IotsTable,
    SharedIotsTable
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
