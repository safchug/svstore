let basketButton = document.getElementById('basket_button');
let a = basketButton.getElementsByTagName('a')[0];

basketButton.addEventListener('click', displayBasket);
a.addEventListener('click', preventRedirect);

function preventRedirect(e){
    e.preventDefault();
}

function displayBasket() {
    let xHttpReq = new XMLHttpRequest();
    xHttpReq.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response);
            formBasket(response);
        }
    };

    xHttpReq.open('POST', '/api/getbasketlist/', true);
    xHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xHttpReq.send();
}

let basketInside = document.getElementById('basket_inside');

function formBasket(list) {
    basketInside.style.display = "block";

    let divItem = basketInside.getElementsByClassName('basket_item')[0];
    let cloneDivItem = divItem.cloneNode(true);
    basketInside.innerHTML = "";

    let i;
    for(i = 0; i < list.length; i++) {
        cloneDivItem = cloneDivItem.cloneNode(true);
        basketInside.appendChild(cloneDivItem);

        let titleImg = cloneDivItem.getElementsByTagName('img')[0];
        let itemTitle = cloneDivItem.getElementsByClassName('basket_item_title')[0];
        let itemStatusDiv = cloneDivItem.getElementsByClassName('basket_item_status')[0];
        let titlePriceDiv = cloneDivItem.getElementsByClassName('basket_item_price')[0];
        let deleteBtn =  itemStatusDiv.getElementsByTagName('a')[0];


        itemTitle.innerHTML = list[i].title;
        titleImg.src = list[i].images[0];
        titlePriceDiv.innerHTML = list[i].price;
        deleteBtn.addEventListener('click', handleDeleteItem);

    }
}

function handleDeleteItem(e) {

}

document.addEventListener('click', function (e) {
    let isClickedInside = basketInside.contains(e.target);

    if(!isClickedInside) {
        basketInside.style.display = "none";
    }
});