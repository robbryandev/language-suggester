// Business
// narrowed [nim, python]
function langType() {
  const comped = parseInt(document.getElementById("lang-type").value);
  const compiled = ["C#", "Nim", "Rust", "Swift"];
  const interpreted = ["Ruby", "JavaScript", "Python"];

  if (comped === 1) {
    return { "comped": true, "list": compiled };
  } else {
    return { "comped": false, "list": interpreted };
  }
}

function tabbed(list) {
  const tabbedLangs = ["Nim", "Python"];
  if (tabbedLangs[0] in list) {
    return tabbedLangs[0];
  } else {
    return tabbedLangs[1];
  }
}

function checkTabbed() {
  const tabInput = parseInt(document.getElementById("tabbed").value);
  return Boolean(tabInput);
}

// Ui
function hideOther(comp) {
  const showSpot = document.querySelector(".other-spot");
  if (showSpot.querySelector("#comp-box") !== null) {
    showSpot.removeChild(showSpot.querySelector("#comp-box"));
  }
  if (showSpot.querySelector("#inter-box") !== null) {
    showSpot.removeChild(showSpot.querySelector("#inter-box"));
  }
}

function hideAllOther() {
  const showSpot = document.querySelector(".other-spot");
  if (showSpot.querySelector("#comp-box") !== null) {
    showSpot.removeChild(showSpot.querySelector("#comp-box"));
  }
  if (showSpot.querySelector("#inter-box") !== null) {
    showSpot.removeChild(showSpot.querySelector("#inter-box"));
  }
}

function show(comp) {
  const hideSpot = document.querySelector(".hide-spot");
  const showSpot = document.querySelector(".other-spot");
  let elements;
  hideOther(comp);
  if (comp) {
    elements = hideSpot.querySelector("#comp-box");
  } else {
    elements = hideSpot.querySelector("#inter-box");
  }
  showSpot.appendChild(elements.cloneNode(true));
}

function logStates(comp, tab) {
  console.log(comp);
  console.log(tab);
}

addEventListener("load", function () {
  const form = this.document.querySelector("form");
  let compedState;
  let tabbedState;
  logStates(compedState, tabbedState);
  this.setInterval(() => {
    const isComped = langType().comped;
    const isTabbed = checkTabbed();
    logStates(compedState, tabbedState);
    if (isComped !== compedState || isTabbed !== tabbedState) {
      compedState = isComped;
      tabbedState = checkTabbed();
      if (tabbedState === false) {
        show(isComped);
      } else {
        hideAllOther(isComped);
        return;
      }
    }
  }, 500)
})