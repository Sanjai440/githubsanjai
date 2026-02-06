let formValidation = document.getElementById("form-validate")
formValidation.addEventListener('submit', getIntput);

// input field declaration 
let userName, taskName, userEmail, dueDate, taskDescription, prioritySelect, radio, dueTime,estimateHours,projectUrl,checkBox,taskProgressValue,span,storedValues
// error field declaration
let errorName, errorTask, errorEmail, errorpriority, errorDescription, errorstatus,errorDate,errorTime,errorEstimatehour,errorUrl,errorCheckbox
let isDateInitialized = false

function getIntput(event) {
    event.preventDefault()
    userName = document.getElementById("username")
    taskName = document.getElementById("taskname")
    userEmail = document.getElementById("email")
    dueDate = document.getElementById("dueDate")
    taskDescription = document.getElementById("description")
    prioritySelect = document.getElementById("priority")
    dueTime=document.getElementById("time")
    estimateHours=document.getElementById("estimatehour")
    projectUrl=document.getElementById("url")
    checkBox=document.querySelectorAll(`input[name="task-type"]`)
    storedValues=[]
    checkBox.forEach(currentItem=>{
        currentItem.addEventListener("change",function(){
            storedValues=[...checkBox].filter(box=>box.checked).map(box=>box.value)   
            if(!storedValues){
                errorCheckbox.innerHTML=""
            }
        })
    })
    radio = document.querySelector(`input[name="status"]:checked`)
    errorName = document.getElementById("errorusername")
    errorTask = document.getElementById("errortaskname")
    errorEmail = document.getElementById("erroremail")
    errorDate = document.getElementById("errordueDate")
    errorTime=document.getElementById("errortime")
    errorEstimatehour=document.getElementById("errorestimatehour")
    errorUrl=document.getElementById("errorurl")
    errorpriority = document.getElementById("errorpriority")
    errorDescription = document.getElementById("errordescription")
    errorCheckbox=document.getElementById("errortask-type")
    errorstatus = document.getElementById("errorstatus")

    //     if (!isDateInitialized) {
    //     let today = new Date()
    //     let yyyy = today.getFullYear()
    //     let mm = String(today.getMonth() + 1).padStart(2, "0")
    //     let dd = String(today.getDate()).padStart(2, "0")
    //     let todayDate = `${yyyy}-${mm}-${dd}`

    //     dueDate.min = todayDate
    //     dueDate.max = todayDate

    //     dueDate.value = todayDate

    //     isDateInitialized = true
    // }

    let isvalid = setValue()
    if (isvalid) {
        if (isDuplicateTask(taskName.value)) {
        errorTask.innerHTML =`<div class="error-icon">!</div> Task name already exists`
        taskName.style.border = "2px solid red"
        taskName.scrollIntoView({ 
            behavior: "smooth", 
            block: "center"
         })
        taskName.focus()
        return
    }
        setLocalStorage()
        let tasks = JSON.parse(localStorage.getItem("task"))
        let taskValue = tasks[tasks.length - 1]
        createDiv(taskValue.id)
        formValidation.reset()
        EmptyState()
        showSubmitToast() 
    }
}

let reset=document.getElementById("btn2")
reset.addEventListener("click",resetForm)
function resetForm(){
     let resetValue = ["username", "taskname", "email", "dueDate", "time","priority","url", "estimatehour","description","task-type","status",]
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
}

document.addEventListener("DOMContentLoaded", function(){
    // let taskProgress = document.getElementById("task-progress")
    // let percentage = document.getElementById("percentage")
    // taskProgressValue = taskProgress.value
    // taskProgress.addEventListener('input', function () {
    //     taskProgressValue=taskProgress.value
    //     percentage.innerText = `${taskProgressValue}%`
    // })

    // let todayDate=new Date().toISOString().split("T")[0]
    let dueDate = document.getElementById("dueDate")

    let todayDate=new Date().toISOString().split("T")[0]
    dueDate.min=todayDate
    dueDate.max=todayDate

    const dueTime=document.getElementById("time")

    const now = new Date()
    const hh = String(now.getHours()).padStart(2, "0")
    const mm = String(now.getMinutes()).padStart(2, "0")
    const currentTime = `${hh}:${mm}`
    dueTime.min = currentTime
    dueTime.max = "23:59"
    // dueTime.value = currentTime
    // let todayDate = new Date().toLocaleDateString("en-CA")
    // dueDate.min=todayDate
    // dueDate.max=todayDate
    // dueDate.value=todayDate
})

