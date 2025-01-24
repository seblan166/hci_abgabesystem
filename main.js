// variables
assignment_containers = document.getElementsByClassName("assignment-container")

courses = []

selected_course = -1
selected_assignment = -1

// adds listeners to all html elements of the same class
function addListeners(html_class, a_function){
    elements = document.getElementsByClassName(html_class)
    Array.from(elements).forEach(element => {
        element.addEventListener("click", a_function);
    });
}

function loadNotCompletedAssignments(){
    document.getElementById("submissionContainer").style.display = "none"
    // load every not yet completed assignment into the right container
    var course_assignments_count = 0; 
    courses.forEach(c => {
        selected_course = courses.indexOf(c)
        c.assignments.forEach(a => {
            if(a.status === "unbearbeitet"){    
                course_assignments_count++;
                // inserts assignment as row into html
                var assinment_id = selected_course + "-" + c.assignments.indexOf(a)
                var new_assignment = "<tr class = 'assignment_container' id= '"+ assinment_id +"'><td>" + c.name + "</td><td>" + a.name + "</td><td>" + a.dueDate + "</td><td>" + a.status + "</td></tr>"
                document.getElementById("ass_table").innerHTML += new_assignment 
            }
        })
    })

    if (course_assignments_count == 0) {
        document.getElementById("ass_table").innerHTML += "<tr class='assignment_container'><td colspan='4'>" + "Keine Einträge gefunden" + "</td></tr>"
    }

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
        alert("assignment wurde schon bearbeitet")
        document.getElementById("submissionContainer").style.display = "none";
        document.getElementById("download_assignment").style.display = "none";
        document.getElementById("download_graded_assignment").style.display = "none"
    }
}

function hide_all_SubmissionContainers(){
    console.log("here")
    var course = document.getElementById(selected_course)
    console.log(course)

    document.getElementById("backButton").style.display = "block"


    // gets course name
    course_name = courses[selected_course].name
    console.log(course_name)
    
    var course_assignments_count = 0; 
    courses.forEach(c => {
        if (c.name === course_name){
            course_assignments_count++;
            selected_course = courses.indexOf(c)
            c.assignments.forEach(a => {
                console.log("here2")

                // inserts assignment as row into html
                var assignment_id = c.assignments.indexOf(a)
                document.getElementById("submissionContainer-" + assignment_id).style.display = "none"                
                document.getElementById("download_assignment-" + assignment_id).style.display = "none"
                document.getElementById("download_graded_assignment-" + assignment_id).style.display = "none"
            })
        }
    })
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

    alert("download stuff")
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

    alert("download graded stuff")
}

// if course is clicked it shows the assignments for that course
function showAssignmentsforCourse(event){
    var id = event.target.getAttribute("id")
    var course = document.getElementById(id)

    document.getElementById("backButton").style.display = "block"

    // gets course name
    course_name = course.textContent

    document.getElementById("course_not_selected").style.display = "none"
    document.getElementById("course_selected").style.display = "block"

    document.getElementById("selected_course").textContent = course_name
    
    var course_assignments_count = 0; 
    courses.forEach(c => {
        if (c.name === course_name){
            course_assignments_count++;
            selected_course = courses.indexOf(c)
            c.assignments.forEach(a => {
                // inserts assignment as row into html
                var assignment_id = c.assignments.indexOf(a)
                var submission_container = '<aside class="submissionContainer" style="display:none" id="submissionContainer-' + assignment_id + '"><img class="surfer" id="surfer" src="images/surfer_idle.gif" alt=""><div class="container-login" ondrop="dropFiles(event)" ondragover="allowDrop(event)"><div id = "submissionDropFieldText">Hier bitte Abgabe einfügen</div><button class="button-login" onclick="submit()">Assignment abgeben</button></div></aside>'
                var download_container = '<article id="download_assignment-' + assignment_id + '" style="display: none;"><button class="button-login" onclick="downloadAssignment(event)">Download Assignment</button></article>'
                var graded_container = '<article id="download_graded_assignment-' + assignment_id + '" style="display: none;"><button class="button-login" onclick="downloadGradedAssignment(event)">Download Graded Assignment</button></article>'
                var new_assignment = "<tr class='assignment_container' id='" + assignment_id + "' onclick='show_SubmissionContainer(" + assignment_id + ")'><td>" + a.name + "</td><td>" + a.dueDate + "</td><td>" + a.status + "</td></tr><tr><td colspan='4'>" + submission_container + download_container + graded_container + "</td></tr>"
                document.getElementById("ass_table").innerHTML += new_assignment 
                // add listeners with function that shows submissioncontainers on click
                //addListeners("assignment_container", show_SubmissionContainer)
            })
        }
    })

    if (course_assignments_count == 0) {
        document.getElementById("ass_table").innerHTML += "<tr class='assignment_container'><td colspan='4'>" + "Keine Einträge gefunden" + "</td></tr>"
    }

}

