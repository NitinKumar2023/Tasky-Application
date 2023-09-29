// NPM - Node Package Manager
// CDN - Content Delivery Network
// states in react are basically different things we store in our local browser
// in angular we have angular state management
// JSON- JavaScript Object Notation ------> for storing objects , delimeter is comma by default


// var state = {
//     // var state = {} this is how we create an object 
//     Tasklist : [
//         // tasklist : [] this is how we create an array 
//         {
//             // this is an object 
//             // TOTAL : object ---> array of objects 
//             imageUrl: "" , 
//             TaskTitle: "",
//             TaskType: "", 
//             TaskDesc: ""
//         } , 

//         // tasklist k 0 pe ye upar wali values store hongi 

//         {
//             // tasklist k 1 pe ye upar wali values store hongi
//             imageUrl: "" , 
//             TaskTitle: "",
//             TaskType: "", 
//             TaskDesc: ""
//         } , 

//         {
//             // tasklist k 2 pe ye upar wali values store hongi 
//             imageUrl: "" , 
//             TaskTitle: "",
//             TaskType: "", 
//             TaskDesc: ""
//         } , 

//         {
//             // tasklist k 3 pe ye upar wali values store hongi 
//             imageUrl: "" , 
//             TaskTitle: "",
//             TaskType: "", 
//             TaskDesc: ""
//         } , 

//         {
//             // tasklist k 4 pe ye upar wali values store hongi
//             imageUrl: "" , 
//             TaskTitle: "",
//             TaskType: "", 
//             TaskDesc: ""
//         }
//     ]
// } ;




// IF WRITING HTML WITHIN JS ----> USE ``
// IF WRITING JS WITHING HTML ---> USE $

const state = {
    tasklist : [],
};
// backup Storage

// THIS IS OUR BACKUP STORAGE , FIRST STORAGE IS LOCAL BROWSER
// state.Tasklist , is how we can access it



// DOM operations
const taskContents= document.querySelector(".task__contents");
// this is for the card displayed on UI
// jo card bnaya h vo screen pe rakhne k liye 

const taskModal= document.querySelector(".task__modal__body");
// this is when we need to display that card content on click of OPEN TASK
// LARGE MODAL DISPLAY


// console.log(taskContents);
// console.log(taskModal);



// HTML STARTING INSIDE JS SO WE USE -----> ``
const htmlTaskContent = ({id , title , description , type , url}) => 
// template for card on the screen


//the sign after arrow function was for writing html in js
//id is used as unique so we need id and key  , id is id , but since we are using html part in css 
//we need to write the dollar sign before the id and enclose it in curly braces to write JS in html
// here we are in JS file but writing HTML so inside HTML we need to write $ to write JS code inside HTML
// outer card jiske andar card header , body aur footer hoga
// name element is used to reference an object in javascript
// ab hum name id bar baar likh rahe h grouping k liye cause bahut cards h

`    
<div class="col-md-6 col-lg-4 mt-3 " id=${id} key=${id}> 
    

    <div class = "card shadow-sm task__card">
    

        <div class = "card-header d-flex justify-content-end task__card__header">
            <button type="button" class="btn btn-outline-info mr-1.5" onclick="editTask.apply(this , arguments)" name=${id}>
                
                <i class="fas fa-pencil-alt name=${id}"></i>
                 
            </button>

            <button  type="button" class="btn btn-outline-danger mr-1.5" onclick="deleteTask.apply(this , arguments)" name=${id} >
                <i class="fas fa-trash name=${id}"></i>
            </button>
        </div>


        <div class= "card-body">
            ${url 
               ?` <img width ="100%" src=${url} alt = "card image" class="card-img-top md-3 rounded-lg" />   `
               :` <img width ="100%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThyEKIq_a7eWEwVEoo1aTBQ6gV1KQ4BI8ojEQgnl0ITQ&s" alt = "card image" class="card-img-top md-3 rounded-lg" />   `
            }

            <h4 class="card-title  task__card__title">${title}</h4>

            <p class='description trim-3-lines text-muted'>${description}</p>

            <div class='tags text-white d-flex flex-wrap'>
             <span class='badge bg-primary m-1'>${type}</span>
           </div>
        </div>


        <div class="card-footer">
            <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showTask" onclick="openTask.apply(this , arguments)" id=${id}>Open Task
            </button>
        </div>

    </div>

</div>

`;

// HTML of TASK CONTENT IS TILL HERE


