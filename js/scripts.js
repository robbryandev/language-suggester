// Business
// narrowed [nim, python]
function langType(opt) {
  const interpreted = ["Ruby", "JavaScript", "Python"];
  const compiled = ["C#", "Nim", "Rust", "Swift"];

  if (opt === "1") {
    return interpreted;
  } else {
    return compiled;
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


// Ui
addEventListener("load", function() {

})