// document.addEventListener("DOMContentLoaded",function(){
//      let todayDate=new Date().toISOString().split("T")[0]
//     dueDate.min=todayDate
//     dueDate.max=todayDate
//     dueDate.value=todayDate
// })

function setValue() {

    let userNamePattern=/^[A-Za-z]+$/
    // let taskNamePattern=/^[A-Za-z]$/
    let isvalid = true
    let newValid=true
    if (userName.value.trim() == "") {
        errorName.innerHTML = `<div class="error-icon">!</div>Enter your Name`
        userName.style.border = " 2px solid red "
        isvalid = false
    }
    else if(!userNamePattern.test(userName.value)){
        errorName.innerHTML=`<div class="error-icon">!</div>Enter your Name jjj*`
        userName.style.border = " 2px solid red "
        newValid=false
    }
    // else if (userName.value.trim().length<=6){
    //     errorName.innerHTML=`<div class="error-icon">!</div>Enter your Full Name More than 6 charater`
    //     userName.style.border = " 2px solid red "
    //     newValid=false
    // }
    if (taskName.value.trim() == "") {
        errorTask.innerHTML = `<div class="error-icon">!</div>Enter your Task Name *`
        taskName.style.border = " 2px solid red "
        isvalid = false
    }
    // else if(!taskNamePattern.test(taskName.value)){
    //     errorTask.innerHTML=`<div class="error-icon">!</div> Enter your Task Name *`
    //     taskName.style.border = " 2px solid red "
    //     newValid=false
    // }
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
        errorpriority.style.display = "block"
        errorpriority.innerHTML = `<div class="error-icon">!</div>Select the Priority *`
        prioritySelect.style.border = "2px solid red"
        isvalid = false
    }
    if (taskDescription.value.trim() == "") {
        errorDescription.innerHTML = `<div class="error-icon">!</div>Write the description *`
        taskDescription.style.border="2px solid red"
        isvalid = false
    }
    else if (taskDescription.value.length <15) {
        errorDescription.innerHTML = `<div class="error-icon">!</div>Write the description Must be More than 15 Character *`
        taskDescription.style.border="2px solid red"
        newValid=false
    }
    if (!radio) {
        errorstatus.innerHTML = `<div class="error-icon">!</div>Select the status *`
        isvalid = false
    }
    if(dueTime.value==""){
        errorTime.innerHTML=`<div class="error-icon">!</div>Set the time *`
        dueTime.style.border="2px solid red"
        isvalid=false
    }
    if(estimateHours.value==""){
        errorEstimatehour.innerHTML=`<div class="error-icon">!</div>Enter the hours *`
        estimateHours.style.border="2px solid red"
        isvalid=false
    }
    if(projectUrl.value==""){
        errorUrl.innerHTML=`<div class="error-icon">!</div>Enter the url *`
        projectUrl.style.border="2px solid red"
        isvalid=false
    }
    if(taskProgressValue==""){
        isvalid=false
    }

    let urlValue = projectUrl.value.trim()
    if (urlValue) {
        if (!urlValue.startsWith("http://") && !urlValue.startsWith("https://")) {
            projectUrl.value = "https://" + urlValue
        }
    }

    const anyChecked = [...checkBox].some(cb => cb.checked)
    if(!anyChecked){
        errorCheckbox.innerHTML=`<div class="error-icon">!</div>Select the task type *`
        isvalid=false
    }

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
            })
            element.name.focus()
            break;
        }
        }
    }
    let newArr = ["username", "taskname", "email", "dueDate", "time","priority","estimatehour","url", "description","status","task-type"]
    newArr.forEach((id) => {
        let newVal = document.getElementById(id)
        if (newVal) {
            newVal.addEventListener("input",clearerror )
            newVal.addEventListener("change",clearerror)
            function clearerror(){
                let errorEle = document.getElementById("error" + id)
                if (errorEle ) {
                    errorEle.innerText = ""
                }
                if(newVal.style){
                    newVal.style.border = "2px solid rgb(218, 213, 213)"
                }
            }
        }
        if (id == "status" || id=="task-type") {
            let radios = document.querySelectorAll('input[name="status"]');
            radios.forEach(radioBtn => {
                radioBtn.addEventListener("change", function(){
                    errorstatus.innerHTML=""
                })
             })
             let taskCheckboxs=document.querySelectorAll('input[name="task-type"]')
             taskCheckboxs.forEach(currentBox=>{
                currentBox.addEventListener("change",function(){
                    errorCheckbox.innerHTML=""
                })
             })
        }
    })
    if(newValid){
        return isvalid
    }
}

