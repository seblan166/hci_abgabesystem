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
                var submission_container = '<aside class="submissionContainer" style="display:none" id="submissionContainer-' + assignment_id + '"><img class="surfer" id="surfer" src="images/surfer_idle.gif" alt=""><div class="container-login" ondrop="dropFiles(event)" ondragover="allowDrop(event)"><div id = "submissionDropFieldText">Hier bitte Korrektur einfügen</div><button class="button-login" onclick="submit()">Assignment abgeben</button></div></aside>'
                var download_container = '<article id="download_assignment-' + assignment_id + '" style="display: none;"><button class="button-login" onclick="downloadAssignment(event)">Abgabe herunterladen</button></article>'
                var graded_container = '<article id="download_graded_assignment-' + assignment_id + '" style="display: none;"><button class="button-login" onclick="downloadGradedAssignment(event)">Korrektur herunterladen</button></article>'
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

function show_SubmissionContainer(assignment_id){
    hide_all_SubmissionContainers()
    var submissionContainer = document.getElementById("submissionContainer-" + assignment_id)

    var download_container = document.getElementById("download_assignment-" + assignment_id)
    
    var graded_container = document.getElementById("download_graded_assignment-" + assignment_id)

    var surfer = document.getElementById("surfer")
    surfer.src = 'images/surfer_idle.gif'

    text_element = document.getElementById("submissionDropFieldText")
    text_element.textContent = "Hier bitte Korrektur einfügen"


    selected_assignment = assignment_id//event.target.parentNode.id
    
    if (checkForStatus(selected_assignment) == 0){
        download_container.style.display = "block";
        submissionContainer.style.display = "block";
        graded_container.style.display = "none"
    }
    else if(checkForStatus(selected_assignment) == 1){
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

//returns 0 if unbearbeitet, 1 if bearbeitet and 2 if korrigiert
function checkForStatus(assId){
    var assignment = courses[selected_course].assignments[assId]
    if(assignment.status === "bearbeitet") {return 0;}
    if(assignment.status === "korrigiert") {return 1;}
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
            document.getElementById("submissionDropFieldText").innerText = "Hier bitte Korrektur einfügen. Die Datei ist zu groß. (Maximal 2MB)";
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

    // use for kurse.html
function submit(){
    text_element = document.getElementById("submissionDropFieldText")
    if(!(text_element.textContent === "Hier bitte Korrektur einfügen")){
        if(!(text_element.textContent === "Hier bitte Korrektur einfügen. Die Datei ist zu groß. (Maximal 2MB)")){
            // change status 
            courses[selected_course].assignments[selected_assignment].status = "korrigiert"
            document.getElementById(selected_assignment).children[2].innerHTML = "korrigiert"
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

function hide_SubmissionContainer(){
    document.getElementById("submissionContainer").style.display = "none"
}

function storeData(){
    sessionStorage.setItem("courses", JSON.stringify(courses))
}

function resetGif() {
    const surfer = document.getElementById('surfer');
    surfer.src = "images/surfer_doku.gif" + "?t=" + new Date().getTime(); // Zeitstempel anhängen
}