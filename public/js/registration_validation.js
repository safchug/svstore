let msgDiv = document.getElementsByClassName("message_div")[0];
let regFormCont = document.getElementsByClassName("regist_form_cont")[0];
let userTypeEl = regFormCont.getElementsByTagName("select")[0];

let isValid = [true, true, true, true, true];

userTypeEl.addEventListener("change", chackUserType);

function chackUserType() {
    let userType = this.value;

    if(userType == "Salesman") {
        msgDiv.style.display = "block";
    } else {
        msgDiv.style.display = "none";
    }
}

function getElementsWithAttributeAndItsValue(attribute, value)
{
    var matchingElements = [];
    var allElements = document.getElementsByTagName('input');
    for (var i = 0, n = allElements.length; i < n; i++)
    {
        if (allElements[i].getAttribute(attribute) === value)
        {
            // Element exists with attribute. Add to array.
            matchingElements.push(allElements[i]);
        }
    }
    return matchingElements;
}

//confirmation password

let passInputs = getElementsWithAttributeAndItsValue('type', 'password');
let passConfirmLbl = document.getElementById('pass_confirm_lbl');

function confirmPassword() {

    let pass1 = passInputs[0].value;
    let pass2 = passInputs[1].value;
    if (pass1 != '' && pass2 != '')  {
        if(pass1 !== pass2) {
            isValid[0] = false;
            passConfirmLbl.style.display = 'block';
        } else {
            isValid[0] = true;
            passConfirmLbl.style.display = 'none';
        }
    }
}

passInputs[0].addEventListener('focusout', confirmPassword);
passInputs[1].addEventListener('focusout', confirmPassword);

//chack if login is not taken
let loginInput = getElementsWithAttributeAndItsValue('name', 'user[login]')[0];
loginInput.addEventListener('focusout', chackLogin);
let msgLoginLbl = document.getElementById("msg_login_lbl");

function chackLogin(){
    msgLoginLbl.style.display = "none";
    isValid[2] = true;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status ==200) {
            let state = JSON.parse(this.responseText);
            if (state.isTaken) {
                isValid[1] = false;
                msgLoginLbl.style.display = "block";
            }
        }
    }

    xhttp.open("POST", "/api/login", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("flogin=" + loginInput.value);
}

let phoneLabelMsg = document.getElementById("phone_label_msg");
let phoneMsgInput = getElementsWithAttributeAndItsValue("name", "user[phone]")[0];
let form = document.getElementsByTagName("form")[0];

phoneMsgInput.addEventListener("focusout", checkPhoneNumber);

function isNumberContainLetters(phone) {
    let numbers = "1234567890+";
    for(let i = 0; i < phone.length; i++) {
        if(numbers.indexOf(phone.charAt(i)) < 0) {
            return true;
        }
    }
    return false;
}

function checkPhoneNumber() {
    let phone = phoneMsgInput.value;
    let phoneLength = phone.length;

    if(phoneLength < 10 || phoneLength > 13) {
        isValid[2] = false;
        phoneLabelMsg.innerHTML = "This phone number is incorrect!"
        phoneLabelMsg.style.display = "inline";
    } else if (isNumberContainLetters(phone)) {
        isValid[2] = false;
        phoneLabelMsg.innerHTML = "This phone number is incorrect!"
        phoneLabelMsg.style.display = "inline";
    } else {
        isValid[2] = true;
        phoneLabelMsg.style.display = "none";
    }
}

function isAllFieldsFullfiled() {
    let inputsList = document.getElementsByTagName("input");
    for(input of inputsList) {
        if (input.value == "") return false;
    }
    return true;
}

form.onsubmit = function validateForm(){
    if(phoneMsgInput.value == "") {
        isValid[3] = false;
        phoneLabelMsg.innerHTML = "Please, enter phone number"
        phoneLabelMsg.style.display = "inline";
    } else if (!isAllFieldsFullfiled()) {
        phoneLabelMsg.innerHTML = "Please, enter all fields"
        phoneLabelMsg.style.display = "inline";
        isValid[3] = false;
    } else {
        isValid[3] = true;
    }

    for(isOk of isValid) {
        if(!isOk) {
            return false;
        }
    }

    return true;
}
