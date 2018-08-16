const View = {
    init: function() {
        
    const inputBox = document.getElementById('textBox');
    const inputForm = document.getElementById('inputForm');
    const parsedContent = document.getElementById('container');

    this.inputForm.addEventListener('submit',  (e) => {
        e.preventDefault();
        controller.searchByUsername(this.inputBox.value); // ?
        this.parsedContent.innerHTML = ''; // ? 
    },
    true
    );
    this.render();


    }
}




const inputBoxContent = document.getElementById('textBox').value;


