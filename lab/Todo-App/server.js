// const express = require("express");
// const mongoose = require("mongoose");
// const session = require("express-session");
// const app = express();
// pp.use(express.static("public"));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Session middleware
// app.use(
//   session({
//     secret: "todo-secret",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// // MongoDB connection
// mongoose
//   .connect("mongodb://localhost:27017/todoApp")
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

// // User Schema
// const userSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String,
// });

// const User = mongoose.model("User", userSchema);

// // Todo Schema
// const todoSchema = new mongoose.Schema({
//   userId: mongoose.Schema.Types.ObjectId,
//   task: String,
//   createdAt: { type: Date, default: Date.now },
// });

// const Todo = mongoose.model("Todo", todoSchema);

// // ====================== HOME PAGE =======================
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// // ====================== SIGNUP =======================
// app.post("/signup", async (req, res) => {
//   const { username, email, password } = req.body;
//   const newUser = new User({ username, email, password });
//   await newUser.save();
//   res.redirect("/");
// });

// // ====================== LOGIN =======================
// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   const user = await User.findOne({ username });

//   if (!user || user.password !== password) {
//     return res.send("Invalid username or password <a href='/'>Try again</a>");
//   }

//   req.session.userId = user._id; // Save logged-in user id
//   res.redirect("/todo");
// });

// // ====================== TODO PAGE =======================
// app.get("/todo", async (req, res) => {
//   if (!req.session.userId) {
//     return res.redirect("/");
//   }

//   res.sendFile(__dirname + "/todo.html");
// });

// // ====================== ADD TODO =======================
// app.post("/add-task", async (req, res) => {
//   if (!req.session.userId) {
//     return res.redirect("/");
//   }

//   const newTask = new Todo({
//     userId: req.session.userId,
//     task: req.body.task,
//   });

//   await newTask.save();
//   res.redirect("/todo");
// });

// // ====================== GET USER TODOS =======================
// app.get("/get-todos", async (req, res) => {
//   if (!req.session.userId) return res.json([]);

//   const tasks = await Todo.find({ userId: req.session.userId });
//   res.json(tasks);
// });

// // ====================== LOGOUT =======================
// app.get("/logout", (req, res) => {
//   req.session.destroy();
//   res.redirect("/");
// });

// app.listen(3000, () =>
//   console.log("Server running at http://localhost:3000")
// );


const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();

// Serve static files (HTML, CSS, JS)
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: "todo-secret",
    resave: false,
    saveUninitialized: false,
  })
);

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/todoApp")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Todo Schema
const todoSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  task: String,
  createdAt: { type: Date, default: Date.now },
});

const Todo = mongoose.model("Todo", todoSchema);

// ====================== LOGIN / SIGNUP PAGE =======================
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// ====================== SIGNUP =======================
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const newUser = new User({ username, email, password });
  await newUser.save();

  res.redirect("/");
});

// ====================== LOGIN =======================
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user || user.password !== password) {
    return res.send("Invalid username or password <br><a href='/'>Try again</a>");
  }

  req.session.userId = user._id;
  res.redirect("/todo");
});

// ====================== TODO PAGE =======================
app.get("/todo", async (req, res) => {
  if (!req.session.userId) return res.redirect("/");

  res.sendFile(__dirname + "/public/todo.html");
});

// ====================== ADD TODO =======================
app.post("/add-task", async (req, res) => {
  if (!req.session.userId) return res.redirect("/");

  const newTask = new Todo({
    userId: req.session.userId,
    task: req.body.task,
  });

  await newTask.save();
  res.redirect("/todo");
});

// ====================== GET USER TODOS =======================
app.get("/get-todos", async (req, res) => {
  if (!req.session.userId) return res.json([]);

  const tasks = await Todo.find({ userId: req.session.userId });
  res.json(tasks);
});

// ====================== LOGOUT =======================
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);
