import axios from 'axios';

const BuildingService = {
  communityOperatorURL: 'http://192.168.2.171:5000',
  overview: "overview",
  historic: "historic",
  energy_now: "energy/now",
  energy_totalpower: "energy/totalpower",
  energy_consumption: "energy/consumption",
  energy_generation: "energy/generation",
  energy_flexibility: "energy/flexibility",
  correlations: "correlations",
  forecast: "forecast",
  forecast_consumption: "forecast/consumption",
  forecast_generation: "forecast/generation",
  forecast_flexibility: "forecast/flexibility",
  audit_check: "audit/check",
  forget: "forget",

  async getOverview(url) {
    const path = url + this.overview
    try {
      const response = await axios.get(path);
      return response.data.historic
    } catch (error) {
      console.error(error);
    };
  },

  async getHistoric(url) {
    const path = url + this.historic
    try {
      const response = await axios.get(path);
      return response.data.historic
    } catch (error) {
      console.error(error);
    };
  },

  async getEnergyNow(url) {
    const path = url + this.energy_now
    try {
      const response = await axios.get(path);
      return { "consumption": response.data.consumption, "generation": response.data.generation, "flexibility": response.data.flexibility };
    } catch (error) {
      console.error(error);
      return { "consumption": 0, "generation": 0, "flexibility": 0 };
    };
  },
  async getEnergyTotalPower(url) {
    const path = url + this.energy_totalpower
    try {
      const response = await axios.get(path);
      return response.data.totalpower
    } catch (error) {
      console.error(error);
    };
  },
  async getEnergyConsumption(url) {
    const path = url + this.energy_consumption
    try {
      const response = await axios.get(path);
      return response.data
    } catch (error) {
      console.error(error);
    };
  },
  async getEnergyGeneration(url) {
    const path = url + this.energy_generation
    try {
      const response = await axios.get(path);
      return response.data
    } catch (error) {
      console.error(error);
    };
  },
  async getEnergyFlexibility(url) {
    const path = url + this.energy_flexibility
    try {
      const response = await axios.get(path);
      return response.data.flexibility
    } catch (error) {
      console.error(error);
    };
  },
  async getCorrelations(url) {
    const path = url + this.correlations
    try {
      const response = await axios.get(path);
      return response.data.correlations
    } catch (error) {
      console.error(error);
    };
  },
  async getForecastConsumption(url) {
    const path = url + this.forecast_consumption
    try {
      const response = await axios.get(path);
      return response.data.forecasted_consumption
    } catch (error) {
      console.error(error);
    };
  },
  async getForecastGeneration(url) {
    const path = url + this.forecast_generation
    try {
      const response = await axios.get(path);
      return response.data.forecasted_generation
    } catch (error) {
      console.error(error);
    };
  },
  async getForecastFlexibility(url) {
    const path = url + this.forecast_flexibility
    try {
      const response = await axios.get(path);
      return response.data.forecasted_flexibility
    } catch (error) {
      console.error(error);
    };
  },
  async getForecast(url) {
    const path = url + this.forecast
    try {
      const response = await axios.get(path);
      return response.data.tokens
    } catch (error) {
      console.error(error);
    };
  },
  async getAuditCheck(url) {
    const path = url + this.audit_check
    try {
      const response = await axios.get(path);
      return response.data.response
    } catch (error) {
      console.error(error);
    };
  },
  async forgetUser(url, building) {
    const payload = {
      "building": building
    }
    const path = this.communityOperatorURL + this.forget
    try {
      const response = await axios.post(path, payload);
      return response.data.deleted_data_count
    } catch (error) {
      console.error(error);
    };
  },
  async getBalance(url) {
    const path = url + this.balance
    try {
      const response = await axios.get(path);
      return response.data.balance
    } catch (error) {
      console.error(error);
    };
  }
};

export default BuildingService;
