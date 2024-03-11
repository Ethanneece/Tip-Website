function selectTip(id) {

    const tip = document.getElementById(id);

    const tips = document.getElementsByClassName("tipButton");

    for (let i = 0; i < tips.length; i++) {
        if (tips[i].classList.contains("selectedTip")) {
            tips[i].classList.remove("selectedTip");
        }
        if (!tips[i].classList.contains("unSelectedTip")) {
            tips[i].classList.add("unSelectedTip");
        }
    }

    tip.classList.add("selectedTip");
    tip.classList.remove("unSelectedTip");

    clearCustom();
}

function removeTip() {

    const tip = document.getElementsByClassName("selectedTip");

    if (tip.length != 0) {

        if (tip[0].classList.contains("selectedTip")) {
            tip[0].classList.add("unSelectedTip");
            tip[0].classList.remove("selectedTip");
        }
    }
}

function calculateTip(bill, tip, numberOfPeople) {
    return (bill * tip) / numberOfPeople; 
}

function calculateTotal(bill, tip, numberOfPeople) {
    return (bill + (bill * tip)) / numberOfPeople;
}

function reloadAmount() {

    enableReset();

    const bill = document.getElementById("billInput");
    const numberOfPeople = document.getElementById("peopleInput");
    const tip = document.getElementsByClassName("selectedTip");
    const tipCustom = document.getElementById("custom");

    //We don't have enough information to calculate amount to be paid.
    if (bill.value.length == 0) {
        clearAmount();
        return; 
    }

    if (numberOfPeople.value.length == 0 || numberOfPeople.value == 0) {
        clearAmount();
        return;
    }

    if (tip.length == 0 && tipCustom.value.length == 0) {
        clearAmount();
        return;
    }

    tipPercent = tipCustom.value * 0.01
    
    if (tipCustom.value.length == 0) {
        tipPercent = tip[0].value
    }

    tipAmount = calculateTip(Number(bill.value), Number(tipPercent), Number(numberOfPeople.value));
    totalAmount = calculateTotal(Number(bill.value), Number(tipPercent), Number(numberOfPeople.value));

    tipHTML = document.getElementById("tipAmount");
    totalHTML = document.getElementById("totalAmount");

    tipHTML.innerHTML = "$" + tipAmount.toFixed(2);
    totalHTML.innerHTML = "$" + totalAmount.toFixed(2);
}

function clearAmount() {

    tipHTML = document.getElementById("tipAmount");
    totalHTML = document.getElementById("totalAmount");
    
    tipHTML.innerHTML = "$0.00";
    totalHTML.innerHTML = "$0.00";
}

function peopleError() {

    const peopleInput = document.getElementById("peopleInput");

    if (peopleInput.value.length == 0 || peopleInput.value != 0) {
        removePeopleError();
        return;
    }

    if (peopleInput.classList.contains("peopleNoError")) {
        peopleInput.classList.remove("peopleNoError");
    }

    if (!peopleInput.classList.contains("peopleError")) {
        peopleInput.classList.add("peopleError");
    } 

    const errorMessage = document.getElementById("peopleErrorMessage");

    if (errorMessage.classList.contains("errorHidden")) {
        errorMessage.classList.remove("errorHidden");
    }

    if (!errorMessage.classList.contains("errorShown")) {
        errorMessage.classList.add("errorShown");
    }
}

function removePeopleError() {

    const peopleInput = document.getElementById("peopleInput");
    const errorMessage = document.getElementById("peopleErrorMessage");

    if (peopleInput.classList.contains("peopleError")) {
        peopleInput.classList.add("peopleNoError");
        peopleInput.classList.remove("peopleError");
    }

    if (errorMessage.classList.contains("errorShown")) {
        errorMessage.classList.add("errorHidden");
        errorMessage.classList.remove("errorShown");
    }
}

function enableReset() {

    const reset = document.getElementById("reset");

    reset.disabled = false
}

function resetClicked() {

    const bill = document.getElementById("billInput");
    const numberOfPeople = document.getElementById("peopleInput");
    const tip = document.getElementsByClassName("selectedTip");

    if (tip.length != 0) {
        if (tip[0].classList.contains("selectedTip")) {
            tip[0].classList.add("unSelectedTip");
            tip[0].classList.remove("selectedTip");
        }
    }

    bill.value = "";
    numberOfPeople.value = "";

    const reset = document.getElementById("reset");

    reset.disabled = true 

    clearCustom()
    clearAmount()
}

function clearCustom() {

    const custom = document.getElementById("custom");

    if (custom.value.length != 0) {
        custom.value = "";
    }

    if (custom.classList.contains("customSelected")) {
        custom.classList.remove("customSelected");
    }
}

function selectCustom() {

    const custom = document.getElementById("custom");

    if (!custom.classList.contains("customSelected")) {
        custom.classList.add("customSelected");
    }

    removeTip();
}

const tips = document.getElementsByClassName("tipButton");

for (let i = 0; i < tips.length; i++) {
    tips[i].addEventListener("click", () => {
        selectTip(tips[i].id)
        reloadAmount()
    });
}

const inputs = document.getElementsByTagName("input");

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", reloadAmount);
}

const peopleInput = document.getElementById("peopleInput");

peopleInput.addEventListener("focusout", peopleError);
peopleInput.addEventListener("input", peopleError);

const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", resetClicked);

const custom = document.getElementById("custom");
custom.addEventListener("click", selectCustom);