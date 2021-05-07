class Program {
    constructor(programName, designedBy, image) {
        this.programId = Math.floor(Math.random() * 100000);
        this.programName = programName;
        this.designedBy = designedBy;
        this.image = image;
    }
}

class UI {
    constructor() {
    }
    addProgramToList(program) {
        const list = document.getElementById('program-list');
        var html = `
        <tr>
            <td><img src="img/${program.image}" style="width: 50px;"/></td>
            <td>${program.programName}</td>
            <td>${program.designedBy}</td>
            <td><a href="#" data-id="${program.programId}" class="btn btn-danger btn-sm delete">Delete</a></td>
        </tr>
    `;
        list.innerHTML += html;
    }

    clearControls() {
        document.getElementById('program').value = "";
        document.getElementById('designedBy').value = "";
        //document.getElementById('image').value = "";
        document.getElementById('ddPrograms').value = "0";
    }

    deleteProgram(element) {
        element.parentElement.parentElement.remove();
    }

    showAlert(message, className) {
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
}

class Storage {
    static getPrograms() {
        let programs;

        if (localStorage.getItem('programs') === null) {
            programs = [];
        } else {
            programs = JSON.parse(localStorage.getItem('programs'));
        }
        return programs;
    }

    static displayPrograms() {
        const programs = Storage.getPrograms();

        programs.forEach(program => {
            const ui = new UI();
            ui.addProgramToList(program);
        });
    }

    static addProgram(program) {
        const programs = Storage.getPrograms();
        programs.push(program);
        localStorage.setItem('programs', JSON.stringify(programs));
    }

    static deleteProgram(element) {
        const id = element.getAttribute('data-id');
        const programs =Storage.getPrograms();

        programs.forEach((program,index)=>{
           if(program.programId==id){
               console.log(program,index);
               programs.splice(index,1);
           } 
        });

        localStorage.setItem('programs', JSON.stringify(programs));
    }

}

document.addEventListener('DOMContentLoaded', Storage.displayPrograms);

/*IIFE - Immediately invoked function expression*/
// first load
/*
(function () {
    let programs = [
        new Program("Javascript", "Engin Yılmaz", "javascript.png")
        ,
        new Program("Python", "Güneş Yılmaz", "python.png")
        ,
        new Program("React", "Nehir Yılmaz", "react.png")
    ];
    const ui = new UI();
    programs.forEach(program =>{
        ui.addProgramToList(program)
        Storage.addProgram(program);
    });
}())
*/

document.getElementById('new-program').addEventListener('submit',
    function (e) {

        const programName = document.getElementById('program').value;
        const designedBy = document.getElementById('designedBy').value;
        //const image = document.getElementById('image').value;
        const ddProgramImages = document.getElementById("ddPrograms");
        const ddProgramImage = ddProgramImages.options[ddProgramImages.selectedIndex].value;

        // create program object
        const program = new Program(programName, designedBy, ddProgramImage);

        // Create UI
        const ui = new UI();

        if (programName === '' || designedBy === '' || ddProgramImage === '0') {
            ui.showAlert('Please complete the form.', 'warning');
        } else {
            // add program to list
            ui.addProgramToList(program);

            // save to local storage
            Storage.addProgram(program);

            // clear
            ui.clearControls();

            ui.showAlert('The program has been added.', 'success');
        }
        e.preventDefault();
    });

document.getElementById('program-list').addEventListener('click', function (e) {
    if (e.target.classList.contains('delete')) {
        const ui = new UI();
        // delete program
        ui.deleteProgram(e.target);

        //delete from local storage
        Storage.deleteProgram(e.target);

        ui.showAlert('The program has been deleted.', 'danger');
    }
});