function createDiv(id) {
    let parentElement = document.querySelector(".parent-container")
    let newDiv = document.createElement('div')
    newDiv.classList.add('child-container')
    newDiv.dataset.id = id
    let selectedValue = prioritySelect.value
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
    let setVal = radio.value
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
    parentElement.append(newDiv)
}

//SetLocalstorage
function setLocalStorage() {
    let storedValues=[...checkBox].filter(box=>box.checked).map(box=>box.value)
    let tasks = JSON.parse(localStorage.getItem("task")) || []
    let taskValue = {
        id:Date.now(),
        username: userName.value,
        taskname: taskName.value,
        useremail: userEmail.value,
        duedate: dueDate.value,
        duetime: dueTime.value,
        priorityselect: prioritySelect.value,
        estimatehours: estimateHours.value,
        description: taskDescription.value,
        projecturl: projectUrl.value,
        progress: taskProgressValue,
        percentage:`${taskProgressValue}%`,
        checkbox: storedValues,
        radioValue: radio.value
    }
    tasks.push(taskValue)
    localStorage.setItem("task", JSON.stringify(tasks))
}
window.addEventListener("DOMContentLoaded",function(){
    let tasks = JSON.parse(localStorage.getItem("task")) ||[]
    tasks.forEach(item => {
        userName = { value: item.username }
        taskName = { value: item.taskname }
        userEmail = { value: item.useremail }
        dueDate = { value: item.duedate }
        dueTime={value:item.duetime}
        prioritySelect = { value: item.priorityselect }
        estimateHours={value:item.estimatehours}
        taskDescription = { value: item.description }
        projectUrl={value:item.projecturl}
        taskProgressValue=item.progress
        storedValues=item.checkbox || []
        radio = {value:item.radioValue}
        createDiv(item.id)
    })
    EmptyState()
})


//Edit Cards

let editUsername=document.getElementById("editusername")
let editTaskname=document.getElementById("edittaskname")
let editEmail=document.getElementById("editemail")
let editDuedate=document.getElementById("editdue-date")
let editTime=document.getElementById("editTime")
let editPriority=document.getElementById("editpriority")
let editEstimatehour=document.getElementById("editEstimatehour")
let editUrl=document.getElementById("editUrl")
let editDescription =document.getElementById("editdescription")
let editprogress=document.getElementById("edittask-progress")
let editPercentage=document.getElementById("editpercentage")
let editTasktype=document.querySelectorAll('input[name="editTaskType"]')
let editStatusRadios = document.querySelectorAll('input[name="editstatus"]')
//getform
let leftside = document.querySelector(".side")
let color = document.querySelector(".color")
let btncancel = document.getElementById("btncancel")
let btnadd = document.getElementById("btnadd")
let deletesIcon = document.getElementById("delete")
let editingId = null
document.addEventListener("click", editButtonClick)

