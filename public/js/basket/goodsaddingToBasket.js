let buybButtons = document.getElementsByClassName('buy_button');
let basketButtonDiv = document.getElementById('basket_button');
let countSpan = basketButtonDiv.getElementsByTagName('span')[0];

for (button of buybButtons) {
    button.addEventListener('click', handleBuyButtonClick);
}

function handleBuyButtonClick(e) {

    e.preventDefault();

    let state = e.target.innerHTML;
    if(state == 'Buy'){
    let lot = e.target.getAttribute('lot');
    let url = e.target.getAttribute('href');

    let xHttpReq = new XMLHttpRequest();
    xHttpReq.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response);
            console.log(response);
            if(response.count > 0) {
                countSpan.innerHTML = response.count;
            }
            e.target.style.fontSize = '30px';
            e.target.innerHTML = 'in basket';
        }
    };

    xHttpReq.open('POST', '/api/addtobasket/', true);
    xHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xHttpReq.send('lot=' + lot + '&url=' + url);
    }
}