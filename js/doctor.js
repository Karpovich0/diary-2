const popupButton = document.querySelector(".popup__input--button");
const popupRadioInputArray = document.querySelectorAll(".popup__radio-input");
const popupRadioLabelArray = document.querySelectorAll(".popup__radio-label");
const popupRadioButtonClose = document.querySelector(".popup__radio-button");
const personalInfoWrapper = document.querySelector(".popup__radio-input-wrapper");
// Result button
const doctorButtonName = document.querySelector(".doctor__button-name");
const doctorButtonExperience  = document.querySelector(".doctor__button-experience");
const doctorButtonPatientsNumber  = document.querySelector(".doctor__button-patients-number");
const doctorButtonPicture  = document.querySelector(".doctor__button-picture");
// radio content
const doctorName = document.querySelectorAll(".doctor__name");
const doctorExperience  = document.querySelectorAll(".doctor__experience");
const doctorPatientsNumber  = document.querySelectorAll(".doctor__patients-number");
const doctorPicture  = document.querySelectorAll(".doctor__picture");
// main, body
const main = document.querySelector(".main");
const mainHover = document.querySelector(".main-hover");
const body = document.querySelector(".body");
// hidden inputs 
const doctorId = document.querySelector("#doctor-id");
const doctorEmail = document.querySelector("#doctor-email");
//form
const popupForm = document.querySelector(".popup__form");
const messageAnimationWrapper = document.querySelector(".message-animation-wrapper");
// animation
const messageItemArray = document.querySelectorAll(".message-animation__item");


const doctors = [{
    "id": 1,
    "doctor_id": "aJDD6o8RRG21u6gaivPzhg",
    "first_name": "Анар",
    "last_name": "Хабидуллаевна",
    "patronymic": "Ибраева",
    "email":  "anar.habidullaevna@gmail.com",
    "photo_url": "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/QkEnUeejdEhLwFcFZyEN/pub/CTZcnyu3o5avvdEqUXwj.jpeg",
    "description": "Врач-эндокринолог высшей категории. Стаж 22 года.",
    "patients_count": 1
  },{
      "id": 2,
      "doctor_id": "V1aiF48AT.S8ufoTY41d0Q",
      "first_name": "Асия",
      "last_name": "Балтабаева",
      "patronymic": "Кайратовна",
      "email":  "asia.baltabaeva@gmail.com",
      "photo_url": "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/QkEnUeejdEhLwFcFZyEN/pub/PI9nGfStqzBTHr7UwySg.jpeg",
      "description": "Врач эндокринолог с 14 летним стажем, инструктор Школы диабета.",
      "patients_count": 3
}];

generateCardData();
fillCard(0);
generateAttributes();

// works with radio
popupButton.addEventListener("click", function(evt){    
    personalInfoWrapper.classList.add("doctor__radio-input-wrapper--current");
    main.classList.add("main--lock");
    mainHover.classList.add("main-hover--visible");
    body.classList.add("body--lock");
});
//close radio when u press on cross button
popupRadioButtonClose.addEventListener("click", function(evt){  
    closeRadio();
});
//close radio when u press on radio input
for(let i = 0; i < popupRadioLabelArray.length; i++){
    popupRadioLabelArray[i].addEventListener("click", function(ent){        
        fillCard(i);
        closeRadio();       
    })
};

// close radio fields
function closeRadio(){
    main.classList.remove("main--lock");
    mainHover.classList.remove("main-hover--visible");
    body.classList.remove("body--lock");
    personalInfoWrapper.classList.remove("doctor__radio-input-wrapper--current");  
}

function fillCard(i){
    doctorButtonName.innerHTML = doctorName[i].innerHTML ;
    doctorButtonExperience.innerHTML =  doctorExperience[i].innerHTML;
    doctorButtonPatientsNumber.innerHTML = doctorPatientsNumber[i].innerHTML;  
    doctorButtonPicture.setAttribute("src",  doctorPicture[i].src);    
    doctorEmail.value = doctors[i].email;
}

function generateFullName(i){
    return doctors[i].first_name + " " + doctors[i].last_name + " " + doctors[i].patronymic;
}
function generateCardData(){
    for(let i = 0; i < popupRadioInputArray.length; i++){
        doctorName[i].innerHTML = generateFullName(i);
        doctorExperience[i].innerHTML =  doctors[i].description;
        if(doctors[i].patients_count === 1){
            doctorPatientsNumber[i].innerHTML = doctors[i].patients_count + " пациент в приложении.";  
        }else if(doctors[i].patients_count === 0){
            doctorPatientsNumber[i].innerHTML = doctors[i].patients_count + " пациентов в приложении."; 
        }else{
            doctorPatientsNumber[i].innerHTML = doctors[i].patients_count + " пациента в приложении."; 
        }    
        doctorPicture[i].setAttribute("src", doctors[i].photo_url);       
    }
}

function generateAttributes(){
    for(let i = 0; i < popupRadioInputArray.length; i++) {
        popupRadioInputArray[i].setAttribute("name","doctor");
        popupRadioInputArray[i].setAttribute("id", doctors[i].doctor_id);
        popupRadioInputArray[i].setAttribute("value", doctors[i].doctor_id);
        popupRadioLabelArray[i].setAttribute("for", doctors[i].doctor_id);
    }
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
    startAnimation();
}

function startAnimation(){
    messageItemArray[0].classList.add("message-animation__item--visible");

    let counter = 0;
    let i = setInterval(function(){   
        removeVisible(counter);
        if(counter === messageItemArray.length-1) {
            counter = -1;
        }
        setTimeout(function(){messageItemArray[++counter].classList.add("message-animation__item--visible")}, 1500); 
        
    }, 3000);

    function removeVisible(index){
        messageItemArray[index].classList.remove("message-animation__item--visible");
    }
};

