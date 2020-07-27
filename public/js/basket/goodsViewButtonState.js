let buyButton = document.getElementsByClassName('buy_button')[0];

window.onload = function() {
    let xHttpReq = new XMLHttpRequest();
    xHttpReq.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response);
            changeButtonsState(response);
        }
    };

    xHttpReq.open('POST', '/api/getbasketlist/', true);
    xHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xHttpReq.send();
}

function changeButtonsState(list) {
        let title = document.querySelector('#lot_conteiner > h1').innerHTML;
        for(item of list) {
            if(item.title == title) {
                buyButton.style.fontSize = '30px';
                buyButton.innerHTML = 'in basket';
            }
        }

}