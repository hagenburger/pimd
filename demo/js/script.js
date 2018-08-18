var { Document } = require('pimd');

const userInput = document.getElementById("myInput");
userInput.addEventListener('input',  function(e) {
    e.preventDefault();
    const contentString = document.getElementById("myInput").value;  
    convertWithPimd(contentString);
}
);

function convertWithPimd(contentString) {
    const pimd = new Document(contentString);
    const renderedString = pimd.render();
    let placer = document.getElementById("inputParsed");
    placer.innerHTML = renderedString;
};