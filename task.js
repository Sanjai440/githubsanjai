// let createButton = document.getElementById("btn1")




let formValidation = document.getElementById("form-validate")







formValidation.addEventListener('submit', getIntput);

let userName, taskName, userEmail, dueDate, taskDescription, prioritySelect, radio, dueTime,estimateHours,projectUrl,checkBox



let taskProgressValue 


let span
    
    
let errorName, errorTask, errorEmail, errorpriority, errorDescription, errorstatus
    
    // let name = /^[a-z,A-Z]+[a-z,A-Z]$/
let values = false
let checkBoxValue ,storedValues

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



    checkBox=document.querySelectorAll(`input[name="task-type"]`)



    storedValues=[]

    checkBox.forEach(currentItem=>{
        currentItem.addEventListener("change",function(){
            storedValues=[...checkBox].filter(box=>box.checked==true).map(box=>box.value)

                                
        })
    })





    
    
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



    let isvalid = setvalue()
    if (isvalid) {
        



        if (isDuplicateTask(taskName.value)) {
        errorTask.innerHTML =
            `<div class="error-icon">!</div> Task name already exists`;
        taskName.style.border = "2px solid red";

        taskName.scrollIntoView({ behavior: "smooth", block: "center" });
        taskName.focus()
        return
    }




        setlocalstorage()



        
    let tasks = JSON.parse(localStorage.getItem("task"));
    let index = tasks.length - 1
        createDiv(index)

        toggleEmptyState()


        showSubmitToast() 


    }



}










let reset=document.getElementById("btn2")

reset.addEventListener("click",function(){
    // console.log("hii");   
     let resetValue = ["username", "taskname", "email", "dueDate", "priority", "description","status"]

     resetValue.forEach(id=>{

        let resetName=document.getElementById(id)
        let resetError=document.getElementById("error"+id)

        if(resetError){
            resetError.innerText=""
        }
        if(resetName){
            resetName.style.border="2px solid rgb(218, 213, 213)"

        }

      
        
     })

    

})

















document.addEventListener("DOMContentLoaded", () => {
    
    let taskProgress = document.getElementById("task-progress")
    
    let percentage = document.getElementById("percentage")

    taskProgressValue = taskProgress.value;
    
    taskProgress.addEventListener('input', function () {
        taskProgressValue=taskProgress.value
        percentage.innerText = `${taskProgressValue}%`
    // isvalid=false
    })

})













function setvalue() {


    // let child = document.querySelectorAll(".child")

    let isvalid = true
    let newValid=true
 
    let namePattern = /^[A-Za-z]+ [A-Za-z]+$/

    let tasknamePattern=/^[A-Za-z]+( [A-Za-z]+)+$/
    let descriptionPattern= /^(?=.*[A-Za-z])[A-Za-z0-9\s.,!@#$%^&*()\-_=+:";'?/<>]+$/;



    if (userName.value == "") {
        errorName.innerHTML = `<div class="error-icon">!</div>Enter your Name`
        userName.style.border = " 2px solid red "
        // errorIcon.style.display="block"


        isvalid = false
    }


    
    else if(!namePattern.test(userName.value)){
        errorName.innerHTML=`<div class="error-icon">!</div>Enter your Full Name `

        userName.style.border = " 2px solid red "

        newValid=false
        // isvalid=false


    }
    else if (userName.value.length<=6){
        errorName.innerHTML=`<div class="error-icon">!</div>Enter your Full Name More than 6 charater`

        userName.style.border = " 2px solid red "


        newValid=false


    }
  

   

    if (taskName.value == "") {
        errorTask.innerHTML = `<div class="error-icon">!</div>Enter your Task Name *`
        
        taskName.style.border = " 2px solid red "
        
        isvalid = false
        
    }
    
    else if(!tasknamePattern.test(taskName.value)){
        errorTask.innerHTML=`<div class="error-icon">!</div> Enter your task full name  *`
        taskName.style.border = " 2px solid red "
        newValid=false
    }
    else if(taskName.value.length<=10){
        errorTask.innerHTML=`<div class="error-icon">!</div> Enter your task full name must be more than 10 character *`
        taskName.style.border = " 2px solid red "

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


   

    

    if (prioritySelect.value == "") {
        errorpriority.innerHTML = `<div class="error-icon">!</div>Select the Priority *`
        prioritySelect.style.border = "2px solid red"
        isvalid = false
    }









    if (taskDescription.value == "") {
        errorDescription.innerHTML = `<div class="error-icon">!</div>Write the description *`
        taskDescription.style.border="2px solid red"
        isvalid = false
    }
    
    else if(!descriptionPattern.test(taskDescription.value)){
        errorDescription.innerHTML= `<div class="error-icon">!</div>Write the description in character *`
        taskDescription.style.border="2px solid red"
        newValid=false
    }

    else if(taskDescription.value.length<=30){
        errorDescription.innerHTML= `<div class="error-icon">!</div>Write the description must be more than 30 character *`
        taskDescription.style.border="2px solid red"


        
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

    if(taskProgressValue==""){
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
                    let errorEle = document.getElementById("errorstatus")
                    if (errorEle) {
                        errorEle.innerText = ""
                    }
                })
             })
        }


    })
}

