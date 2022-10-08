// import axios from "axios";
const mainclass = document.querySelector('main');
const tableclass = document.querySelector('table');
const queryToggle = document.getElementById('queryToggle');
const select = document.querySelector('select');
const input = document.querySelectorAll('input');
const queryForm = document.querySelector('.queryForm');
const arrivalHeading = document.getElementById('arriveHeading')
const departHeading = document.getElementById('departHeading')
const tablebody = document.querySelector('tbody')
const gateHeading = document.querySelector('th#gate')

arrivalHeading.addEventListener('click',headingToggler)
departHeading.addEventListener('click',headingToggler)
queryToggle.addEventListener('click',searchAnihandler)

function headingToggler(){

    const headings = document.querySelectorAll('h1');
    
    if(this.classList.length<1){
        headings.forEach((heading)=>{
            heading.classList.remove('active')
        })
        this.classList.add('active');
        mainclass.className = this.id;
        tableclass.className = this.id;
        queryToggle.className = this.id;
        select.className = this.id;
        input.forEach((input)=>{
        input.className = this.id;
        })
    }
    tablebody.innerHTML = "";
    if(this.id == 'arriveHeading'){
        gateHeading.textContent = 'Terminal';
        populateArrival()
    }
    if(this.id == 'departHeading'){
        gateHeading.textContent = 'Gate';
        populateDeparture()
    }
    
   
}

function searchAnihandler(){

    if(this.classList.contains('active')){
        queryForm.classList.remove('active');
        this.classList.remove('active');
        arrivalHeading.classList.remove('hide')
        departHeading.classList.remove('hide')
        this.children[0].name = 'search'


    }else{
        queryForm.classList.add('active');
        this.classList.add('active');
        this.innerHTML = '<ion-icon name="close"></ion-icon>'
        arrivalHeading.classList.add('hide')
        departHeading.classList.add('hide')
        this.children[0].name = 'close'

    }
   
}


async function populateDeparture (){
    try {
        const res = await axios.get('/flights/departure')
        res.data.forEach((flight)=>{
            const tr = document.createElement('tr')
            const time = document.createElement('td')
            time.id = 'time'
            time.textContent = flight.departing;

            const destination = document.createElement('td')
            destination.id = 'destination'
            destination.textContent = flight.destination;

            const flightCode = document.createElement('td')


            flightCode.id = 'flight'
            flight.flightNumber.forEach((air)=>{
                const extra = document.createElement('div')
                extra.textContent = air;
                flightCode.appendChild(extra)
            })
            
            const airline = document.createElement('td')
            airline.id = 'airline'
            flight.airline.forEach((air)=>{
                const extra = document.createElement('div')
                extra.textContent = air;
                airline.appendChild(extra)
            })

            const gate = document.createElement('td')
            gate.id = 'gate'
            gate.textContent = flight.gate;

            const remark = document.createElement('td')
            remark.id = 'airline'
            remark.textContent = flight.status;

            tr.append(time,destination,flightCode,airline,gate,remark)
            tablebody.appendChild(tr)
        })
        
    } catch (error) {
        console.log(error)
    }
}
async function populateArrival (){
    try {
        const res = await axios.get('/flights')
        res.data.forEach((flight)=>{
            const tr = document.createElement('tr')
            const time = document.createElement('td')
            time.id = 'time'
            time.textContent = flight.arrival;

            const destination = document.createElement('td')
            destination.id = 'destination'
            destination.textContent = flight.destination;

            const flightCode = document.createElement('td')


            flightCode.id = 'flight'
            
            flight.flightNumber.forEach((air)=>{
                const extra = document.createElement('div')
                extra.textContent = air;
                flightCode.appendChild(extra)
            })
            
            const airline = document.createElement('td')
            airline.id = 'airline'
            flight.airline.forEach((air)=>{
                const extra = document.createElement('div')
                extra.textContent = air;
                airline.appendChild(extra)
            })
           

            const gate = document.createElement('td')
            gate.id = 'gate'
            gate.textContent = flight.terminal;

            const remark = document.createElement('td')
            remark.id = 'airline'
            remark.textContent = flight.status;

            tr.append(time,destination,flightCode,airline,gate,remark)
            tablebody.appendChild(tr)
        })
        
    } catch (error) {
        console.log(error)
    }
}
async function queredSearch(){

}

populateDeparture()
