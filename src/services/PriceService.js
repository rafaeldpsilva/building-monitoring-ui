import axios from 'axios';

const PriceService = {
    priceURL : 'http://192.168.2.68:5000/',
    updatePrices: 'p2p/prices',
    today: "today",
  async getP2PPrices(url) {
    const path = url + this.updatePrices
    try {
      const response = await axios.get(path);
      return response.data.prices
    } catch (error) {
      console.error(error);
    };
  },
  async postPrices(url, sellPrices, buyPrices) {
    let payload = {
      "sell_percentage": sellPrices,
      "buy_percentage": buyPrices
    }
    const path = url + this.updatePrices
    try {
      const response = await axios.post(path, payload);
      return response
    } catch (error) {
      console.error(error);
    };
  },
};

export default PriceService;