if(newValid){
    return isvalid
}

    
}

































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

    if (setVal == "pending") {
        firstClass = "pending"
        secondClass = "pending-field"
    }
    else if (setVal == "In Progress") {
        firstClass = "in-progress"
        secondClass = "progress-field"
    }
    else if (setVal == "completed") {
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



























const filtertask = document.querySelectorAll(".taskfilter")


// let countValue=document.querySelector(".countElement")


filtertask.forEach(link => { 
    link.addEventListener("click", function (event) {
    event.preventDefault()
    event.stopPropagation()


        
        let value = link.dataset.filter
        const taskcontent = document.querySelectorAll(".child-container")
        let increment =0
        taskcontent.forEach(cards => {
            let cardsvalue = cards.dataset.priority 
            if (value == "all" || cardsvalue == value) { 
                increment++
                cards.style.display = "block"

            }
            else {
                cards.style.display = "none"
            }
        })
        
      
            
            filtertask.forEach(element => {
                
                element.classList.remove("active")
         


                const countSpan = element.nextElementSibling; 
                if (countSpan && countSpan.classList.contains("countElement")) {
                    countSpan.style.display = "none";
                }
            })
            link.classList.add("active")





        const countSpan = link.nextElementSibling
        if (countSpan && countSpan.classList.contains("countElement")) {
            countSpan.innerText = increment
            countSpan.style.display = "inline-block"
        }
           
    })

})















// let newDiv
const parentContainer = document.querySelector(".parent-container")

// const childcontainer=document.querySelectorAll(".child-container")

const popupcolor=document.querySelector(".detailspopup-color")

const childpopup=document.getElementById("childpopup")


const edit=document.getElementById("edit")

 















parentContainer.addEventListener("click", function (e) {

    

    if(e.target.id=="add" || e.target.id=="delete" || e.target.closest("#childpopup")){
        return
    }

    
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

    // const popupContent = document.getElementById("childpopup")




      let firstClassRadio = ""

    let secondClassRadio = ""

    if (task.radioValue == "pending") {
        firstClassRadio = "pending"
        secondClassRadio = "pending-field"
    }
    else if (task.radioValue == "In Progress") {
        firstClassRadio = "in-progress"
        secondClassRadio = "progress-field"
    }
    else if (task.radioValue == "completed") {
        firstClassRadio = "completed"
        secondClassRadio = "completed-field"
    }
    childpopup.innerHTML =
`
      <i class="fa-solid fa-x" id="Popup"></i>
                        <!-- <i class="fa-regular fa-pen-to-square " id="add"></i> -->
                        <!-- <button class="add" type="button">Edit</button> -->
                        <!-- <button class="delete" type="button">Delete</button> -->
                        
                        <h3 id="headname" class="headname">${task.taskname}</h3>
                        <p class="p">${task.description}</p>

                    <div class="details-cards">
                        <p><strong>Email :</strong> ${task.useremail}</p>
                        <p class="due-date"><strong>Due Date :</strong> ${task.duedate}</p>
                        <p class="user"><strong>User Name :</strong> ${task.username}</p>
                        <p><strong>Due Time :</strong> ${task.duetime}</p>
                        <p><strong>Esatimate Hours : </strong>${task.estimatehours}</p>
                        <!-- <p>Progress : ${task.progress}</p> -->
                         <p><strong>Project Url : </strong>  <a href="${task.projecturl}" target="_blank"   id="urlHref">View Link</a></p>

                         <p ><strong>Task Type : </strong>${task.checkbox}</p>
                         <p ><strong>Progress :</strong> ${task.progress}%</p>
                    </div>
                    <div id="border-color"></div>

                        <div class="main-content" >
                            <div class="${task.priorityselect}" >
                                <span class="${task.priorityselect}-field"></span>
                                <span>${task.priorityselect.toUpperCase()}</span>
                            </div>
                            
                            <div class="${firstClassRadio}" >
                                <span class="${secondClassRadio}"></span>
                                <span>${task.radioValue}</span>
                                
                            </div>
                        </div>

     
                    </div> `
    ;
}

let deletePopup=document.getElementById("Popup")



childpopup.addEventListener("click", function (event) {

    if (event.target.id === "Popup") {
        event.stopPropagation(); 

    // event.preventDefault()
        popupcolor.style.display = "none";
        childpopup.style.display = "none";
    
    }
})






























function setlocalstorage() {

    storedValues=[...checkBox].filter(box=>box.checked).map(box=>box.value)

    let tasks = JSON.parse(localStorage.getItem("task")) || []








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
        progress: taskProgressValue,
        percentage:`${taskProgressValue}%`,
        checkbox: storedValues,
        radioValue: radio
    };

 


    
    tasks.push(taskValue)

    localStorage.setItem("task", JSON.stringify(tasks))





}







window.addEventListener("DOMContentLoaded",function(){

    let tasks = JSON.parse(localStorage.getItem("task")) || []

    // let taskProgress = document.getElementById("task-progress");
    // let percentage = document.getElementById("percentage")




    







    tasks.forEach((item,index) => {



     
    

        userName = { value: item.username }
        taskName = { value: item.taskname }
        userEmail = { value: item.useremail }
        dueDate = { value: item.duedate }
        dueTime=item.duetime

        prioritySelect = { value: item.priorityselect }
        estimateHours=item.estimatehours
        taskDescription = { value: item.description }
        projectUrl=item.projecturl
        taskProgressValue=item.progress




        storedValues=item.checkbox || []
        radio = item.radioValue
        createDiv(index)
    })

    toggleEmptyState()

})














const addTaskBtn = document.getElementById("addTaskBtn")
const taskForm = document.getElementById("form-validate") 

addTaskBtn.addEventListener("click", () => {
  taskForm.scrollIntoView({
    behavior: "smooth",
    block: "start"
  })

  document.getElementById("username").focus()
})




function toggleEmptyState() {
  const tasks = JSON.parse(localStorage.getItem("task")) || [];
  document.getElementById("emptyState").style.display =
    tasks.length === 0 ? "flex" : "none";
}
















function isDuplicateTask(taskName,currentTaskIndex = null) {
    let tasks = JSON.parse(localStorage.getItem("task")) || []

    
        return tasks.some((task, index) => {
        if (currentTaskIndex !== null && index === currentTaskIndex) {
            return false; 
        }
        return task.taskname.trim().toLowerCase() === taskName.trim().toLowerCase();
    })
}










function showSubmitToast() {
  const toast = document.getElementById("submitToast")
  toast.classList.add("show")

  setTimeout(() => {
    toast.classList.remove("show")
  }, 3000)
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

 
         event.stopPropagation(); 

         let editprogress=document.getElementById("edittask-progress")

         let editPercentage=document.getElementById("editpercentage")




        let card = event.target.closest(".child-container")
        if (!card) return;

        editingIndex = Number(card.dataset.index)

        let tasks = JSON.parse(localStorage.getItem("task")) || []
        let task = tasks[editingIndex];

        document.getElementById("editusername").value = task.username
        document.getElementById("edittaskname").value = task.taskname
        document.getElementById("editemail").value=task.useremail
        document.getElementById("editdue-date").value=task.duedate
        document.getElementById("editTime").value=task.duetime
        document.getElementById("editpriority").value = task.priorityselect

        document.getElementById("editEstimatehour").value=task.estimatehours


        editprogress.value=task.progress

        editPercentage.innerText=`${task.progress}%`


        editprogress.addEventListener("input",function(){
            editPercentage.innerText=`${this.value}%`

        })


        document.getElementById("ediUrl").value=task.projecturl
        document.getElementById("editdescription").value = task.description

        document.querySelectorAll('input[name="editTaskType"]').forEach(cb => {
            cb.checked = task.checkbox.includes(cb.value); 
        })




        document.querySelector(
            `input[name="editstatus"][value="${task.radioValue}"]`).checked = true

        leftside.style.display = "block"
        color.style.display = "block"

        leftside.scrollIntoView({
            behavior: "smooth",
            block: "center"
        })
    }
})





  let editnamePattern = /^[A-Za-z]+ [A-Za-z]+$/

  let edittasknamePattern=/^[A-Za-z]+( [A-Za-z]+)+$/
  let editdescriptionPattern= /^(?=.*[A-Za-z])[A-Za-z0-9\s.,!@#$%^&*()\-_=+:";'?/<>]+$/;






















    let errorfield = ["editusername","edittaskname","editdescription"]

    errorfield.forEach(id => {
        let inputEle = document.getElementById(id);
        let errorEle = document.getElementById("error"+id);
        inputEle.addEventListener("input", () => {
            errorEle.innerHTML = ""
            inputEle.style.border = "2px solid rgb(218, 213, 213)"
        });
    });
















btnadd.addEventListener("click", function (e) {

    e.stopPropagation()
    
    if (editingIndex === null) return

    let tasks = JSON.parse(localStorage.getItem("task")) || []


    let editTaskName = document.getElementById("edittaskname").value

    let editErrorTaskname=document.getElementById("erroredittaskname")

    

    let editusername=document.getElementById("editusername").value
    let editErrorname=document.getElementById("erroreditusername")


    let editTaskdescription=document.getElementById("editdescription").value.trim()
    let editErrodescription=document.getElementById("erroreditdescription")


















    if(!editnamePattern.test(editusername)){
        editErrorname.innerHTML=`<div class="editerror-icon">!</div> Enter your full name *`
        editErrorname.scrollIntoView({
             behavior: "smooth",
            block: "center"

        })
        return

    }
    else if(editusername.length<=7){
        editErrorname.innerHTML=`<div class="editerror-icon">!</div> your name must be more than 7 character  *`
        editErrorname.scrollIntoView({
             behavior: "smooth",
            block: "center"

        })


        return

    }





    if(!edittasknamePattern.test(editTaskName)){
        editErrorTaskname.innerHTML=`<div class="editerror-icon">!</div> Enter the task full name`
        editErrorTaskname.scrollIntoView({
             behavior: "smooth",
            block: "center"

        })
        return
    }
    else if(editTaskName.length<=10){
        editErrorTaskname.innerHTML=`<div class="editerror-icon">!</div> Task name must be more than 10 character *`
         editErrorTaskname.scrollIntoView({
             behavior: "smooth",
            block: "center"

        })
        
        return

    }






    if(!editdescriptionPattern.test(editTaskdescription)){
        editErrodescription.innerHTML=`<div class="editerror-icon">!</div> Write the description`
        editErrodescription.scrollIntoView({
             behavior: "smooth",
            block: "center"

        })
        return
    }
    else if(editTaskdescription.length<=25){
         editErrodescription.innerHTML=`<div class="editerror-icon">!</div> Description must be more than 25 character`
         editErrodescription.scrollIntoView({
             behavior: "smooth",
            block: "center"

        })
        return
        
    }









     if(isDuplicateTask(editTaskName, editingIndex)) {
        editErrorTaskname.innerHTML= `<div class="error-icon">!</div> Task name already exists`

        editErrorTaskname.scrollIntoView({
             behavior: "smooth",
            block: "center"

        })
        return;
    }
















    let updatedCheckbox = Array.from(document.querySelectorAll('input[name="editTaskType"]:checked')).map(cb => cb.value);


    let updatedTask = {
        username:editusername,
        taskname: editTaskName,
        useremail: document.getElementById("editemail").value,
        duedate:document.getElementById("editdue-date").value,
        duetime: document.getElementById("editTime").value,
        priorityselect: document.getElementById("editpriority").value,
        estimatehours: document.getElementById("editEstimatehour").value,
        projecturl: document.getElementById("ediUrl").value,

        progress:document.getElementById("edittask-progress").value,

        description: editTaskdescription,
      
        checkbox:updatedCheckbox,
        radioValue: document.querySelector(`input[name="editstatus"]:checked`)?.value || ""
    }

    tasks[editingIndex] = updatedTask

    localStorage.setItem("task", JSON.stringify(tasks))

   

        updateSingleCard(updatedTask, editingIndex)


    editingIndex = null

    leftside.style.display = "none"
    color.style.display = "none"
})




function updateSingleCard(task, index) {

    let card = document.querySelector(
        `.child-container[data-index="${index}"]`
    )

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



    let updateNewValue=task.priorityselect

    let updatePriorityClass=""

    let updateFieldClass=""

    if(updateNewValue=="low"){
        updatePriorityClass="low"
        updateFieldClass="low-field"

    }
    else if(updateNewValue=="medium"){
        updatePriorityClass="medium"

        updateFieldClass="medium-field"
    }
    else if(updateNewValue=="high"){
        updatePriorityClass="high"
        updateFieldClass="high-field"
    }


    let newRadioValue=task.radioValue

    let firstClassValue=""

    let secondClassValue=""

    if(newRadioValue=="pending"){
        firstClassValue="pending"
        secondClassValue="pending-field"
    }
    else if(newRadioValue=="In Progress"){
        firstClassValue="in-progress "
        secondClassValue="progress-field"
    }
    else if(newRadioValue=="completed"){
        firstClassValue="completed"
        secondClassValue="completed-field"
    }





    card.innerHTML = `
        <i class="fa-solid fa-x" id="delete"></i>
        <i class="fa-regular fa-pen-to-square" id="add"></i>

        <h3>${task.taskname}</h3>
        <p class="p">${task.description}</p>

        <p class="images1"> <p class="images1"> <img src="https://images.emojiterra.com/google/android-pie/512px/1f4c5.png" alt=""> Due : ${formattedDueDate}</p>
        <p class="images2" > <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ-C-5ZnEZQbhUxy5gKKh1JD4GfygjBMk_72H3uDMbBIujfG_fu7G3Jx8IZXeaj0DnOHU&usqp=CAU" alt="" >    ${task.username}</p>

        <div class="main-content">
            <div class="${updatePriorityClass}">
                <span class="${updateFieldClass}"></span>
                <span>${updateNewValue.toUpperCase()}</span>
            </div>

            <div class="${firstClassValue}">
                <span class="${secondClassValue}"></span>
                <span>${newRadioValue}</span>
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

        // updateSingleCard()
    }
})







btncancel.addEventListener("click", function (event) {
    event.preventDefault()
    leftside.style.display = "none"
    color.style.display = "none"
})




 







// let barIcon = document.getElementById("bar-icon");
// let menu = document.querySelector(".ul-element");

// barIcon.addEventListener("click", function () {
//     menu.classList.toggle("active");
// });













































