<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-8">
        <div class="row mt-4">
          <div class="col-xl-6 mb-xl-0 mb-4">
            <master-card />
          </div>
          <div class="col-xl-6">
            <div class="row">
              <div class="col-md-6">
                <default-info-card
                  :classIcon="check.classIcon"
                  :title="check.title"
                  :desc="check.desc"
                  @click="loading_check()"/>
              </div>
              <div class="col-md-6">
                <default-info-card
                  :classIcon="forget.classIcon"
                  :title="forget.title"
                  :desc="forget.desc"
                  @click="loading_forget()"/>
              </div>
            </div>
          </div>
          <div class="col-md-12 mb-4">
            <payment-card />
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <generate-token-card class="mt-4" />
      </div>
    </div>
    <div class="row">
      <div class="col-md-7">
        <token-list-card />
      </div>
      <div class="col-md-5">
        <token-historic-card />
      </div>
    </div>
  </div>
</template>

<script>
import BuildingService from '../services/BuildingService.js';
import MasterCard from "@/examples/Cards/MasterCard.vue";
import DefaultInfoCard from "@/examples/Cards/DefaultInfoCard.vue";
import PaymentCard from "./components/PaymentCard.vue";
import GenerateTokenCard from "./components/GenerateTokenCard.vue";
import TokenListCard from "./components/TokenListCard.vue";
import TokenHistoricCard from "./components/TokenHistoricCard.vue";

export default {
  name: "Tokens",
  components: {
    MasterCard,
    DefaultInfoCard,
    PaymentCard,
    GenerateTokenCard,
    TokenListCard,
    TokenHistoricCard,
  },
  data() {
    return {
      check: {
        classIcon: "text-white fas fa-check",
        title: "Data Sharing",
        desc: "Assert contracts compliance",
        price: "Assert",
      },
      forget: {
        classIcon: "text-white fas fa-bomb",
        title: "Forget",
        desc: "Evoke right to forget",
        price: "Forget",
      },
    };
  },
  methods:{
    async loading_check(){
      this.check.classIcon = "text-white fa fa-cog fa-spin fa-3x fa-fw";
      this.check.price = 'Checking';
      this.tokenlist = await BuildingService.getAuditCheck(localStorage.getItem("uri"));
    },
    async loading_forget(){
      this.forget.classIcon = "text-white fa fa-cog fa-spin fa-3x fa-fw";
      this.forget.price = 'Checking';
      this.tokenlist = await BuildingService.forgetUser(localStorage.getItem("uri"));
    }
  }
};
</script>