//use this when using the Kurse.html
function show_SubmissionContainer(assignment_id){
    hide_all_SubmissionContainers()
    var submissionContainer = document.getElementById("submissionContainer-" + assignment_id)
    var download_container = document.getElementById("download_assignment-" + assignment_id)
    
    var graded_container = document.getElementById("download_graded_assignment-" + assignment_id)

    var surfer = document.getElementById("surfer")
    surfer.src = 'images/surfer_idle.gif'

    text_element = document.getElementById("submissionDropFieldText")
    text_element.textContent = "Hier bitte Abgabe einfügen"


    selected_assignment = assignment_id//event.target.parentNode.id

    if(checkForStatus(selected_assignment) == 0){
        submissionContainer.style.display = "block";
        download_container.style.display = "none";
        graded_container.style.display = "none"
        sc = document.getElementById("submissionContainer")

    }
    else if (checkForStatus(selected_assignment) == 1){
        download_container.style.display = "block";
        submissionContainer.style.display = "block";
        graded_container.style.display = "none"
    }
    else if(checkForStatus(selected_assignment) == 2){
        submissionContainer.style.display = "none";
        download_container.style.display = "none";
        graded_container.style.display = "block"
    }
    else{
        alert("assignment wurde schon bearbeitet")
        submissionContainer.style.display = "none";
        download_container.style.display = "none";
        graded_container.style.display = "none"
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
    if(username == correct_username && password == correct_password){
        createData()
        window.location.href="mainpage.html"
    }else if(username == "tutor" && password == "tutor") {
        createTutorData()
        window.location.href="tutor.html"
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
        return
    }

    sessionStorage.setItem("visited", "true");
    
    //initialises assignments
    //unclean day calculation? but it works
    var day = new Date().getDate();
    if(day < 10){
        day = "0" + day;
    }
    var month = new Date().getMonth() + 1;
    if(month < 10){
        month = "0" + month;
    }
    var year = new Date().getFullYear();
    var today = day + "." + month + "." + year;
    var yesterday;
    if (new Date().getDate() > 1 ){
        yesterday = (day-1) + "." + month + "." + year;
    }else{
        yesterday = (new Date.getDate()-1) + "." + month-1 + "." + year;//dont simulate decr of year
    }
    var newDay = "03.02.2025"
    var ass1 = new Assignment("ass1", today + " (heute)", "unbearbeitet", "GMCI")
    var ass2 = new Assignment("ass2", newDay, "bearbeitet", "GMCI")
    var ass3 = new Assignment("ass3", yesterday + " (gestern)", "korrigiert", "GMCI")
    var ass4 = new Assignment("ass4", yesterday + " (gestern)", "unbearbeitet", "Prog 1")
    
    //initialises courses
    var gmci = new Course("GMCI", [ass1, ass2, ass3])
    var prog1 = new Course("prog1", [ass4])

    //adds courses to list
    courses.push(gmci)
    courses.push(prog1)

    storeData()
}

// creates and stores dummy data if it#s not there yet
function createTutorData() {
    // website was already visited, dont create data again
    if (sessionStorage.visited) {
        alert("already visited")
        return
    }

    sessionStorage.setItem("visited", "true");
    
    //initialises assignments
    //unclean day calculation? but it works
    var day = new Date().getDate();
    if(day < 10){
        day = "0" + day;
    }
    var month = new Date().getMonth() + 1;
    if(month < 10){
        month = "0" + month;
    }
    var year = new Date().getFullYear();
    var today = day + "." + month + "." + year;
    var yesterday;
    if (new Date().getDate() > 1 ){
        yesterday = (day-1) + "." + month + "." + year;
    }else{
        yesterday = (new Date.getDate()-1) + "." + month-1 + "." + year;//dont simulate decr of year
    }
    var newDay = "03.02.2025"
    var ass1 = new Assignment("Assignment 1 - Max Mustermann", today + " (heute)", "bearbeitet", "GMCI")
    var ass2 = new Assignment("Assignment 1 - Anna Müller", newDay, "bearbeitet", "GMCI")
    var ass3 = new Assignment("Assignment 2 - Ben Bauer", yesterday + " (gestern)", "korrigiert", "GMCI")
    var ass4 = new Assignment("Assignment 4 - Toni Meier", yesterday + " (gestern)", "bearbeitet", "Prog 1")
    
    //initialises courses
    var gmci = new Course("GMCI", [ass1, ass2, ass3])
    var prog1 = new Course("Prog 1", [ass4])

    //adds courses to list
    courses.push(gmci)
    courses.push(prog1)

    storeData()
}

//stores data in sessionStorage
function storeData(){
    sessionStorage.setItem("courses", JSON.stringify(courses))
}

// loads data from sessionStorage into courses var
function loadData() {
    if (!sessionStorage.courses) {
        alert("no courses found")
        return
    }

    courses = JSON.parse(sessionStorage.getItem("courses"))
    var assignment_containers = document.getElementsByClassName("assignment-container")


    for (var i = 0; i < assignment_containers.length; i++) {
        var assignment = courses[0].assignments[i]
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
    return;
}
// message that gets displayed
    var msg = "";
    // get and save file name
    var filename = files[0].name;
    // get and save file size
    var filesize = files[0].size; 
    if (filesize > 2097152){
        document.getElementById("submissionDropFieldText").innerText = "Hier bitte Abgabe einfügen. Die Datei ist zu groß. (Maximal 2MB)";
        return
    }
     // append to message
    msg = filename + ", size: " + filesize + "\n";

    // display file names and sizes
    document.getElementById("submissionDropFieldText").innerText = msg;
    // set assigenment file of selected assignment to name and size of dropped file
    courses[selected_course].assignments[selected_assignment].assignmentFile = {"filename": filename, "filesize": filesize};
    storeData();
}