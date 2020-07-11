let form = document.getElementsByTagName('form')[0];
let titleOfGoods = document.getElementById('title');
let title_msg_lbl = document.getElementById('title_msg');
let priceLbl = document.getElementById("price_lbl");
let priceInput = document.getElementById("price_input");
let fileUploadedInput = document.getElementById("file_uploaded");
let characteristicsDataDiv = document.getElementById('characteristics_data');
let characteristicsInputArr = characteristicsDataDiv.getElementsByTagName("input");
let characteristicAlert = document.getElementById('characteristic_alert');
let addCharacteristicBtn = document.getElementById('add_characteristic');
let characteristicTitleInput = document.getElementById('characteristic_title');
let characteristicInput = document.getElementById('characteristic');

titleOfGoods.addEventListener("change", TitleFullfiledingChaking);
fileUploadedInput.addEventListener("change", pictureChaking);
priceInput.addEventListener("change", checkPriceFulfiling);
characteristicTitleInput.addEventListener("change", clearCharacteristicAlert);

function clearCharacteristicAlert() {
    characteristicAlert.innerHTML = "";
}

function checkPriceFulfiling() {
    if(priceInput.value != "") {
        priceLbl.innerHTML = "";
    }
}


function pictureChaking() {
    picture_alert.innerHTML = "";
}

function TitleFullfiledingChaking() {
    if(title_msg_lbl != "") {
        title_msg_lbl.innerHTML = "";
    }
}

form.onsubmit = function() {
    isDataValid = true;

    if(titleOfGoods.value == "") {
        title_msg_lbl.innerHTML = "Please, enter the title!";
        title_msg_lbl.style.color = "red";
        isDataValid = false;
    }

    if(priceInput.value == "") {
        priceLbl.innerHTML = "Please, enter the price!";
        priceLbl.style.color = "red";
        isDataValid = false;
    }

    if(fileUploadedInput.files.length == 0) {
        picture_alert.innerHTML = "Please, add some pictures!";
        picture_alert.style.color = "red";
        isDataValid = false;
    }

    if(characteristicsInputArr.length == 0) {
        characteristicAlert.innerHTML = "Please, add some characteristics!";
        characteristicAlert.style.color = "red";
        isDataValid = false;
    }

     return isDataValid;
}