const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "data.json");

// List of valid status
const statusList = [
    "done",
    "in-progress",
    "todo",
]

// Create a tassk
function createTask(task) {
    const data = JSON.parse(fs.readFileSync(dataPath));
    data.push({ 
                task,
                id: data.length + 1,
                status: "todo",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
    fs.writeFileSync(dataPath, JSON.stringify(data));
}

// Update a task
function updateTask(id, task) {
    const data = JSON.parse(fs.readFileSync(dataPath));
    const taskIndex = data.findIndex(task => task.id === Number(id));
    if (taskIndex === -1) {
        console.log("Task not found");
        return;
    }
    data[taskIndex].task = task;
    data[taskIndex].updatedAt = new Date().toISOString();
    fs.writeFileSync(dataPath, JSON.stringify(data));
}

// Delete a task
function deleteTask(id) {
    const data = JSON.parse(fs.readFileSync(dataPath));
    const taskIndex = data.findIndex(task => task.id === Number(id));
    if (taskIndex === -1) {
        console.log("Task not found");
        return;
    }
    data.splice(taskIndex, 1);
    fs.writeFileSync(dataPath, JSON.stringify(data));
}

// Update the status of a task
function updateStatus(id, status) {
    const data = JSON.parse(fs.readFileSync(dataPath));
    const taskIndex = data.findIndex(task => task.id === Number(id));

    if (taskIndex === -1) {
        console.log("Task not found");
        return;
    }
    data[taskIndex].status = status;
    data[taskIndex].updatedAt = new Date().toISOString();
    fs.writeFileSync(dataPath, JSON.stringify(data));
}

// List all tasks
function listTask(status) {
    const data = JSON.parse(fs.readFileSync(dataPath));
    let finalData = data;
    if (status) {
        if (!statusList.includes(status)) {
            console.log("Invalid status");
            return;
        }
        const taskStatus = data.filter(task => task.status === status);
        finalData = taskStatus;
    }
    finalData.forEach(task => console.log(`${getSetTerminalColorForStatus(task.status)}${toInLineFormat(task)}\x1b[0m`));
}

// Helper functions to get the color for the terminal for a specific status
function getSetTerminalColorForStatus(status) {
    switch(status) {
        case "done":
            return "\x1b[32m";
        case "in-progress":
            return "\x1b[33m";
        case "todo":
            return "\x1b[31m";
        default:
            return "\x1b[0m";
    }
}

// Helper to format the task in a single line
function toInLineFormat(task) {
    return `${task.id} - ${task.task} - ${task.status}`;
}

module.exports = { createTask, updateTask, deleteTask, updateStatus, listTask };