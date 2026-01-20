let createButton=document.getElementById("btn1")




let formValidation=document.getElementById("form-validate")




formValidation.addEventListener('submit',getIntput);

let userName, taskName,userEmail,dueDate ,taskDescription,prioritySelect, radio




// let taskProgress=document.getElementById("task-progress")
// let percentage=document.getElementById("percentage")
    


// taskProgress.addEventListener('input',function(){
//     percentage.innerText=`${taskProgress.value}%`
    
// })




let errorName,errorTask,errorEmail,errorpriority,errorDescription,errorstatus

let values=false

function getIntput(event){
    event.preventDefault()
    
    userName=document.getElementById("username").value
    
    taskName=document.getElementById("taskname")

    
    userEmail=document.getElementById("email")
    
    dueDate=document.getElementById("due-date")

    // console.log(dueDate);
    
    taskDescription=document.getElementById("description").value
    
    
    prioritySelect = document.getElementById("priority");
    
    radio=document.querySelector(`input[name="status"]:checked`)?.value || "";


    
  input=document.getElementsByTagName("input")  


    errorName=document.getElementById("errorusername")

    errorTask=document.getElementById("errortaskname")
    errorEmail=document.getElementById("erroremail")
    errorDate=document.getElementById("errordue-date")

    errorpriority=document.getElementById("errorpriority")


    errorDescription=document.getElementById("errordescription")

    errorstatus=document.getElementById("errorstatus")


// localStorage.setItem("taskNames",taskName)

    // let value1={
    //     taskName:taskName,
    //     // userEmail:userEmail
    //     taskDescription:taskDescription,

    // }
    // localStorage.setItem("data",JSON.stringify(value1))

    
    submits()
    let isvalid=setvalue()

    if(isvalid){
        createDiv()
    }
}






let taskProgress=document.getElementById("task-progress")
let percentage=document.getElementById("percentage")

taskProgress.addEventListener('input',function(){
    percentage.innerText=`${taskProgress.value}%`
    // isvalid=false
})



function setvalue(){


    let child=document.querySelectorAll(".child")

    let isvalid=true
    
    if(userName==""){
        errorName.innerText="Enter your Name"

        isvalid=false
    }

  
    if(taskName.value== ""){
        errorTask.innerText="Enter your Task Name *"
        taskName.style.border=" 2px solid red "
      
        isvalid=false
        
    }
 
    if(userEmail.value==""){
        errorEmail.innerText="Enter your Email *"
        userEmail.style.border="2px solid red"

        isvalid=false
       
    }
    
    if(dueDate.value==""){
        errorDate.innerText="Enter the Date *"
        dueDate.style.border="2px solid red"

        isvalid=false
    }

    if(taskDescription==""){
        errorDescription.innerText="Write the description *"
        isvalid=false
    }
    
    
    
    if(prioritySelect.value==""){
        errorpriority.innerText="Select the Priority *"
        prioritySelect.style.border="2px solid red"
        isvalid=false
    }


    if(radio==""){
        errorstatus.innerText="select the status"
        isvalid=false
    }
    let scrollEle=[
        {name:taskName,error:errorTask},
        {name:userEmail,error:errorEmail},
        {name:dueDate,error:errorDate},
        {name:prioritySelect,error:errorpriority}]

    
    for(let element of scrollEle){
        if(element.name.value==""){
            element.name.scrollIntoView({
                        behavior:"smooth",
                        block:"center"
                    })
                    element.name.focus()
                    break;
            


        }
    }
    










   
    
    let newArr=["username","taskname","email","due-date","priority","description"]
    
    newArr.forEach((id)=>{
        
        let newVal=document.getElementById(id)
        if(newVal){
            
            newVal.addEventListener("input",()=>{
    
                let errorEle=document.getElementById("error" +id)
                let names=document.getElementById(id)
                if(errorEle || names){
                    errorEle.innerText=""
                    names.style.border="2px solid rgb(218, 213, 213)"

                 
                    
                    
                }
            })
        }

    })

    return isvalid

    // if(!values){
    // // values=true
    // createDiv()
}

// createDiv()


// c

    


// function saveToLocalStorage() {

//     let task = {
//         taskName,
//         userEmail,
//         dueDate,
//         taskDescription,
//         priority: prioritySelect,
//         status: radio
//     }

