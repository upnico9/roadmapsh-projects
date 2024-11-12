#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const tasks = require("./tasks");

// Get command line arguments
const args = process.argv.slice(2);

// Commands list
const commands = [
    "help",
    "list",
    "add",
    "delete",
    "update",
    "mark-in-progress",
    "mark-done"
]

// Help message
const helpMessage = `	
    Usage: todo [command] [options]
    Commands:
        list
        add
        delete
        update
        mark-in-progress
        mark-done
    List:
        example : 
            - list
            - list done
            - list in-progress
            - list todo
    Add:
        example : 
            - add "task name"
    Delete:
        example : 
            - delete 1
    Update:
        example : 
            - update 1 "new task name"
    Mark-in-progress:
        example : 
            - mark-in-progress 1
    Mark-done:
        example : 
            - mark-done 1
    `;


// Check if the user has entered any command
if (args.length === 0) {
    console.log(helpMessage);
    return;
}

const command = args[0].toLowerCase();

// Check if the user has entered a valid command
if (args[0].toLowerCase() === "help" || !commands.includes(command)) {
    console.log(helpMessage);
    return;
};


// Check if the data file exists, if not create it
const dataPath = path.join(__dirname, "data.json");
const fileExist = fs.existsSync(dataPath);

if (!fileExist) {
    fs.writeFileSync(dataPath, JSON.stringify([]));
}

// Execute the command
switch(command) {
    case "list":
        tasks.listTask(args[1]);
        break;
    case "add":
        tasks.createTask(args[1]);
        break;
    case "delete":
        tasks.deleteTask(args[1]);
        break;
    case "update":
        tasks.updateTask(args[1], args[2]);
        break;
    case "mark-in-progress":
        tasks.updateStatus(args[1], "in-progress");
        break;
    case "mark-done":
        tasks.updateStatus(args[1], "done");
        break;
    default:
        console.log(helpMessage);
        break;
}

