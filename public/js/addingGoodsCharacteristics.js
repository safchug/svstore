//characteristics
let characteristicTitle = document.getElementById('characteristic_title');
let characteristic = document.getElementById('characteristic');
let addCharacteristic = document.getElementById('add_characteristic');
let characteristicTable = document.getElementById('characteristic_table');
let characteristicsData = document.getElementById('characteristics_data');
let characteristicAlertLbl = document.getElementById('characteristic_alert');

function addCharacteristicData() {
    let title = characteristicTitle.value;
    let characteristicStr = characteristic.value;

    if(title == "" || characteristicStr == "") {
        characteristicAlertLbl.innerHTML = "Please, enter some characteristics!";
        characteristicAlertLbl.style.color = "red";
    }

    characteristicTitle.value = "";
    characteristic.value = "";

    let characteristicInput = document.createElement('input');
    characteristicInput.setAttribute("type", "hidden");
    characteristicInput.setAttribute("name", title);
    characteristicInput.setAttribute("value", characteristicStr);
    characteristicsData.appendChild(characteristicInput);

    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let textNode1 = document.createTextNode(title);
    td1.appendChild(textNode1);
    let td2 = document.createElement("td");
    let textNode2 = document.createTextNode(characteristicStr);
    td2.appendChild(textNode2);
    tr.appendChild(td1);
    tr.appendChild(td2);
    characteristicTable.appendChild(tr);
}

addCharacteristic.addEventListener('click', addCharacteristicData);