//  Modal Body on >> Clk of Open Task
// since its a function it will return something so let it return the whole body
const htmlmodalContent = ({id  , title  , description , url}) => {
    // normal curly brackets can also be used instead of ``
    const date = new Date(parseInt(id));
    return `
    
    <div id=${id}>
        ${url 
            ?`<img width='100%' src=${url} alt='Card Image' class='img-fluid place__holder__image mb-3' />`
            :` <img width ="100%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThyEKIq_a7eWEwVEoo1aTBQ6gV1KQ4BI8ojEQgnl0ITQ&s" alt = "card image" class="card-img-top md-3 rounded-lg" />   `
            
        }

        <strong class="text-muted text-sm">Created on : ${date.toDateString()}</strong>

        <h2 class="my-3">${title}</h2>

        <p class='text-muted'>${description}</p>

    </div>
    `
    ;
};
// *****************************************************************************************************************

// WE USED DATE AS AN ID BECAUSE 

// console.log(Date.now());
//  1681676093852

// console.log(Date.now());
//  1681676096277

// console.log(Date.now());
//  1681676097933

// BECAUSE SEE EVERY SECOND WE HAVE A NEW NUMBER 
// IT WILL ALWATS BE UNIQUE

// *****************************************************************************************************************




// storing data on local browser for faster access than the Array which fetches API (when we will use it so usse fast h )
const updateLocalStorage = () => {
    localStorage.setItem(
        "task" ,
        // name of the storage is TASK
        JSON.stringify({
            tasks: state.tasklist,
            // key should always be in string format
            // here we convert json format to string 
        })
    );
};


// loading intital data from local browser storage DISPLAYING THE LOCAL STORAGE
const loadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.task);
    // here we will convert string back to JSON for display

    if (localStorageCopy) state.tasklist= localStorageCopy.tasks ;
        // copy content from local storage to our array for permanent backup storage
        // local browser storage gets deleted after reload

    state.tasklist.map((cardDate) => {
        taskContents.insertAdjacentHTML("beforeend" , htmlTaskContent(cardDate));
        // this is for adding some content before the end of the DOM , input beforeend aur kya input karna h htmltaskcontent 
        // kya content h vo , jo cardDate mai store hoga 
    });
};

// *****************************************************************************************************************************
//                                                  EXTRA KNOWLEDGE
// SPREAD OPERATOR

// CONSOLE EXAMPLE

// const obj = { name: "nitin" , age:26 };
//      undefined
// console.log(obj);
//      {name: 'nitin', age: 26}
// console.log({obj});
//      {obj: {…}}

// console.log({...obj});
//      {name: 'nitin', age: 26} , now no problem because of ... (spread operator)

// console.log({obj , designation : "unemployed"});
//      {obj: {…}, designation: 'unemployed'} , we can also add new keys with the help of spread operator

// console.log({...obj , surname : "sehgal"});
//      {name: 'nitin', age: 26, surname: 'kumar'} , but it wont stay because we only consoled it 

// IF WE DEFINE OUR OBJECT AGAIN IN CONSOLE AS {OBJ} THEN IT SHOWS DOUBLE BRACKETS TO REMOVE THOSE WE USE ... OR SPREAD OPERATOR
// IT IS USED TO IDENTIFY OR GROUP THINGS EASILY 

// SUPPOSE WE HAVE 100 PENS OF DIFF COLORS INSIDE A JAR , WE CANT IDENTIFY EACH COLOR EASILY BUT IF WE
// SPREAD THOSE COLORS ON THE FLOOR THEN WE CAN UNDERSTAND EACH COLOR EASILY

// *******************************************************************************************************************************

// const obj = { name: "nitin" , age:26 };

// console.log(obj);
//  {name: 'nitin', age: 26}


// IF WE ENTER THE SAME KEY WITH THE UPDATED VALUE , A NEW KEY IS NOT MADE USSI MAI UPDATION HOJATI H AISE HE EDIT CHANGES PE 
// HUMARE MODAL MAI SEEDHA UPDATE HOJAYEGA AUR NAYI STORE HOJAYEGI

// console.log({...obj , age : 24});
//  {name: 'nitin', age: 26}

// *******************************************************************************************************************************


// we have a save changes button so uske liye ye

