import axios from 'axios';

const TokenService = {
  tokens : "tokens",
  tokens_generate : "tokens/generate",
  tokens_check : "tokens/check",
  tokens_save : "tokens/save",
  tokens_revoke : "tokens/revoke",

  async getTokens(url) {
    const path = url+this.tokens
    try{
      const response = await axios.get(path);
      return response.data.tokens
    }catch(error) {
      console.error(error);
    };
  },

  async postGenerateToken(url, name, listOfResources, dataAggregation, timeAggregation, embargo, expirationInMinutes) {
    const payload = {
      "name": name,
      "list_of_resources": listOfResources,
      "data_aggregation": dataAggregation,
      "time_aggregation": timeAggregation,
      "embargo": embargo,
      "exp": expirationInMinutes
    }
    const path = url+this.tokens_generate
    try{
      const response = await axios.post(path,payload);
      return response.data.token
    }catch(error) {
      console.error(error);
    };
  },
  
  async postCheckToken(url, check_token) {
    const payload = {
      "token": check_token
    }
    const path = url+this.tokens_check
    try{
      const response = await axios.post(path,payload);
      return response.data
    }catch(error) {
      console.error(error);
    };
  },

  async postSaveToken(url, save_token) {
    const payload = {
      "token": save_token
    }
    const path = url+this.tokens_save
    try{
      const response = await axios.post(path,payload);
      return {"token": response.data.token, "datetime" : response.data.datetime, "active": response.data.active}
    }catch(error) {
      console.error(error);
    };
  },
  
  async postRevokeToken(url, revoke_token) {
    const payload = {
      "token": revoke_token
    }
    const path = url+this.tokens_revoke
    try{
      const response = await axios.post(path,payload);
      return {"token": response.data.token, "datetime" : response.data.datetime, "active": response.data.active}
    }catch(error) {
      console.error(error);
    };
  }
};

export default TokenService;
