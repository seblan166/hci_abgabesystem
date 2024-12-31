
assignment_containers = document.getElementsByClassName("assignment-container")

console.log(assignment_containers)

var courses = []

function addListeners() {
    Array.from(assignment_containers).forEach(element => {
        console.log(element)
        element.addEventListener("click", showSubmissionContainer);
    });
}

// inserts a submission container into the clicked assignment container 
function showSubmissionContainer(event) {
    event.target.innerHTML += "<div class='submission-container'>Hello World<div>"
}

function login(){
    const correct_username = "user"
    const correct_password = "user"
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    console.log(username)
    if(username == correct_username && password == correct_password){
        //window.location.href="kurse.html"
        dummyData()
    }else{
        document.getElementById("wrong_login").style.display = "block"
    }
}

class Assignment{
    constructor(name, dueDate, status, courseName){
        this.name = name;
        this.dueDate = dueDate;
        this.status = status;
        this.courseName = courseName;

    }
}

class Course{
    constructor(name, assignments){
        this.name = name;
        this.assignments = assignments;
    }


}


function dummyData(){
    //hier wird ganz viel data initialisiert
    var ass1 = new Assignment("ass1", "gestern", "unbearbeitet", "GMCI")
    var ass2 = new Assignment("ass2", "morgen", "bearbeitet", "GMCI")
    var ass3 = new Assignment("ass3", "gestern", "unbearbeitet", "GMCI")
    var ass4 = new Assignment("ass4", "gestern", "unbearbeitet", "GMCI")
    
    var gmci = new Course("GMCI", [ass1, ass2, ass3])
    var prog1 = new Course("prog1", [ass4])

    console.log(gmci)
}
