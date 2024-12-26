const carId = sessionStorage.getItem("carId");
const daysDiff = sessionStorage.getItem("daysDiff")
document.addEventListener('DOMContentLoaded', function(){
    handleGet();
    function handleGet(){
        fetch(`http://127.0.0.1:8080/user/payment/${carId}`, {
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
                    <img src="images/${carId}.png" alt="Car Image">
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
    const form = document.getElementById("payment-form");
    form.addEventListener('submit', handleSubmit);
    function handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(form);
        const jsonData = JSON.stringify(Object.fromEntries(formData));

        fetch("http://127.0.0.1:8080/user/payment/new", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(result => {
            console.log('Server response:', result)
        })
        .catch(error => {
            console.log('Error:', error)
        });

        function sendTransactionData(){
            
        }
    }
    
})

function redirect(){
    window.location.assign('home-page.html');
}