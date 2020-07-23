let labelDivs = document.getElementsByClassName('goods_label');
let buttons = document.getElementsByClassName('buy_button');

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
    let i;
    for(i = 0; i < labelDivs.length; i++){
        let title = labelDivs[i].getElementsByTagName('h1')[0].innerHTML;
        for(item of list) {
            if(item.title == title) {
                buttons[i].style.fontSize = '30px';
                buttons[i].innerHTML = 'in basket';
            }
        }
    }
}