const messageList = document.querySelector(".message-animation__list");
const messageItemArray = document.querySelectorAll(".message-animation__item");
messageItemArray[0].classList.add("message-animation__item--visible");

let counter = 0;
pauser = 0;
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