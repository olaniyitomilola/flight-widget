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
const selectOption = document.querySelector('option.g_and_t')
const querySelection = document.getElementById('queryselection')
const queryBox = document.getElementById('query');
const searchbtn = document.getElementById('searchbtn')

arrivalHeading.addEventListener('click',headingToggler)
departHeading.addEventListener('click',headingToggler)
queryToggle.addEventListener('click',searchAnihandler)
searchbtn.addEventListener('click',(e)=>{
    e.preventDefault
    if(searchbtn.classList.contains('departHeading')){
        queriedSearchDepart()
    }
    if(searchbtn.classList.contains('arriveHeading')){
        queriedSearchArrival()
    }
})

console.log(querySelection.value)

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
        selectOption.textContent = 'Terminal'
        selectOption.value = 'terminal'
        populateArrival('/flights')
    }
    if(this.id == 'departHeading'){
        gateHeading.textContent = 'Gate';
        selectOption.textContent = 'Gate'
        selectOption.value = 'gate'
        populateDeparture('/flights/departure')
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


async function populateDeparture (url){
    try {
        const res = await axios.get(url)
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
            remark.id = 'remarks'
            remark.textContent = flight.status;

            tr.append(time,destination,flightCode,airline,gate,remark)
            tablebody.appendChild(tr)
        })
        
    } catch (error) {
        console.log(error)
    }
}
async function populateArrival (url){
    try {
        const res = await axios.get(url)
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
            remark.id = 'remarks'
            remark.textContent = flight.status;

            tr.append(time,destination,flightCode,airline,gate,remark)
            tablebody.appendChild(tr)
        })
        
    } catch (error) {
        console.log(error)
    }
}
function queriedSearchDepart(){
    const name = querySelection.value;
    const val = queryBox.value.trim();
    const link = `/flights/departure/search?${name}=${val}`
    tablebody.innerHTML = ''
    populateDeparture(link);

}
function queriedSearchArrival(){
    const name = querySelection.value;
    const val = queryBox.value.trim();
    const link = `/flights/search?${name}=${val}`
    tablebody.innerHTML = ''
    populateArrival(link);

}

populateDeparture('/flights/departure')
