import axios from 'axios';

const PriceService = {
    retailer: 'energy/retailer',
    selfconsumption: 'energy/selfconsumption',
    co2_with_p2p: "energy/co2/p2p",
    co2_without_p2p: "energy/co2",
    benefits_monthly: "benefits/monthly",
    benefits_detailed: "benefits/detailed",
  async get_energy_from_retailer(url) {
    const path = url + this.retailer
    try {
      const response = await axios.get(path);
      return response.data.retailer
    } catch (error) {
      console.error(error);
    };
  },
  async get_self_consumption(url) {
    const path = url + this.selfconsumption
    try {
      const response = await axios.get(path);
      return response.data.self_consumption
    } catch (error) {
      console.error(error);
    };
  },
  async get_co2_with_p2p(url) {
    const path = url + this.co2_with_p2p
    try {
      const response = await axios.get(path);
      return response.data.co2
    } catch (error) {
      console.error(error);
    };
  },
  async get_co2_without_p2p(url) {
    const path = url + this.co2_without_p2p
    try {
      const response = await axios.get(path);
      return response.data.co2
    } catch (error) {
      console.error(error);
    };
  },
  async get_last_month_benefits(url) {
    const path = url + this.benefits_monthly
    try {
      const response = await axios.get(path);
      return response.data
    } catch (error) {
      console.error(error);
    };
  },
  async getTransactions(url) {
    const path = url + this.benefits_detailed
    try {
      const response = await axios.get(path);
      return response.data.benefits
    } catch (error) {
      console.error(error);
    };
  },
};

export default PriceService;
