<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask" @keydown.esc="close()">
      <div class="modal-container">
        <div class="modal-header">
          <div class="d-flex justify-content-between w-100">
            <h3 name="header">{{ division.name }}</h3>
            <button class="btn btn-transparent align-self-start" type="button" aria-haspopup="true" aria-expanded="false"
              @click="close()">
              <i class="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <div class="modal-body">
          <div v-if="isACConfigured" class="config">
            <h6 >AC Should be:</h6>
            <span v-if="ac_status && ac_mode == 'warm'" class="badge badge-sm bg-gradient-warning">{{ ac_mode }}</span>
            <span v-else-if="ac_status && ac_mode == 'cold'" class="badge badge-sm bg-gradient-info">{{ ac_mode }}</span>
            <span v-else class="badge badge-sm bg-gradient-danger">Off</span>
          </div>
          <div class="config">
            <h6>IoT's</h6>
            <div class="row">


              <label for="example-text-input" class="form-control-label">Room's IoT:</label>
              <div>
                <VueMultiselect v-model="iots_selected" :options="iotsList" :multiple="true" :close-on-select="false"
                  :clear-on-select="false" :preserve-search="true" placeholder="Pick at least one" label="name"
                  track-by="name" :preselect-first="false" />
              </div>
            </div>
          </div>
          <div>
            <h6>AC Status Model</h6>
            <div class="row">
              <div class="col-md-6">
                <label for="example-text-input" class="form-control-label">Outdoor Temperature:</label>
                <div>
                  <VueMultiselect v-model="outdoorTemperature" :options="temperature_iots" :multiple="false"
                    :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick one"
                    label="name" track-by="name" :preselect-first="false" />
                </div>
              </div>
              <div class="col-md-6">
                <label for="example-text-input" class="form-control-label">Temperature:</label>
                <div>
                  <VueMultiselect v-model="temperature" :options="temperature_iots" :multiple="false"
                    :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick one"
                    label="name" track-by="name" :preselect-first="false" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label for="example-text-input" class="form-control-label">Humidity:</label>
                <div>
                  <VueMultiselect v-model="humidity" :options="humidity_iots" :multiple="false" :close-on-select="false"
                    :clear-on-select="false" :preserve-search="true" placeholder="Pick one" label="name" track-by="name"
                    :preselect-first="false" />
                </div>
              </div>
              <div class="col-md-6">
                <label for="example-text-input" class="form-control-label">Light:</label>
                <div>
                  <VueMultiselect v-model="light" :options="light_iots" :multiple="false" :close-on-select="false"
                    :clear-on-select="false" :preserve-search="true" placeholder="Pick one" label="name" track-by="name"
                    :preselect-first="false" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <div v-if="this.loading" class="fa-3x text-center">
            <argon-button class="m-2" variant="gradient" color="primary" size="sm">
              <i class="fas fa-circle-notch fa-spin"></i>
            </argon-button>
          </div>
          <argon-button v-else class="m-2" variant="gradient" color="primary" size="sm"
            @click="updateDivision()">Update</argon-button>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script>

import ArgonButton from "@/components/ArgonButton.vue";
import VueMultiselect from 'vue-multiselect';
import "vue-multiselect/dist/vue-multiselect.css";
import IotService from '../../services/IotService.js';
import DivisionsService from '../../services/DivisionsService.js';

export default {
  name: "division-modal",
  props: {
    show: Boolean,
    division: {
      required: true,
    },
  },
  components: {
    ArgonButton,
    VueMultiselect,
  },
  data() {
    return {
      loading: false,
      ac_status: true,
      ac_mode: "cold",
      iots_selected: [],
      iotsList: [],
      temperature_iots: [],
      light_iots: [],
      humidity_iots: [],
      outdoorTemperature: "",
      temperature: "",
      humidity: "",
      light: "",
    }
  },
  async mounted() {
    this.iotsList = await this.getIots()
    this.savedConfigurations();
    if (this.isACConfigured) {
      const status = await DivisionsService.postACStatus(localStorage.getItem("uri"), this.division.id)
      if (status == "off") {
        this.ac_status = false
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async updateDivision() {
      this.loading = true;
      var aux = []
      for (var i = 0; i < this.iots_selected.length; i++) {
        aux.push(this.iots_selected[i]['name'])
      }
      await DivisionsService.postDivisionUpdate(localStorage.getItem("uri"), this.division.id, this.division.name, aux, this.outdoorTemperature['name'], this.temperature['name'], this.humidity['name'], this.light['name'])
      this.loading = false;
    },
    async getIots() {
      var list = await IotService.getIots(localStorage.getItem("uri"))
      for (var i = 0; i < list.length; i++) {
        var aux = [];
        for (var j = 0; j < list[i]['values'].length; j++) {
          aux.push(list[i]['values'][j]['type'])
        }
        list[i]['values'] = aux;
      }
      return list
    },
    savedConfigurations() {
      for (var i = 0; i < this.iotsList.length; i++) {
        for (var j = 0; j < this.division.iots.length; j++) {
          if (this.iotsList[i]['name'] == this.division.iots[j]) {
            this.iots_selected.push(this.iotsList[i])
            if (this.iotsList[i]["values"].includes("temperature")) {

              if (this.division.ac_status_configuration.outside_temperature == this.iotsList[i]['name']) {
                this.outdoorTemperature = this.iotsList[i]
              } else if (this.division.ac_status_configuration.temperature == this.iotsList[i]['name']) {
                this.temperature = this.iotsList[i]
              }
              this.temperature_iots.push(this.iotsList[i])
            }
            if (this.iotsList[i]["values"].includes("humidity")) {
              if (this.division.ac_status_configuration.humidity == this.iotsList[i]['name']) {
                this.humidity = this.iotsList[i]
              }
              this.humidity_iots.push(this.iotsList[i])
            }
            if (this.iotsList[i]["values"].includes("light")) {
              if (this.division.ac_status_configuration.light == this.iotsList[i]['name']) {
                this.light = this.iotsList[i]
              }
              this.light_iots.push(this.iotsList[i])
            }
          }
        }
      }
    }
  },
  computed: {
    isACConfigured: function () {
      return this.outdoorTemperature != "" && this.temperature != "" && this.humidity != "" && this.light != "";
    },
    isUpdateButtonDisabled: function () {
      return !this.name || !this.iots_selected || this.iots_selected.length === 0;
    },
  },
}
</script>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 850px;
  margin: auto;
  padding: 20px 30px;
  background-color: #f5f5f5;
  border-radius: 10px;
  /* Adjust the value to control the roundness of the corners */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header {
  display: block !important;
  padding-bottom: 0;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.config {
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

/* Custom CSS for transparent button */
.btn-transparent {
  background-color: transparent;
  border: none;
  color: #000 !important;
  box-shadow: none !important;
  padding-left: 3.25rem !important;
  padding-right: 0px !important;
  padding-top: 0px !important;
  /* Adjust the color as needed */
}

/* Style for three dots */
.three-dots {
  font-size: 1.5rem;
  /* Adjust the size as needed */
}

/* Hide the default dropdown button arrow */
.btn-transparent::after {
  content: none;
}
</style>
  