const detailsBackButton = document.querySelector(".details__back-button");
const details = document.querySelector(".details");
const subscriptionButtonArray = document.querySelectorAll(".subscription__button");
const subscriptionButtonDescriptionArray = document.querySelectorAll(".subscription__button-description");
const payHeaderTitle = document.querySelector(".pay__header-title");

detailsBackButton.addEventListener("click", function(ent){       
    details.classList.remove("details--current");    
});

subscriptionButtonArray.forEach((item, index)=> item.addEventListener("click", function(e){
    details.classList.add("details--current"); 
    payHeaderTitle.innerHTML = subscriptionButtonDescriptionArray[index].innerHTML;
}))
