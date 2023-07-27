const tasks= [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const bAdd = document.querySelector("#bAdd")
const itTask = document.querySelector("#itTask")
const form = document.querySelector("#form")
const taskName = document.querySelector('#time #taskName');
const body = document.querySelector(".body")

renderTime();
renderTasks();


form.addEventListener('submit',e => {
    e.preventDefault();

    if(itTask.value !==''){
        console.log('entraste a la funcion')

        createTask(itTask.value);
        itTask.value =''
        renderTasks()
    }else{
        alert('esta vacio')
    }
    

})

// ===============** Funciones **==============
function createTask(value){
    const newTask = {
        id:(Math.random()*100).toString(36).slice(3),
        title:value,
        completed:false
    };
    console.log(newTask)
    tasks.unshift(newTask)
    console.log(tasks)
}

function  renderTasks(){
    const html = tasks.map(task =>{
        return `
        <div class="task">
            <div class="completed">${task.completed ? `<span class="done">Done</span>`: `<button class="start-button" data-id="${task.id}">start</button>`}</div>
            <div class="title">${task.title}</div>
        </div>
        `
    });

    const tasksContainer = document.querySelector('#tasks');
    tasksContainer.innerHTML = html.join('');

    const startButtons = document.querySelectorAll('.task .start-button')

    startButtons.forEach(button => {
        button.addEventListener('click', e =>{
            if(!timer){
                const id = button.getAttribute('data-id');
                startButtonHandler(id)
                button.textContent='In progress..'
            }
        })
    })
   
}

function startButtonHandler(id){
    time = 25 * 60;
    current = id;
    const taskIndex = tasks.findIndex(task => task.id === id);
    taskName.textContent = tasks[taskIndex].title;
    document.body.style.backgroundColor = "#003366";

    renderTime();

    timer = setInterval(() => {
        timeHandler(id);
    }, 1000)
}

function timerBreakHandler(){
    time--;
    renderTime();
    document.body.style.backgroundColor = "#c40000";
    if(time == 0){
        
        document.body.style.backgroundColor = "palegreen";
        clearInterval(timerBreak);
        current=null;
        timerBreak = null;

        taskName.textContent = '';
        renderTasks();
    }
}

function timeHandler(id){
    time--;
    renderTime();

    if(time == 0){
        clearInterval(timer);
        markCompleted(id);
        timer=null;
        renderTasks();
        startBreak();
    }
}

function renderTime(){
    const timeDiv = document.querySelector('#time #value');
    const minutes = parseInt(time/60);
    const seconds = parseInt(time % 60);

    timeDiv.textContent = `
    ${minutes < 10 ? '0':''}${minutes}:${seconds < 10 ? '0':''}${seconds}
    `

}

function markCompleted(id){
    const taskIndex = tasks.findIndex(task => task.id === id);
    tasks[taskIndex].completed = true;
}

function startBreak(){
    time = 5 *60 ;
    taskName.textContent = 'Break';
    renderTime();
    timerBreak = setInterval(()=> {
        timerBreakHandler()
    }, 1000)
} 