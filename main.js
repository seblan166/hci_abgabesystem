// variables
assignment_containers = document.getElementsByClassName("assignment-container")

console.log(assignment_containers)

courses = []

selected_course = -1
selected_assignment = -1

// adds listeners to all html elements of the same class
function addListeners(html_class, a_function){
    elements = document.getElementsByClassName(html_class)
    Array.from(elements).forEach(element => {
        console.log(element)
        element.addEventListener("click", a_function);
    });
}

function loadNotCompletedAssignments(){
    console.log("Hier")
    document.getElementById("submissionContainer").style.display = "none"
    // load every not yet completed assignment into the right container
    courses.forEach(c => {
        selected_course = courses.indexOf(c)
        c.assignments.forEach(a => {
            if(a.status === "unbearbeitet"){    
                // inserts assignment as row into html
                var assinment_id = selected_course + "-" + c.assignments.indexOf(a)
                var new_assignment = "<tr class = 'assignment_container' id= '"+ assinment_id +"'><td>" + c.name + "</td><td>" + a.name + "</td><td>" + a.dueDate + "</td><td>" + a.status + "</td></tr>"
                document.getElementById("ass_table").innerHTML += new_assignment 
            }
        })
    })

    // add assignment listeners for submissionbox

    addListeners("assignment_container", showSubmissionContainer)
}


//use this when using the Assignments.html
function showSubmissionContainer(event){
    var surfer = document.getElementById("surfer")
    surfer.src = 'images/surfer_idle.gif'

    text_element = document.getElementById("submissionDropFieldText")
    text_element.textContent = "Hier bitte Abgabe einfügen"


    id = event.target.parentNode.id
    getIndexesFromID(id)
    if(checkForStatus(selected_assignment) == 0){
        document.getElementById("submissionContainer").style.display = "block";
        document.getElementById("download_assignment").style.display = "none";
        document.getElementById("download_graded_assignment").style.display = "none"
        sc = document.getElementById("submissionContainer")

    }
    else if (checkForStatus(selected_assignment) == 1){
        document.getElementById("download_assignment").style.display = "block";
        document.getElementById("submissionContainer").style.display = "block";
        document.getElementById("download_graded_assignment").style.display = "none"
    }
    else if(checkForStatus(selected_assignment) == 2){
        document.getElementById("submissionContainer").style.display = "none";
        document.getElementById("download_assignment").style.display = "none";
        document.getElementById("download_graded_assignment").style.display = "block"
    }
    else{
        console.log("assignment wurde schon bearbeitet")
        document.getElementById("submissionContainer").style.display = "none";
        document.getElementById("download_assignment").style.display = "none";
        document.getElementById("download_graded_assignment").style.display = "none"
    }
}

function downloadAssignment(event){
    // content of file
    const content = "Hier wäre ihr hochgelades Assigment.";
    const filename = courses[selected_course].assignments[selected_assignment].assignmentFile["filename"];
    // blob as .txt file with content
    const blob = new Blob([content], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);

    // create link element
    const a = document.createElement('a');
    // set link to file url
    a.href = url;
    // the name that the dowloaded file will have
    a.download = filename
    
    document.body.appendChild(a);
    // click link
    a.click();
    document.body.removeChild(a);
    // garbage collection
    window.URL.revokeObjectURL(url);

    console.log("download stuff")
}

function downloadGradedAssignment(event){
    // content of file
    const content = "Hier wäre ihr korrigiertes Assigment.";
    const filename = courses[selected_course].name + "_" + courses[selected_course].assignments[selected_assignment].name;
    // blob as .txt file with content
    const blob = new Blob([content], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);

    // create link element
    const a = document.createElement('a');
    // set link to file url
    a.href = url;
    // the name that the dowloaded file will have
    a.download = filename
    
    document.body.appendChild(a);
    // click link
    a.click();
    document.body.removeChild(a);
    // garbage collection
    window.URL.revokeObjectURL(url);

    console.log("download graded stuff")
}

// if course is clicked it shows the assignments for that course
function showAssignmentsforCourse(event){
    var id = event.target.getAttribute("id")
    var course = document.getElementById(id)
    document.getElementById("backButton").style.display = "block"
    document.getElementById("submissionContainer").style.display = "none"

    // gets course name
    course_name = course.textContent
    //console.log(course_name)

    document.getElementById("course_not_selected").style.display = "none"
    document.getElementById("course_selected").style.display = "block"

    document.getElementById("selected_course").textContent = course_name

    //platzhalter = document.getElementById("blub")

    courses.forEach(c => {
        if (c.name === course_name){
            selected_course = courses.indexOf(c)
            c.assignments.forEach(a => {
                // inserts assignment as row into html
                var assinment_id = c.assignments.indexOf(a)
                var new_assignment = "<tr class = 'assignment_container' id= '"+ assinment_id +"'><td>" + a.name + "</td><td>" + a.dueDate + "</td><td>" + a.status + "</td></tr>"
                document.getElementById("ass_table").innerHTML += new_assignment 
            })
        }
    })

    // add listeners with function that shows sumussioncontainers on click
    addListeners("assignment_container", show_SubmissionContainer)

}

