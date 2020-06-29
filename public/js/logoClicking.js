let menu = document.getElementById('menu');
let logoImg = menu.getElementsByTagName("img")[0];

logoImg.addEventListener('click', redirect);

function redirect() {
    window.location.href = "/";
}