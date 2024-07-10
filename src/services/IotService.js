import axios from 'axios';

const IotService = {
  iots: "iots",
  iot_values: "iot/values",
  iots_historic: "iot/historic",

  async getIots(url) {
    const path = url + this.iots
    try {
      const response = await axios.get(path);
      return response.data.iots
    } catch (error) {
      console.error(error);
    };
  },
  async getIotValues(url, iot) {
    let payload = {
      "iot": iot
    }
    const path = url + this.iot_values
    try {
      const response = await axios.post(path, payload);
      return response.data
    } catch (error) {
      console.error(error);
    };
  },
  async getIotHistoric(url, iot) {
    let payload = {
      "iot": iot
    }
    const path = url + this.iots_historic
    try {
      const response = await axios.post(path, payload);
      return response.data['historic']
    } catch (error) {
      console.error(error);
    };
  },
};

export default IotService;
