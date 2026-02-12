let counter;
let carTypeInput;
let carMPGInput;
let carColorInput;

window.onload = () => {
  counter = document.getElementById("counter");
  carTypeInput = document.getElementById("carType");
  carMPGInput = document.getElementById("carMPG");
  carColorInput = document.getElementById("carColor");
};

function getCounterVal() {
  return Number(document.getElementById("counter").textContent);
}

function tickUp() {
  counter.textContent = getCounterVal() + 1;
}

function tickDown() {
  counter.textContent = getCounterVal() - 1;
}

function runForLoop() {
  let resSpan = document.getElementById("forLoopResult");
  resSpan.textContent = 0;
  for (let i = 0; i <= getCounterVal(); i++) {
    resSpan.textContent = i;
  }
}

function showOddNumbers() {
  let resSpan = document.getElementById("oddNumberResult");
  resSpan.textContent = "";
  for (let i = 0; i < getCounterVal(); i++) {
    if (i % 2 == 1) {
      resSpan.textContent += " " + i;
    }
  }
}

function addMultiplesToArray() {
  let res = [];
  for (i = 5; i <= getCounterVal(); i += 5) {
    res.push(i);
  }
  res.reverse();
  console.log(res);
}

function printCarObject() {
  let car = {
    cType: carTypeInput.value,
    cMPG: carMPGInput.value,
    cColor: carColorInput.value,
  };

  console.log(car);
}

function loadCar(c) {
  let car;
  switch (c) {
    case 1:
      car = carObject1;
      break;
    case 2:
      car = carObject2;
      break;
    case 3:
      car = carObject3;
      break;
    default:
      throw Error;
  }
  carTypeInput.value = car.cType;
  carMPGInput.value = car.cMPG;
  carColorInput.value = car.cColor;
}

function changeColor(c) {
  let p = document.getElementById("styleParagraph")
  switch (c) {
    case 1:
      p.style.color = "red";
      break;
    case 2:
      p.style.color = "green";
      break;
    case 3:
      p.style.color = "blue";
      break;
    default:
      throw Error;
  }
}
