<template>
  <div class="card bg-transparent shadow-xl">
    <div
      class="overflow-hidden position-relative border-radius-xl"
      :style="{backgroundImage: 'url(' + require('../../assets/img/card-visa.jpg') + ')'}"
    >
      <span class="mask bg-gradient-dark"></span>
      <div class="card-body position-relative z-index-1 p-3">
        <i class="fas fa-wifi text-white p-2" aria-hidden="true"></i>
        <h5
          class="text-white mt-4 mb-5 pb-2"
        >4562&nbsp;&nbsp;&nbsp;1122&nbsp;&nbsp;&nbsp;4594&nbsp;&nbsp;&nbsp;7852</h5>
        <div class="d-flex">
          <div class="d-flex">
            <div :class="this.$store.state.isRTL ? 'ms-4' : 'me-0'">
              <p class="text-white text-sm opacity-8 mb-0">{{ cardHolderText }}</p>
              <h6 class="text-white mb-0">{{ name }}</h6>
            </div>
            <div class="ms-4 me-4">
              <p class="text-white text-sm opacity-8 mb-0">{{ cardExpirationText }}</p>
              <h6 class="text-white mb-0">12/24</h6>
            </div>
            <div>
              <p class="text-white text-sm opacity-8 mb-0">{{ BalanceText }}</p>
              <h6 class="text-white mb-0">{{ balance }}€</h6>
            </div>
          </div>
          <div
            class="w-20 d-flex align-items-end justify-content-end"
            :class="this.$store.state.isRTL ? 'me-auto' : 'ms-auto'"
          >
            <argon-avatar class="w-60 mt-2" :img="img1" alt="logo" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import BuildingService from '../../services/BuildingService.js';
import ArgonAvatar from "@/components/ArgonAvatar.vue";
import img from "../../assets/img/card-visa.jpg";
import img1 from "../../assets/img/logos/mastercard.png";

export default {
  name: "master-card",
  components: {
    ArgonAvatar,
  },
  props: {
    cardHolderText: {
      type: String,
      default: "Card Holder",
    },
    cardExpirationText: {
      type: String,
      default: "Expires",
    },
    BalanceText: {
      type: String,
      default: "Balance",
    },
  },
  data() {
    return {
      name: "",
      img,
      img1,
      balance: 0,
    };
  },
  async created(){
    this.name = localStorage.getItem("name")
    //this.balance = await BuildingService.getBalance(localStorage.getItem("uri"),localStorage.getItem("token"))
    this.balance = 35.72
  }
};
</script>
