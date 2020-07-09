//images
let fileUploaded = document.getElementById("file_uploaded");
let frontFile = document.getElementById("front_file");
let divGalary = document.getElementsByClassName("img_gallery")[0];
let picBtn = document.getElementById('pic_btn');
let frontPicBtn = document.getElementById('front_pic_btn');
let title = document.getElementById('title');
let titleMsg = document.getElementById('title_msg');
let pictureAlert = document.getElementById('picture_alert');

frontPicBtn.addEventListener("click", clickAddFrontPic);
picBtn.addEventListener('click', clickAddImages);
title.addEventListener("focusout", checkTitle);

frontFile.addEventListener("change", addFrontFile);
fileUploaded.addEventListener("change", handleFiles);

let List = new DataTransfer();

function clickAddFrontPic(e) {
    e.preventDefault();
    if (title.value.length == 0) {
        titleMsg.innerHTML = "Please enter title of product before add pictures"
    } else {
        titleMsg.innerHTML = '';
        frontFile.click();
    }
}

function clickAddImages(e) {
    e.preventDefault();
    if(List.files.length == 0) {
        pictureAlert.innerHTML = "Please, add main picture first!";
        pictureAlert.style.color = "red";
    } else {
        pictureAlert.innerHTML = "";
        fileUploaded.click();
    }
}

function checkTitle() {
    if (title.value.length == 0) {
        titleMsg.innerHTML = "Please, enter title of product before add pictures!"
        titleMsg.style.color = "red";
    } else {
        titleMsg.innerHTML = '';
    }
}



function makeFirstImgBigger() {
    let firstImg = divGalary.getElementsByTagName("img")[0];
    firstImg.className = "front";
}

function addFrontFile() {
    let files = frontFile.files;
    if(List.items.length == 0 ) {
        List.items.add(files[0]);
        let img = document.createElement("img");


        divGalary.appendChild(img);

        var reader = new FileReader();
        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(files[0]);

        fileUploaded.files = List.files;

        makeFirstImgBigger();
    } else {
        divGalary.innerHTML = "";
        let items = List.files;
        List.items.clear();
        List.items.add(files[0]);
        for(item of items){
            List.items.add(item);
        }

        fileUploaded.files = List.files;

        for(file of fileUploaded.files ) {
            let img = document.createElement("img");


            divGalary.appendChild(img);

            var reader = new FileReader();
            reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
            reader.readAsDataURL(file);
        }

        makeFirstImgBigger();


    }

    pictureAlert.innerHTML = "";
}

function handleFiles() {
    let files = fileUploaded.files;

    for(let i = 0; i < files.length; i++) {

        List.items.add(files[i]);
        let img = document.createElement("img");


        divGalary.appendChild(img);

        var reader = new FileReader();
        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(files[i]);
    }

    makeFirstImgBigger();

    fileUploaded.files = List.files;

}



