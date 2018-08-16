var { Document } = require('pimd');

    var contentString = document.getElementById("myInput").value;

    function main(){
    const pimd = new Document(contentString);
    const renderedString = pimd.render();
    console.log('Rendered string', renderedString);
    document.getElementById('inputParsed').innerHTML += renderedString;
    }
    main();
