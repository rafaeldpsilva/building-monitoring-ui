import axios from 'axios';

const DivisionsService = {
  divisions: "divisions",
  create_division: "divisions/create",
  update_division: "divisions/update",
  ac_status: "divisions/acstatus",

  async getDivisions(url, token) {
    const path = url + this.divisions + '?token=' + token
    try {
      const response = await axios.get(path);
      return response.data.divisions
    } catch (error) {
      console.error(error);
    };
  },
  async postCreateDivision(url, token, name, iots) {
    let payload = {
      "name": name,
      "iots": iots,
    }
    const path = url + this.create_division + '?token=' + token
    try {
      const response = await axios.post(path, payload);
      return response.data
    } catch (error) {
      console.error(error);
    };
  },
  async postACStatus(url, token, id) {
    let payload = {
      "id": id
    }
    const path = url + this.ac_status + '?token=' + token
    try {
      const response = await axios.post(path, payload);
      return response.data.ac_status
    } catch (error) {
      console.error(error);
    };
  },
  async postDivisionUpdate(url, token, id, name, iots, outside_temperature, temperature, humidity,light) {
    let payload = {
      "id": id,
      "name": name,
      "iots": iots,
      "ac_status_configuration": {
        "outside_temperature": outside_temperature,
        "temperature": temperature,
        "humidity": humidity,
        "light": light
    }
    }
    const path = url + this.update_division + '?token=' + token
    try {
      const response = await axios.post(path, payload);
      return response.data
    } catch (error) {
      console.error(error);
    };
  }
};

export default DivisionsService;
