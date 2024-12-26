const date = new Date()
const currentDate = date.toISOString().split("T")[0]
document.getElementById("car-rent-start-date").setAttribute("min",currentDate) //SET THE MIN VALUE FOR DATE ENTER
document.getElementById("car-rent-end-date").setAttribute("min",currentDate) //SET THE MIN VALUE FOR DATE ENTER

const button = document.getElementById("submit-button");

button.addEventListener('click', () => {
    const start_date = document.getElementById("car-rent-start-date").value;
    const end_date = document.getElementById("car-rent-end-date").value;
    const tempDate1 = new Date(start_date);
    const tempDate2 = new Date(end_date);
    const daysDiff =   Math.round((tempDate2.getTime() - tempDate1.getTime()) / (1000 * 3600 * 24));
    console.log(start_date)
    console.log(end_date)
    console.log(daysDiff)

    sessionStorage.clear()
    sessionStorage.setItem("start_date",start_date);
    sessionStorage.setItem("end_date", end_date);
    sessionStorage.setItem("daysDiff", daysDiff);
    

    
});