// agr koi changes hue toh unko hum pehle yaha se get karenge
const handleSubmit = (event) => {
    // console.log("event triggered");
    const id = `${Date.now()}`;
    // humari jo id h vo ab date h kyunki harr sec ka hisab h toh unique h 
    const input = {
        url : document.getElementById("imageUrl").value ,
        title : document.getElementById("taskTitle").value , 
        type : document.getElementById("tags").value ,
        description: document.getElementById("taskDescription").value,
    };

    if(input.title==="" || input.type==="" || input.description==="")
    {
        return alert("Please Fill All The Necessary Details :)");
    }

// changes get hogye toh ab unko UI pe dikhana bhi h ussi time before vo DOM khatam ho

taskContents.insertAdjacentHTML("beforeend" , htmlTaskContent({...input , id}));

// ab ye jo UI pe append kardiya h through SPREAD SELECTOR usko store bhi karna h array mai varna udd jayega

state.tasklist.push({...input , id});

// array mai save hogyi ab LOCAL SERVER KI BARI 
updateLocalStorage();

};




// // open task on click of open task
const openTask = (event) => {
    if (!event) event = window.event;
    // if (!event) event = window.event; ye line bhi akeli chal sakti h aur dusra option opentask() ki jagah opentask(this , arguements)
    // bhi chal sakta h abhi maine dono chala k dikha diye h ek saath 

    const getTask = state.tasklist.find(({id})=> id === event.target.id);
    taskModal.innerHTML = htmlmodalContent(getTask);
}


// delete task on click of trash icon
const deleteTask = (event) => {
    if (!event) event = window.event;
    // if (!event) event = window.event; ye line bhi akeli chal sakti h aur dusra option opentask() ki jagah opentask(this , arguements)
    // bhi chal sakta h abhi maine dono chala k dikha diye h ek saath 
    
    const targetId=event.target.getAttribute("name");
    // console.log(targetId);
    // whats happening is kabhi icon pe click ho rha h kabhi button pe to maine deletetask dono k click pe daal di h 

    const type = event.target.tagName;
    // console.log(type); this gives the tag name which we are clicking , its icon or button 

    const removeTask = state.tasklist.filter(({id}) => id != targetId);
    console.log(removeTask);

    updateLocalStorage();

    if(type === "BUTTON")
    {
        // console.log(event.target.parentNode.parentNode.parentNode.parentNode);
        return event.target.parentNode.parentNode.parentNode.parentNode.removeChild
        (event.target.parentNode.parentNode.parentNode);

        // button jo h vo 4th child h htmltaskcontent k andar toh usko target leke pura htmlcontent he delete kar rhe h card ka
    }
    else if (type === "I")
    {
        return event.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
            event.target.parentNode.parentNode.parentNode.parentNode);
        // jo icon h vo button ka child h toh vo 5th child hua toh icon pe click hua toh i have to go 5 steps back
        // basically 4 nodes pe mai last div pe hounga jismai sara content h 
        // 5th ka child is that div toh 5th ka removechild mtlb pura card delete
    }
}



// // edit task function
const editTask = (event) => {
    if(!event) event = window.event;

    const targetId = event.target.id;
    const type=event.target.tagName;

    let parentNode;
    let taskTitle;
    let taskDescription;
    let taskType;
    let submitButton;

    if(type === "BUTTON")
    {
        parentNode = event.target.parentNode.parentNode;   
    }
    else if (type === "I")
    {
        parentNode = event.target.parentNode.parentNode.parentNode;
    }

    // taskTitle = parentNode.childNodes[3].childNodes;
    // 3 pe h stored card body toh hum usko call kar rhe h us
    // arrays stored h odd integers pe mai jab 1 likh rha hu toh card header aa rha h 
    // console.log(taskTitle);


    // NodeList(7) [text, div.card-header.d-flex.justify-content-end.task__card__header, text, div.card-body, text, div.card-footer, text]
    //     0: text
    //     1: div.card-header.d-flex.justify-content-end.task__card__header
    //     2: text
    //     3: div.card-body
    //     4: text
    //     5: div.card-footer
    //     6: text
    //     length: 7

    // AB HUME 3 CHAHIYE TO SELECT CARD BODY 

    // 0: text
    // 1: img.card-img-top.md-3.rounded-lg
    // 2: text
    // 3: h4.card-title.task__card__title
    // 4: text
    // 5: p.description.trim-3-lines.text-muted
    // 6: text
    // 7: div.tags.text-white.d-flex.flex-wrap
    // 8: text
    // length: 9

    // AUR CARD BODY K ANDAR SE 3-TASKTITLE , 5-TASKDESCRIPTION AUR 7-TYPE 


    taskTitle = parentNode.childNodes[3].childNodes[3];
    // parent node card h uske array k second pe yani 1 fer 3 pe card_body h 
    // uss card_body k andar bhi array h uske first pe image jo editable nhi h , 3rd pe title h 

    taskDescription = parentNode.childNodes[3].childNodes[5];
    // body k 5th yani 3rd k next pe description hua 

    taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
    // 7th pe tasktype hua but vo div mai h so uske liye ek child aur

    submitButton = parentNode.childNodes[5].childNodes[1];
    // footer was on 5 , accessing open task button to change it which was on 1

    // console.log(taskTitle , taskDescription , taskType , submitButton); ye karke dekhoge toh pta chalega ki card ki sari info fetch hogyi h 

    taskTitle.setAttribute("contenteditable","true");
    taskDescription.setAttribute("contenteditable","true");
    taskType.setAttribute("contenteditable","true");
    // setAttribute lets you edit things , basically ab tum ferse set kar sakte ho
    // ab mai normally click karu toh edit ka cursor aata h but edit nhi hota but 
    // when i click on pencil toh vo edit ho rha h but save nhi ho rha h uske liye function likhna padega

    submitButton.setAttribute("onclick","saveEdit.apply(this , arguments)");
    // submitButton mai humne vo openTask wale button ko daal rakha h toh ab hum
    // SAVE CHANGES PE JAB CLICK KARENGE TOH YE SAVE EDIT CALL HOGA AUR CHANGE HOJAYEGA SAB

    // i want ki open task aa raha h abhi toh vo pencil yani editTask k trigger pe vo change hoke SAVE CHANGES wale button mai convert ho
    // fer info edit ho rhi h , save ho toh modal open hone ki jagah saveEdit function call ho aur save karle 
    // fer vapis save change wala button open task mai convert ho aur modal khul jaye

    // data-bs-toggle="modal" data-bs-target="#showTask"
    submitButton.removeAttribute("data-bs-toggle"); 
    submitButton.removeAttribute("data-bs-target");
    // ab open nhi hoga modal on large screen humne vo attribute hata diya pencil k click pe
    submitButton.innerHTML="Save Changes";
    // on click of pencil Open Task converts to Save Changes

}

