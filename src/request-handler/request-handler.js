import axios from "axios";
import moment from "moment"

class RequestHandler {
  static _formatDate(date){
    return moment(date).format("DD/MM/YYYY")
  }
  static  getFlights(from, to, dateFrom, dateTo, offset) {
      offset = offset ? offset : 0;
    return axios.get(
      `https://api.skypicker.com/flights?flyFrom=${encodeURIComponent(
        from
      )}&to=${encodeURIComponent(to)}&dateFrom=${encodeURIComponent(
          this._formatDate(dateFrom)
      )}&dateTo=${encodeURIComponent(this._formatDate(dateTo))}&partner=picky&partner_market=us&offset=${offset}`
    );
  }
  static getLocations(term) {
     let result =  axios.get(
      `https://api.skypicker.com/locations/?term=${term}&v=3&locale=en-US`
    );
     console.log(result, "RESUTL");
      return result;
  }
}
export default RequestHandler;
