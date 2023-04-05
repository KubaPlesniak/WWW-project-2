const PHOTO = document.querySelectorAll(".photo img")
const POPUP = document.querySelector(".popup");
const POPUP_CLOSE = document.querySelector(".popup_close");
const POPUP_IMG = document.querySelector(".popup_img");
const ARROW_LEFT = document.querySelector(".popup_arrow--left");
const ARROW_RIGHT = document.querySelector(".popup_arrow--right");

let currentImageIndex;

const rightIMG =  () => {
    if(currentImageIndex === PHOTO.length -1){
        currentImageIndex = 0;
    }else{
       currentImageIndex++; 
    }
    POPUP_IMG.src = PHOTO[currentImageIndex].src;
};

const leftIMG = () =>{
    if(currentImageIndex === 0){
        currentImageIndex = PHOTO.length - 1;
    }else{
       currentImageIndex--; 
    }
    POPUP_IMG.src = PHOTO[currentImageIndex].src;
};

const closePopup = () => {
    POPUP.classList.add("hidden");
};

PHOTO.forEach((photo, index) => {
    photo.addEventListener("click", (e) => {
        POPUP.classList.remove("hidden");
        POPUP_IMG.src = e.target.src;
        currentImageIndex = index;
    });
});

POPUP_CLOSE.addEventListener("click", closePopup);
ARROW_RIGHT.addEventListener("click", rightIMG)
ARROW_LEFT.addEventListener("click", leftIMG);

document.addEventListener("keydown",(e) => {
    if(!POPUP.classList.contains("hidden")){
        if(e.code === "ArrowRight"){
        rightIMG();
        }
        if(e.code === "ArrowLeft"){
            leftIMG();
        }
        if(e.code === "Escape"){
            closePopup();
        }
    }
});

POPUP.addEventListener("click", (e) => {
    if(e.target === POPUP){
        closePopup();
    }
});