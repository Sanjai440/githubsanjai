let formValidation = document.getElementById("form-validate")
formValidation.addEventListener('submit', getIntput);
// input field declaration 
let userName, taskName, userEmail, dueDate, taskDescription, prioritySelect, radio, dueTime, estimateHours, projectUrl, checkBox, taskProgressValue, span, storedValues
// error field declaration
let errorName, errorTask, errorEmail, errorpriority, errorDescription, errorstatus, errorDate, errorTime, errorEstimatehour, errorUrl, errorCheckbox
// let isDateInitialized = false
function getIntput(event) {
    event.preventDefault()
    userName = document.getElementById("username")
    taskName = document.getElementById("taskname")
    userEmail = document.getElementById("email")
    dueDate = document.getElementById("dueDate")
    taskDescription = document.getElementById("description")
    prioritySelect = document.getElementById("priority")
    dueTime = document.getElementById("time")
    estimateHours = document.getElementById("estimatehour")
    projectUrl = document.getElementById("url")
    checkBox = document.querySelectorAll(`input[name="task-type"]`)
    storedValues = []
    checkBox.forEach(currentItem => {
        currentItem.addEventListener('change', function () {
            storedValues = [...checkBox].filter(box => box.checked).map(box => box.value)
            if (storedValues.length==0) {
                errorCheckbox.innerHTML = ""
            }
        })
    })
    radio = document.querySelector(`input[name="status"]:checked`)
    errorName = document.getElementById("errorusername")
    errorTask = document.getElementById("errortaskname")
    errorEmail = document.getElementById("erroremail")
    errorDate = document.getElementById("errordueDate")
    errorTime = document.getElementById("errortime")
    errorEstimatehour = document.getElementById("errorestimatehour")
    errorUrl = document.getElementById("errorurl")
    errorpriority = document.getElementById("errorpriority")
    errorDescription = document.getElementById("errordescription")
    errorCheckbox = document.getElementById("errortask-type")
    errorstatus = document.getElementById("errorstatus")
    let isvalid = setValue()
    if (isvalid) {
        if (isDuplicateTask(taskName.value)) {
            errorTask.innerHTML = `<div class="error-icon">!</div> Task name already exists`
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
        showToast("Task added successfully", "success")
        AllFilter()
    }
}

let reset = document.getElementById("btn2")
reset.addEventListener("click", resetForm)
function resetForm() {
    let resetValue = ["username", "taskname", "email", "dueDate", "time", "priority", "url", "estimatehour", "description", "task-type", "status",]
    resetValue.forEach(id => {
        let resetName = document.getElementById(id)
        let resetError = document.getElementById("error" + id)
        if (resetError) {
            resetError.innerText = ""
        }
        if (resetName) {
            resetName.style.border = "2px solid rgb(218, 213, 213)"
        }
    })
}
document.addEventListener("DOMContentLoaded", function () {
    dueDate = document.getElementById("dueDate")
    let todayDate = new Date().toISOString().split("T")[0]
    dueDate.min = todayDate
})

function setValue() {
    let userNamePattern = /^[A-Za-z]+$/
    let gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    // let taskNamePattern=/^[A-Za-z]$/
    let isvalid = true
    let scrollElement = null
    if (userName.value.trim() == "") {
        errorName.innerHTML = `<div class="error-icon">!</div>Enter your Name`
        userName.style.border = " 2px solid red "
        if (!scrollElement) {
            scrollElement = userName
        }
        isvalid = false
    }
    else if (!userNamePattern.test(userName.value)) {
        errorName.innerHTML = `<div class="error-icon">!</div> Not allowed space,spacial character and then number*`
        userName.style.border = " 2px solid red "
        if (!scrollElement) {
            scrollElement = userName
        }
        isvalid = false
    }
    else if (userName.value.trim().length < 3) {
        errorName.innerHTML = `<div class="error-icon">!</div>Enter your name more than 3 charater`
        userName.style.border = " 2px solid red "
        if (!scrollElement) {
            scrollElement = userName
        }
        isvalid = false
    }
    if (taskName.value.trim() == "") {
        errorTask.innerHTML = `<div class="error-icon">!</div>Enter your Task Name *`
        taskName.style.border = " 2px solid red "
        if (!scrollElement) {
            scrollElement = taskName
        }
        isvalid = false
    }
    // else if(!taskNamePattern.test(taskName.value)){
    //     errorTask.innerHTML=`<div class="error-icon">!</div> Enter your Task Name *`
    //     taskName.style.border = " 2px solid red "
    //     newValid=false
    // }
    else if (taskName.value.trim().length < 7) {
        errorTask.innerHTML = `<div class="error-icon">!</div> Enter your task name mmore than 7 character*`
        taskName.style.border = " 2px solid red "
        if (!scrollElement) {
            scrollElement = taskName
        }
        isvalid = false
    }
    if (userEmail.value == "") {
        errorEmail.innerHTML = `<div class="error-icon">!</div>Enter your Email *`
        userEmail.style.border = "2px solid red"
        if (!scrollElement) {
            scrollElement = userEmail
        }
        isvalid = false
    }
    else if (!gmailPattern.test(userEmail.value)) {
        errorEmail.innerHTML = `<div class="error-icon">!</div>Invalid Email *`
        userEmail.style.border = "2px solid red"
        if (!scrollElement) {
            scrollElement = userEmail
        }
        isvalid = false
    }
    if (dueDate.value == "") {
        errorDate.innerHTML = `<div class="error-icon">!</div>Enter the Date *`
        dueDate.style.border = "2px solid red"
        if (!scrollElement) {
            scrollElement = dueDate
        }
        isvalid = false
    }
    if (dueTime.value == "") {
        errorTime.innerHTML = `<div class="error-icon">!</div>Set the time *`
        dueTime.style.border = "2px solid red"
        if (!scrollElement) {
            scrollElement = dueTime
        }
        isvalid = false
    }
    if (dueDate.value && dueTime.value) {
        let now = new Date()
        let selectedDate = new Date(dueDate.value)
        if (selectedDate.toDateString() == now.toDateString()) {
            let currentTime = now.toTimeString().slice(0, 5)
            if (dueTime.value < currentTime) {
                errorTime.innerHTML = `<div class="error-icon">!</div>Past time not allowed *`
                dueTime.style.border = "2px solid red"
                if (!scrollElement) {
                    scrollElement = dueTime
                }
                isvalid = false
            }
        }
    }
    if (prioritySelect.value == "") {
        errorpriority.style.display = "block"
        errorpriority.innerHTML = `<div class="error-icon">!</div>Select the Priority *`
        prioritySelect.style.border = "2px solid red"
        if (!scrollElement) {
            scrollElement = prioritySelect
        }
        isvalid = false
    }
    if (estimateHours.value == "") {
        errorEstimatehour.innerHTML = `<div class="error-icon">!</div>Enter the hours *`
        estimateHours.style.border = "2px solid red"
        if (!scrollElement) {
            scrollElement = estimateHours
        }
        isvalid = false
    }
    if (projectUrl.value == "") {
        errorUrl.innerHTML = `<div class="error-icon">!</div>Enter the url *`
        projectUrl.style.border = "2px solid red"
        if (!scrollElement) {
            scrollElement = projectUrl
        }
        isvalid = false
    }
    let urlValue = projectUrl.value.trim()
    if (urlValue) {
        if (!urlValue.startsWith("http://") && !urlValue.startsWith("https://")) {
            projectUrl.value = "https://" + urlValue
        }
    }
    if (taskDescription.value.trim() == "") {
        errorDescription.innerHTML = `<div class="error-icon">!</div>Write the description *`
        taskDescription.style.border = "2px solid red"
        if (!scrollElement) {
            scrollElement = taskDescription
        }
        isvalid = false
    }
    else if (taskDescription.value.trim().length < 25) {
        errorDescription.innerHTML = `<div class="error-icon">!</div>Write the description More than 25 Character *`
        taskDescription.style.border = "2px solid red"
        if (!scrollElement) {
            scrollElement = taskDescription
        }
        isvalid = false
    }
    let anyChecked = [...checkBox].some(cb => cb.checked)
    if (!anyChecked) {
        errorCheckbox.innerHTML = `<div class="error-icon">!</div>Select the task type *`
        if (!scrollElement) {
            scrollElement = anyChecked
        }
        isvalid = false
    }
     if (!radio) {
        errorstatus.innerHTML = `<div class="error-icon">!</div>Select the status *`
        if (!scrollElement) {
            scrollElement = radio
        }
        isvalid = false
    }

    if (scrollElement) {
        scrollElement.scrollIntoView({
            behavior: "smooth",
            block: "center"
        })
        scrollElement.focus()
    }

    let newArr = ["username", "taskname", "email", "dueDate", "time", "priority", "estimatehour", "url", "description", "status", "task-type"]
    newArr.forEach((id) => {
        let newVal = document.getElementById(id)
        if (newVal) {
            newVal.addEventListener("input", clearerror)
            newVal.addEventListener("change", clearerror)
            function clearerror() {
                let errorEle = document.getElementById("error" + id)
                if (errorEle) {
                    errorEle.innerText = ""
                }
                if (newVal.style) {
                    newVal.style.border = "2px solid rgb(218, 213, 213)"
                }
            }
        }
        if (id == "status" || id == "task-type") {
            let radios = document.querySelectorAll('input[name="status"]');
            radios.forEach(radioBtn => {
                radioBtn.addEventListener("change", function () {
                    errorstatus.innerHTML = ""
                })
            })
            let taskCheckboxs = document.querySelectorAll('input[name="task-type"]')
            taskCheckboxs.forEach(currentBox => {
                currentBox.addEventListener("change", function () {
                    errorCheckbox.innerHTML = ""
                })
            })
        }
    })
    return isvalid
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
    newDiv.dataset.status = setVal
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
    let storedValues = [...checkBox].filter(box => box.checked).map(box => box.value)
    let tasks = JSON.parse(localStorage.getItem("task")) || []
    let taskValue = {
        id: Date.now(),
        username: userName.value,
        taskname: taskName.value,
        useremail: userEmail.value,
        duedate: dueDate.value,
        duetime: dueTime.value,
        priorityselect: prioritySelect.value,
        estimatehours: estimateHours.value,
        description: taskDescription.value,
        projecturl: projectUrl.value,
        checkbox: storedValues,
        radioValue: radio.value
    }
    tasks.push(taskValue)
    localStorage.setItem("task", JSON.stringify(tasks))
}
window.addEventListener("DOMContentLoaded", function () {
    let tasks = JSON.parse(localStorage.getItem("task")) 
    tasks.forEach(item => {
        userName = { value: item.username }
        taskName = { value: item.taskname }
        userEmail = { value: item.useremail }
        dueDate = { value: item.duedate }
        dueTime = { value: item.duetime }
        prioritySelect = { value: item.priorityselect }
        estimateHours = { value: item.estimatehours }
        taskDescription = { value: item.description }
        projectUrl = { value: item.projecturl }
        storedValues = item.checkbox || []
        radio = { value: item.radioValue }
        createDiv(item.id)
    })
    EmptyState()
})

//Edit Cards
let editUsername = document.getElementById("editusername")
let editTaskname = document.getElementById("edittaskname")
let editEmail = document.getElementById("editemail")
let editDuedate = document.getElementById("editdue-date")
let editTime = document.getElementById("editTime")
let editPriority = document.getElementById("editpriority")
let editEstimatehour = document.getElementById("editEstimatehour")
let editUrl = document.getElementById("editUrl")
let editDescription = document.getElementById("editdescription")
let editprogress = document.getElementById("edittask-progress")
let editPercentage = document.getElementById("editpercentage")
let editTasktype = document.querySelectorAll('input[name="editTaskType"]')
let editStatusRadios = document.querySelectorAll('input[name="editstatus"]')
//getform
let leftside = document.querySelector(".side")
let color = document.querySelector(".color")
let btncancel = document.getElementById("btncancel")
let btnadd = document.getElementById("btnadd")
let deletesIcon = document.getElementById("delete")
let editingId = null
document.addEventListener("click", editButtonClick)

function editButtonClick(event) {
    if (event.target.id == "add") {
        event.stopPropagation()
        let card = event.target.closest(".child-container")
        if (!card) return
        editingId = Number(card.dataset.id)
        let tasks = JSON.parse(localStorage.getItem("task"))
        let task = tasks.find(t => t.id == editingId)
        let todayDate = new Date().toISOString().split("T")[0]
        editDuedate.min = todayDate
        editDuedate.value = todayDate
        editUsername.value = task.username
        editTaskname.value = task.taskname
        editEmail.value = task.useremail
        editTime.value = task.duetime
        editPriority.value = task.priorityselect
        editEstimatehour.value = task.estimatehours
        editUrl.value = task.projecturl
        editDescription.value = task.description
        let progressValue = task.progress || 0
        editprogress.value = progressValue
        editPercentage.innerText = `${progressValue}%`
        editprogress.addEventListener("input", function () {
            editPercentage.innerText = `${this.value}%`
        })
        editTasktype.forEach(cb => {
            cb.checked = task.checkbox.includes(cb.value)
        })
        editStatusRadios.forEach(radio => {
            radio.checked = (radio.value == task.radioValue)
        })
        leftside.style.display = "block"
        color.style.display = "block"
    }
}
btnadd.addEventListener("click", editButtonAdd)

let editErrorname = document.getElementById("erroreditusername")
let editErrorTaskname = document.getElementById("erroredittaskname")
let editErrordescription = document.getElementById("erroreditdescription")
let editErroremail = document.getElementById("erroreditemail")
let editErrorestimatehour = document.getElementById("erroreditEstimatehour")
let editErrorurl = document.getElementById("erroreditUrl")
let editErrorcheckbox = document.getElementById("erroreditTaskType")
let editErrorTime=document.getElementById("erroreditTime")

function editButtonAdd(event) {
    event.stopPropagation()

    if (editingId == null) return
    let tasks = JSON.parse(localStorage.getItem("task"))
    let edituserNamePattern = /^[A-Za-z]+$/
    let editgmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
    let editCheckbox = Array.from(editTasktype).some(element => element.checked)
    let editValue = true
    let firstInvalidField = null
    if (editUsername.value.trim() == "") {
        editErrorname.innerHTML = `<div class="editerror-icon">!</div> Enter your name *`
        if (!firstInvalidField) {
            firstInvalidField = editUsername
        }
        editValue = false
    }
    else if(editUsername.value.trim().length<3){
        editErrorname.innerHTML=`<div class="editerror-icon">!</div> Enter your name more than 3 character *`
         if (!firstInvalidField) {
            firstInvalidField = editUsername
        }
        editValue = false
    }
    else if(!edituserNamePattern.test(editUsername.value)){
        editErrorname.innerHTML=`<div class="editerror-icon">!</div> Not allowed number ,special character,and space *`
        if(!firstInvalidField) {
            firstInvalidField = editUsername
        }
        editValue = false
    }
    if (editTaskname.value.trim() == "") {
        editErrorTaskname.innerHTML = `<div class="editerror-icon">!</div> Enter your task name *`
        if (!firstInvalidField) {
            firstInvalidField = editTaskname
        }
        editValue = false
    }
    else if(editTaskname.value.trim().length<7){
        editErrorTaskname.innerHTML=`<div class="editerror-icon">!</div> Enter your task name more than 7 character *`
        if (!firstInvalidField) {
            firstInvalidField = editTaskname
        }
        editValue = false
    }
    if (editEmail.value.trim() == "") {
        editErroremail.innerHTML = `<div class="editerror-icon">!</div> Enter your email`
        if (!firstInvalidField) {
            firstInvalidField = editEmail
        }
        editValue = false
    }
    else if (!editgmailPattern.test(editEmail.value)) {
        editErroremail.innerHTML = `<div class="editerror-icon">!</div> Invalid email`
        if (!firstInvalidField) {
            firstInvalidField = editEmail
        }
        editValue = false
    }
    if(editTime.value==""){
        editErrorTime.innerHTML=`<div class="editerror-icon">!</div> Set the time`
         if (!firstInvalidField) {
            firstInvalidField = editTime
        }
        editValue=false
    }
    let selectedDateTime = new Date(editDuedate.value + "T" + editTime.value)
    let currentDateTime = new Date()
    if (selectedDateTime <= currentDateTime) {
        editErrorTime.innerHTML = `<div class="editerror-icon">!</div> Past time not allowed`
        if (!firstInvalidField) {
            firstInvalidField = editTime
        }
        editValue = false
    }

    if (editEstimatehour.value.trim() == "") {
        editErrorestimatehour.innerHTML = `<div class="editerror-icon">!</div> Enter the estimate hour`
        if (!firstInvalidField) {
            firstInvalidField = editEstimatehour
        }
        editValue = false
    }
    if (editUrl.value.trim() == "") {
        editErrorurl.innerHTML = `<div class="editerror-icon">!</div> Enter Url`
        if (!firstInvalidField) {
            firstInvalidField = editUrl
        } editValue = false
    }
    if (editDescription.value.trim() == "") {
        editErrordescription.innerHTML = `<div class="editerror-icon">!</div> Write the description`
        if (!firstInvalidField) {
            firstInvalidField = editDescription
        }
        editValue = false
    }
    else if (editDescription.value.trim().length < 25) {
        editErrordescription.innerHTML = `<div class="editerror-icon">!</div> Write the description more than 25 character`
        if (!firstInvalidField) {
            firstInvalidField = editDescription
        }
        editValue = false
    }
    if (!editCheckbox) {
        editErrorcheckbox.innerHTML = `<div class="editerror-icon">!</div> Select the tasktype`
        if (!firstInvalidField) {
            firstInvalidField = editCheckbox
        }
        editValue = false
    }
    if (isDuplicateTask(editTaskname.value, editingId)) {
        editErrorTaskname.innerHTML = `<div class="error-icon">!</div> Task name already exists`
        if (!firstInvalidField) {
            firstInvalidField = editTaskname
        }
        editValue=false
    }
    if (firstInvalidField) {
        firstInvalidField.scrollIntoView({ 
            behavior: "smooth",
             block: "center" 
            })
        firstInvalidField.focus()
    }
    let editUrlValue = editUrl.value.trim()
    if (editUrlValue) {
        if (!editUrlValue.startsWith("http://") && !editUrlValue.startsWith("https://")) {
            editUrl.value = "https://" + editUrlValue
        }
    }
    if (editValue) {
        let updatedCheckbox = Array.from(document.querySelectorAll('input[name="editTaskType"]:checked')).map(cb => cb.value)
        let selectedEditStatus = document.querySelector('input[name="editstatus"]:checked')?.value || ""
        let updatedTask = {
            username: editUsername.value,
            taskname: editTaskname.value,
            useremail: editEmail.value,
            duedate: editDuedate.value,
            duetime: editTime.value,
            priorityselect: editPriority.value,
            estimatehours: editEstimatehour.value,
            projecturl: editUrlValue,
            progress: Number(editprogress.value) || 0,
            description: editDescription.value,
            checkbox: updatedCheckbox,
            radioValue: selectedEditStatus
        }
        let index = tasks.findIndex(t => t.id == editingId)
        updatedTask.id = editingId
        tasks[index] = updatedTask
        localStorage.setItem("task", JSON.stringify(tasks))
        updateDivCard(updatedTask, editingId)
        statusFilter()
        showToast(`"${updatedTask.taskname}" was updated`, "update")
        leftside.style.display = "none"
        color.style.display = "none"
    }
}
let errorfield = ["editusername", "edittaskname", "editdescription", "editemail", "editEstimatehour", "editUrl","editTime"]
errorfield.forEach(id => {
    let inputEle = document.getElementById(id);
    let errorEle = document.getElementById("error" + id);
    inputEle.addEventListener("input", () => {
        errorEle.innerHTML = ""
        inputEle.style.border = "2px solid rgb(218, 213, 213)"
    })
})
editTasktype.forEach(cb => {
    cb.addEventListener("change", function () {
        editErrorcheckbox.innerHTML = ""
    })
})

function updateDivCard(task, id) {
    let card = document.querySelector(`.child-container[data-id="${id}"]`)
    if (!card) return
    card.dataset.priority = task.priorityselect
    card.dataset.status = task.radioValue
    let formattedDueDate = ""
    if (task.duedate) {
        let newDate = new Date(task.duedate)
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let getMon = months[newDate.getMonth()]
        let getDate = newDate.getDate()
        let getYear = newDate.getFullYear()
        formattedDueDate = `${getMon} ${getDate},${getYear}`
    }
    let updateNewValue = task.priorityselect
    let updatePriorityClass = ""
    let updateFieldClass = ""
    if (updateNewValue == "low") {
        updatePriorityClass = "low"
        updateFieldClass = "low-field"
    }
    else if (updateNewValue == "medium") {
        updatePriorityClass = "medium"
        updateFieldClass = "medium-field"
    }
    else if (updateNewValue == "high") {
        updatePriorityClass = "high"
        updateFieldClass = "high-field"
    }
    let newRadioValue = task.radioValue
    let firstClassValue = ""
    let secondClassValue = ""
    if (newRadioValue == "pending") {
        firstClassValue = "pending"
        secondClassValue = "pending-field"
    }
    else if (newRadioValue == "In Progress") {
        firstClassValue = "in-progress "
        secondClassValue = "progress-field"
    }
    else if (newRadioValue == "completed") {
        firstClassValue = "completed"
        secondClassValue = "completed-field"
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
        </div>`
    PriorityFilter()
}
btncancel.addEventListener("click", editCancelButton)
function editCancelButton(event) {
    event.preventDefault()
    leftside.style.display = "none"
    color.style.display = "none"
}

// Delete Cards
let deleteParentContainer = document.querySelector(".parent-container")
let deleteContainer = document.getElementById("delete-container")
let deletePopColor = document.getElementById("deletepopup-colors")
let cancelBtn = document.getElementById("cancelPopup-btn")
let deleteBtn = document.getElementById("deletePopup-btn")
let changeLine = document.getElementById("deleteLine")
deleteParentContainer.addEventListener("click", deletePopups)
let deleteCard
let deleteId
function deletePopups(event) {
    event.preventDefault()
    if (event.target.id == "delete") {
        deleteContainer.style.display = "block"
        deletePopColor.style.display = "block"
        deleteCard = event.target.closest(".child-container")
        deleteId = Number(deleteCard.dataset.id)
        let tasks = JSON.parse(localStorage.getItem("task"))
        let task = tasks.find(t => t.id == deleteId)
        changeLine.innerText = task.taskname
    }
}
deleteBtn.addEventListener("click", deleteDiv)

function deleteDiv() {
    let tasks = JSON.parse(localStorage.getItem("task"))
    let index = tasks.findIndex(t => t.id == deleteId)
    if (index == -1) return
    tasks.splice(index, 1)
    localStorage.setItem("task", JSON.stringify(tasks))
    deleteCard.remove()
    PriorityFilter()
    statusFilter()
    updateEmptyState()
    deleteContainer.style.display = "none"
    deletePopColor.style.display = "none"
    showToast(`"${changeLine.innerText}" deleted`, "delete")
}
cancelBtn.addEventListener("click", deleteCancelButton)
function deleteCancelButton() {
    deleteContainer.style.display = "none"
    deletePopColor.style.display = "none"
}

//Filter Cards
let selectedPrioritys = "all"
let selectedStatus = "all"
let filtertask = document.querySelectorAll(".taskfilter")
filtertask.forEach(link => {
    link.addEventListener("click", filterTaskCards)
})

function filterTaskCards(event) {
    event.preventDefault()
    event.stopPropagation()
    let link = event.currentTarget
    selectedPrioritys = link.dataset.filter
    bothFilters()
    updateDropdowncount()
    updateEmptyState()
    filtertask.forEach(element => {
        element.classList.remove("active")
        let countSpan = element.nextElementSibling
        if (countSpan && countSpan.classList.contains("countElement")) {
            countSpan.style.display = "none"
        }
    })
    link.classList.add("active")
    let visibleCards = document.querySelectorAll('.child-container:not([style*="none"])').length
    let countSpan = link.nextElementSibling
    if (countSpan) {
        countSpan.innerText = visibleCards
        countSpan.style.display = "inline-block"
    }
}

function AllFilter() {
    let allFilterBtn = document.querySelector('.taskfilter[data-filter="all"]')
    if (allFilterBtn) {
        allFilterBtn.click()
    }
}

function PriorityFilter() {
    let activeFilter = document.querySelector(".taskfilter.active")
    if (activeFilter) {
        activeFilter.click()
    }
}

let statusDropdown = document.getElementById("statusdropdown")
let statusCount = document.getElementById("dropdownCount")
statusDropdown.addEventListener("change", statusFilter)
function statusFilter() {
    selectedStatus = statusDropdown.value || "all"
    bothFilters()
    updateEmptyState()
    let visibleCards = document.querySelectorAll('.child-container:not([style*="none"])').length
    statusCount.innerText = visibleCards
    if(visibleCards){
        statusCount.style.display = "inline-block";
    } 
    else {
         statusCount.style.display = "none";
    }    
}

function bothFilters() {
    let cards = document.querySelectorAll(".child-container")
    cards.forEach(card => {
        let cardPriority = card.dataset.priority
        let cardStatus = card.dataset.status
        let priorityMatch
        if (selectedPrioritys == "all") {
            priorityMatch = true
        }
        else if (cardPriority == selectedPrioritys) {
            priorityMatch = true
        }
        else {
            priorityMatch = false
        }

        let statusMatch
        if (selectedStatus == "all") {
            statusMatch = cardStatus != "completed"
        }
        else if (cardStatus == selectedStatus) {
            statusMatch = true
        }
        else {
            statusMatch = false
        }
        if (priorityMatch && statusMatch) {
            card.style.display = "block"
        } else {
            card.style.display = "none"
        }
    })
}

function updateDropdowncount() {
    let visibleCards = document.querySelectorAll('.child-container:not([style*="none"])').length
    statusCount.innerText = visibleCards
    if (visibleCards) {
        statusCount.style.display = "inline-block"
    }
    else {
        statusCount.style.display = "none"
    }
}

//DetailsPopup Show
let parentContainer = document.querySelector(".parent-container")
let popupcolor = document.querySelector(".detailspopup-color")
let childpopup = document.getElementById("childpopup")
let edit = document.getElementById("edit")
parentContainer.addEventListener("click", clickPopup)

function clickPopup(event) {
    if (event.target.id == "add" || event.target.id == "delete" || event.target.closest("#childpopup")) {
        return
    }
    let child = event.target.closest(".child-container")
    if (child) {
        let id = Number(child.dataset.id)
        showPopup(id);
        popupcolor.style.display = "block"
        childpopup.style.display = "block"
    }
}
function showPopup(id) {
    let tasks = JSON.parse(localStorage.getItem("task"))
    let task = tasks.find(t => t.id == id)
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
    let progressValue = task.progress ?? 0
    
    childpopup.innerHTML = ` <i class="fa-solid fa-x" id="Popup"></i>
                        <!-- <i class="fa-regular fa-pen-to-square " id="add"></i> -->
                        <!-- <button class="add" type="button">Edit</button> -->
                        <!-- <button class="delete" type="button">Delete</button> -->
                        <h3 id="headname" class="headname">${task.taskname}</h3>
                    <div id="details-container" class="value">
                        <p class="p">${task.description}</p>
                      <div class="details-cards">
                        <p><strong>📥Email :</strong> ${task.useremail}</p>
                        <p class="due-date"><strong>🗓️Due Date :</strong> ${task.duedate}</p>
                        <p class="user"><strong>👤User Name :</strong> ${task.username}</p>
                        <p><strong>⏱️Due Time :</strong> ${task.duetime}</p>
                        <p><strong>⏳Esatimate Hours : </strong>${task.estimatehours}</p>
                        <!-- <p>Progress : ${progressValue}</p> -->
                         <p><strong>🔗Project Url : </strong>  <a href="${task.projecturl}" target="_blank"   id="urlHref">View Link</a></p>
                         <p ><strong>📈Progress :</strong> ${progressValue}%</p>
                         <p id="task-type"><strong>📰Task Type : </strong>${task.checkbox}</p>
                       </div>
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

let ClosePopup = document.getElementById("Popup")
childpopup.addEventListener("click", popUpClose)
function popUpClose(event) {
    if (event.target.id == "Popup") {
        event.stopPropagation()
        popupcolor.style.display = "none"
        childpopup.style.display = "none"
    }
}

let addTaskBtn = document.getElementById("addTaskBtn")
let taskForm = document.getElementById("form-validate")
addTaskBtn.addEventListener("click", emptyButton)

function emptyButton() {
    taskForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
    })
    document.getElementById("username").focus()
}
function EmptyState() {
    let tasks = JSON.parse(localStorage.getItem("task"))
    let emptyState = document.getElementById("emptyState")

    if(tasks.length == 0) {
        emptyState.style.display = "flex"
    } 
    else {
        emptyState.style.display = "none"
    }
 
}


function updateEmptyState() {
    let cards = document.querySelectorAll(".child-container")
    let emptyState = document.getElementById("emptyState")
    let visibleCount = 0
    cards.forEach(card => {
        if(card.style.display != "none") {
            visibleCount++
        }
    })
    if(visibleCount == 0) {
        emptyState.style.display = "flex"
        if (selectedPrioritys && selectedPrioritys != "all") {
            addTaskBtn.style.display = "none"
        }
    } 
    else {
        emptyState.style.display = "none"
    }
}
    updateEmptyState()

function isDuplicateTask(taskName, currentTaskId = null) {
    let tasks = JSON.parse(localStorage.getItem("task")) 
    return tasks.some(task => {
        if (currentTaskId != null && task.id == currentTaskId) {
            return false
        }
        return task.taskname.trim().toLowerCase() == taskName.trim().toLowerCase()
    })
}

function showToast(message, type = "success") {
    let toast = document.getElementById("submitToast")
    toast.innerText = message
    toast.classList.remove("success", "delete", "update")
    toast.classList.add("show", type)
    setTimeout(() => {
        toast.classList.remove("show")
    }, 3000)
}

let footAnchor = document.querySelectorAll(".footer-anchor")
let foot = document.getElementById("footer")
footAnchor.forEach(element => {
    element.addEventListener('click', function (event) {
        event.preventDefault()
    })
})

let barIcon = document.getElementById("bar-icon")
let menu = document.querySelector(".ul-element")
barIcon.addEventListener("click", menuBar)
function menuBar() {
    menu.classList.toggle("active")
    if(menu.classList.contains("active")) {
        barIcon.classList.remove("fa-bars")
        barIcon.classList.add("fa-xmark")
    }
    else {
        barIcon.classList.remove("fa-xmark")
        barIcon.classList.add("fa-bars")

    }
}

let taskheader = document.getElementById("tasksheader")
let dashBoard = document.getElementById("dashboard")
let createForm = document.getElementById("createform")
let activeTaskCard = document.getElementById("divCards")
let titleName = document.getElementById("title")
let dashboardEmptystate = document.getElementById("emptyState")
let taskTitle = document.getElementById("taskTitle")
let taskEmptytask = document.getElementById("taskEmptystate")
let taskDivCards=document.getElementById("taskCards")
taskheader.addEventListener('click', taskHeader)

function taskHeader(event) {
    event.preventDefault()
    createForm.style.display = "none"
    activeTaskCard.classList.remove("dashboardView")
    activeTaskCard.classList.add("taskcardsView")
    dashBoard.classList.remove("active")
    taskheader.classList.add("active")
    titleName.innerText = "Task Cards"
    titleName.classList.add("taskSpan")
    taskTitle.innerText = "Click your Dashboard and then Create Your Task"
    addTaskBtn.style.display = "none"
    activeTaskCard.style.display="block"
    taskDivCards.classList.add("taskContainer")
}
dashBoard.addEventListener("click", dashboardHeader)

function dashboardHeader(event) {
    event.preventDefault()
    activeTaskCard.classList.add("dashboardView")
    taskheader.classList.remove("active")
    dashBoard.classList.add("active")
    createForm.style.display = "block"
    activeTaskCard.style.display="block"
    titleName.innerText = "Task Dashboard"
    taskTitle.innerText = "No tasks yet 🚀"
    addTaskBtn.style.display = "flex"
    taskDivCards.classList.add("parent-container")
    taskDivCards.classList.remove("taskContainer")
}
