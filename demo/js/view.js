const View = {
    init: function() {
        
  //  const parsedContent = document.getElementById('container');

    this.inputForm.addEventListener('submit',  (e) => {
        e.preventDefault();
        let contentToParse = document.getElementById('myInput').value;
        console.log(contentToParse)
    },
    true
    );
    this.render();


    },

    render: function() {
        pimd.main();
    }
}