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

let basketOutside = document.getElementById('basket_outside');
let basketInside = document.getElementById('basket_inside');

function formBasket(list) {
    basketOutside.style.display = "block";

    let totalPriceDiv = basketOutside.getElementsByClassName('total_price')[0];

    let divItem = basketOutside.getElementsByClassName('basket_item')[0];
    let cloneDivItem = divItem.cloneNode(true);
    basketInside.innerHTML = "";

    let i;
    let totalPrice = 0;
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

        totalPrice += Number.parseInt(list[i].price);
    }

    totalPriceDiv.innerHTML = totalPrice + '₴';
}



function handleDeleteItem(e) {
    let basketButton = document.getElementById('basket_button');
    let countSpan = basketButton.getElementsByTagName('span')[0];
    let count = countSpan.innerHTML;

    let basketItem = e.target.parentNode.parentNode.parentNode;
    let titleDiv = basketItem.getElementsByClassName('basket_item_title')[0];
    let lot = titleDiv.innerHTML;

    xHttpReq = new XMLHttpRequest();
    xHttpReq.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            basketItem.remove();
            count--;
            countSpan.innerHTML = count;
            checkAndChangeButtonState(lot);
        }
    };

    xHttpReq.open('POST', '/api/removebasketitem', true);
    xHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xHttpReq.send('lot=' + lot);

}

function checkAndChangeButtonState(lot) {
    let pathname = window.location.pathname;

    if(pathname.indexOf('goods') != -1 && pathname.indexOf('view') != -1) {
        let title = document.querySelector('#lot_conteiner > h1').innerHTML;
        let button = document.getElementsByClassName('buy_button')[0];
        if(title == lot) {
            button.style.fontSize = '40px';
            button.innerHTML = 'Buy';
        }
    } else if (pathname.indexOf('goods') != -1) {
        let goodsDivs = document.getElementsByClassName('goods_label');
        let buttons = document.getElementsByClassName('buy_button');

        for(i = 0 ; i < goodsDivs.length; i++) {
            let title = goodsDivs[i].getElementsByTagName('h1')[0].innerHTML;
            if(title == lot) {
                buttons[i].style.fontSize = '40px';
                buttons[i].innerHTML = 'Buy';
            }
        }
    }
}


document.addEventListener('click', function (e) {
    let isClickedInside = basketOutside.contains(e.target);
    if(!isClickedInside) {
        basketOutside.style.display = "none";
    }
});