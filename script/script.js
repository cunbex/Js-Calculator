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
  if (
    operate.operation === "" ||
    operate.firstNumber === "" ||
    operate.secondNumber === ""
  ) {
    confirm("please provide a full operation");
    return;
  }
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
      operate.firstNumber !== "" &&
      operate.secondNumber === "":
      operate.operation = e.target.textContent;
      break;
    case e.target.className === "operator" &&
      operate.firstNumber !== "" &&
      operate.secondNumber !== "":
      calculate();
      operate.operation = e.target.textContent;
      break;
    default:
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
  let result = operate.result;
  if (operate.firstNumber.includes(".") || operate.secondNumber.includes(".")) {
    result = parseFloat(operate.result).toFixed(3);
    rs.innerText = result;
  } else {
    rs.innerText = result;
  }
  clear();
  n1.innerText = result;
  operate.firstNumber += result;
}
