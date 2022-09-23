import { responseFood } from "./response.js";

const currentKcal = document.querySelector(".calculator__dish-kcal-current");
const maxKcal = document.querySelector(".calculator__dish-kcal-max");
const proteinNumber = document.querySelector(".calculator__dish-protein-number");
const lipidNumber = document.querySelector(".calculator__dish-lipid-number");
const carbNumber = document.querySelector(".calculator__dish-carb-number");
const xeNumber = document.querySelector(".calculator__dish-bread-number");
const caclculatorProgress = document.querySelector(".calculator__dish-progress-span");

const detailsDish = document.querySelector(".details--dish");

const calculatorWrapper = detailsDish.querySelector(".calculator__dish-fieldset-wrapper");
const detailsRecordItem = calculatorWrapper.innerHTML;
const headerTitle = detailsDish.querySelector(".details__header-title");

headerTitle.innerHTML = responseFood[0].date_time.slice(-0,-10);

generateItems([calculatorWrapper, detailsRecordItem], responseFood.length);

const dishLegendArray = document.querySelectorAll(".calculator__dish-legend");
const kcalInputArray = document.querySelectorAll(".calculator__dish-input--kcal");
const weightInputArray = document.querySelectorAll(".calculator__dish-input--weight");
const xeInputArray = document.querySelectorAll(".calculator__dish-input--xe");

const protein = findSum("protein");
const carb = findSum("carb");
const lipid = findSum("lipid");
const xe = findSum("bread_units");
const kcal = findSum("kcal");

if(Number(kcal) <= Number(responseFood[0].daily_max_kcal)){
    caclculatorProgress.style.width = ((kcal/responseFood[0].daily_max_kcal)*100)+"%";
}else{
    caclculatorProgress.style.backgroundColor = "red";
    caclculatorProgress.style.width = "100%"
}

maxKcal.innerHTML = responseFood[0].daily_max_kcal;
currentKcal.innerHTML = kcal;
proteinNumber.innerHTML = protein;
lipidNumber.innerHTML = lipid;
carbNumber.innerHTML = carb;
xeNumber.innerHTML = xe;

const dailyKcal = responseFood[0].daily_max_kcal;

function generateItems(array, length){
    for(let i = 1; i < length; i++){
        array[0].innerHTML += array[1];
    }
}

fillDishItems(responseFood.length);

function findSum(property){
    let sum = 0;
    for(let i = 0; i < responseFood.length; i++){
        sum += +responseFood[i][property];
    }

    sum = sum.toFixed(1).replace(".0", "");

    return sum;
}

function fillDishItems(number){
    for(let i = 0; i < number; i++){
        fillDishData(i);
    }
}

function fillDishData(i){    
    dishLegendArray[i].innerHTML = responseFood[i].meal_title;
    kcalInputArray[i].innerHTML = responseFood[i].kcal;
    weightInputArray[i].innerHTML = responseFood[i].gram;
    xeInputArray[i].innerHTML = responseFood[i].bread_units;
}