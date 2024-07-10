<template>
  <div class="card h-100 mb-4">
    <div class="card-header pb-0 px-3">
      <div class="row">
        <div class="col-md-6">
          <h6 class="mb-0">Your Token Status</h6>
        </div>
      </div>
    </div>
    <div class="card-body pt-4 p-3">
      <h6 class="text-uppercase text-body text-xs font-weight-bolder mb-3">Created</h6>
      <ul class="list-group">
        <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg" v-for="token in createdTokenList" :key="token.token">
          <div class="d-flex align-items-center">
            <argon-button
              color="success"
              variant="outline"
              size="sm"
              class="btn-icon-only btn-rounded mb-0 me-3 d-flex align-items-center justify-content-center"
            >
              <i class="fas fa-arrow-up" aria-hidden="true"></i>
            </argon-button>
            <div class="d-flex flex-column">
              <h6 class="mb-1 text-dark text-sm">{{token.name}}</h6>
              <span class="text-xs">{{token.datetime}}</span>
            </div>
          </div>
        </li>
      </ul>
      <h6 class="text-uppercase text-body text-xs font-weight-bolder my-3" v-if="this.expiringTokenList.length != 0" >Expiring</h6>
      <ul class="list-group" v-if="this.expiringTokenList.length != 0">
        <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg" v-for="token in expiringTokenList" :key="token.token">
          <div class="d-flex align-items-center">
            <argon-button
              color="danger"
              variant="outline"
              size="sm"
              class="btn-icon-only btn-rounded mb-0 me-3 d-flex align-items-center justify-content-center"
            >
              <i class="fas fa-hourglass-end" aria-hidden="true"></i>
            </argon-button>
            <div class="d-flex flex-column">
              <h6 class="mb-1 text-dark text-sm">{{token.name}}</h6>
              <span class="text-xs">{{token.datetime}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TokenService from '../../services/TokenService.js';
import ArgonButton from "@/components/ArgonButton.vue";

export default {
  name: "token-historic-card",
  components: {
    ArgonButton,
  },
  async created() {
    await this.loadTokenList();
  },
  data() {
    return {
      tokenlist: [],
      expiringTokenList: [],
      createdTokenList: [],
    }
  },
  methods: {
    async loadTokenList (){
      this.tokenlist = await TokenService.getTokens(localStorage.getItem("uri"))
      for(let i = 0; i < this.tokenlist.length; i++){
        
        var creationDate = new Date(this.tokenlist[i]['datetime']);
        const expireDate = new Date(creationDate.getTime() + this.tokenlist[i]['expiration_time_minutes'] * 60000)
        const diff = expireDate - new Date();
        if(diff < 10080){
          this.expiringTokenList.push(this.tokenlist[i])
        }else{
          this.createdTokenList.push(this.tokenlist[i])
        }
      }
    }
  }
};
</script>
