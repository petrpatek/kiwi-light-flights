import axios from "axios";
import moment from "moment"

class RequestHandler {
  static _formatDate(date){
    return moment(date).format("DD/MM/YYYY")
  }
  static  getFlights(from, to, dateFrom, dateTo) {
    return axios.get(
      `https://api.skypicker.com/flights?flyFrom=${encodeURIComponent(
        from
      )}&to=${encodeURIComponent(to)}&dateFrom=${encodeURIComponent(
          this._formatDate(dateFrom)
      )}&dateTo=${encodeURIComponent(this._formatDate(dateTo))}&partner=picky&partner_market=us`
    );
  }
}
export default RequestHandler;
