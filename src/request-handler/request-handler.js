import axios from "axios"

class RequestHandler {

    static async getFlights(from,to,dateFrom,dateTo){
       let flights= await  axios.get(`https://api.skypicker.com/flights?flyFrom=${from}&to=${to}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        return flights

    }
}