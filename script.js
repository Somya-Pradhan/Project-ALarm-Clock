// Function to display local time and updating it every second
function updateTime(){

    // Get the elements
    let hours = document.getElementById('hrs');
    let minutes = document.getElementById('min');
    let seconds = document.getElementById('sec');
    let periods = document.getElementById('period');

    setInterval(() => {
        let currentTime = new Date();
        let hour = currentTime.getHours() % 12 || 12; // Convert to 12-hour format
        let period = currentTime.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM or PM

        hours.innerHTML = (hour < 10 ? "0" : "") + hour;
        minutes.innerHTML = (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
        seconds.innerHTML = (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();
        periods.innerHTML = period;
    }, 1000);
}

// Function call to update local time
updateTime();

// Function to set alarm
const setAlarmBtn = document.querySelector('.add-button');
setAlarmBtn.addEventListener('click', function setAlarm(){
    // Get elements
    let hours = parseInt(document.getElementById('set-hour').value); // Converting to integer
    let minutes = parseInt(document.getElementById('set-minute').value);
    let periods = document.getElementById('set-period').value;

    if(hours <= 12){
        if(minutes <60){
            hours = hours.toString().padStart(2, '0'); // Converting to a string and adding '0' if a single digit is provided
            minutes = minutes.toString().padStart(2, '0');

            let alarmTime = `${hours}:${minutes} ${periods}`;

            // Create list item element
             let alarmItem = document.createElement('li');
            alarmItem.textContent = alarmTime; // Set the text content of the list item

            // Create a button element
            let deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-button'); // Add a class to the button for styling
            deleteBtn.textContent = 'Delete';

            // Add event listener to the delete button
            deleteBtn.addEventListener('click', function() {
            alarmItem.remove(); // Remove the list item when the button is clicked
            });

            // Append the delete button to the list item
            alarmItem.appendChild(deleteBtn);

            // Append the list item to the alarm list
            let alarmList = document.getElementById('list');
            alarmList.appendChild(alarmItem);

            setInterval(() => {
                let currentTime = new Date();
                let currentHour = currentTime.getHours() % 12 || 12; // Convert to 12-hour format
                let currentMinute = currentTime.getMinutes();
                let currentPeriod = currentTime.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM or PM
                let currentSecond = currentTime.getSeconds();
        
                if (currentHour== hours && currentMinute == minutes && currentPeriod == periods) {
                    if(currentSecond < 5){
                        playAlarmSound();
                        setTimeout(()=>{
                            alert("Wake UP!!!");
                        },1000);
                    }    
                }
            }, 1000);
        }
    }
});
    

//Function to reset/clear the set alarm section
function reset() {
    document.getElementById('set-hour').value = null;
    document.getElementById('set-minute').value = null;
    document.getElementById('set-period').value = "AM";
}

document.querySelector('.add-button').addEventListener('click', reset);

//Function to play alarm sound
function playAlarmSound(){
    let alarmSound = document.getElementById('alarm-sound');
    alarmSound.play();
}