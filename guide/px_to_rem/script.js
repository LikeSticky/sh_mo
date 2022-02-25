// Hide Output Container by Default
var outputContainer = document.getElementById('output');

// Grab REM Output
var remOutput = document.getElementById('rem-text');
// Grab PX Output
var pxOutput = document.getElementById('px-text');

// Grab input
var input = document.getElementById('px-input');
input.addEventListener("input", function(x) {
    // Show, Hide output
    var inputValue = x.target.value;
    if(inputValue==0 || inputValue==null || inputValue=="") {
        outputContainer.style.visibility = 'hidden';
    } else {
        outputContainer.style.visibility = 'visible';
    }
    // Calculate REM value
    var remValue = inputValue / 16;
    pxOutput.innerHTML = inputValue + " px";
    remOutput.innerHTML = remValue.toFixed(2) + " rem";
});