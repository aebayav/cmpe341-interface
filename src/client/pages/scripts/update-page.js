const submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener('click', function(){
    const customerID = document.getElementById("customer-id").value;
    sessionStorage.setItem("customerID", customerID);
})

