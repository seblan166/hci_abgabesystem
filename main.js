// variables
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
    document.getElementById("assignment")
   
    var id = event.target.getAttribute("id")
    console.log(id)
    
    console.log(courses[0])
    console.log(courses[0].assignments[id-1])
    var assignment = courses[0].assignments[id-1]
    console.log(assignment)
    var assignment_str = "courseName: " + assignment.courseName + " name: " + assignment.name + " dueDate: " + assignment.dueDate + " status: " + assignment.status
    var submission_container = "<div class='submission-container'>" + assignment_str + "<div>"
    event.target.innerHTML += submission_container

}

// logs in if data is correct, then loads creates dummy data and saves it
function login(){
    const correct_username = "user"
    const correct_password = "user"
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    console.log(username)
    if(username == correct_username && password == correct_password){
        createData()
        window.location.href="kurse.html"
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

// creates and stores dummy data if it#s not there yet
function createData() {
    // website was already visited, dont create data again
    if (sessionStorage.visited) {
        console.log("already visited")
        return
    }

    sessionStorage.setItem("visited", "true");
    
    //initialises assignments
    console.log("dummy data")
    var ass1 = new Assignment("ass1", "gestern", "unbearbeitet", "GMCI")
    var ass2 = new Assignment("ass2", "morgen", "bearbeitet", "GMCI")
    var ass3 = new Assignment("ass3", "gestern", "unbearbeitet", "GMCI")
    var ass4 = new Assignment("ass4", "gestern", "unbearbeitet", "GMCI")
    
    //initialises courses
    var gmci = new Course("GMCI", [ass1, ass2, ass3])
    var prog1 = new Course("prog1", [ass4])

    //adds courses to list
    courses.push(gmci)
    courses.push(prog1)

    storeData()
    console.log(sessionStorage.courses)
}

//stores data in sessionStorage
function storeData(){
    sessionStorage.setItem("courses", JSON.stringify(courses))
}

// loads data from sessionStorage into courses var
function loadData() {
    if (!sessionStorage.courses) {
        console.log("no courses found")
        return
    }

    courses = JSON.parse(sessionStorage.getItem("courses"))
    console.log(courses)
    var assignment_containers = document.getElementsByClassName("assignment-container")
    console.log(assignment_containers)
    console.log(assignment_containers.length)

    for (var i = 0; i < assignment_containers.length; i++) {
        console.log[i]
        console.log(courses[0])
        console.log(courses[0].assignments[i])
        var assignment = courses[0].assignments[i]
        console.log(assignment)
        var assignment_str = "courseName: " + assignment.courseName + " name: " + assignment.name + " dueDate: " + assignment.dueDate + " status: " + assignment.status
        var submission_container = "<div class='submission-container'>" + assignment_str + "<div>"
        assignment_containers[i].innerHTML += submission_container
    }
}