function editButtonClick(event){
    if (event.target.id === "add") {
         event.stopPropagation()
        let card = event.target.closest(".child-container")
        if (!card) return
        editingId = Number(card.dataset.id)
        let tasks = JSON.parse(localStorage.getItem("task"))
        let task = tasks.find(t => t.id === editingId)
        editUsername.value = task.username
        editTaskname.value = task.taskname
        editEmail.value=task.useremail
        editDuedate.value=task.duedate
        editTime.value=task.duetime
        editPriority.value = task.priorityselect
        editEstimatehour.value=task.estimatehours
        editUrl.value=task.projecturl
        editDescription.value = task.description
        editprogress.value=task.progress
        editPercentage.innerText=`${task.progress}%`
        editprogress.addEventListener("input",function(){
            editPercentage.innerText=`${this.value}%`
        })
        editTasktype.forEach(cb => {
            cb.checked = task.checkbox.includes(cb.value); 
        })
        editStatusRadios.forEach(radio => {
             radio.checked = (radio.value == task.radioValue)
        })
        leftside.style.display = "block"
        color.style.display = "block"
        leftside.scrollIntoView({
            behavior: "smooth",
            block: "center"
        })
    }
}

    let errorfield = ["editusername","edittaskname","editdescription"]
    errorfield.forEach(id => {
        let inputEle = document.getElementById(id);
        let errorEle = document.getElementById("error"+id);
        inputEle.addEventListener("input", () => {
            errorEle.innerHTML = ""
            inputEle.style.border = "2px solid rgb(218, 213, 213)"
        })
    })
btnadd.addEventListener("click", editButtonAdd )

function editButtonAdd(event){
    event.stopPropagation()
    if (editingId === null) return
    let tasks = JSON.parse(localStorage.getItem("task"))

    let editErrorname=document.getElementById("erroreditusername")
    let editErrorTaskname=document.getElementById("erroredittaskname")
    let editErrodescription=document.getElementById("erroreditdescription")
     if(editUsername.value==""){
        editErrorname.innerHTML=`<div class="editerror-icon">!</div>Enter Your Name *`
        editErrorname.scrollIntoView({
             behavior: "smooth",
            block: "center"
        })
        return
    } 
    if(editTaskname.value==""){
        editErrorTaskname.innerHTML=`<div class="editerror-icon">!</div> T *`
         editErrorTaskname.scrollIntoView({
             behavior: "smooth",
            block: "center"
        })
        return
    }
    if(editDescription.value==""){
         editErrodescription.innerHTML=`<div class="editerror-icon">!</div> Description must be more than 25 character`
         editErrodescription.scrollIntoView({
             behavior: "smooth",
            block: "center"
        })
        return
    }
     if(isDuplicateTask(editTaskname.value, editingId)) {
        editErrorTaskname.innerHTML= `<div class="error-icon">!</div> Task name already exists`
        editErrorTaskname.scrollIntoView({
            behavior: "smooth",
            block: "center"
        })
        return;
    }
    // let editCheckBox=(document.querySelectorAll('input[name="editTaskType"]:checked'))

    // let editCheckBoxValue=[]
    // editCheckBox.forEach(element=>{
    //     element.addEventListener("change",function(){
    //         editCheckBoxValue=[...editCheckBox].filter(id=>id.checked).map(id=>id.value)
    //     })
    // })
    let updatedCheckbox = Array.from(document.querySelectorAll('input[name="editTaskType"]:checked')).map(cb => cb.value);
    let selectedEditStatus =document.querySelector('input[name="editstatus"]:checked')?.value || ""
    let updatedTask = {
        username:editUsername.value,
        taskname: editTaskname.value,
        useremail: editEmail.value,
        duedate:editDuedate.value,
        duetime: editTime.value,
        priorityselect: editPriority.value,
        estimatehours:editEstimatehour.value,
        projecturl:editUrl.value,
        progress:editprogress.value,
        description: editDescription.value,
        checkbox:updatedCheckbox,
        radioValue:selectedEditStatus
    }
    let index = tasks.findIndex(t => t.id === editingId)
    updatedTask.id = editingId   
    tasks[index] = updatedTask
    localStorage.setItem("task", JSON.stringify(tasks))
    updateDivCard(updatedTask, editingId)
    leftside.style.display = "none"
    color.style.display = "none"
}

