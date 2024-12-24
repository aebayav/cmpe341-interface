window.addEventListener('DOMContentLoaded', function(){

    handleGet();
    function handleGet() {

        fetch("http://127.0.0.1:8080/user/rent", {
            method: "GET",
            headers:{

            }
        })
        .then(response => response.json())
        .then(result => {
            console.log("Fetch successful", result)
            if(Array.isArray(result.availableCars)){
                displayAvailableCars(result.availableCars);
            }
            else{
                console.error("Unexpected response format: ", result.availableCars);
                
            }
        })
        .catch(error => {
            console.error(`Error occured: ${error}`);
        })
    }

    function displayAvailableCars(cars){
        const carsDiv = document.getElementById("cars");
        carsDiv.innerHTML = '';
        cars.forEach(car => {
            const div = document.createElement('div');
            div.setAttribute("class", "car-card");
            div.innerHTML =  `<img src="images/${car.CARID}.png" alt="Car Image" class="car-img">
                                <div class="car-info">
                            <h3>Brand: ${car.BRAND}</h3>
                            <p>Model: ${car.CARMODEL}</p>
                            <p>Year: ${car.CARYEAR}</p>
                            <p></p>
                            </div>`

            carsDiv.appendChild(div);
            
        })
    }
})
