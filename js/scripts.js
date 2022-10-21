// Business

// Gets an object with a bool of if the languages are compiled and a list of language options
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

// Logic check for if the user wants a language with tab based syntax
function tabbed(list) {
  const tabbedLangs = ["Nim", "Python"];
  if (list.includes(tabbedLangs[0])) {
    return tabbedLangs[0];
  } else {
    return tabbedLangs[1];
  }
}

// Checks if the current wants a tabbed language
function checkTabbed() {
  const tabInput = parseInt(document.querySelector("#tabbed").value);
  return Boolean(tabInput);
}

// Utility function for checking the bool value of a dropdown and returning the wanted result
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
    // Compiled language branching
    if (langs.comped) {
      checkQuestion = yesReturn("first-lang", "C#", ["Swift", "Rust"]);
      if (checkQuestion === "C#") {
        suggested = "C#";
      }
      checkQuestion = yesReturn("meta-q", "Rust", ["C#", "Swift"]);
      if (checkQuestion === "Rust") {
        suggested = "Rust";
      }
      checkQuestion = yesReturn("ios", "Swift", ["C#", "Rust"]);
      if (checkQuestion === "Swift") {
        suggested = "Swift";
      }
      // Interpreted Language branching
    } else {
      checkQuestion = yesReturn("work-data", "R", ["Ruby", "Javascript"]);
      if (checkQuestion === "R") {
        suggested = "R";
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
  return suggested;
}

// Ui

// Hides extra questions
function hideOther(comp) {
  const showSpot = document.querySelector(".other-spot");
  if (showSpot.querySelector("#comp-box") !== null) {
    showSpot.removeChild(showSpot.querySelector("#comp-box"));
  }
  if (showSpot.querySelector("#inter-box") !== null) {
    showSpot.removeChild(showSpot.querySelector("#inter-box"));
  }
}

// Shows extra questions
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

// Save global state of compiled and tabbed drop downs for change caching
let compedState = false;
let tabbedState = false;

// Controls when extra questions are displayed
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
        hideOther(isComped);
      }
    }
    compedState = cState;
    tabbedState = tabbedState;
  }, 500);
}


// Runs on window load
addEventListener("load", function () {
  const form = this.document.querySelector("form");
  const result = document.querySelector(".result");
  inputStates(compedState, tabbedState);
  // Runs on form submit
  form.addEventListener("submit", function(ev) {
    const pickedLang = getLanguage(ev);
    const name = document.querySelector("#u-name").value;
    result.classList.remove("invisible");
    document.querySelector("#placeholder").innerText = pickedLang;
    document.querySelector("#result-prompt").innerText = `Hey ${name}, you should REALLY learn ${pickedLang}. It sounds like you would really like it.`
  });
  // Runs on form reset
  form.addEventListener("reset", function() {
    result.classList.add("invisible");
  });
})