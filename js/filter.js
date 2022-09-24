const filterButton = document.querySelector(".filter__button");
const filterButtonText = document.querySelector(".filter__button-text");
const filterBody = document.querySelector(".filter__body");
const filterSpan = document.querySelector(".filter__button-span");
const filterLabelArray =  document.querySelectorAll(".filter__radio-label");
const filterRadioInputArray = document.querySelectorAll(".filter__radio-input");
const filterPeriod =  document.querySelector(".filter__radio-button");
const filterBack =  document.querySelector(".filter__period-button-back");
const filterShow =  document.querySelector(".filter__period-button-show");
const filterPeriodWrapper = document.querySelector(".filter__period-wrapper");
const filterValue = document.querySelector(".checkbox-value");
const form = document.querySelector(".filter__body");

filterButton.addEventListener("click", function(){
    toggleList();
});

filterLabelArray.forEach((item, index) => item.addEventListener("click", function(e){
    toggleList();
    filterButtonText.innerHTML = filterLabelArray[index].innerHTML;
    filterValue.value = filterRadioInputArray[index].value;
    makeRequest(form);       
}));

filterPeriod.addEventListener("click", function(){
    filterPeriodWrapper.classList.add("filter__period-wrapper--opened");
});

filterBack.addEventListener("click", function(){
    filterPeriodWrapper.classList.remove("filter__period-wrapper--opened");
});

filterShow.addEventListener("click", function(){    
    filterPeriodWrapper.classList.remove("filter__period-wrapper--opened");     
    filterRadioInputArray.forEach(item => item.checked = false);
    toggleList();
    filterButtonText.innerHTML = filterPeriod.innerHTML;   
    filterValue.value = "";
    makeRequest(form);       
});

function toggleList(){    
    filterBody.classList.toggle("filter__body--visible");
    filterSpan.classList.toggle("filter__button-span--opened");
}

function makeRequest(form){
    const formData = new FormData(form);
    const searchParam = new URLSearchParams(formData); 
    // change link
    fetch('https://httpbin.org/post', {
        method: 'POST',
        body: searchParam,
    }).then(function(response){
        return response.text();
    }).then(function(text){
        console.log(text);
    });
};




