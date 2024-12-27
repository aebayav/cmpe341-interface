
const carid = sessionStorage.getItem("carid") || 1562;
const daysDiff = sessionStorage.getItem("daysDiff")
console.log(carid)
document.addEventListener('DOMContentLoaded', function(){
    handleGet();
    function handleGet(){
        fetch(`http://127.0.0.1:8080/user/payment/${carid}`, {
            method: "GET",
            headers: {
            }
        })
        .then(response => response.json())
        .then(result => {
            console.log("Fetch successful", result)
            if(Array.isArray(result.car)){

                displayCar(result.car[0])
            }
            else {
                console.error("Unexpected responce format: ", result);
            }
        })
        .catch(error => {
            console.error(`Error occured: ${error}`);
        })
    }

    function displayCar(car){
        const carDiv = document.getElementById("info-div");
        carDiv.innerHTML = `<div id="text1">
                                <h2>Car Information</h2>
                            </div>

            <div id="car-info">

                <div id="car-image">
                    <img src="./images/${carid}.png" alt="Car Image">
                    <img src="./images/${carid}.png" alt="Car Image">
                </div>

                <div class="input-container">
                    <label for="car-name">Car Name: </label>
                    ${car[1]} ${car[2]}
                </div>
                <div class="input-container">
                    <label for="car-price">Price:  </label>
                    ${Math.trunc(car[7])}$/day
                </div>
                <div class="input-container">
                    <label for="car-rent-date">Rent Date: </label>
                    ${sessionStorage.getItem("start_date")}
                </div>
                <div class="input-container">
                    <label for="car-return-date">Return Date: </label>
                    ${sessionStorage.getItem("end_date")}
                </div>
                <div class="input-container">
                    <label for="total-car-price">Price:</label>
                    ${Math.trunc(car[7] * daysDiff)}$/Month
                </div>

            </div>`;
        
    }
    

});

const updateBtn = document.getElementById('submit-btn');
updateBtn.addEventListener('click', function(event){
    event.preventDefault();
    const start_date = document.getElementById("car-rent-start-date-update").value
    const end_date = document.getElementById("car-rent-end-date-update").value
    updateRent(start_date,end_date);
})

function updateRent(start_date, end_date) {
    fetch(`http://127.0.0.1:8080/user/update/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            carid:carid,
            start_date: start_date, 
            end_date: end_date
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Dates updated", data);
        alert('Dates and related price updated successfully');
        window.location.href = "home-page.html";
    })
    .catch(error => {
        console.error("Error updating dates:", error);
        alert('Failed to update dates. Please try again.');
    });
}
