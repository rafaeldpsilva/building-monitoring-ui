<template>
  <div class="card">
    <div class="card-header pb-0 px-3">
      <h6 class="mb-0">Token List</h6>
    </div>
    <div class="card-body pt-4 p-3">
      <ul class="list-group">
        <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg" v-for="token in tokenlist" :key="token.token">
          <div class="d-flex flex-column">
            <h6 class="mb-3 text-sm">{{token.name}}</h6>
            <span class="mb-2 text-xs">
              Expiration Time (Minutes):
              <span class="text-dark font-weight-bold ms-sm-2">{{token.expiration_time_minutes}}</span>
            </span>
            <span class="mb-2 text-xs">
              Creation Date:
              <span class="text-dark ms-sm-2 font-weight-bold">{{token.datetime}}</span>
            </span>
            <span class="text-xs">
              List of Resources:
              <span class="text-dark ms-sm-2 font-weight-bold">{{token.list_of_resources}}</span>
            </span>
          </div>
          <div class="ms-auto text-end">
            <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;" @click="copyToClipboard(token.token)">
              <i class="fas fa-copy text-dark me-2" aria-hidden="true"></i>Copy
            </a> 
            <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;" @click="removeItem(index)">
              <i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TokenService from '../../services/TokenService.js';

export default {
  name: "token-list-card",
  async created() {
    await this.loadTokenList();
  },
  data() {
    return {
      tokenlist: []
    }
  },
  methods: {
    copyToClipboard(token) {
      navigator.clipboard.writeText(token)
        .then(() => {
          console.log('Text copied to clipboard')
        })
        .catch((error) => {
          console.error('Error copying text: ', error)
        })
    },
    async loadTokenList (){
      this.tokenlist = await TokenService.getTokens(localStorage.getItem("uri"))
    },
    addItem() {
      this.tokenlist.push({ id: 4, name: 'Item 4' })
    },
    removeItem(index) {
      this.tokenlist.splice(index, 1)
    }
  }
};
</script>