// EDIT TASK FUNCTION

const saveEdit = (event) => {
     if(!event) event = window.event;

    const targetId = event.target.id;
    const parentNode = event.target.parentNode.parentNode;
    // open task button toh footer mai h na toh body k liye 2 he nodes h 
    // console.log(parentNode); you can check we are in the card body yaha se karenge edit

    const taskTitle = parentNode.childNodes[3].childNodes[3];
    const taskDescription = parentNode.childNodes[3].childNodes[5];
    const taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
    const submitButton = parentNode.childNodes[5].childNodes[1];

    // ye sab same hoga cause body toh same he h 

    const updateData = {
        taskTitle : taskTitle.innerHTML,
        taskDescription : taskDescription.innerHTML ,
        taskType : taskType.innerHTML ,
    };
    // jo data aaggya h card pe update karke vo bs card pe update hua h ab usse har jagah update karna h 

    let stateCopy = state.tasklist;

    stateCopy = stateCopy.map((task) => 
    task.id === targetId
    ?{
        id : task.id , 
        title : updateData.taskTitle , 
        description : updateData.taskDescription , 
        type : updateData.taskType , 
        url : task.url,
    }
    :task 
    );

    state.tasklist = stateCopy;
    // humne stateCopy mai array copy kari , statecopy mai naye changes daale fer unko state.tasklist mai bhej diya
    updateLocalStorage();
    // local storage as well as array got updated


    taskTitle.setAttribute("contenteditable","false");
    taskDescription.setAttribute("contenteditable","false");
    taskType.setAttribute("contenteditable","false");
    // edit hoke save hogya ab editable nhi hoga content

    submitButton.setAttribute("onclick","openTask.apply(this , arguments)");
    // data-bs-toggle="modal" data-bs-target="#showTask"
    submitButton.setAttribute("data-bs-toggle" , "modal"); 
    submitButton.setAttribute("data-bs-target" , "#showTask");
    // ab open nhi hoga modal on large screen humne vo attribute hata diya pencil k click pe
    submitButton.innerHTML="Open Task";
};



// SEARCH BAR
const searchTask = (event) => {
    if(!event) event = window.event;

    while(taskContents.firstChild)
    {
        taskContents.removeChild(taskContents.firstChild);
    }

    const resultData = state.tasklist.filter(({title}) => 
        title.toLowerCase().includes(event.target.value.toLowerCase())
    );

    console.log(resultData);

    resultData.map((cardData) => {
        // taskContents.insertAdjacentHTML("beforeend" , htmlmodalContent(cardData));
        // for smaller card size 
        taskContents.insertAdjacentHTML("beforeend" , htmlTaskContent(cardData));
    });
};
