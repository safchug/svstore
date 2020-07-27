let paymentSelect = document.querySelector('select[name="payment_method"]');
let debitCardForm = document.querySelector('form[name="card_form"]');
let postOfficeForm = document.querySelector('form[name="post_office_form"]');

paymentSelect.addEventListener('change', handleSelectChange);

function handleSelectChange(e) {
    let state = e.target.value;
    if(state == 'Debit card') {
        debitCardForm.style.display = 'block';
        postOfficeForm.style.display = 'none';
    } else {
        postOfficeForm.style.display = 'block';
        debitCardForm.style.display = 'none';
    }
}

let orderCheckAll = document.getElementById('order_check_all');
let checkBoxList = document.querySelectorAll('input[type="checkbox"]');
let totalPriceConteiner = document.getElementById('total_price_conteiner');

orderCheckAll.addEventListener('click', handleCheckClick);

function handleCheckClick(e) {
    for(checkbox of checkBoxList) {
        checkbox.checked = e.target.checked;
    }
}

let orderItemList = document.getElementsByClassName('order_item');

for(checkBoxEl of checkBoxList) {
    checkBoxEl.addEventListener('click', setNewTotalPrice);
}

function setNewTotalPrice() {
    let price = 0;

    for(i = 0; i < orderItemList.length; i++) {
        if(checkBoxList[i + 1].checked) {
            let orderItemPrice = orderItemList[i].getElementsByClassName('order_item_price')[0];

            price += Number.parseInt(orderItemPrice.innerHTML);

        }

    }

    totalPriceConteiner.innerHTML = price + '₴';

}


debitCardForm.onsubmit = function() {
    let orderInput = debitCardForm.querySelector('input[name="order[list]"]');
    let priceInput = debitCardForm.querySelector('input[name="total_price"]');

    let lotList = [];
    for(i = 0; i < orderItemList.length; i++) {
        if(checkBoxList[i + 1].checked) {
            let title = orderItemList[i].getElementsByTagName('h1')[0];
            let orderItemPrice = orderItemList[i].getElementsByClassName('order_item_price')[0];
            let obj = {}
            obj.title = title.innerHTML;
            obj.price = Number.parseInt(orderItemPrice.innerHTML);
            lotList.push(obj);
        }
    }

    priceInput.value = Number.parseInt(totalPriceConteiner.innerHTML);
    orderInput.value = JSON.stringify(lotList);

}

postOfficeForm.onsubmit = function() {
    let orderInput = postOfficeForm.querySelector('input[name="order[list]"]');
    let priceInput = postOfficeForm.querySelector('input[name="total_price"]');


    let lotList = [];
    for(i = 0; i < orderItemList.length; i++) {
        if(checkBoxList[i + 1].checked) {
            let title = orderItemList[i].getElementsByTagName('h1')[0];
            let orderItemPrice = orderItemList[i].getElementsByClassName('order_item_price')[0];
            let obj = {}
            obj.title = title.innerHTML;
            obj.price = Number.parseInt(orderItemPrice.innerHTML);
            lotList.push(obj);
        }
    }

    priceInput.value = Number.parseInt(totalPriceConteiner.innerHTML);
    orderInput.value = JSON.stringify(lotList);

}