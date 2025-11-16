const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const DB_URL = 'mongodb://localhost:27017/todo';
mongoose.connect(DB_URL)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define schema & model
const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const todo = mongoose.model('todo', todoSchema);

// Home page
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html ng-app="todoApp">
<head>
  <title>Todo List (AngularJS + MongoDB)</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular.min.js"></script>
</head>
<body ng-controller="TodoController">
  <h2>Todo List (AngularJS Local Storage)</h2>
  <input type="text" ng-model="newTask" placeholder="Enter task">
  <button ng-click="addTask()">Add</button>
  <ul>
    <li ng-repeat="task in tasks">
      {{task}}
      <button ng-click="deleteTask($index)">Delete</button>
    </li>
  </ul>

  <hr>

  <h3>Add Task to MongoDB</h3>
  <form action="/add-task" method="POST">
    <input type="text" name="task" placeholder="Enter task" required>
    <button type="submit">Save Task</button>
  </form>

  <h3>Find Task</h3>
  <form action="/find-task" method="POST">
    <input type="text" name="task" placeholder="Enter task to search" required>
    <button type="submit">Find</button>
  </form>

  <a href="/users">View All Tasks</a>

<script>
  angular.module("todoApp", [])
    .controller("TodoController", function($scope) {
      $scope.tasks = JSON.parse(localStorage.getItem("ngTasks")) || [];
      $scope.addTask = function() {
        if ($scope.newTask && $scope.newTask.trim() !== "") {
          $scope.tasks.push($scope.newTask);
          $scope.newTask = "";
          localStorage.setItem("ngTasks", JSON.stringify($scope.tasks));
        }
      };
      $scope.deleteTask = function(index) {
        $scope.tasks.splice(index, 1);
        localStorage.setItem("ngTasks", JSON.stringify($scope.tasks));
      };
    });
</script>
</body>
</html>
  `);
});

// Add task route
app.post('/add-task', async (req, res) => {
  try {
    const { task } = req.body;
    const newTask = new todo({ task });
    await newTask.save();
    res.send(`
      <h2>Task added successfully!</h2>
      <p>Task: ${task}</p>
      <a href="/">Go back to home</a>
    `);
  } catch (error) {
    res.send(`<h2 class="error">Error: ${error.message}</h2><a href="/">Go back</a>`);
  }
});

// Find task route
app.post('/find-task', async (req, res) => {
  try {
    const { task } = req.body;
    const found = await todo.findOne({ task });
    if (!found) {
      return res.send(`<h2> Task not found</h2><a href="/">Go back</a>`);
    }
    res.send(`
      <h2> Task found successfully!</h2>
      <p>Task: ${found.task}</p>
      <p>Created: ${found.createdAt.toDateString()}</p>
      <a href="/">Go back</a>
    `);
  } catch (error) {
    res.send(`<h2>Error: ${error.message}</h2><a href="/">Go back</a>`);
  }
});

// Show all tasks
app.get('/users', async (req, res) => {
  try {
    const allTasks = await todo.find();
    if (allTasks.length === 0) {
      return res.send(`<h2>No tasks found</h2><a href="/">Go back</a>`);
    }
    let taskList = '<h2>All Tasks</h2><ul>';
    allTasks.forEach(task => {
      taskList += `<li>${task.task} - Created on ${task.createdAt.toDateString()}</li>`;
    });
    taskList += '</ul><a href="/">Go back</a>';
    res.send(taskList);
  } catch (error) {
    res.send(`<h2>Error: ${error.message}</h2><a href="/">Go back</a>`);
  }
});

// Start server
const PORT = 3003;
app.listen(PORT, () => console.log(` Server running at http://localhost:${PORT}`));
