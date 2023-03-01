const buttons = document.querySelectorAll("button");
const display = document.getElementById("display");
const n1 = document.getElementById("n1");
const op = document.getElementById("op");
const n2 = document.getElementById("n2");
const operate = {
  firstNumber: "",
  operation: "",
  secondNumber: "",
};
buttons.forEach((button) => {
  switch (button.classList.value) {
    case "operator":
      button.addEventListener("click", operation);
      break;
    case "clear":
      button.addEventListener("click", clear);
      break;
    case "backspace":
      button.addEventListener("click", backspace);
      break;
    case "calculate":
      button.addEventListener("click", calculate);
      break;
    case "digit":
      button.addEventListener("click", digit);
      break;
    case "floatpoint":
      button.addEventListener("click", floatPoint);
      break;
    default:
      alert("Error");
      break;
  }
});

function clear() {
  operate.firstNumber = "";
  operate.operation = "";
  operate.secondNumber = "";
  n1.innerText = "";
  op.innerText = "";
  n2.innerText = "";
  console.log(operate);
}
function floatPoint() {
  switch (true) {
    case operate.firstNumber === "" || operate.secondNumber === "":
      confirm("Enter a number first");
      break;
    case operate.firstNumber !== "" &&
      !operate.firstNumber.includes(".") &&
      operate.operation === "":
      operate.firstNumber += ".";
      n1.innerText += ".";
      break;
    case operate.firstNumber !== "" &&
      operate.operation !== "" &&
      !operate.secondNumber.includes("."):
      operate.secondNumber += ".";
      n2.innerText += ".";
      break;
    default:
      confirm("Float point already exist");
      break;
  }
}
function backspace(e) {
  console.log(e.target.textContent);
}
function calculate(e) {
  console.log(operate);
}
function digit(e) {
  switch (true) {
    case operate.operation === "":
      operate.firstNumber += e.target.textContent;
      n1.innerText = operate.firstNumber;
      break;
    case operate.operation !== "" && operate.operation !== NaN:
      operate.secondNumber += e.target.textContent;
      n2.innerText = operate.secondNumber;
    default:
      break;
  }
  console.log(operate);
}
function operation(e) {
  switch (true) {
    case e.target.className === "operator" &&
      operate.firstNumber === "" &&
      operate.secondNumber === "":
      confirm("Please enter a number");
      break;
    case e.target.className === "operator" &&
      (operate.firstNumber !== "" || operate.secondNumber !== ""):
      operate.operation = e.target.textContent;
      op.innerText = operate.operation;
      break;
    default:
      alert("error in operation");
      break;
  }
}
