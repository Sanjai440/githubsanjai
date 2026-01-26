let createButton = document.getElementById("btn1")




let formValidation = document.getElementById("form-validate")




formValidation.addEventListener('submit', getIntput);

let userName, taskName, userEmail, dueDate, taskDescription, prioritySelect, radio, dueTime,estimateHours,projectUrl,checkBox





    
    let span
    
    
    let errorName, errorTask, errorEmail, errorpriority, errorDescription, errorstatus
    
    // let name = /^[a-z,A-Z]+[a-z,A-Z]$/
let values = false
let checkBoxValue

function getIntput(event) {
    event.preventDefault()

    userName = document.getElementById("username")

    // let sum=document.getElementById("headname")

    // sum.innerText=userName

    taskName = document.getElementById("taskname")


    userEmail = document.getElementById("email")

    dueDate = document.getElementById("dueDate")

    // console.log(dueDate);

    taskDescription = document.getElementById("description")


    prioritySelect = document.getElementById("priority");


    dueTime=document.getElementById("time").value


    estimateHours=document.getElementById("estimatehour").value

    projectUrl=document.getElementById("url")



    checkBox=document.querySelectorAll(`input[name="task-type"]:checked`)


     checkBoxValue=[...checkBox].map(cb => cb.value),

    // console.log(newcheck);
    
    
// console.log(checkBox);


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



    let isvalid = setvalue();
    if (isvalid) {
        // setlocalstorage();
        // setLocalStorage();
        // setlocalstorage()
        setlocalstorage()



        
    let tasks = JSON.parse(localStorage.getItem("task"));
    let index = tasks.length - 1
        createDiv(index);

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


window.addEventListener("DOMContentLoaded", () => {


let taskProgress = document.getElementById("task-progress")
let percentage = document.getElementById("percentage")

taskProgress.addEventListener('input', function () {
    percentage.innerText = `${taskProgress.value}%`
    // isvalid=false
})

})

function setvalue() {


    let child = document.querySelectorAll(".child")

    let isvalid = true
    let newValid=true
 
 let namePattern = /^[A-Za-z\s]{6,}$/

 let tasknamePattern=/^[A-Za-z\s]{10,}$/
let descriptionPattern=/^.\s{25,}$/


//  let descriptionPattern=/^[A-Za-z\s]{50,}/
    if (userName.value == "") {
        errorName.innerHTML = `<div class="error-icon">!</div>Enter your Name`
        userName.style.border = " 2px solid red "
        // errorIcon.style.display="block"


        isvalid = false
    }


    
    else if(!namePattern.test(userName.value)){
        errorName.innerHTML=`<div class="error-icon">!</div>Enter your Full Name ,more than 5 charater`

        userName.style.border = " 2px solid red "

        newValid=false
        // isvalid=false


    }
  

   

    if (taskName.value == "") {
        errorTask.innerHTML = `<div class="error-icon">!</div>Enter your Task Name *`
        taskName.style.border = " 2px solid red "


        isvalid = false

    }

    else if(!tasknamePattern.test(taskName.value)){
        errorTask.innerHTML=`<div class="error-icon">!</div> Enter your task name must be more than 10 character *`
        newValid=false
    }

    if (userEmail.value == "") {
        errorEmail.innerHTML = `<div class="error-icon">!</div>Enter your Email *`
        userEmail.style.border = "2px solid red"

        isvalid = false

    }

    if (dueDate.value == "") {
        errorDate.innerHTML = `<div class="error-icon">!</div>Enter the Date *`
        dueDate.style.border = "2px solid red"

        isvalid = false
    }


   

    if (taskDescription.value == "") {
        errorDescription.innerHTML = `<div class="error-icon">!</div>Write the description *`
        isvalid = false
    }

    else if(!descriptionPattern.test(taskDescription.value)){
        errorDescription.innerHTML= `<div class="error-icon">!</div>Write the description must be more than 50 character *`
        newValid=false
    }


    if (prioritySelect.value == "") {
        errorpriority.innerHTML = `<div class="error-icon">!</div>Select the Priority *`
        prioritySelect.style.border = "2px solid red"
        isvalid = false
    }


    if (radio == "") {
        errorstatus.innerHTML = `<div class="error-icon">!</div>Select the status *`
        isvalid = false
    }




     if(dueTime==""){
        isvalid=false
    }

    if(estimateHours==""){
        isvalid=false
    }
    if(projectUrl==""){
        isvalid=false
    }




    if(checkBoxValue==""){
        isvalid=false
    }








//  if(newValid){

 
    let scrollEle = [
        {name:userName, error: errorName},
        { name: taskName, error: errorTask },
        { name: userEmail, error: errorEmail },
        { name: dueDate, error: errorDate },
        { name: prioritySelect, error: errorpriority },
        {name:taskDescription, error: errorDescription}
    ]


    for (let element of scrollEle) {
        if (element.name.value == "") {
            if(newValid){

            
            element.name.scrollIntoView({
                behavior: "smooth",
                block: "center"
            })
            element.name.focus()
            break;

        }


        }
    }


//  }





    if(newValid){

    


    let newArr = ["username", "taskname", "email", "dueDate", "priority", "description","status"]

    newArr.forEach((id) => {

        let newVal = document.getElementById(id)
        // let newval=index
        if (newVal && id !== "status") {

            newVal.addEventListener("input",clearerror )

            newVal.addEventListener("change",clearerror)

            function clearerror(){
                // let names = document.getElementById(id)
                
                let errorEle = document.getElementById("error" + id)
                if (errorEle ) {
             
                    errorEle.innerText = ""
                    
                    
                    
                    
                }
                if(newVal.style){
                    
                    newVal.style.border = "2px solid rgb(218, 213, 213)"
                }
            }
                
        
        }


        if (id === "status") {
    let radios = document.querySelectorAll('input[name="status"]');

    radios.forEach(radioBtn => {
      radioBtn.addEventListener("change", () => {
        let errorEle = document.getElementById("errorstatus");
        if (errorEle) {
          errorEle.innerText = "";
        }
      });
    });
  }


    })
}

if(newValid){
    return isvalid
}

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


// let newDiv
const parentContainer = document.querySelector(".parent-container")

const childcontainer=document.querySelectorAll(".child-container")

const popupcolor=document.querySelector(".detailspopup-color")

const childpopup=document.getElementById("childpopup")


let edit=document.getElementById("edit")

 















parentContainer.addEventListener("clck", function (e) {
    let child = e.target.closest(".child-container");

    if (child) {
        let index = child.dataset.index
        showPopup(index);

        popupcolor.style.display = "block"
        childpopup.style.display = "block"
    }
});






function showPopup(index) {
    let tasks = JSON.parse(localStorage.getItem("task")) || []
    let task = tasks[index];

    const popupContent = document.getElementById("childpopup")

    popupContent.innerHTML =
`
      <i class="fa-solid fa-x" id="delete"></i>
                        <!-- <i class="fa-regular fa-pen-to-square " id="add"></i> -->
                        <!-- <button class="add" type="button">Edit</button> -->
                        <!-- <button class="delete" type="button">Delete</button> -->
                        
                        <h3 id="headname" class="headname">${task.taskname}</h3>
                        <p class="p">${task.description}</p>

                    <div class="details-cards">
                        <p>Email : ${task.useremail}</p>
                        <p class="due-date">Due Date : ${task.duedate}</p>
                        <p class="user">User Name : ${task.username}</p>
                        <p>Due Time : ${task.duetime}</p>
                        <p>Esatimate Hours : ${task.estimatehours}</p>
                        <!-- <p>Progress : 0%</p> -->
                         <p>Project Url: ${task.projecturl}</p>

                    </div>
                    <div id="progress">Progress : 0%</div>
                    <div id="border-color"></div>

                        <div class="main-content" >
                            <div class="high" >
                                <span class="high-field"></span>
                                <span>${task.priorityselect}</span>
                            </div>
                            <div class="tasktype-content">
                                <span>${task.checkbox}</span>
                            </div>
                            <div class="in-progress" >
                                <span class="progress-field"></span>
                                <span>${task.radioValue}</span>
                                
                            </div>
                        </div>

     
                    </div> `
    ;
}











function setlocalstorage() {

    let tasks = JSON.parse(localStorage.getItem("task")) || [];

    let taskValue = {
        username: userName.value,
        taskname: taskName.value,
        useremail: userEmail.value,
        duedate: dueDate.value,
        duetime: dueTime,
        priorityselect: prioritySelect.value,
        estimatehours: estimateHours,
        description: taskDescription.value,
        projecturl: projectUrl.value,
        // progress: taskProgress.value,
        checkbox: checkBoxValue,
        radioValue: radio
    };

 


    
    tasks.push(taskValue)

    localStorage.setItem("task", JSON.stringify(tasks))

}




window.addEventListener("DOMContentLoaded",function(){

    let tasks = JSON.parse(localStorage.getItem("task")) || []

    tasks.forEach((item,index) => {
        userName = { value: item.username }
        taskName = { value: item.taskname }
        userEmail = { value: item.useremail }
        dueDate = { value: item.duedate }
        dueTime=item.dueTime

        prioritySelect = { value: item.priorityselect }
        estimateHours=item.estimateHours
        taskDescription = { value: item.description }
        projectUrl=item.projecturl
        taskProgress=item.taskProgress
        checkBoxValue=item.checkBoxValue
        radio = item.radioValue
        createDiv(index);
    });
});
















































function createDiv(index) {




    let parentElement = document.querySelector(".parent-container")

    newDiv = document.createElement('div')

    newDiv.classList.add('child-container')

    // newDiv.setAttribute("data-priority",prioritySelect)


        newDiv.dataset.index = index



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
                        <p class="p">${taskDescription.value}</p>
                        <p class="images1"> <img src="https://images.emojiterra.com/google/android-pie/512px/1f4c5.png" alt=""> Due : ${dueDate}</p>
                        <p class="images2"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ-C-5ZnEZQbhUxy5gKKh1JD4GfygjBMk_72H3uDMbBIujfG_fu7G3Jx8IZXeaj0DnOHU&usqp=CAU" alt="" >${userName.value}</p>
                        



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


let color = document.querySelector(".color")


let btncancel = document.getElementById("btncancel")

let btnadd = document.getElementById("btnadd")
let head = document.getElementById("headname")



let deletes = document.getElementById("delete")






let editingIndex = null;




document.addEventListener("click", function (event) {

    if (event.target.id === "add") {

        // let card = event.target.closest(".child-container");
        // editingIndex = card.dataset.index;


        let card = event.target.closest(".child-container");
        if (!card) return;

        editingIndex = Number(card.dataset.index);

        let tasks = JSON.parse(localStorage.getItem("task")) || [];
        let task = tasks[editingIndex];

        document.getElementById("editusername").value = task.username
        document.getElementById("edittaskname").value = task.taskname
        document.getElementById("editemail").value=task.useremail
        document.getElementById("editdue-date").value=task.duedate
        document.getElementById("editTime").value=task.duetime
        document.getElementById("editpriority").value = task.priorityselect
        document.getElementById("editEstimatehour").value=task.estimatehours

        document.getElementById("ediUrl").value=task.projecturl
        document.getElementById("editdescription").value = task.description;

        document.querySelector(   `input[name="editTaskType"][value="${task.checkbox}"]`).checked = true
        document.querySelector(
            `input[name="editstatus"][value="${task.radioValue}"]`).checked = true

        leftside.style.display = "block"
        color.style.display = "block"

        leftside.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
});






btnadd.addEventListener("click", function (e) {

    e.stopPropagation()
    
    if (editingIndex === null) return

    let tasks = JSON.parse(localStorage.getItem("task")) || [];

    let updatedTask = {
        username: document.getElementById("editusername").value,
        taskname: document.getElementById("edittaskname").value,
        useremail: document.getElementById("editemail").value,
        duedate:document.getElementById("editdue-date").value,
        duetime: document.getElementById("editTime").value,
        priorityselect: document.getElementById("editpriority").value,
        estimatehours: document.getElementById("editEstimatehour").value,
        projecturl: document.getElementById("ediUrl").value,
        description: document.getElementById("editdescription").value,
        checkbox: document.querySelector(
            `input[name="editTaskType"]:checked`
        )?.value || "",
        radioValue: document.querySelector(
            `input[name="editstatus"]:checked`
        )?.value || ""
    };

    tasks[editingIndex] = updatedTask

    localStorage.setItem("task", JSON.stringify(tasks))

   

        updateSingleCard(updatedTask, editingIndex)


    editingIndex = null

    leftside.style.display = "none"
    color.style.display = "none"
});




function updateSingleCard(task, index) {

    let card = document.querySelector(
        `.child-container[data-index="${index}"]`
    );

    if (!card) return




      let formattedDueDate = ""
    if (task.duedate) {
        let newDate = new Date(task.duedate)
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let getMon = months[newDate.getMonth()]
        let getDate = newDate.getDate()
        let getYear = newDate.getFullYear()
        formattedDueDate = `${getMon} ${getDate},${getYear}`
    }






    let priorityClass = task.priorityselect === "low" ? "low" :
                        task.priorityselect === "medium" ? "medium" : "high";

    let FieldClass = task.priorityselect === "low" ? "low-field" :
                     task.priorityselect === "medium" ? "medium-field" : "high-field";

    let firstClass = task.radioValue === "pending" ? "pending" :
                     task.radioValue === "In Progress" ? "in-progress" : "completed";

    let secondClass = task.radioValue === "pending" ? "pending-field" :
                      task.radioValue === "In Progress" ? "progress-field" : "completed-field";

    card.innerHTML = `
        <i class="fa-solid fa-x" id="delete"></i>
        <i class="fa-regular fa-pen-to-square" id="add"></i>

        <h3>${task.taskname}</h3>
        <p class="p">${task.description}</p>

        <p class="images1"> <p class="images1"> <img src="https://images.emojiterra.com/google/android-pie/512px/1f4c5.png" alt=""> Due : ${formattedDueDate}</p>
        <p class="images2" > <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ-C-5ZnEZQbhUxy5gKKh1JD4GfygjBMk_72H3uDMbBIujfG_fu7G3Jx8IZXeaj0DnOHU&usqp=CAU" alt="" >    ${task.username}</p>

        <div class="main-content">
            <div class="${priorityClass}">
                <span class="${FieldClass}"></span>
                <span>${task.priorityselect.toUpperCase()}</span>
            </div>

            <div class="${firstClass}">
                <span class="${secondClass}"></span>
                <span>${task.radioValue}</span>
            </div>
        </div>
    `;
}



document.addEventListener("click", function (event) {

    if (event.target.id === "delete") {

        let card = event.target.closest(".child-container")
        if (!card) return

        let index = Number(card.dataset.index)

        let tasks = JSON.parse(localStorage.getItem("task")) || [];
        tasks.splice(index, 1)
        localStorage.setItem("task", JSON.stringify(tasks))

        card.remove()
        updateIndexes()
    }
});
























btncancel.addEventListener("click", function (event) {
    event.preventDefault()
    leftside.style.display = "none"
    color.style.display = "none"
})




































































