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
const flightsDepart = axios.get('https://toronto-pearson-airport.p.rapidapi.com/departures', options);

const flights = axios.get('https://toronto-pearson-airport.p.rapidapi.com/arrivals', options);
const getAllArrivals =  async (req,res)=>{
    try {
        const response = await flights;
        res.status(200).json (response.data)
        
    } catch (error) {
        console.error(error.response.data)
    }     
}


const getAllDepartures =  async (req,res)=>{
    try {
        const response = await flightsDepart;
        res.status(200).json (response.data)
        
    } catch (error) {
        console.error(error.response.data)
    }     
}

const getSingleArrival = async(req,res)=>{
    const {flightNumber,airline,terminal} = req.query;

    try {
        let response = await flights;
        let newResponse = [...response.data]
    
    
        if(flightNumber){
            newResponse = newResponse.filter((flights)=>{
                return flights.flightNumber.find((flight)=> flight.toLowerCase() === flightNumber.toLowerCase().trim());
            })
            if(newResponse.length<1){
                return res.status(404).json({
                    msg: `flight with the Flight Number: ${flightNumber} does not exist`
                })
            }
        }
        if(airline){
            newResponse = newResponse.filter((flights)=>{
                return flights.airline.find((air)=> air.toLowerCase() === airline.toLowerCase().trim());
            })
            if(newResponse.length<1){
                return res.status(404).json({
                    msg: `flight with the Airline: ${airline} does not exist`
                })
            }
        }
        if(terminal){
            newResponse = newResponse.filter((flights)=>{
                return flights.terminal === terminal;
            })
            if(newResponse.length<1){
                return res.status(404).json({
                    msg: `flight with the Airline: ${terminal} does not exist`
                })
            }
        }
        res.status(200).json(newResponse)
    } catch (error) {
        console.error(error)
    }
    
   


}

const getSingleDeparture = async(req,res)=>{
    const {flightNumber,airline,terminal} = req.query;

    try {
        let response = await flightsDepart;
        let newResponse = [...response.data]
    
    
        if(flightNumber){
            newResponse = newResponse.filter((flights)=>{
                return flights.flightNumber.find((flight)=> flight.toLowerCase() === flightNumber.toLowerCase().trim());
            })
            if(newResponse.length<1){
                return res.status(404).json({
                    msg: `flight with the Flight Number: ${flightNumber} does not exist`
                })
            }
        }
        if(airline){
            newResponse = newResponse.filter((flights)=>{
                return flights.airline.find((air)=> air.toLowerCase() === airline.toLowerCase().trim());
            })
            if(newResponse.length<1){
                return res.status(404).json({
                    msg: `flight with the Airline: ${airline} does not exist at the moment`
                })
            }
        }
        if(terminal){
            newResponse = newResponse.filter((flights)=>{
                return flights.terminal === terminal;
            })
            if(newResponse.length<1){
                return res.status(404).json({
                    msg: `There is no flight departing from Terminal ${terminal} at this moment`
                })
            }
        }
        res.status(200).json(newResponse)
    } catch (error) {
        console.error(error)
    }
    
   


}

module.exports = {getAllArrivals,getSingleArrival,getAllDepartures,getSingleDeparture};
