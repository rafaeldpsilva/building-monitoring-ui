<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Batteries Table</h6>
    </div>
    <div v-if="this.loading" class="fa-3x text-center">
      <i class="fas fa-circle-notch fa-spin"></i>
    </div>
    <div v-else class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Capacity (Wh)</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Status</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Rate</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">State of Charge</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="battery in batteryList" :key="battery.name">
              <td>
                <div class="d-flex px-2">
                  <div>
                    <img src="../../assets/img/icons/refrigerator.png" class="avatar avatar-sm rounded-circle me-2"
                      alt="{{battery.name}}" />
                  </div>
                  <div class="my-auto">
                    <h6 class="mb-0 text-sm">{{ battery.name }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-sm font-weight-bold mb-0">{{ battery.capacity }}</p>
              </td>
              <td>
                <span class="text-xs font-weight-bold">{{ battery.status }}</span>
              </td>
              <td class="align-middle text-center">
                <span v-if="battery.status == 'charging'" class="text-xs text-success font-weight-bold">{{
                  battery.charging_rate }}</span>
                <span v-else-if="battery.status == 'discharging'" class="text-xs text-danger font-weight-bold">{{
                  battery.charging_rate }}</span>
                <span v-else class="text-xs text-info font-weight-bold">{{ battery.charging_rate }}</span>
              </td>
              <td class="align-middle text-center">
                <div class="d-flex align-items-center justify-content-center">
                  <span class="me-2 text-xs font-weight-bold">{{ battery.charge }}%</span>
                  <div>
                    <div class="progress">
                      <div v-if="battery.status == 'charging'" class="progress-bar bg-gradient-success" role="progressbar"
                        aria-valuenow="{{battery.charge}}" aria-valuemin="0" aria-valuemax="100"
                        :style="'width: ' + battery.charge + '%;'"></div>
                      <div v-else-if="battery.status == 'discharging'" class="progress-bar bg-gradient-danger"
                        role="progressbar" aria-valuenow="{{battery.charge}}" aria-valuemin="0" aria-valuemax="100"
                        :style="'width: ' + battery.charge + '%;'"></div>
                      <div v-else class="progress-bar bg-gradient-info" role="progressbar"
                        aria-valuenow="{{battery.charge}}" aria-valuemin="0" aria-valuemax="100"
                        :style="'width: ' + battery.charge + '%;'"></div>
                    </div>
                  </div>
                </div>
              </td>
              <td class="align-middle dropdown">
                <div class="d-flex align-items-center justify-content-end">
                  <button class="btn btn-link text-secondary mb-0" @click="showDropdown(battery.i)">
                    <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                  </button>
                </div>
                <ul class="px-2 py-3 dropdown-menu dropdown-menu-end" :class="showMenu[battery.i] ? 'show' : ''"
                  aria-labelledby="dropdownMenuButton">
                  <li class="mb-2" @click="showChargeModal(battery.i)">
                    <a class="dropdown-item border-radius-md">
                      <div class="py-1 d-flex">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-1 text-sm font-weight-normal">
                            Charge Battery
                          </h6>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li class="mb-2" @click="showDischargeModal(battery.i)">
                    <a class="dropdown-item border-radius-md" href="javascript:;">
                      <div class="py-1 d-flex">
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-1 text-sm font-weight-normal">
                            Discharge Battery
                          </h6>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <charge-modal-dialog :show="showCharge" :battery="selectedBattery" @close="showCharge = false"></charge-modal-dialog>
    </Teleport>
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <discharge-modal-dialog :show="showDischarge" :battery="selectedBattery" @close="showDischarge = false"></discharge-modal-dialog>
    </Teleport>
  </div>
</template>

<script>
import BatteryService from '../../services/BatteryService.js';
import ChargeModalDialog from './ChargeModalDialog.vue';
import DischargeModalDialog from './DischargeModalDialog.vue';

export default {
  name: "batteries-table",
  components: {
    ChargeModalDialog,
    DischargeModalDialog,
  },
  data() {
    return {
      loading: true,
      showCharge: false,
      showDischarge: false,
      selectedBattery: null,
      showMenu: [],
      batteryList: [
        {
          i: 0,
          name: "bat",
          capacity: 2500,
          status: "charging",
          charge: 60
        }
      ]
    }
  },
  async mounted() {
    await this.loadBatteryList();
    this.showMenu = [];
    for (var i = 0; i < this.batteryList; i++) {
      this.showMenu.push(false)
    }
    this.loading = false;
    this.batteriesInterval = setInterval(() => {
      this.loadBatteryList();
    }, 5000);
  },
  beforeUnmount(){
    clearInterval(this.batteriesInterval);
  },
  methods: {
    async loadBatteryList() {
      const batteries = await BatteryService.getBatteries(localStorage.getItem("uri"))
      var list = []
      for (var i = 0; i < batteries.length; i++) {
        var status = "on hold"
        if (batteries[i]['charging_rate'] > 0) {
          status = "charging"
        } else if (batteries[i]['charging_rate'] < 0) {
          status = "discharging"
        }
        list.push({ i: i, name: batteries[i]['name'], capacity: batteries[i]['capacity'], status: status, charging_rate: batteries[i]['charging_rate'], charge: batteries[i]['charge'] })
      }
      this.batteryList = list
      localStorage.setItem("batteries", JSON.stringify(list))
    },
    showDropdown(i) {
      var menu = []
      for (var j = 0; j < i; j++) {
        menu.push(false)
      }
      menu.push(!this.showMenu[j])
      j++;
      for (j; j < this.showMenu.length; j++) {
        menu.push(false)
      }
      this.showMenu = menu
    },
    showChargeModal(i) {
      this.showMenu[i]=false;
      this.selectedBattery = this.batteryList[i]['name'] 
      this.showCharge = true;
    },
    showDischargeModal(i) {
      this.showMenu[i]=false;
      this.selectedBattery = this.batteryList[i]['name']
      this.showDischarge = true;
    }
  }
}
</script>
