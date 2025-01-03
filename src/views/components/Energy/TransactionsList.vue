<template>
    <div class="card">
      <div class="card-header pb-0 px-3">
        <h6 class="mb-0">Transactions List</h6>
      </div>
      <div class="card-body pt-4 p-3">
        <ul class="list-group">
          <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg" v-for="transaction in transactionsList" :key="transaction.datetime">
            <div class="d-flex flex-column">
              <h6 class="mb-3 text-sm">{{transaction.product}}</h6>
              <span class="mb-2 text-xs">
                Datetime:
                <span class="text-dark ms-sm-2 font-weight-bold">{{transaction.datetime}}</span>
              </span>
              <span v-if="transaction.source == 'p2p'" class="mb-2 text-xs">
                Peer:
                <span class="text-dark ms-sm-2 font-weight-bold">{{transaction.product}}</span>
              </span>
              <span v-else class="mb-2 text-xs">
                IoT:
                <span class="text-dark ms-sm-2 font-weight-bold">{{transaction.product}}</span>
              </span>
              <span class="mb-2 text-xs">
                Value:
                <span class="text-dark ms-sm-2 font-weight-bold">{{(transaction.value).toFixed(4)}}</span>
              </span>
              <span class="text-xs">
                Source:
                <span class="text-dark ms-sm-2 font-weight-bold">{{transaction.source}}</span>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import EnergyService from '../../../services/EnergyService.js';
  
  export default {
    name: "transactions-list",
    async created() {
      await this.loadTransactions();
    },
    data() {
      return {
        transactionsList: []
      }
    },
    methods: {
      async loadTransactions (){
        this.transactionsList = await EnergyService.getTransactions(localStorage.getItem("uri"))
      }
    }
  };
  </script>
  