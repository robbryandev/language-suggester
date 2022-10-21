// Business
// narrowed [nim, python]
function langType() {
  const comped = parseInt(document.getElementById("lang-type").value);
  const compiled = ["C#", "Nim", "Rust", "Swift"];
  const interpreted = ["Ruby", "JavaScript", "Python"];

  if (Boolean(comped)) {
    return {"comped": true, "list": compiled};
  } else {
    return {"comped": false, "list": interpreted};
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

function isTabbed() {
  const tabInput = parseInt(document.getElementById("tabbed").value);
  return Boolean(tabInput);
}

// Ui
function hideOther() {
  let other = this.document.querySelectorAll(".other");
  for (let o = 0; o < other.length; o++) {
    other[o].classList.add("invisible");
  }
}

function show() {
  hideOther();
  let show;
  console.log(`Lang Type: ${langType().comped}`)
  if (langType().comped) {
    show = this.document.querySelectorAll(".comp");
  } else {
    show = this.document.querySelectorAll(".inter");
  }

  for (let s = 0; s < show.length; s++) {
    show[s].classList.remove("invisible");
  }
}

addEventListener("load", function() {
  const form = this.document.querySelector("form");
  this.setInterval(() => {
    if (isTabbed()) {
      hideOther();
      return;
    }
    show();
  }, 500)
})