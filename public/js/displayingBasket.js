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
            alert(response);
        }
    };

    xHttpReq.open('POST', '/api/getbasketlist/', true);
    xHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xHttpReq.send();
}