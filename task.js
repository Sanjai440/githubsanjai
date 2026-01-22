let createButton = document.getElementById("btn1")




let formValidation = document.getElementById("form-validate")




formValidation.addEventListener('submit', getIntput);

let userName, taskName, userEmail, dueDate, taskDescription, prioritySelect, radio




// let taskProgress=document.getElementById("task-progress")
// let percentage=document.getElementById("percentage")



// taskProgress.addEventListener('input',function(){
    //     percentage.innerText=`${taskProgress.value}%`
    
    // })
    
    let span
    
    
    let errorName, errorTask, errorEmail, errorpriority, errorDescription, errorstatus
    
    // let name = /^[a-z,A-Z]+[a-z,A-Z]$/
let values = false

function getIntput(event) {
    event.preventDefault()

    userName = document.getElementById("username").value

    // let sum=document.getElementById("headname")

    // sum.innerText=userName

    taskName = document.getElementById("taskname")


    userEmail = document.getElementById("email")

    dueDate = document.getElementById("dueDate")

    // console.log(dueDate);

    taskDescription = document.getElementById("description").value


    prioritySelect = document.getElementById("priority");

    radio = document.querySelector(`input[name="status"]:checked`)?.value || "";



    span=document.querySelector(".span")
    input = document.getElementsByTagName("input")


    errorName = document.getElementById("errorusername")

    errorTask = document.getElementById("errortaskname")
    errorEmail = document.getElementById("erroremail")
    errorDate = document.getElementById("errordueDate")

    errorpriority = document.getElementById("errorpriority")


    errorDescription = document.getElementById("errordescription")

    errorstatus = document.getElementById("errorstatus")


    // localStorage.setItem("taskNames",taskName)

    // let value1={
    //     taskName:taskName,
    //     // userEmail:userEmail
    //     taskDescription:taskDescription,

    // }
    // localStorage.setItem("data",JSON.stringify(value1))


    // submits()


    // let isvalid=setvalue()

    // if(isvalid){
    //     createDiv()
    //     getEditvalue()
    // }



    let isvalid = setvalue();
    if (isvalid) {
        // setlocalstorage();
        setLocalStorage();
        // setlocalstorage()
        createDiv();

    }



}


// let reset=document.getElementById("btn2")

// reset.addEventListener("click",function(){
    
//     console.log("hii");
    
//     if(formValidation==""){

//         // formValidation.remove()
//         // input.style.border="none"
//         // span.innerText=""
//         errorName.innerText=""
        
//     }
// })




let taskProgress = document.getElementById("task-progress")
let percentage = document.getElementById("percentage")

taskProgress.addEventListener('input', function () {
    percentage.innerText = `${taskProgress.value}%`
    // isvalid=false
})



function setvalue() {


    let child = document.querySelectorAll(".child")

    let isvalid = true
 
 let name = /^[a-z,A-Z]+ [a-z,A-Z]$/
    if (userName == "") {
        errorName.innerText = "Enter your Name"

        isvalid = false
    }

    // else if(!name.test(userName)){
    //     errorName.innerText="enter your full name"

    // }
    // else {
    //     errorName.innerText=""
        
    // }



    if (taskName.value == "") {
        errorTask.innerText = "Enter your Task Name *"
        taskName.style.border = " 2px solid red "


        isvalid = false

    }

    if (userEmail.value == "") {
        errorEmail.innerText = "Enter your Email *"
        userEmail.style.border = "2px solid red"

        isvalid = false

    }

    if (dueDate.value == "") {
        errorDate.innerText = "Enter the Date *"
        dueDate.style.border = "2px solid red"

        isvalid = false
    }

    if (taskDescription == "") {
        errorDescription.innerText = "Write the description *"
        isvalid = false
    }



    if (prioritySelect.value == "") {
        errorpriority.innerText = "Select the Priority *"
        prioritySelect.style.border = "2px solid red"
        isvalid = false
    }


    if (radio == "") {
        errorstatus.innerText = "select the status"
        isvalid = false
    }
    let scrollEle = [
        { name: taskName, error: errorTask },
        { name: userEmail, error: errorEmail },
        { name: dueDate, error: errorDate },
        { name: prioritySelect, error: errorpriority }]


    for (let element of scrollEle) {
        if (element.name.value == "") {
            element.name.scrollIntoView({
                behavior: "smooth",
                block: "center"
            })
            element.name.focus()
            break;



        }
    }













    let newArr = ["username", "taskname", "email", "dueDate", "priority", "description"]

    newArr.forEach((id) => {

        let newVal = document.getElementById(id)
        // let newval=index
        if (newVal) {

            newVal.addEventListener("input", () => {

                let errorEle = document.getElementById("error" + id)
                let names = document.getElementById(id)
                // if(name==userName){
                // errorEle.innerText="enter your full name"
                // }
                // if(!name.test(index[0])){
                //             errorName.innerText="enter your full name"


                // }
                if (errorEle || names) {
                    // errorEle.innerText=""
                    errorEle.innerText = ""
                    names.style.border = "2px solid rgb(218, 213, 213)"




                }
                
            })
        }

    })

    return isvalid

    // if(!values){
    // // values=true
    // createDiv()
}






