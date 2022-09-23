const filterButton = document.querySelector(".filter__button");
const filterButtonText = document.querySelector(".filter__button-text");
const filterBody = document.querySelector(".filter__body");
const filterSpan = document.querySelector(".filter__button-span");
const filterLabelArray =  document.querySelectorAll(".filter__radio-label");
const filterPeriod =  document.querySelector(".filter__radio-button");
const filterBack =  document.querySelector(".filter__period-button-back");
const filterShow =  document.querySelector(".filter__period-button-show");
const filterPeriodWrapper = document.querySelector(".filter__period-wrapper");

filterButton.addEventListener("click", function(){
    toggleList();
});

filterLabelArray.forEach((item, index) => item.addEventListener("click", function(){
    toggleList();
    filterButtonText.innerHTML = filterLabelArray[index].innerHTML;
}));

filterPeriod.addEventListener("click", function(){
    filterPeriodWrapper.classList.add("filter__period-wrapper--opened");
});

filterBack.addEventListener("click", function(){
    filterPeriodWrapper.classList.remove("filter__period-wrapper--opened");
});

filterShow.addEventListener("click", function(){    
    filterPeriodWrapper.classList.remove("filter__period-wrapper--opened");     
    document.querySelectorAll(".filter__radio-input").forEach(item => item.checked = false);
    toggleList();
    filterButtonText.innerHTML = filterPeriod.innerHTML;
});

function toggleList(){    
    filterBody.classList.toggle("filter__body--visible");
    filterSpan.classList.toggle("filter__button-span--opened");
}



