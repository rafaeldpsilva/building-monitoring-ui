<template>
  <div class="card pb-4">
    <div class="card-header pb-0 p-3">
      <div class="row">
        <div class="col-6 d-flex align-items-center">
          <h6 class="mb-0">Generate Token</h6>
        </div>
        <div class="col-6 text-end">
          <argon-button color="success" size="sm" variant="outline" @click="generateToken()">Generate</argon-button>
        </div>
      </div>
    </div>
    <div class="card-body p-3 pb-0 mb-0">      
      <div class="row">
        <div class="col-md-6">
          <label for="example-text-input" class="form-control-label">Name</label>
          <input class="form-control" type="text" placeholder="Name" v-model="name"/>
        </div>
        <div class="col-md-6">
          <label for="example-text-input" class="form-control-label">List of Resources</label>
          <div>
            <VueMultiselect
              v-model="resources_selected"
              :options="resources"
              :multiple="true"/>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label for="example-text-input" class="form-control-label">Data Aggregation</label>
          <div>
            <VueMultiselect
              v-model="data_selected"
              :options="data_agg">
            </VueMultiselect>
          </div>
        </div>
        <div class="col-md-6">
          <label for="example-text-input" class="form-control-label">Time Aggregation</label>
          <div>
            <VueMultiselect
              v-model="time_selected"
              :options="time_agg">
            </VueMultiselect>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label for="example-text-input" class="form-control-label">Embargo Period</label>
            <input class="form-control" type="text" placeholder="Embargo Period" v-model="embargo"/>
        </div>
        <div class="col-md-6">
          <label for="example-text-input" class="form-control-label">Expiration Date</label>                  
          <VueDatePicker v-model="date"></VueDatePicker>
        </div>
      </div>
      <hr class="horizontal dark" />
      <p class="text-uppercase text-sm">Token</p>
      <div class="row">
        <div class="col-md-10">
          <input class="form-control" type="text" placeholder="Token" v-model="token" />
        </div>
        
        <div class="col-md-2">
          <a class="btn btn-link text-dark px-1 mb-0" href="javascript:;" @click="copyToClipboard()">
            <i class="fas fa-copy text-dark me-2" aria-hidden="true"></i>
          </a> 
          <a class="btn btn-link text-danger text-gradient px-1 mb-0" href="javascript:;" @click="saveToken()">
            <i class="fa fa-upload me-2" aria-hidden="true"></i>
          </a>
        </div>
      </div>          
    </div>
  </div>
</template>
<script>

import ArgonButton from "@/components/ArgonButton.vue";
import VueMultiselect from 'vue-multiselect'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import "vue-multiselect/dist/vue-multiselect.css";
import TokenService from '../../services/TokenService.js';

export default {
  name: "generate-token-card",
  components: {
    VueMultiselect,
    VueDatePicker,
    ArgonButton,
  },
  data() {
    return {
      name: '',
      embargo: '',
      date: null,
      resources_selected: '',
      resources: ['aggregated', 'discrete', 'admin', 'community_manager'],
      data_selected: null,
      data_agg: ['5 min','10 min','15 min'],
      time_selected: null,
      time_agg: ['5 min','10 min','15 min'],
      token: '',
    }
  },
  methods:{
    async getResources () {
      
    },
    async generateToken () {
      this.token = await TokenService.postGenerateToken(localStorage.getItem("uri"), this.name, this.resources_selected, this.data_selected, this.time_selected, this.embargo, 991231)
    },
    async saveToken() {    
      let response = await TokenService.postSaveToken(localStorage.getItem("uri"), this.name, this.resources_selected, this.data_selected, this.time_selected, this.embargo, this.date)
      if (response['active'] == true){
        this.token == "SAVED"
      }
    },
    copyToClipboard() {    
      navigator.clipboard.writeText(this.token)
        .then(() => {
          console.log('Text copied to clipboard',this.token)
        })
        .catch((error) => {
          console.error('Error copying text: ', error)
        })
    },
  }
};
</script>