function updateDivCard(task, id) {
    let card = document.querySelector(
        `.child-container[data-id="${id}"]`
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
btncancel.addEventListener("click",editCancelButton)
function editCancelButton(event){
    event.preventDefault()
    leftside.style.display = "none"
    color.style.display = "none"
}

// Delete Cards
const deleteParentContainer = document.querySelector(".parent-container")
let deleteContainer=document.getElementById("delete-container")
let deletePopColor=document.getElementById("deletepopup-colors")
let cancelBtn=document.getElementById("cancelPopup-btn")
let deleteBtn=document.getElementById("deletePopup-btn")
let changeLine=document.getElementById("deleteLine")
deleteParentContainer.addEventListener("click",deletePopups)
let deleteCard
let deleteId
function deletePopups(event){
    event.preventDefault()
    if(event.target.id=="delete"){
        deleteContainer.style.display="block"
        deletePopColor.style.display="block"
        deleteCard=event.target.closest(".child-container")
        deleteId=Number(deleteCard.dataset.id)

        let tasks = JSON.parse(localStorage.getItem("task"))
        // let ChanngeTaskname=tasks[deleteId].taskname
        // changeLine.innerText=`${ChanngeTaskname} was Permanently Deleted`

        let task = tasks.find(t => t.id === deleteId)
        changeLine.innerText = task.taskname
    }
}
deleteBtn.addEventListener("click",deleteDiv)

function deleteDiv(){
    let tasks = JSON.parse(localStorage.getItem("task"))
    let index = tasks.findIndex(t => t.id === deleteId)
    if (index === -1) return
    tasks.splice(index, 1)
    localStorage.setItem("task", JSON.stringify(tasks))
    deleteCard.remove();
    updateEmptyState()
    deleteContainer.style.display="none"
    deletePopColor.style.display="none"
}
cancelBtn.addEventListener("click",deleteCancelButton)

function deleteCancelButton(){
    deleteContainer.style.display="none"
    deletePopColor.style.display="none"
}


//Filter Cards
const filtertask = document.querySelectorAll(".taskfilter")
filtertask.forEach(link => { 
    link.addEventListener("click", filterTaskCards) 
})

function filterTaskCards(event){
    event.preventDefault()
    event.stopPropagation()
        let link=event.currentTarget
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
}


//DetailsPopup Show
const parentContainer = document.querySelector(".parent-container")
const popupcolor=document.querySelector(".detailspopup-color")
const childpopup=document.getElementById("childpopup")
const edit=document.getElementById("edit")
parentContainer.addEventListener("click", clickPopup) 

function clickPopup(event){
    if(event.target.id=="add" || event.target.id=="delete" || event.target.closest("#childpopup")){
        return
    }
    let child = event.target.closest(".child-container");
    if (child) {
        let id = Number(child.dataset.id)
        showPopup(id);
        popupcolor.style.display = "block"
        childpopup.style.display = "block"
    }
}
function showPopup(id) {
    let tasks = JSON.parse(localStorage.getItem("task")) || []
    let task = tasks.find(t => t.id === id)
    if (!task) return
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
    childpopup.innerHTML =` <i class="fa-solid fa-x" id="Popup"></i>
                        <!-- <i class="fa-regular fa-pen-to-square " id="add"></i> -->
                        <!-- <button class="add" type="button">Edit</button> -->
                        <!-- <button class="delete" type="button">Delete</button> -->
                        <h3 id="headname" class="headname">${task.taskname}</h3>
                        <p class="p">${task.description}</p>
                    <div class="details-cards">
                        <p><strong>📥Email :</strong> ${task.useremail}</p>
                        <p class="due-date"><strong>🗓️Due Date :</strong> ${task.duedate}</p>
                        <p class="user"><strong>👤User Name :</strong> ${task.username}</p>
                        <p><strong>⏱️Due Time :</strong> ${task.duetime}</p>
                        <p><strong>⏳Esatimate Hours : </strong>${task.estimatehours}</p>
                        <!-- <p>Progress : ${task.progress}</p> -->
                         <p><strong>🔗Project Url : </strong>  <a href="${task.projecturl}" target="_blank"   id="urlHref">View Link</a></p>
                         <p ><strong>📰Task Type : </strong>${task.checkbox}</p>
                         <p ><strong>📈Progress :</strong> ${task.progress}%</p>
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
}

let ClosePopup=document.getElementById("Popup")
childpopup.addEventListener("click", popUpClose) 
function popUpClose(event){
    if (event.target.id == "Popup") {
        event.stopPropagation()
        popupcolor.style.display = "none"
        childpopup.style.display = "none"
    }
}

const addTaskBtn = document.getElementById("addTaskBtn")
const taskForm = document.getElementById("form-validate") 
addTaskBtn.addEventListener("click", emptyButton )

function emptyButton(){
  taskForm.scrollIntoView({
    behavior: "smooth",
    block: "start"
  })
  document.getElementById("username").focus()
}
function EmptyState() {
  const tasks = JSON.parse(localStorage.getItem("task")) || []
  document.getElementById("emptyState").style.display = tasks.length == 0 ? "flex" : "none";
}

function updateEmptyState() {
  const cards = document.querySelectorAll(".child-container")
  const emptyState = document.getElementById("emptyState")

  if (cards.length == 0) {
    emptyState.style.display = "flex"
  } else {
    emptyState.style.display = "none"
  }
}
document.addEventListener("DOMContentLoaded", () => {
  updateEmptyState()
})



function isDuplicateTask(taskName,currentTaskId = null) {
    let tasks = JSON.parse(localStorage.getItem("task")) ||[]
        return tasks.some(task => {
        if (currentTaskId != null && task.id == currentTaskId) {
            return false
        }
        return task.taskname.trim().toLowerCase() == taskName.trim().toLowerCase();
    })
}

function showSubmitToast() {
  const toast = document.getElementById("submitToast")
  toast.classList.add("show")
  setTimeout(() => {
    toast.classList.remove("show")
  }, 3000)
}

let footAnchor=document.querySelectorAll(".footer-anchor")
let foot=document.getElementById("footer")
footAnchor.forEach(element=>{
    element.addEventListener('click',function(event){
        event.preventDefault()
    })
})

let barIcon = document.getElementById("bar-icon")
let menu = document.querySelector(".ul-element")
barIcon.addEventListener("click", function () {
    menu.classList.toggle("active")
});

let taskheader=document.getElementById("tasksheader")
let dashBoard=document.getElementById("dashboard")
let createForm=document.getElementById("createform")
let titleName=document.getElementById("title")
let activeTaskCard=document.getElementById("divCards")

let dashboardEmptystate=document.getElementById("emptyState")
let taskTitle=document.getElementById("taskTitle")
let taskEmptytask=document.getElementById("taskEmptystate")


taskheader.addEventListener('click',taskHeader)
function taskHeader(event){
    event.preventDefault();
    createForm.style.display="none"
    activeTaskCard.classList.remove("dashboardView")
    activeTaskCard.classList.add("taskcardsView")
    dashBoard.classList.remove("active")
    taskheader.classList.add("active")
    titleName.innerText="Task Cards"
    titleName.classList.add("taskSpan")
    // taskEmptytask.style.display="block"
    // dashboardEmptystate.style.display="none"
    taskTitle.innerText="Click your Dashboard and then Create Your Task"
    addTaskBtn.style.display="none"
    
}

dashBoard.addEventListener("click",dashboardHeader)
function dashboardHeader(event){
    event.preventDefault()
    
    createForm.style.display="block"
    // activeTaskCard.classList.remove("taskcardsView")
    activeTaskCard.classList.add("dashboardView")
    taskheader.classList.remove("active")
    dashBoard.classList.add("active")
    titleName.innerText="Task Dashboard"
    // dashboardEmptystate.style.display="flex"
    // taskEmptytask.style.display="none"
    taskTitle.innerText="No tasks yet 🚀"
    addTaskBtn.style.display="flex"

}