const filtertask = document.querySelectorAll(".taskfilter");


filtertask.forEach(link => { // high
    link.addEventListener("click", function (event) {
        event.preventDefault()

        let value = link.dataset.filter
        const taskcontent = document.querySelectorAll(".child-container");
        taskcontent.forEach(cards => {
            let cardsvalue = cards.dataset.priority //medium
            if (value == "all" || cardsvalue == value) { //high == medium
                cards.style.display = "block"
            }
            else {
                cards.style.display = "none"
            }
        })

        filtertask.forEach(element => {

            element.classList.remove("active")
        })
        link.classList.add("active")
    })

})
























// Save the task to LocalStorage
function setLocalStorage() {
    // Get existing tasks or empty array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Create a new task object
    let task = {
        userName: userName,
        taskName: taskName.value,
        email: userEmail.value,
        dueDate: dueDate.value,
        description: taskDescription,
        priority: prioritySelect.value,
        status: radio,
        progress: taskProgress ? taskProgress.value : "0"
    };

    // Add the new task
    tasks.push(task);

    // Save back to LocalStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from LocalStorage on page load
window.addEventListener("DOMContentLoaded", () => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        // Assign values temporarily
        userName = task.userName;
        taskName = { value: task.taskName };
        userEmail = { value: task.email };
        dueDate = { value: task.dueDate };
        taskDescription = task.description;
        prioritySelect = { value: task.priority };
        radio = task.status;

        // Create the task card
        createDiv();
    });
});












































function createDiv() {




    let parentElement = document.querySelector(".parent-container")

    newDiv = document.createElement('div')

    newDiv.classList.add('child-container')

    // newDiv.setAttribute("data-priority",prioritySelect)
    let selectedValue = prioritySelect.value;
    newDiv.dataset.priority = selectedValue




    let priorityClass = ""

    let FieldClass = ""

    if (selectedValue == "low") {
        priorityClass = "low"

        FieldClass = "low-field"

    }
    else if (selectedValue == "medium") {
        priorityClass = "medium"
        FieldClass = "medium-field"
    }
    else if (selectedValue == "high") {
        priorityClass = "high"
        FieldClass = "high-field"
    }







    let setVal = radio

    let firstClass = ""

    let secondClass = ""

    if (radio == "pending") {
        firstClass = "pending"
        secondClass = "pending-field"
    }
    else if (radio == "In Progress") {
        firstClass = "in-progress"
        secondClass = "progress-field"
    }
    else if (radio == "completed") {
        firstClass = "completed"
        secondClass = "completed-field"
    }



    if (dueDate.value == "") {

        dueDate = ""
    }
    else {
        let newDate = new Date(dueDate.value)
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        let getMon = months[newDate.getMonth()]
        let getdate = newDate.getDate()
        let getYear = newDate.getFullYear()

        dueDate = `${getMon} ${getdate},${getYear}`
    }



    newDiv.innerHTML = ` <i class="fa-solid fa-x" id="delete"></i>
                        <i class="fa-regular fa-pen-to-square " id="add"></i>
                        <h3>${taskName.value}</h3>
                        <p class="p">${taskDescription}</p>
                        <p class="images1"> <img src="https://images.emojiterra.com/google/android-pie/512px/1f4c5.png" alt=""> Due : ${dueDate}</p>
                        <p class="images2"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ-C-5ZnEZQbhUxy5gKKh1JD4GfygjBMk_72H3uDMbBIujfG_fu7G3Jx8IZXeaj0DnOHU&usqp=CAU" alt="" >${userName}</p>
                        



                        <div class="main-content">
                            <div class=${priorityClass}>
                                <span class=${FieldClass}></span>
                                <span> ${selectedValue.toUpperCase()}</span>
                            </div>
                             <div class="${firstClass}">

                                <span class="${secondClass}"></span>
                                <span >${setVal}</span>
                                
                            </div>

                        </div>`
    // parentElement.append(newDiv)
    parentElement.append(newDiv)


}






