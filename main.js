
assignment_containers = document.getElementsByClassName("assignment-container")

console.log(assignment_containers)

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
        window.location.href="kurse.html"
    }else{
        document.getElementById("wrong-login").style.display = "block"
    }
}