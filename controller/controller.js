const axios = require("axios");
require('dotenv').config();
const options = {
    //refactored
    //  method: 'GET',
    // url: 'https://toronto-pearson-airport.p.rapidapi.com/arrivals',
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'toronto-pearson-airport.p.rapidapi.com'
    }
  };
const flights = axios.get('https://toronto-pearson-airport.p.rapidapi.com/arrivals', options);
const getAllTravels =  async (req,res)=>{
    try {
        const response = await flights;
        res.status(200).json (response.data)
        
    } catch (error) {
        console.error(error.response.data)
    }     
}
const getSingleFlight = async(req,res)=>{
    const {flightNumber,airline,limit} = req.query;

    try {
        let response = await flights;
        let newResponse = [...response.data]
    
        console.log(typeof(newResponse))
    
        if(flightNumber){
            newResponse = newResponse.filter((flights)=>{
                return flights.flightNumber[0].toLowerCase() === flightNumber.toLowerCase().trim();
            })
            if(newResponse.length<1){
                return res.status(404).json({
                    msg: `flight with the Flight Number: ${flightNumber} does not exist`
                })
            }
        }
        if(airline){
            newResponse = newResponse.filter((flights)=>{
                return flights.airline[0].toLowerCase() === airline.toLowerCase().trim();
            })
            if(newResponse.length<1){
                return res.status(404).json({
                    msg: `flight with the Airline: ${airline} does not exist`
                })
            }
        }
        res.status(200).json(newResponse)
    } catch (error) {
        console.error(error)
    }
    
   


}

module.exports = {getAllTravels,getSingleFlight};
