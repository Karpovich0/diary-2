const filterButtonArray = document.querySelectorAll(".filter__button");
const filterButtonTextArray = document.querySelectorAll(".filter__button-text");

const filterBodyArray = document.querySelectorAll(".filter__body");
const filterSpanArray = document.querySelectorAll(".filter__button-span");

const filterLabelGlucoseArray =  document.querySelectorAll(".filter__radio-label--glucose");
const filterLabelWeightArray =  document.querySelectorAll(".filter__radio-label--weight");
const filterLabelDishArray =  document.querySelectorAll(".filter__radio-label--dish");

const filterRadioInputGlucoseArray = document.querySelectorAll(".filter__radio-input--glucose");
const filterRadioInputWeightArray = document.querySelectorAll(".filter__radio-input");
const filterRadioInputDishArray = document.querySelectorAll(".filter__radio-input");
const filterRadioInputArray = [filterRadioInputGlucoseArray, filterRadioInputWeightArray, filterRadioInputDishArray];

const filterPeriodArray =  document.querySelectorAll(".filter__radio-button");
const filterBackArray =  document.querySelectorAll(".filter__period-button-back");
const filterShowArray =  document.querySelectorAll(".filter__period-button-show");
const filterPeriodWrapperArray = document.querySelectorAll(".filter__period-wrapper");

const filterValueArray = document.querySelectorAll(".checkbox-value");

const formArray = document.querySelectorAll(".filter__body");

const dataFilterButtonArray = document.querySelectorAll(".data__button");

let filterFormIndex = 0;

dataFilterButtonArray.forEach((item, index) => item.addEventListener("click", function(){
    closeFilter(index, dataFilterButtonArray.length);
    }
    )
);

filterButtonArray.forEach((item, index) => item.addEventListener("click", function(){
        toggleList(index);
        filterFormIndex = index;
        }
    )
);

setListener(filterLabelGlucoseArray, filterRadioInputGlucoseArray);
setListener(filterLabelWeightArray, filterRadioInputWeightArray);
setListener(filterLabelDishArray, filterRadioInputDishArray);

filterPeriodArray.forEach((item) => item.addEventListener("click", function(){
        filterPeriodWrapperArray[filterFormIndex].classList.add("filter__period-wrapper--opened")
    })
);

filterBackArray.forEach((item) => item.addEventListener("click", function(){
        filterPeriodWrapperArray[filterFormIndex].classList.remove("filter__period-wrapper--opened");
    })
);


filterShowArray.forEach((item, index) =>  item.addEventListener("click", function(){
        filterPeriodWrapperArray[filterFormIndex].classList.remove("filter__period-wrapper--opened");     
        filterRadioInputArray[filterFormIndex].forEach(item => item.checked = false);
        toggleList(filterFormIndex);
        filterButtonTextArray[filterFormIndex].innerHTML = filterPeriodArray[filterFormIndex].innerHTML;   
        filterValueArray[filterFormIndex].value = "";
        makeRequest();     
    })
);

function toggleList(index){    
    filterBodyArray[index].classList.toggle("filter__body--visible");
    filterSpanArray[index].classList.toggle("filter__button-span--opened");
}

function makeRequest(){
    const formData = new FormData(formArray[filterFormIndex]);
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

function setListener(arr, inputArray){
    arr.forEach((item, index) => item.addEventListener("click", function(e){
        toggleList(filterFormIndex);
        filterButtonTextArray[filterFormIndex].innerHTML = arr[index].innerHTML;
        filterValueArray[filterFormIndex].value = inputArray[index].value;
        makeRequest();       
    }));
}

function closeFilter(index, length){
    for(let i = 0; i < length; i++){
        if(i !== index){
            filterBodyArray[i].classList.remove("filter__body--visible");
            filterSpanArray[i].classList.remove("filter__button-span--opened");

            if(filterPeriodWrapperArray[i].classList.contains("filter__period-wrapper--opened")){
            filterPeriodWrapperArray[i].classList.remove("filter__period-wrapper--opened");
        }
        }
    }
    
}





