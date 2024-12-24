const date = new Date()
const currentDate = date.toISOString().split("T")[0]
document.getElementById("car-rent-start-date").setAttribute("min",currentDate) //SET THE MIN VALUE FOR DATE ENTER
document.getElementById("car-rent-end-date").setAttribute("min",currentDate) //SET THE MIN VALUE FOR DATE ENTER

const button = document.getElementById("submit-button");

button.addEventListener('click', () => {
    const avail_start_date = document.getElementById("car-rent-start-date").value;
    const avail_end_date = document.getElementById("car-rent-end-date").value;
    
    sessionStorage.clear()
    sessionStorageStorage.setItem("avail_start_date",avail_start_date);
    sessionStoragetorage.setItem("avail_end_date",avail_end_date);
    
    
});


