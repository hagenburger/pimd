var { Document } = require('pimd');

const mdInput = document.getElementById("markdownInput");
window.onload = function (){
    mdInput.innerHTML = `# Try out the PIMD project
    All of the source code is completely free and open, available on GitHub under MIT licence. We are porting from Ruby to Javascript (see our Collaboration section for more info on how to help).
    `;
};

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