//     let tasks = JSON.parse(localStorage.getItem("tasks")) || []

//     tasks.push(task)

//     localStorage.setItem("tasks", JSON.stringify(tasks))
// }






// window.addEventListener("DOMContentLoaded", () => {

//     if(true){

    
//     let tasks = JSON.parse(localStorage.getItem("tasks")) || []

//     tasks.forEach(task => {
//         taskName = task.taskName
//         taskDescription = task.taskDescription
//         dueDate = task.dueDate
//         prioritySelect = task.priority
//         radio = task.status

//         createDiv()
//     })
// }
// })







const filtertask = document.querySelectorAll(".taskfilter");


filtertask.forEach(link=>{ // high
    link.addEventListener("click",function(event){
        event.preventDefault()
        
        let value=link.dataset.filter
        const taskcontent = document.querySelectorAll(".child-container");
        taskcontent.forEach(cards=>{
            let cardsvalue=cards.dataset.priority //medium
            if(value=="all"|| cardsvalue==value){ //high == medium
                cards.style.display="block"
            }
            else{
                cards.style.display="none"
            }
        })

        filtertask.forEach(element=>{

            element.classList.remove("active")
        })
        link.classList.add("active")
    })

})













// filterLinks.forEach(link => {
//   link.addEventListener("click", (e) => {
//     e.preventDefault();

//     const filterValue = link.dataset.filter;

//     taskCards.forEach(card => {
//       const cardPriority = card.dataset.priority;

//       if (filterValue === "all" || cardPriority === filterValue) {
//         card.style.display = "block";
//       } else {
//         card.style.display = "none";
//       }
//     });

//     filterLinks.forEach(l => l.classList.remove("active"));
//     link.classList.add("active");
//   });
// });




function createDiv(){
    



    let parentElement=document.querySelector(".parent-container")

    let newDiv=document.createElement('div')

    newDiv.classList.add('child-container')
    
    // newDiv.setAttribute("data-priority",prioritySelect)
    let selectedValue = prioritySelect.value;
    newDiv.dataset.priority=selectedValue



    
    let priorityClass=""
    
    let FieldClass=""
    
    if(selectedValue=="low"){
        priorityClass="low"
    
        FieldClass="low-field"
    
    }
    else if(selectedValue=="medium"){
        priorityClass="medium"
        FieldClass="medium-field"
    }
    else if(selectedValue=="high"){
        priorityClass="high"
        FieldClass="high-field"
    }
    
    
    
    
    
    
    
    let setVal=radio
    
    let firstClass=""
    
    let secondClass=""
    
    if(radio=="pending"){
        firstClass="pending"
        secondClass="pending-field"
    }
    else if(radio=="In Progress"){
        firstClass="in-progress"
        secondClass="progress-field"
    }
    else if(radio=="completed"){
        firstClass="completed"
        secondClass="completed-field"
    }
    


    if(dueDate.value==""){
        
        dueDate=""
    }
    else{
    let newDate= new Date(dueDate.value)
    let months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

    let getMon=months[newDate.getMonth()]
    let getdate=newDate.getDate()
    let getYear=newDate.getFullYear()

    dueDate=`${getMon} ${getdate},${getYear}`
}



    newDiv.innerHTML=` <button class="add" type="button">Edit</button>
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






let leftside=document.querySelector(".side")

// let btn=document.querySelector(".add")

let color=document.querySelector(".color")
let btncancel=document.getElementById("btncancel")

let btnadd=document.getElementById("btnadd")
let head=document.getElementById("headname")



let deletes=document.querySelector(".delete")

let childcon=document.querySelector(".child-container")





document.addEventListener("click",function(event){
    if(event.target.classList.contains("add")){
        event.preventDefault()
        leftside.style.display="block"
        color.style.display="block"

    }
})

btncancel.addEventListener("click",function(event){
    event.preventDefault()
    leftside.style.display="none"
    color.style.display="none"
})



deletes.addEventListener("click",function(){
    childcon.remove()

})









btnadd.addEventListener("click",update())


function update(event){
    event.preventDefault()
    
    leftside.style.display="none"
    color.style.display="none"
    // getIntput()
    
    // let user=document.getElementById("username").value
    
    head.innerText=userName
    // submits()
}
// }















