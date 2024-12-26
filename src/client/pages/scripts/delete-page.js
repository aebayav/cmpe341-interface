window.addEventListener('DOMContentLoaded', function (){
    handleGet();
    function handleGet(){

        fetch("http://127.0.0.1:8080/user/delete", {
            method:"GET",
            headers: {

            }
        })
        .then(response => response.json())
        .then(result => {
            console.log("Fetch successful", result )
            if(Array.isArray(result.unavailableCars)){
                displayUnavailableCars(result.unavailableCars)
            }
            else {
                console.log("Unexpected response format: ", result.unavailableCars);
            }
        })
        .catch(error => {
            console.error(`Error occured ${error}`);
        })

    }
    function displayUnavailableCars(cars){
        const carsDiv = document.getElementById("cars");
        carsDiv.innerHTML = '';
        cars.forEach(car => {
            const div = document.createElement('div');
            div.setAttribute("class", "car-card");
            div.innerHTML = `<img src="images/${car[0]}.png" onclick="setStatus(${car[0]})" alt="Car Image" class="car-img">
                                <div class="car-info">
                                <h3>Brand: ${car[1]}</h3>
                                <p>Model: ${car[2]}</p>
                                <p>Year: ${car[3]}</p>
                                <p>Price: ${Math.trunc(car[7] * sessionStorage.getItem("daysDiff"))}$ /month</p>
                            </div>`
             
            
            carsDiv.appendChild(div);
    
        })

   
     }
    
    
})

function setStatus(carid){
    fetch("http://127.0.0.1:8080/user/setAvailable", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ carid: carid })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Status updated:', data);
        window.location.reload();
    })
    .catch(error => {
        console.error('Error updating status:', error);
    });
}
