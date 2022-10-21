// Business
// narrowed [nim, python, Javascript, R, Ruby]
function langType() {
  const comped = parseInt(document.getElementById("lang-type").value);
  const compiled = ["C#", "Nim", "Rust", "Swift"];
  const interpreted = ["Ruby", "JavaScript", "Python", "R"];

  if (comped === 1) {
    return { "comped": true, "list": compiled };
  } else {
    return { "comped": false, "list": interpreted };
  }
}

function tabbed(list) {
  const tabbedLangs = ["Nim", "Python"];
  if (list.includes(tabbedLangs[0])) {
    return tabbedLangs[0];
  } else {
    return tabbedLangs[1];
  }
}

function checkTabbed() {
  const tabInput = parseInt(document.querySelector("#tabbed").value);
  return Boolean(tabInput);
}

function yesReturn(id, entry, noList) {
  const idInput = parseInt(document.querySelector(`#${id}`).value);
  const idBool = Boolean(idInput);
  
  if (idBool) {
    return entry;
  } else {
    return noList;
  }
}

// final check
function getLanguage(event) {
  event.preventDefault();
  let suggested;
  let checkQuestion;
  const langs = langType();
  if (checkTabbed()) {
    suggested = tabbed(langs.list);
  } else {
    if (langs.comped) {

    } else {
      checkQuestion = yesReturn("work-data", "R", ["Ruby", "Javascript"]);
      if (checkQuestion === "R") {
        suggested = "R"
      }
      checkQuestion = yesReturn("local-script", "Javascript", ["Ruby", "R"]);
      if (checkQuestion === "Javascript") {
        suggested = "Javascript";
      } else {
        checkQuestion = yesReturn("back-end", "Ruby", ["Javascript", "R"]);
        if (checkQuestion === "Ruby") {
          suggested = "Ruby";
        }
      }
    }
  }
  console.log(suggested);
  return suggested;
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

let compedState = false;
let tabbedState = false;

function inputStates(cState, tState) {
  this.setInterval(() => {
    const isComped = langType().comped;
    const isTabbed = checkTabbed();
    if (isComped !== cState || isTabbed !== tState) {
      cState = isComped;
      tState = checkTabbed();
      if (tState === false) {
        show(isComped);
      } else {
        hideAllOther(isComped);
      }
    }
    compedState = cState;
    tabbedState = tabbedState
  }, 500)
}


// load
addEventListener("load", function () {
  const form = this.document.querySelector("form");
  inputStates(compedState, tabbedState);
  form.addEventListener("submit", function(ev) {
    getLanguage(ev);
  });
})