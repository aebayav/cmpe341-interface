document.addEventListener('DOMContentLoaded', function () {
    handleGet();

    function handleGet() {
        fetch("http://127.0.0.1:8080/user/admin", {
            method: "GET"
        })
        .then(response => response.json())
        .then(result => {
            console.log('Fetch successful', result);
            if (Array.isArray(result.cars)) {
                displayCars(result.cars);
            } else {
                console.error("Unexpected response format: ", result.cars);
            }
        })
        .catch(error => {
            console.error(`Error occurred: ${error}`);
        });
    }

    function displayCars(cars) {
        const ul = document.getElementById("car-ul");
        ul.innerHTML = '';
        cars.forEach(car => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="car-info">
                    <h3>Brand: ${car[1]}</h3>
                    <p>Car ID: ${car[0]}</p>
                    <p>Model: ${car[2]}</p>
                    <p>Year: ${car[3]}</p>
                    <p>Daily price: ${car[7]}$ /month</p>
                    <button class="admin-button" data-car-id="${car[0]}">Delete</button>
                </div>`;
            ul.appendChild(li);
        });

        ul.addEventListener('click', function (event) {
            if (event.target && event.target.matches('.admin-button')) {
                event.preventDefault();
                const carId = event.target.getAttribute('data-car-id');
                deleteCar(carId);
            }
        });
    }

    function deleteCar(carId) {
        fetch("http://127.0.0.1:8080/user/admin/delete", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ carid: carId })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Car deleted', data);
            alert("Car deleted successfully");
            handleGet();
        })
        .catch(error => {
            console.error(`Error deleting car: ${error}`);
        });
    }

    const addBtn = document.querySelector(".add-button"); 
    const form = document.getElementById("add-car-form");

  
    addBtn.addEventListener('click', function (event) {
            event.preventDefault();
            const formData = new FormData(form);
            const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));
            console.log(jsonData)
            fetch("http://127.0.0.1:8080/user/admin/add", { 
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            })
            .then(response => response.json())
            .then(response => {
                console.log('Server response', response);
                handleGet();
                
            })
            .catch(error => {
                console.log('An error occurred', error);
            });
        });
    
});
