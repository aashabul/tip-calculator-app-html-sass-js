const bill = document.getElementById("bill");
const customTip = document.getElementById("custom");
const person = document.getElementById("person");
const buttons = document.querySelectorAll(".btn");
const error = document.getElementById("error");
const tipResult = document.getElementById("tip-result");
const totalResult = document.getElementById("total-result");
const reset = document.getElementById("reset");

//declaring required value as 0
let billVal = 0;
let tipVal = 0;
let personVal = 0;

// adding event listners for all input and buttons
bill.addEventListener("input", validateBill);

person.addEventListener("input", validatePerson);

customTip.addEventListener("input", customTipVal);

buttons.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});

reset.addEventListener("click", handleReset);

// function to handle button click on percentage button
function handleClick(event) {
  buttons.forEach((btn) => {
    btn.classList.remove("active");

    if (event.target.value === btn.value) {
      btn.classList.add("active");
      tipVal = btn.value / 100;
    }
  });
  calculate();
}

//validating people count
function validatePerson() {
  personVal = person.value;

  if (personVal <= 0) {
    error.textContent = "Can't be zero";
    person.style.outlineColor = "#ff6b6b";
    //timeout function to clear error and border after 2 seconds
    setTimeout(function () {
      error.textContent = "";
      person.style.outlineColor = "";
    }, 2000);
  }
  calculate();
}

//getting billVal from bill input
function validateBill() {
  billVal = bill.value;
}

//calculating customtip and converting it to percentage
function customTipVal() {
  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });

  tipVal = customTip.value / 100;
  calculate();
}

//calculate function to change innerhtml of tip and total value
function calculate() {
  if (personVal >= 1) {
    let tip = (billVal * tipVal) / personVal;
    let total = tip + billVal / personVal;
    //limit the two digits after decimal value and set the text
    tipResult.textContent = tip.toFixed(2);
    totalResult.textContent = total.toFixed(2);
  }
}

//function to handle form reset
function handleReset() {
  tipVal = 0;
  billVal = 0;
  bill.value = "";
  customTip.value = "";
  person.value = "";

  tipResult.textContent = "0.00";
  totalResult.textContent = "0.00";

  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });
}
