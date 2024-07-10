<template>
  <div class="scroll-container">
    <div v-for="iotValue in iotValues" :key="iotValue.tag" class="card bg-gradient-neutral mb-4 mr-2">
      <div class="card-body">
        <div class="mb-2">
          <p class="mb-0 text-sm text-uppercase font-weight-bold" :class="titleColor">{{ iotValue.type }}</p>
          <span class="h2 text-dark">{{ iotValue.values }}</span>
          <div class="text-dark opacity-8 mt-2 text-sm">Tag: {{ iotValue.tag }}</div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import IotService from '../../services/IotService.js';

export default {
  name: "iot-values",
  props: {
    iot: String,
  },
  data() {
    return {
      iotValues: [],
    };
  },
  async mounted() {
    await this.loadIotValues();
  },
  methods: {
    async loadIotValues() {
      var response = await IotService.getIotValues(localStorage.getItem("uri"), this.iot['name'])
      console.log(response)
      this.iotValues = response
    }
  }
};
</script>
<style scoped>
.scroll-container {
  display: flex;
  overflow-x: auto;
  padding: 10px;
}

.card {
  flex: 0 0 auto;
  width: 300px; /* Adjust as needed */
  margin-right: 10px;
}

</style>