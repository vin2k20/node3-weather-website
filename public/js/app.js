const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const messageSix = document.querySelector('#message-6')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent = ''
    messageSix.textContent = ''

    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = 'Error: '+data.error
        }else{
            messageOne.textContent = 'Description: '+data.description
            messageTwo.textContent = 'Temperature: '+data.temperature+' Degree Celcius'
            messageThree.textContent = 'Feels Like: '+data.feels+' Degree Celcius'
            messageFour.textContent = 'Minimum Temperature: '+data.min+' Degree Celcius'
            messageFive.textContent = 'Maximum Temperature: '+data.max+' Degree Celcius'
            messageSix.textContent = 'Location: '+data.location
        }
    })
})
})