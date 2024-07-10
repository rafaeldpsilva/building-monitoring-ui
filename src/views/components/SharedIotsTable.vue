<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6><i class="fas fa-wifi"></i> Shared IoT's</h6>
      <p v-if="this.iotsList.length == 0" class="text-sm">
          <span class="font-weight-bold">You don't have shared IoTs :/</span>
        </p>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table v-if="this.iotsList.length != 0" class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Type</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Values</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="iot in iotsList" :key="iot.name" @click="showIotModal(iot)">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img v-if="iot.type == 'refrigerator'" src="../../assets/img/icons/refrigerator.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'dishwasher'" src="../../assets/img/icons/dishwasher.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'hvac'" src="../../assets/img/icons/hvac.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'kettle'" src="../../assets/img/icons/kettle.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'microwave'" src="../../assets/img/icons/microwave.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'sockets'" src="../../assets/img/icons/sockets.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'water heater'" src="../../assets/img/icons/waterheater.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'lamp'" src="../../assets/img/icons/lamp.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'generation'" src="../../assets/img/icons/generation.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'light'" src="../../assets/img/icons/light.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'temperature'" src="../../assets/img/icons/temperature.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'humidity'" src="../../assets/img/icons/humidity.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'co2'" src="../../assets/img/icons/co2.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'movement'" src="../../assets/img/icons/movement.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else-if="iot.type == 'door'" src="../../assets/img/icons/door.png"
                      class="avatar avatar-sm me-3" alt="user1" />
                    <img v-else src="../../assets/img/icons/iot.png" class="avatar avatar-sm me-3" alt="user1" />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ iot.name }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ iot.type }}</p>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ iot.values.toString().replaceAll(",",", ") }}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-success">Online</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <Teleport to="body">
      <iot-modal :show="isModalVisible" :iot="selectedIot" @close="isModalVisible = false"></iot-modal>
    </Teleport>
</template>

<script>
import IotService from '../../services/IotService.js';
import IotModal from './IotModal.vue';

export default {
  name: "iots-table",
  components: {
    IotModal
  },
  async mounted() {
    await this.loadIotsList();
  },
  data() {
    return {
      selectedIot: null,
      isModalVisible: false,
      iotsList: []
    }
  },
  methods: {
    showIotModal(iot) {
      this.selectedIot = iot
      this.isModalVisible = true;
    },
    async loadIotsList() {
      var response = await IotService.getIots(localStorage.getItem("uri"))
      let list = []
      for(var i = 0; i< response.length; i++){
        if (response[i]['connectionmode']=='virtual'){
          console.log(response[i])
          list.push(response[i])
        }
      }
      for(i = 0; i< list.length; i++){
       
          var aux = [];
          console.log(list[i])
          for (var j = 0; j< list[i]['values'].length; j++){
              aux.push(list[i]['values'][j]['type'])
          }
          list[i]['values'] = aux;
        }
      this.iotsList = list
    },
  }
};
</script>
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  text-align: left;
}

tr:hover {
  background-color: #f5f5f5;
}

tr:hover td {
  background-color: #f5f5f5; /* Or any other color you prefer */
}

tr.active {
  background-color: #e0e0e0; /* Highlight color when row is active */
}

</style>