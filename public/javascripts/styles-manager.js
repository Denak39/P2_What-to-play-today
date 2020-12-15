// Slider value
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML += slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}

//Sign In button redirecting to games page (Not working :D)
  //  document.getElementById("toGamesPage").onclick = function () {
    //    location.href = "http://localhost:3009/games";
    // };
