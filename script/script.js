const buttons = document.querySelectorAll("button");
const display = document.getElementById("display");
const n1 = document.getElementById("n1");
const op = document.getElementById("op");
const n2 = document.getElementById("n2");
const rs = document.getElementById("result");
const operate = {
  firstNumber: "",
  operation: "",
  secondNumber: "",
  result: "",
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
}
function floatPoint() {
  switch (true) {
    case operate.firstNumber === "" ||
      (operate.secondNumber === "" && operate.operation !== ""):
      confirm("Enter a number first");
      break;
    case operate.firstNumber !== "" &&
      !operate.firstNumber.includes(".") &&
      operate.operation === "":
      operate.firstNumber += ".";
      break;
    case operate.firstNumber !== "" &&
      operate.operation !== "" &&
      !operate.secondNumber.includes("."):
      operate.secondNumber += ".";
      break;
    default:
      confirm("Float point already exist");
      break;
  }
  writeData();
}
function backspace() {
  if (operate.secondNumber !== "") {
    operate.secondNumber = operate.secondNumber.substring(
      0,
      operate.secondNumber.length - 1
    );
  } else if (operate.secondNumber === "" && operate.operation !== "") {
    operate.operation = "";
  } else if (operate.firstNumber !== "" && operate.operation === "") {
    operate.firstNumber = operate.firstNumber.substring(
      0,
      operate.firstNumber.length - 1
    );
  }
  writeData();
}
function calculate() {
  nb1 = parseFloat(operate.firstNumber);
  nb2 = parseFloat(operate.secondNumber);
  switch (operate.operation) {
    case "*":
      operate.result = nb1 * nb2;
      break;
    case "/":
      if (nb2 === 0) {
        confirm("can't divide by 0");
      }
      operate.result = nb1 / nb2;
      break;
    case "+":
      operate.result = nb1 + nb2;
      break;
    case "-":
      operate.result = nb1 - nb2;
      break;
    default:
      break;
  }
  writeResult();
}
function digit(e) {
  switch (true) {
    case (operate.secondNumber.length > 2 &&
      !operate.secondNumber.includes(".")) ||
      (operate.firstNumber.length > 2 && !operate.firstNumber.includes(".")):
      confirm(
        "Please keep the numbers in 10's max for the clean layout, if this keeps prompting use backspace to remove 1 digit"
      );
      return;
    case (operate.secondNumber.length > 5 &&
      operate.secondNumber.includes(".")) ||
      (operate.firstNumber.length > 5 && operate.firstNumber.includes(".")):
      confirm(
        "Please keep the numbers in 10's max for the clean layout, if this keeps prompting use backspace to remove 1 digit"
      );
      return;
    case operate.operation === "":
      operate.firstNumber += e.target.textContent;
      break;
    case operate.operation !== "" && operate.operation !== NaN:
      operate.secondNumber += e.target.textContent;
    default:
      break;
  }
  writeData();
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
      break;
    default:
      alert("error in operation");
      break;
  }
  writeData();
}

function writeData() {
  n1.innerText = operate.firstNumber;
  n2.innerText = operate.secondNumber;
  op.innerText = operate.operation;
}
function writeResult() {
  if (operate.firstNumber.includes(".") || operate.secondNumber.includes(".")) {
    rs.innerText = operate.result.toFixed(3);
  } else {
    rs.innerText = operate.result;
  }
}
