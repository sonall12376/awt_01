const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt"); // <-- added bcrypt

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
  .connect("mongodb+srv://SonalH:Todo2319@cluster0.chtiqsm.mongodb.net/Todo-App?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String, // hashed password stored here
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

  // Check if username OR email already exists
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    return res.send(`
      <script>
        alert("User already registered! Please log in to continue.");
        window.location.href = "/";
      </script>
    `);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  // Auto login
  req.session.userId = newUser._id;
  res.redirect("/todo");
});

// ====================== LOGIN =======================
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Find user
  const user = await User.findOne({ username });

  if (!user) {
    return res.send("Invalid username or password <br><a href='/'>Try again</a>");
  }

  // Compare password with hash
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
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

// ====================== DELETE TODO =======================
app.delete("/delete-task/:id", async (req, res) => {
  if (!req.session.userId) return res.sendStatus(401);

  await Todo.deleteOne({ _id: req.params.id, userId: req.session.userId });
  res.sendStatus(200);
});

// ====================== EDIT TODO =======================
app.put("/edit-task/:id", async (req, res) => {
  if (!req.session.userId) return res.sendStatus(401);

  await Todo.updateOne(
    { _id: req.params.id, userId: req.session.userId },
    { $set: { task: req.body.task } }
  );

  res.sendStatus(200);
});

// ====================== LOGOUT =======================
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);