// Program constructer
function Program (programName,designedBy,image){
    this.programName=programName;
    this.designedBy=designedBy;
    this.image=image;
}

// UI constructer
function UI(){
}

UI.prototype.addProgramToList = function (program) {
    const list = document.getElementById('program-list');

    var html = `
        <tr>
            <td><img src="img/${program.image}" style="width: 50px;"/></td>
            <td>${program.programName}</td>
            <td>${program.designedBy}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
        </tr>
    `;
    list.innerHTML += html;
}

UI.prototype.clearControls = function (){
    document.getElementById('program').value="";
    document.getElementById('designedBy').value="";
    document.getElementById('image').value="";
}

/*IIFE - Immediately invoked function expression*/
// first load
(function() {
    let programs = [
        {
            "image":"javascript.png",
            "programName":"Javascript",
            "designedBy":"Engin Yılmaz"
        },
        {
            "image":"python.png",
            "programName":"Python",
            "designedBy":"Güneş Yılmaz"
        },
        {
            "image":"react.png",
            "programName":"React",
            "designedBy":"Nehir Yılmaz"
        }
    ]
    const ui = new UI();
    programs.forEach(program =>ui.addProgramToList(program));
}())

UI.prototype.deleteProgram = function(element){
    if(element.classList.contains('delete')){
        element.parentElement.parentElement.remove();
    }
}

UI.prototype.showAlert = function(message,className){
    var alert = `
    <div class="alert alert-${className}">
        ${message}
    </div>
    `;

    const row = document.querySelector('.row');
    row.insertAdjacentHTML("beforebegin", alert);

    setTimeout(() => {
        const element = document.querySelector(`.alert.alert-${className}`).remove();
    }, 3000);
}

document.getElementById('new-program').addEventListener('submit', 
function(e){

    const programName = document.getElementById('program').value;
    const designedBy =document.getElementById('designedBy').value;
    const image =document.getElementById('image').value;

    // create program object
    const program = new Program(programName,designedBy,image);

    // Create UI
    const ui = new UI();

    if(programName==='' || designedBy ==='' || image==='')
    {
        ui.showAlert('Please complete the form.','warning');
    }else{
        // add program to list
        ui.addProgramToList(program);

        // clear
        ui.clearControls();

        ui.showAlert('The program has been added.','success');
    }
    e.preventDefault();
});

document.getElementById('program-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteProgram(e.target);
    ui.showAlert('The program has been deleted.','danger');
});