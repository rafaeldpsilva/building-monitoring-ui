import axios from 'axios';

const DemandResponseService = {
  communityOperatorURL : 'http://192.168.2.171:5000',
  get_unanswered_invitations : "invitation/unanswered",
  get_answered_invitations : "invitation/answered",
  answer_invitation : "invitation/answer",
  answer_auto : "invitation/auto",
  
  async getUnansweredInvitations(url) {
    const path = url+this.get_unanswered_invitations
    try{
      const response = await axios.get(path);      
      return response.data['invitations']      
    }catch(error) {
      console.error(error);
    };
  },
  async getAnsweredInvitations(url) {
    const path = url+this.get_answered_invitations
    try{
      const response = await axios.get(path);      
      return response.data['invitations']      
    }catch(error) {
      console.error(error);
    };
  },
  async postAnsweredInvitation(url, event_time, iot, response) {
    let payload = {
        "event_time": event_time,
        "iot": iot,
        "response": response
    }
    const path = url+this.answer_invitation
    try{
      const response = await axios.post(path, payload);
      return response.data
    }catch(error) {
      console.error(error);
    };
  },
  async getAutoAccept(url) {
    const path = url+this.answer_auto
    try{
      const response = await axios.get(path);      
      return response.data['auto_answer']      
    }catch(error) {
      console.error(error);
    };
  },
  async postAutoAccept(url, auto_answer) {
    let payload = {
        "auto_answer": auto_answer,
    }
    const path = url+this.answer_auto
    try{
      const response = await axios.post(path, payload);
      return response.data
    }catch(error) {
      console.error(error);
    };
  },
};

export default DemandResponseService;
