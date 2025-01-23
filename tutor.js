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

// if course is clicked it shows the assignments for that course
function showAssignmentsforCourse(event){
    var id = event.target.getAttribute("id")
    var course = document.getElementById(id)

    document.getElementById("backButton").style.display = "block"

    // gets course name
    course_name = course.textContent
    //console.log(course_name)

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
                var download_container = '<article id="download_assignment-' + assignment_id + '" style="display: none;"><button class="button-login" onclick="downloadAssignment(event)">Download Assignment</button></article>'
                var graded_container = '<article id="download_graded_assignment-' + assignment_id + '" style="display: none;"><button class="button-login" onclick="downloadGradedAssignment(event)">Download Graded Assignment</button></article>'
                var new_assignment = "<tr class='assignment_container' id='" + assignment_id + "' onclick='show_SubmissionContainer(" + assignment_id + ")'><td>" + a.name + "</td><td>" + a.dueDate + "</td><td>" + a.status + "</td></tr><tr><td colspan='4'>" + submission_container + download_container + graded_container + "</td></tr>"
                document.getElementById("ass_table").innerHTML += new_assignment 
                // add listeners with function that shows submissioncontainers on click
                //addListeners("assignment_container", show_SubmissionContainer)
            })
        }
    })

    console.log(course_assignments_count)
    if (course_assignments_count == 0) {
        document.getElementById("ass_table").innerHTML += "<tr class='assignment_container'><td colspan='4'>" + "Keine Einträge gefunden" + "</td></tr>"
    }

}

function show_SubmissionContainer(assignment_id){

    var submissionContainer = document.getElementById("submissionContainer-" + assignment_id)

    var download_container = document.getElementById("download_assignment-" + assignment_id)
    
    var graded_container = document.getElementById("download_graded_assignment-" + assignment_id)

    var surfer = document.getElementById("surfer")
    surfer.src = 'images/surfer_idle.gif'

    text_element = document.getElementById("submissionDropFieldText")
    text_element.textContent = "Hier bitte Korrektur einfügen"


    selected_assignment = assignment_id//event.target.parentNode.id
    console.log(selected_assignment)
    console.log("id" + selected_assignment)
    
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
        console.log("assignment wurde schon bearbeitet")
        submissionContainer.style.display = "none";
        download_container.style.display = "none";
        graded_container.style.display = "none"
    }
}

//returns 0 if unbearbeitet, 1 if bearbeitet and 2 if korrigiert
function checkForStatus(assId){
    console.log(assId)
    console.log(courses[selected_course].assignments)
    console.log(courses[selected_course].assignments[assId])
    var assignment = courses[selected_course].assignments[assId]
    if(assignment.status === "bearbeitet") {return 0;}
    if(assignment.status === "korrigiert") {return 1;}
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