//use this when using the Kurse.html
function show_SubmissionContainer(event){
    var surfer = document.getElementById("surfer")
    surfer.src = 'images/surfer_idle.gif'

    text_element = document.getElementById("submissionDropFieldText")
    text_element.textContent = "Hier bitte Abgabe einfügen"


    selected_assignment = event.target.parentNode.id
    console.log("id" + selected_assignment)
    if(checkForStatus(selected_assignment) == 0){
        document.getElementById("submissionContainer").style.display = "block";
        document.getElementById("download_assignment").style.display = "none";
        document.getElementById("download_graded_assignment").style.display = "none"
        sc = document.getElementById("submissionContainer")

    }
    else if (checkForStatus(selected_assignment) == 1){
        document.getElementById("download_assignment").style.display = "block";
        document.getElementById("submissionContainer").style.display = "block";
        document.getElementById("download_graded_assignment").style.display = "none"
    }
    else if(checkForStatus(selected_assignment) == 2){
        document.getElementById("submissionContainer").style.display = "none";
        document.getElementById("download_assignment").style.display = "none";
        document.getElementById("download_graded_assignment").style.display = "block"
    }
    else{
        console.log("assignment wurde schon bearbeitet")
        document.getElementById("submissionContainer").style.display = "none";
        document.getElementById("download_assignment").style.display = "none";
        document.getElementById("download_graded_assignment").style.display = "none"
    }
}

function hide_SubmissionContainer(){
    document.getElementById("submissionContainer").style.display = "none"
    //document.getElementById("submissionContainer").innerHTML += "Works"
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

// use for assignments.html
function submit_Assignment(){
    text_element = document.getElementById("submissionDropFieldText")
    if(!(text_element.textContent === "Hier bitte Abgabe einfügen")){
            if(!(text_element.textContent === "Hier bitte Abgabe einfügen. Die Datei ist zu groß. (Maximal 2MB)")){
            // change status 
            courses[selected_course].assignments[selected_assignment].status = "bearbeitet"
            document.getElementById(selected_course + "-" + selected_assignment).children[3].innerHTML = "bearbeitet"
            storeData()
            
            //let surfer surf
            var surfer = document.getElementById("surfer")
            surfer.src = 'images/surfer_doku.gif'
            resetGif()
            
            //hide submissioncontainer when animation ends
            setTimeout(hide_SubmissionContainer, 4000)
        }
    }
}

// use for kurse.html
function submit(){
    text_element = document.getElementById("submissionDropFieldText")
    if(!(text_element.textContent === "Hier bitte Abgabe einfügen")){
        if(!(text_element.textContent === "Hier bitte Abgabe einfügen. Die Datei ist zu groß. (Maximal 2MB)")){
            // change status 
            courses[selected_course].assignments[selected_assignment].status = "bearbeitet"
            document.getElementById(selected_assignment).children[2].innerHTML = "bearbeitet"
            storeData()
            
            //let surfer surf
            var surfer = document.getElementById("surfer")
            surfer.src = 'images/surfer_doku.gif'
            resetGif()
            
            //hide submissioncontainer when animation ends
            setTimeout(hide_SubmissionContainer, 4000)
        }
    }
}






//helpers for submitting assignments
//returns 0 if unbearbeitet, 1 if bearbeitet and 2 if korrigiert
function checkForStatus(assId){
    var assignment = courses[selected_course].assignments[assId]
    if(assignment.status === "unbearbeitet") {return 0;}
    if(assignment.status === "bearbeitet") {return 1;}
    if(assignment.status === "korrigiert") {return 2;}
}

function getIndexesFromID(id){
    parts = id.split('-')
    selected_course = parts[0]
    selected_assignment = parts[1]
    
}

function resetGif() {
    const surfer = document.getElementById('surfer');
    surfer.src = "images/surfer_doku.gif" + "?t=" + new Date().getTime(); // Zeitstempel anhängen
  }

class Assignment{
    constructor(name, dueDate, status, courseName){
        this.name = name;
        this.dueDate = dueDate;
        this.status = status;
        this.courseName = courseName;
        this.assignmentFile = null;

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
    var ass3 = new Assignment("ass3", "gestern", "korrigiert", "GMCI")
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

function allowDrop(ev) {
    // prevent opening of dropped files in browser
    ev.preventDefault();
    ev.stopPropagation();
}


function fileSelection(input){
   var files = input.files
   updateFiles(files)
}

function dropFiles(ev) {
    // prevent opening of dropped files in browser
    ev.preventDefault();
    ev.stopPropagation();
    // get files from event
    var files = ev.dataTransfer.files;
    updateFiles(files)
    // too many files
}


function updateFiles(files){
if (files.length > 1) {
    alert("only one file allowed")
    console.log("only one file allowed")
    // TODO: show error message to user
    return;
}
// message that gets displayed
    var msg = "";
    // get and save file name
    var filename = files[0].name;
    // get and save file size
    var filesize = files[0].size; 
    if (filesize > 2097152){
        console.log(filesize)
        document.getElementById("submissionDropFieldText").innerText = "Hier bitte Abgabe einfügen. Die Datei ist zu groß. (Maximal 2MB)";
        return
    }
     // append to message
    msg = filename + ", size: " + filesize + "\n";

    // display file names and sizes
    console.log(msg);
    document.getElementById("submissionDropFieldText").innerText = msg;
    // set assigenment file of selected assignment to name and size of dropped file
    courses[selected_course].assignments[selected_assignment].assignmentFile = {"filename": filename, "filesize": filesize};
    storeData();
}