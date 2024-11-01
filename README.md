# Task-Tracker-Demo (CLI)

The purpose of this project is to practice and show how to use the File System library for JS, getting interactive user input from the terminal in JS, as well as to practice interacting with JSON objects.

Task Tracker CLI is a command-line interface (CLI) application that allows users to manage tasks from the terminal. Users can add, update, delete, mark, and list tasks, with all task data stored in a JSON file. The project is implemented in JavaScript using Node.js and utilizes the built-in `fs` and `readline` modules.

## Features
- **Add Tasks**: Add new tasks with a description.
- **Update Tasks**: Update the description of an existing task by its ID.
- **Delete Tasks**: Delete a task by its ID.
- **Mark Tasks**: Change the status of a task (e.g., "todo", "in-progress", "done").
- **List Tasks**: List tasks based on a given filter ("all", "todo", "in-progress", "done").
- **Persistent Storage**: Tasks are stored in a JSON file, making them persistent across sessions.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone the repository or download the source code.
2. Open a terminal and navigate to the project directory.
3. Run `npm install` to install any necessary dependencies (if there are any in the future).

### Running the Application
To start the Task Tracker CLI, run the following command in the terminal:
```bash
node main.js
```
