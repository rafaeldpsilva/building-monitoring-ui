import axios from 'axios';

const BuildingService = {
  communityOperatorURL : 'http://192.168.2.171:5000',
  baseURL : 'http://192.168.2.171:5005',
  token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ29tbXVuaXR5IE9wZXJhdG9yIiwibGlzdF9vZl9yZXNvdXJjZXMiOlsiYWdncmVnYXRlZCIsImRpc2NyZXRlIiwiY29tbXVuaXR5X21hbmFnZXIiLCJhZG1pbiJdLCJkYXRhX2FnZ3JlZ2F0aW9uIjoiYWxsIiwidGltZV9hZ2dyZWdhdGlvbiI6ImFsbCIsImVtYmFyZ29fcGVyaW9kIjoiMTIzNTEyMyIsImV4cCI6MTcxMzU0MDk4Mn0.Mn7NycJse-gptdVe7_9Ozu218Q2JZ_IfoQqVpjMRQx8',
  historic : "/historic",
  iots : "/iots",
  energy_now : "/energy/now",
  energy_totalpower : "/energy/totalpower",
  energy_consumption : "/energy/consumption",
  energy_generation : "/energy/generation",
  energy_flexibility : "/energy/flexibility",
  correlations : "/correlations",
  forecast : "/forecast",
  forecast_consumption : "/forecast/consumption",
  forecast_flexibility : "/forecast/flexibility",
  audit_check : "/audit/check",
  forget : "/forget",
  
  async getHistoric() {
    const path = this.baseURL+this.historic+'?token='+this.token
    try{
      const response = await axios.get(path);
      return response.data.historic
    }catch(error) {
      console.error(error);
    };
  },
  async getIots() {
    const path = this.baseURL+this.iots+'?token='+this.token
    try{
      const response = await axios.get(path);
      return response.data.iots
    }catch(error) {
      console.error(error);
    };
  },
  async getEnergyNow() {
    const path = this.baseURL+this.energy_now+'?token='+this.token
    try{
      const response = await axios.get(path);
      return {"consumption": response.data.consumption, "generation" : response.data.generation, "flexibility": response.data.flexibility};
    }catch(error) {
      console.error(error);
      return {"consumption": 0, "generation" : 0, "flexibility": 0};
    };
  },
  async getEnergyTotalPower() {
    const path = this.baseURL+this.energy_totalpower+'?token='+this.token
    try{
      const response = await axios.get(path);
      return response.data.totalpower
    }catch(error) {
      console.error(error);
    };
  },
  async getEnergyConsumption() {
    const path = this.baseURL+this.energy_consumption+'?token='+this.token
    try{
      const response = await axios.get(path);
      return response.data
    }catch(error) {
      console.error(error);
    };
  },
  async getEnergyGeneration() {
    const path = this.baseURL+this.energy_generation+'?token='+this.token
    try{
      const response = await axios.get(path);
      return response.data
    }catch(error) {
      console.error(error);
    };
  },
  async getEnergyFlexibility() {
    const path = this.baseURL+this.energy_flexibility+'?token='+this.token
    try{
      const response = await axios.get(path);
      return response.data.flexibility
    }catch(error) {
      console.error(error);
    };
  },
  async getCorrelations() {
    const path = this.baseURL+this.correlations+'?token='+this.token
    try{
      const response = await axios.get(path);
      return response.data.correlations
    }catch(error) {
      console.error(error);
    };
  },
  async getForecastConsumption() {
    const path = this.baseURL+this.forecast_consumption+'?token='+this.token
    try{
      const response = await axios.get(path);
      return response.data.forecasted_consumption
    }catch(error) {
      console.error(error);
    };
  },
  async getForecastFlexibility() {
    const path = this.baseURL+this.forecast_flexibility+'?token='+this.token
    try{
      const response = await axios.get(path);
      return response.data.forecasted_flexibility
    }catch(error) {
      console.error(error);
    };
  },
  async getForecast() {
    const path = this.baseURL+this.forecast+'?token='+this.token
    try{
      const response = await axios.get(path);
      return response.data.tokens
    }catch(error) {
      console.error(error);
    };
  },
  async getAuditCheck() {
    const path = this.baseURL+this.audit_check+'?token='+this.token
    try{
      const response = await axios.get(path);
      return response.data.response
    }catch(error) {
      console.error(error);
    };
  },
  async forgetUser(building) {
    const payload = {
      "building": building
    }
    const path = this.communityOperatorURL+this.forget+'?token='+this.token
    try{
      const response = await axios.post(path,payload);
      return response.data.deleted_data_count
    }catch(error) {
      console.error(error);
    };
  }
};

export default BuildingService;