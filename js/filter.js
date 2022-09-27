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

const periodArray = document.querySelectorAll(".period");
const collectionArray = document.querySelectorAll(".collection");

const formArray = document.querySelectorAll(".filter__body");

const dataFilterButtonArray = document.querySelectorAll(".data__button");

const filterDateStart = document.querySelectorAll(".filter__period-input-date[name=date_start]");
const filterDateEnd = document.querySelectorAll(".filter__period-input-date[name=date_end]");

const userId = document.querySelector(".body");
const userIdArray = document.querySelectorAll(".user-id");

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

filterBackArray.forEach((item, index) => item.addEventListener("click", function(){
        filterPeriodWrapperArray[filterFormIndex].classList.remove("filter__period-wrapper--opened");
        removeRed(index);
    })
);


filterShowArray.forEach((item, index) =>  item.addEventListener("click", function(){
        if(checkFilledDate(index)){
            filterPeriodWrapperArray[filterFormIndex].classList.remove("filter__period-wrapper--opened");     
            filterRadioInputArray[filterFormIndex].forEach(item => item.checked = false);
            toggleList(filterFormIndex);
            filterButtonTextArray[filterFormIndex].innerHTML = filterPeriodArray[filterFormIndex].  innerHTML;   
            periodArray[filterFormIndex].value = "5";
            removeRed(index);
            makeRequest();  
        }           
    })
);

function toggleList(index){    
    filterBodyArray[index].classList.toggle("filter__body--visible");
    filterSpanArray[index].classList.toggle("filter__button-span--opened");
}

function makeRequest(){
    if(filterFormIndex===0) {
        collectionArray[filterFormIndex].value = "glucose";
    }else if(filterFormIndex===1){
        collectionArray[filterFormIndex].value = "weight";
    }else if(filterFormIndex===2){
        collectionArray[filterFormIndex].value = "dish";
    }
    userIdArray[filterFormIndex].value = userId.dataset.userId;
    const formData = new FormData(formArray[filterFormIndex]);

    const searchParam = corretRequest(formData, filterFormIndex)
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
        periodArray[filterFormIndex].value = inputArray[index].value;
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

function corretRequest(formData, index){ 
    let searchParam = new URLSearchParams(formData); 
    if(index === 0){
        searchParam.delete("period0");
    }else if(index === 1){
        searchParam.delete("period1");
    }else if(index === 2){
        searchParam.delete("period2");
    }   

    let arr = {};    

    arr.period = searchParam.get("period");

    if(searchParam.get("period")!=="5"){
        searchParam.delete("date_start");
        searchParam.delete("date_end");
        filterDateStart[filterFormIndex].value = "";
        filterDateEnd[filterFormIndex].value = "";
    }else{
        arr.date_start = searchParam.get("date_start");
        arr.date_end = searchParam.get("date_end");
        searchParam.delete("date_start");
        searchParam.delete("date_end")
    }
    searchParam.delete("period");

    let arrJson = JSON.stringify(arr);

    searchParam.set("filter",arrJson);

    return searchParam;
}

function checkFilledDate(index){
    if(filterDateStart[index].value !== "" &&  filterDateEnd[index].value !== ""){
        return true;
    }
    if(filterDateStart[index].value === ""){
        filterDateStart[index].classList.add("unfilled");
    }
    if(filterDateEnd[index].value === ""){
        filterDateEnd[index].classList.add("unfilled");
    }
    if(filterDateStart[index].value !== ""){
        filterDateStart[index].classList.remove("unfilled");
    }
    if(filterDateEnd[index].value !== ""){
        filterDateEnd[index].classList.remove("unfilled");
    }
}

function removeRed(index){
    if(filterDateStart[index].classList.contains("unfilled")){
        filterDateStart[index].classList.remove("unfilled");
    }
    if(filterDateEnd[index].classList.contains("unfilled")){
        filterDateEnd[index].classList.remove("unfilled");
    }
}





