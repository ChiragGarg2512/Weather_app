const weatherForm = document.querySelector('form') //Select the element from the index.hbs file with which the work will be done
const search = document.querySelector('input')
const messageOne = document.querySelector('#para1')
const messageTwo = document.querySelector('#para2')
const messageThree = document.querySelector('#para3')
const messageFour = document.querySelector('#para4')
const messageFive = document.querySelector('#para5')

weatherForm.addEventListener('submit', (e) => { // 2 parameters of the addEventListener
                                                // 1. string: This is the name of the event we are trying to listen to
                                                // 2. Callback function that appears whenever the said string event occurs
    e.preventDefault() // Used so the page doesn't refershes automatically.(Prevent the default behaviour)
    
    const location = search.value
    const url = '/weather?address=' + location

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    fetch(url).then((response)=>{ // This function fetches the URL and shows the output(i.e. response) which is in json format
                                                                         // then takes the data and checks if the data.error is error or undefined.
                                                                         // And shows it on the console tab of inspect on the webpage.
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
            }
            else{
                messageOne.textContent = data.location,
                messageTwo.textContent = data.weather[0],
                messageThree.textContent = data.weather[1],
                messageFour.textContent = data.weather[2],
                messageFive.textContent = data.weather[3],
            } 
        })
    })
})
