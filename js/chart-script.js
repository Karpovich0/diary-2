import { responseGlucose } from "./response.js";
import { responseWeight } from "./response.js";

// chart
const glucose = document.getElementById('glucose-chart').getContext('2d');
const weight = document.getElementById('weight-chart').getContext('2d');
Chart.defaults.font.size = 16;

// getting a templaets

const detailsGlucose = document.querySelector(".details--glucose");
const detailsWeight = document.querySelector(".details--weight");

const glucoseChildrenArray = getChildren(detailsGlucose);
const weightChildrenArray = getChildren(detailsWeight);

// creating emplty items without data
generateItems(glucoseChildrenArray, responseGlucose.length);
generateItems(weightChildrenArray, responseWeight.length);

// getting all fields to fill
// glucose fields
const titleGlucoseArray = detailsGlucose.querySelectorAll(".details__title");
const glucoseLevelArray = detailsGlucose.querySelectorAll(".list__content--glucose-level");
const insulineTypeArray = detailsGlucose.querySelectorAll(".list__content--insuline-type");
const insulineInjectionArray = detailsGlucose.querySelectorAll(".list__content--insuline-injection");
const commentaryGlucoseArray = detailsGlucose.querySelectorAll(".details__commentary");
// weight fields
const titleWeightArray = detailsWeight.querySelectorAll(".details__title");
const contentWeightArray = detailsWeight.querySelectorAll(".list__content--weight");
const commentaryWeightArray = detailsWeight.querySelectorAll(".details__commentary");

// fill emplty items with data
fillGlucoseItems(responseGlucose.length);
fillWeightItems(responseWeight.length);

const date =  getHousAndDay(responseGlucose[0].date_time);

glucoseChildrenArray[2].innerHTML = date[0];
weightChildrenArray[2].innerHTML = fillMonth();

const levelArray = getAllDate(responseGlucose, "glucose_level");
const dateArray = getAllDate(responseGlucose, "date_time");

const weightArray = getAllDate(responseWeight, "Weight");
const dateWeightArray = getAllDate(responseWeight, "date_time");

const glucoseChart = new Chart(glucose, {
    type: 'bar',
    data: {
        labels: dateArray,
        datasets: [{
            label: 'Уровень глюкозы (ммоль/л)',
            data: levelArray,
            backgroundColor: [
                'rgb(0, 126, 126)'
            ],
            borderWidth: 0
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 16,                        
                    }
                },                
            }
        }
    }
});

const weightChart = new Chart(weight, {
    type: 'bar',
    data: {
        labels: dateWeightArray,
        datasets: [{
            label: 'Вес',
            data: weightArray,
            backgroundColor: [
                'rgb(0, 126, 126)'
            ],
            borderWidth: 0
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 16,                        
                    }
                },                
            }
        }
    }
});

function generateItems(array, length){
    for(let i = 1; i < length; i++){
        array[0].innerHTML += array[1];
    }
}

function fillGlucoseItems(number){
    for(let i = 0; i < number; i++){
        fillGlucoseData(i);
    }
}

function fillWeightItems(number){
    for(let i = 0; i < number; i++){
        fillWeightData(i);
    }
}

function getHousAndDay(date){    
    let arr = date.split(", ");
    let hour = arr[1].slice(-0, -3);
    let day = arr[0];
    return [day, hour];
}

function fillGlucoseData(i){    
    let date =  getHousAndDay(responseGlucose[i].date_time);
    titleGlucoseArray[i].innerHTML = `${date[1]} - ${responseGlucose[i].measure_type}`;
    glucoseLevelArray[i].innerHTML = responseGlucose[i].glucose_level;
    insulineTypeArray[i].innerHTML = responseGlucose[i].insulin_type;
    insulineInjectionArray[i].innerHTML = responseGlucose[i].insulin_injection;
    commentaryGlucoseArray[i].innerHTML = responseGlucose[i].comment;
}

function fillWeightData(i){    
    let date =  getHousAndDay(responseWeight[i].date_time);
    titleWeightArray[i].innerHTML = date[0];
    contentWeightArray[i].innerHTML = responseWeight[i].Weight;
    commentaryWeightArray[i].innerHTML = responseWeight[i].comment;
}

function getAllDate(dataObject, item){   
    let arr = [];
    for (let i = 0; i < dataObject.length; i++) {
        arr.push(dataObject[i][item]);
    }

    if(item !== "date_time"){
        arr = arr.map(item =>{
            return +item.replace(/\,/g,'.');
        });
    }else if(!dataObject[0].Weight){
        arr = arr.map(item =>{
            return getHousAndDay(item)[1];
        });
    }else{
        arr = arr.map(item =>{
            return getHousAndDay(item)[0].slice(-0, -8);
        })
    }
    return arr;
}

function getChildren(parent){
    // getting children of details details--glucose
    const detailsRecordList = parent.querySelector(".details__records-list");
    const detailsRecordItem = detailsRecordList.innerHTML;
    const headerTitle = parent.querySelector(".details__header-title");
    return [detailsRecordList, detailsRecordItem, headerTitle];
}

function fillMonth(){    
    let date = getHousAndDay(responseWeight[0].date_time)[0];
    let arr = date.split(".");
    const month = +arr[1]; 
    const year = arr[2];
    const months=[
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ];
    return `${months[month-1]} ${year}`;
}