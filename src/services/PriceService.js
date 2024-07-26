import axios from 'axios';

const PriceService = {
    priceURL : 'http://192.168.2.68:5000/',
    today: "today",

  async getTodayPrices() {
    const path = this.priceURL + this.today
    try {
      const response = await axios.get(path);
      return response.data.price
    } catch (error) {
      console.error(error);
    };
  },
};

export default PriceService;
