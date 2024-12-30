
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
