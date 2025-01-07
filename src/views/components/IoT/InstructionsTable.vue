<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask" @keydown.esc="$emit('close')">
            <div class="modal-container">
                <div class="modal-header">
                    <div class="d-flex justify-content-between w-100">
                        <h6 name="header"><i class="fas fa-network-wired"></i> Instructions Table</h6>
                        <button class="btn btn-transparent align-self-start" type="button" aria-haspopup="true"
                            aria-expanded="false" @click="$emit('close')">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>

                <div class="modal-body">
                    <div class="card mb-4" style="position: relative;">
                        <div class="card-body px-0 pt-0 pb-2">
                            <div class="table-responsive p-0">
                                
                                <table class="table participation-table">
                                    <thead>
                                        <tr>
                                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">IoT Device</th>
                                            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2" v-for="hour in hours" :key="hour">{{ hour }}:00</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="device in iotsList" :key="device.name">
                                            <td>{{ device.name }}</td>
                                            <td
                                            v-for="hour in hours"
                                            :key="hour"
                                            :class="getCellClass(device.name, hour)"
                                            @click="toggleState(device.name, hour)"
                                            title="Click to toggle state"
                                            >
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="legend">
                                    <span class="legend-item participation ms-5">Participation</span>
                                    <span class="legend-item no-participation">No Participation</span>
                                    <span class="legend-item shifting">Shifting</span>
                                </div>
                            </div>
                            <div class="text-center">
                                <argon-button class="m-2" variant="gradient" color="success" size="sm" @click="save()">Save</argon-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>
  
<script>
import IotService from '../../../services/IotService.js';
import ArgonButton from "@/components/ArgonButton.vue";

export default {
    name: "instructions-table",
    components: {
        ArgonButton,
    },
    props: {
        show: Boolean,
    },
    async mounted() {
        await this.loadIotsList();
    },
    data() {
        return {
            hours: Array.from({ length: 24 }, (_, i) => i),
            participationStates: {},
        }
    },
    methods: {
        async loadIotsList() {
            var response = await IotService.getIots(localStorage.getItem("uri"))
            let list = []
            for(var i = 0; i< response.length; i++){
                if (response[i]['connectionmode']=='local'){
                list.push(response[i])
                }
            }
            for(i = 0; i< list.length; i++){
                var aux = [];
                for (var j = 0; j< list[i]['values'].length; j++){
                aux.push(list[i]['values'][j]['type'])
                }
                list[i]['values'] = aux;
            }
            this.iotsList = list
            response = await IotService.getInstructions(localStorage.getItem("uri"))
            this.participationStates = response
        },
        async save() {
            console.log("participation",this.participationStates)
            await IotService.saveInstructions(localStorage.getItem("uri"), this.participationStates)
            this.$emit('close')
        },
        getCellClass(deviceIdS, hourS) {
            const deviceId = String(deviceIdS);
            const hour = String(hourS);
            const state = this.participationStates[deviceId]?.[hour];
            return {
                participation: state === "participation",
                "no-participation": state === "no-participation",
                shifting: state === "shifting",
            };
        },
        toggleState(deviceIdS, hourS) {
            const deviceId = String(deviceIdS);
            const hour = String(hourS);
            if (!this.participationStates[deviceId]) {
                this.participationStates[deviceId] = {};
            }
            const currentState = this.participationStates[deviceId][hour];
            if (currentState === "participation") {
                this.participationStates[deviceId][hour] = "no-participation";
            } else if (currentState === "no-participation") {
                this.participationStates[deviceId][hour] = "shifting";
            } else if (currentState === "shifting") {
                this.participationStates[deviceId][hour] = "";
            } else {
                this.participationStates[deviceId][hour] = "participation";
            }
        },
    },
};
</script>

<style scoped>
tr:hover {
  background-color: #f5f5f5;
}

tr.active {
  background-color: #e0e0e0;
}

.participation-table {
border-collapse: collapse;
width: 100%;
margin: 20px 0;
}
.participation-table th,
.participation-table td {
text-align: center;
padding: 8px;
}

.participation {
background-color: #4caf50 !important;
}
.no-participation {
background-color: #f44336 !important;
}
.shifting {
background-color: #ffeb3b !important;
}

.legend {
display: flex;
gap: 20px;
margin-bottom: 10px;
}
.legend-item {
display: inline-block;
padding: 5px 10px;
color: #fff;
font-size: 14px;
font-weight: bold;
border-radius: 4px;
}
.legend-item.participation {
background-color: #4caf50;
}
.legend-item.no-participation {
background-color: #f44336;
}
.legend-item.shifting {
background-color: #ffeb3b;
color: #000000;
}
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
  width: 62%;
  margin: auto;
  padding: 20px 30px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.modal-body {
    padding: 20px 0px;
    overflow-y: auto; /* Enable vertical scrolling if content overflows */
    flex-grow: 1; /* Allow the body to grow and take up space */
}
.table-responsive {
    max-height: 300px; /* Set a maximum height */
    overflow-y: auto; /* Enable vertical scrolling */
    overflow-x: auto; /* Enable horizontal scrolling if needed */
}
.modal-default-button {
  float: right;
}

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
</style>
