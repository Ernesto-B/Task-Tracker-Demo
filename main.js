var fs = require('fs');     // File system lib
const readline = require('readline');   // Lib for interactive input

function main() {
    const file = "./task-cli.json";
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, JSON.stringify({tasks: []}));
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Ready to recieve command > "
    });

    printCommandTable();
    
    rl.prompt();

    rl.on("line", (line) => {
        const userInput = line.trim().split(" ");
        const command = userInput[0];

        switch (command) {
            case "add":
                addTask(file, userInput.slice(1).join(" "));
                break;
            case "update":
                updateTask(file, userInput[1], userInput.slice(2).join(" "));
                break;
            case "delete":
                deleteTask(file, userInput[1]);
                break;
            case "mark":
                markTask(file, userInput[1], userInput[2]);
                break;
            case "list":
                listTasks(file, userInput[1]);
                break;
            case "end":
                console.log("Terminating the program... \n")
                rl.close();
                break;
            default:
                console.log("Unknown command. Try again... \n");
                break;
        }

        rl.prompt();
    })
    rl.on("close", () => {
        console.log("Exited");
        process.exit(0);
    });
}

function printCommandTable() {
    const commands = [
        { Command: "add <description>", Description: "Adds a new task with the given description" },
        { Command: "update <id> <new description>", Description: "Updates the task with the given id to have a new description" },
        { Command: "delete <id>", Description: "Deletes the task with the given id" },
        { Command: "mark <id> <status>", Description: "Marks the task with the given id as 'todo', 'in-progress', or 'done'" },
        { Command: "list <filter>", Description: "Lists tasks based on the filter ('all', 'done', 'todo', 'in-progress')" },
        { Command: "end", Description: "Terminates the program" }
    ];

    console.table(commands);
}

function addTask(file, desc) {
    console.log("Adding task...\n");
    const currDateTime = new Date();
    newTask = {
        "id": Math.floor(Math.random()*10000),
        "description": desc,
        "status": "todo",
        "createdAt": currDateTime.toISOString(),
        "updatedAt": currDateTime.toISOString(),
    }

    try {
        const data =  fs.readFileSync(file, "utf8");
        const taskData = JSON.parse(data);
        taskData.tasks.push(newTask);
        fs.writeFileSync(file, JSON.stringify(taskData));
        console.log(`Added new task "${newTask.id}"...\n`)
    } catch (error) {
        console.log("There was an error adding a new task...\n", error);
    }
}

function updateTask(file, id, newDesc) {
    console.log("Updating task...\n");

    try {
        const data = fs.readFileSync(file, "utf8");
        const taskData = JSON.parse(data);
        const taskIndex = taskData.tasks.findIndex(task => task.id === parseInt(id));

        if (taskIndex == -1) {
            console.log(`Task ${id} does not exist...\n`);
            return;
        }

        taskData.tasks[taskIndex].description = newDesc;
        taskData.tasks[taskIndex].updatedAt = new Date().toISOString();

        fs.writeFileSync(file, JSON.stringify(taskData));
        console.log(`Task ${id} updated successfully...\n`)

    } catch (error) {
        console.log(`There was an error updating task ${id}...\n`, error);
    }
}

function deleteTask(file, id) {
    console.log("Deleting task...\n");
    
    try {
        const data = fs.readFileSync(file, "utf8");
        const taskData = JSON.parse(data);

        const initialLength = taskData.tasks.length;
        taskData.tasks = taskData.tasks.filter(task => task.id !==parseInt(id));

        if (initialLength == taskData.tasks.length) {
            console.log(`Task ${id} does not exist...\n`, error);
            return;
        }

        fs.writeFileSync(file, JSON.stringify(taskData));
        console.log(`Task ${id} deleted successfully...\n`)

    } catch (error) {
        console.log(`There was an error deleting task ${id}...\n`, error);
    }

}

function markTask(file, id, newStatus) {
    console.log("Changing status of task...\n");

    try {
        const data = fs.readFileSync(file, "utf-8");
        const taskData = JSON.parse(data);
        const taskIndex = taskData.tasks.findIndex(task => task.id === parseInt(id));

        if (taskIndex == -1) {
            console.log(`Task ${id} does not exist...\n`);
            return;
        }

        taskData.tasks[taskIndex].status = newStatus;
        taskData.tasks[taskIndex].updatedAt = new Date().toISOString();

        fs.writeFileSync(file, JSON.stringify(taskData));
        console.log(`Task ${id} status changed successfully...\n`)
        
    } catch (error) {
        console.log(`There was an error changing status of task ${id}...\n`, error);
    }
    
}

function listTasks(file, filter = "all") {
    console.log(`Listing ${filter} tasks...\n`);
    
    try {
        const data = fs.readFileSync(file, "utf-8");
        const taskData = JSON.parse(data);
        
        if (filter.toLowerCase() == "all") {
            filteredTasks = taskData.tasks;
        } else if (filter.toLowerCase() == "done") {
            filteredTasks = taskData.tasks.filter(task => task.status == "done");
        } else if (filter.toLowerCase() == "todo") {
            filteredTasks = taskData.tasks.filter(task => task.status == "todo");
        } else if (filter.toLowerCase() == "in-progress") {
            filteredTasks = taskData.tasks.filter(task => task.status == "in-progress");
        } else {
            console.log("No valid filter provided...\n");
            return;
        }

        if (filteredTasks.length == 0) {
            console.log("No tasks found for the given filter...\n")
        } else {
            filteredTasks.forEach(task => {
                console.log(`ID: ${task.id}, Description: ${task.description}, Status: ${task.status}, Created At: ${task.createdAt}, Updated At: ${task.updatedAt}\n`)
            });
        }

    } catch (error) {
        console.log(`There was an error listing ${filter} tasks...\n`, error);
    }

}

main();