let leftside = document.querySelector(".side")

// let btn=document.querySelector(".add")

let color = document.querySelector(".color")


let btncancel = document.getElementById("btncancel")

let btnadd = document.getElementById("btnadd")
let head = document.getElementById("headname")



let deletes = document.getElementById("delete")

// let childcon=document.querySelector(".child-container")

// let editingCard = null;




















let editingCard = null;






document.addEventListener("click", function (event) {
    if (event.target.id === "add") {

        editingCard = event.target.closest(".child-container");

        leftside.style.display = "block";
        color.style.display = "block";


        document.getElementById("editusername").value =
            editingCard.querySelector(".images2").innerText.trim();

        document.getElementById("edittaskname").value =
            editingCard.querySelector("h3").innerText;

        document.getElementById("editdescription").value =
            editingCard.querySelector(".p").innerText;

        document.getElementById("editpriority").value =
            editingCard.dataset.priority;

        let statusText =
            editingCard.querySelector(".main-content div:last-child span:last-child").innerText;

        document.querySelector(
            `input[name="editstatus"][value="${statusText}"]`
        ).checked = true;
    }
});







function updateCard() {

    editingCard.querySelector("h3").innerText =
        document.getElementById("edittaskname").value

    editingCard.querySelector(".p").innerText = document.getElementById("editdescription").value;


    let priority = document.getElementById("editpriority").value
    editingCard.dataset.priority = priority;

    let priorityDiv = editingCard.querySelector(".main-content div:first-child")
    let fieldSpan = priorityDiv.querySelector("span:first-child")
    let textSpan = priorityDiv.querySelector("span:last-child")

    priorityDiv.className = priority;
    fieldSpan.className = `${priority}-field`
    textSpan.innerText = priority.toUpperCase()


    let status =
        document.querySelector('input[name="editstatus"]:checked').value

    let statusDiv = editingCard.querySelector(".main-content div:last-child")
    let statusField = statusDiv.querySelector("span:first-child")
    let statusText = statusDiv.querySelector("span:last-child")

    statusDiv.className =
        status === "pending" ? "pending" :
            status === "In Progress" ? "in-progress" :
                "completed"

    statusField.className =
        status === "pending" ? "pending-field" :
            status === "In Progress" ? "progress-field" :
                "completed-field"

    statusText.innerText = status;

    leftside.style.display = "none"
    color.style.display = "none"











}













function updateLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let oldTaskName = editingCard.querySelector("h3").innerText;
    let oldUserName = editingCard.querySelector(".images2").innerText.trim();

    tasks = tasks.map(task => {
        if (task.taskName === oldTaskName && task.userName === oldUserName) {
            // Update this task
            return {
                userName: document.getElementById("editusername").value,
                taskName: document.getElementById("edittaskname").value,
                description: document.getElementById("editdescription").value,
                priority: document.getElementById("editpriority").value,
                status: document.querySelector('input[name="editstatus"]:checked').value,
                email: task.email, // keep same or update if editable
                dueDate: task.dueDate,
                progress: task.progress
            };
        } else {
            return task;
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}





btnadd.addEventListener("click", function () {
    if (!editingCard) return;

    updateCard();
    updateLocalStorage(); // <---- Update storage
    document.querySelector(".formvalidate").reset();
    editingCard = null;
});



document.addEventListener("click", function (event) {
    if (event.target.id == "delete") {
        event.preventDefault();

        let taskDiv = event.target.parentElement;
        let taskName = taskDiv.querySelector("h3").innerText;
        let userName = taskDiv.querySelector(".images2").innerText.trim();

        // Remove from localStorage
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => !(task.taskName === taskName && task.userName === userName));
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Remove from DOM
        taskDiv.remove();
    }
});








btncancel.addEventListener("click", function (event) {
    event.preventDefault()
    leftside.style.display = "none"
    color.style.display = "none"
})











































































































