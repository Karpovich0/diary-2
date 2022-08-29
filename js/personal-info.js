const popupButton = document.querySelector(".popup__input--button");
const popupRadioLabelArray = document.querySelectorAll(".popup__radio-label");
const popupRadioButtonClose = document.querySelector(".popup__radio-button--personal-info");
const personalInfoWrapper = document.querySelector(".personal-info__radio-input-wrapper");
const personalInfoRadioInputCircleArray = document.querySelectorAll(".personal-info__radio-circle-input");
const personalInfoRadioLabelCircleArray = document.querySelectorAll(".personal-info__radio-circle-label");
const main = document.querySelector(".main");
const mainHover = document.querySelector(".main-hover");
const body = document.querySelector(".body");
const personalInfo = document.querySelector(".personal-info");
const weight = document.querySelector("#popup-personal-weight");
const height = document.querySelector("#popup-personal-height");
const message = document.querySelector(".personal-info__message");
const popupForm = document.querySelector(".popup__form");
const messageAnimationWrapper = document.querySelector(".message-animation-wrapper");

// works with radio
popupButton.addEventListener("click", function(evt){    
    personalInfoWrapper.classList.add("personal-info__radio-input-wrapper--current");
    main.classList.add("main--lock");
    mainHover.classList.add("main-hover--visible");
    body.classList.add("body--lock");
    personalInfo.classList.add("personal-info--lock");    
});
//close radio when u press on cross button
popupRadioButtonClose.addEventListener("click", function(evt){    
    closeRadio();
});
//close radio when u press on radio input
for(let i = 0; i < popupRadioLabelArray.length; i++){
    popupRadioLabelArray[i].addEventListener("click", function(ent){
        popupButton.textContent = popupRadioLabelArray[i].textContent;          
        closeRadio();
    })
};

// close radio fields
function closeRadio(){
    personalInfoWrapper.classList.remove("personal-info__radio-input-wrapper--current");
    main.classList.remove("main--lock");
    mainHover.classList.remove("main-hover--visible");
    body.classList.remove("body--lock");
    personalInfo.classList.remove("personal-info--lock");
};

function calcBMI(){
    let BMI;
    let weightValue = weight.value;
    let heightValue = height.value;
    if(weightValue !== "" && heightValue !== ""){
        weightValue = Number(weightValue);
        heightValue = Number(heightValue);
        BMI = weightValue/((heightValue/100)*(heightValue/100));
        BMI = Math.round(BMI);
        if(BMI > 26){
            personalInfoRadioInputCircleArray[1].click();
            message.innerHTML = `Индекс массы тела составляет 23,1 кг/м². Рекомендуем использовать цель - ${personalInfoRadioLabelCircleArray[1].innerHTML}`;
            return message.classList.add("personal-info__message--active");
        }else{
            personalInfoRadioInputCircleArray[0].click();
            message.innerHTML = `Индекс массы тела составляет ${BMI} кг/м². Рекомендуем использовать цель - ${personalInfoRadioLabelCircleArray[0].innerHTML}`;
            return message.classList.add("personal-info__message--active");           
        }        
    }
    message.classList.remove("personal-info__message--active");
}


popupForm.addEventListener("submit", function(e){
    e.preventDefault();
    const formData = new FormData(this);
    const searchParam = new URLSearchParams(formData);  
    console.log(searchParam);
    // change link
    fetch('https://httpbin.org/post', {
        method: 'POST',
        body: searchParam,
    }).then(function(response){
        return response.text();
    }).then(function(text){
        console.log(text);
    });
    // .then - for demonstration and can be deleted. Link must be changed on you website's address
    openAnimationMessage()
});

function openAnimationMessage(){
    messageAnimationWrapper.classList.add("message-animation-wrapper--opened");
    main.classList.add("main--lock");   
}