let tasks = [
    {
        "title" : "بدء مهمة",
        "date" : "00/00/0000",
        "isDone" : false 
    },
]
    function getTasksFromStorage(){
        let retrievTasks = JSON.parse(localStorage.getItem("tasks"))
    tasks = retrievTasks ?? []
    }
    getTasksFromStorage()
    function fillTaskName()
    {
        document.getElementById("tasks").innerHTML=""
        let index = 0
    for (task of tasks) {

        let content = 
                `
                    <div class="task ${task.isDone? "done" : ""}">
                        <!-- TASK INFO -->
                        <div class="info" >
                            <h2>${task.title}</h2>
                            <div class="date">
                                <span>
                                    ${task.date}
                                </span>
                            </div>
                        </div>
                        <!-- //TASK INFO// -->
                        <!-- TASK ACTION -->
                        <div class="action">
                            <button onclick=(deleteTask(${index})) class="circular" style="background-color: rgb(114, 0, 0);">
                                <i class="fa-solid fa-trash"></i> 
                                <!-- delete -->
                                </button>
                            
                                ${task.isDone?`
                                <button onclick=(toggleTaskcompletion(${index})) class="circular" style="background-color: rgb(118, 0, 101);">
                                    <i class="fa-solid fa-xmark"></i>
                                    <!-- cancel -->
                                </button>    
                                `:`
                                <button onclick=(toggleTaskcompletion(${index})) class="circular" style="background-color: rgb(0, 114, 0);">
                                    <i class="fa-solid fa-check"></i>
                                    <!-- check -->
                                </button>`}
                            <button onclick=(editTask(${index})) class="circular" style="background-color: rgb(0, 0, 114);">
                                <i class="fa-solid fa-pen-to-square"></i>
                                <!-- edit -->
                            </button>
                        </div>
                        <!-- //TASK ACTION// -->
                    </div>
                `
    document.getElementById("tasks").innerHTML += content
    index++
}
    }
    fillTaskName()
document.getElementById("add-button").addEventListener("click",function(){
    let now =new Date ();
    let date =now.getDate() +"/"+( now.getMonth()+1 )+"/"+ now.getFullYear() + " |Hours|" + now.getHours() +":"+ now.getMinutes()
    let name_title= prompt("الرجاء ادخال اسم للمهمة")
    if (name_title){
    let taskObj = {
        "title": name_title,
        "date" : date,
        "isDone" :false
    }
    tasks.push(taskObj)
    storeTasks()
    fillTaskName()
    }
})
    function deleteTask(index){
        let task = tasks[index]
        let isConfirmed= confirm("هل أنت متاكد من حذف مهمة : " + "("+ task.title +")")
        if (isConfirmed)
        {
        tasks.splice(index,1)
        storeTasks()
        fillTaskName()
        }
    }
    function toggleTaskcompletion (index){
        let task = tasks [index]
        task.isDone=!task.isDone
        storeTasks()
        fillTaskName()
    }
    function editTask(index){
        let task = tasks[index]
        let newTaskTitle = prompt("الرجاء تحديد عنوان المهمة الجديد" ,  task.title)
        if(newTaskTitle){
            task.title = newTaskTitle
            storeTasks()
            fillTaskName()
        }
    }
    
    // ======== STORAGE FUNCTION ========
    function storeTasks(){
        let tasksString = JSON.stringify(tasks)
        localStorage.setItem("tasks",tasksString)
    }