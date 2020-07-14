let lotFrontPic = document.getElementsByClassName('lot_front_pic')[0];
let lotPicturesDiv = document.getElementsByClassName('lot_pictures')[0];
let lotImages = lotPicturesDiv.getElementsByTagName('img');

for(img of lotImages) {
    img.addEventListener('click', swithPicture);
}

function swithPicture(e) {
    lotFrontPic.src = e.target.src;
}