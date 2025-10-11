# awt_01
# 💻 Web Technology Lab – Experiments Summary

This repository contains all experiments and classwork done as part of the *Advanced Web Technology (AWT)* lab.  
Each experiment focuses on different web technologies including HTML, CSS, JavaScript, jQuery, AngularJS, and Node.js.

---

## 📑 Table of Contents
1. [Experiment 1](#-experiment-1)
2. [Experiment 2](#-experiment-2)
3. [Experiment 3](#-experiment-3)
4. [Experiment 4](#-experiment-4)
5. [Experiment 5](#-experiment-5)
6. [Experiment 5_6](#-experiment-5_6)
7. [Experiment 7](#-experiment-7)
8. [Conclusion](#-conclusion)

---

## 🧪 Experiment 1
*Topic:* Basic HTML, CSS, and JavaScript Integration  
*Files:* index.html, d1.js, s.css

*What I learned:*
- Creating basic web pages using HTML.
- Linking CSS and JS files to an HTML document.
- Handling basic DOM manipulation using JavaScript.

**Code**

#### 🗂 index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LAB EXP 1</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <link rel="stylesheet" href="s.css">
</head>
<body>

    <div class="container">
        <h1>1. Right-Click Disabled</h1>
        <p>Try right-clicking anywhere on this page. The context menu will not appear.</p>
    </div>

    <hr>

    <div class="container">
        <h1>2. Show/Hide Message</h1>
        <button id="showBtn">Show Message</button>
        <button id="hideBtn">Hide Message</button>
        <div id="messageDiv">
            <p>Hello! This message can be hidden and shown using the buttons above.</p>
        </div>
    </div>

    <hr>

    <div class="container">
        <h1>3. Paragraph Color Change on Hover</h1>
        <p class="hover-para">This paragraph changes color.</p>
    </div>

    <hr>

    <div class="container" style="height: 1200px;">
        <h1>4. Scroll to Top</h1>
        <p>Scroll down this page to see the image in the bottom-right corner. Clicking it will bring you back to the top of the page.</p>
    </div>

    
    <img src="C:\Users\hp\Pictures\Screenshots\Screenshot 2025-08-25 231221.png" alt="Scroll to Top" id="scrollToTopBtn">

    <script src="d1.js"></script>

</body>
</html>
```

#### 🗂 s.css
```CSS
body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding-bottom: 1500px; 
        }
        .container {
            margin-bottom: 40px;
        }
        h1 {
            color: orchid;
        }
        p {
            font-size: 1.1em;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        #messageDiv {
            padding: 20px;
            border: 1px solid yellowgreen;
            background-color:white;
            margin-top: 10px;
            border-radius: 8px;
            display: none; 
        }
        button {
            padding: 10px 15px;
            margin-right: 10px;
            cursor: pointer;
            border: none;
            border-radius: 5px;
            background-color: pink ;
            color: white;
        }
        button:hover {
            background-color: red;
        }
        #scrollToTopBtn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            cursor: pointer;
            border: 2px solid beige;
            border-radius: 50%;
            background-color: powderblue;
            box-shadow: 0 4px 6px black;
        }
```
#### 🗂 d1.js
```JS

$(document).on("selectstart", function(e){ 
    e.preventDefault();
});

$(document).on("keydown", function(e) {
    if (e.ctrlKey && e.keyCode === 67) e.preventDefault();
});

 $(document).ready(function() {
            // 1. Disable the right-click menu
            $(document).on("contextmenu", function(e) {
                e.preventDefault();
            });

            // 2. Display and hide a message
            $("#showBtn").click(function() {
                $("#messageDiv").show('slow');
            });
            $("#hideBtn").click(function() {
                $("#messageDiv").hide('slow');
            });

            // 3. Change paragraph color on mouseover
            $(".hover-para").mouseover(function() {
                $(this).css("color", "red");
            });
            $(".hover-para").mouseout(function() {
                $(this).css("color", "#333");
            });

            // 4. Click an image to scroll to the top
            $("#scrollToTopBtn").click(function() {
                $("html, body").animate({ scrollTop: 0 }, 'slow');
            })

        });
```
### output
![Output Screenshot](Pictures\Camera Roll\exp-1.png)  

*Challenges faced:*
- Understanding how external JS and CSS files are connected.
- Debugging syntax errors in JavaScript.

---

## 🧪 Experiment 2
*Topic:* Advanced JavaScript – Events and DOM  
*Files:* index.html, d2.js, s.css

*What I learned:*
- Implementing DOM manipulation using JavaScript.
- Handling user events like click, hover, etc.
- Understanding internal vs external JS files.

*Challenges faced:*
- Managing multiple event listeners.
- Debugging issues caused by incorrect DOM element references.

---

## 🧪 Experiment 3
*Topic:* Introduction to Node.js  
*Files:* index.html, app.js

*What I learned:*
- Setting up a Node.js environment.
- Creating a simple web server using Node.js.
- Sending responses to client requests.

*Challenges faced:*
- Installing Node.js packages using npm.
- Understanding asynchronous execution in Node.js.

---

## 🧪 Experiment 4
*Topic:* HTML Forms and Data Handling  
*Files:* bill.html, form.html

*What I learned:*
- Creating HTML forms and input fields.
- Using form attributes like action, method, and name.
- Validating form inputs.

*Challenges faced:*
- Handling form validation using JavaScript.
- Designing a clean and structured form layout.

---

## 🧪 Experiment 5
*Topic:* Node.js with HTTP Module  
*Files:* index.html, nodetest.js, package.json

*What I learned:*
- Creating and running a Node.js server.
- Using require() to import built-in modules.
- Handling HTTP requests and responses.

*Challenges faced:*
- Running the server on a specific port.
- Fixing “port already in use” errors.

---

## 🧪 Experiment 5_6
*Topic:* Express.js and Modular Node.js Applications  
*Files:* index.js, server.js, package.json, package2.json

*What I learned:*
- Installing and using Express.js framework.
- Creating routes and handling requests in Express.
- Understanding package.json and dependencies.

*Challenges faced:*
- Configuring Express properly.
- Managing multiple JavaScript files in one project.

---

## 🧪 Experiment 7
*Topic:* Node.js Sessions and Cookies  
*Files:* source/, server.js, package.json

*What I learned:*
- Using cookies and sessions in Node.js.
- Maintaining user sessions across multiple pages.
- Understanding middleware and session storage.

*Challenges faced:*
- Configuring session middleware correctly.
- Debugging cookie handling issues.

---

## 🏁 Conclusion
This lab helped me gain hands-on experience in *front-end and back-end web development*.  
I learned how to:
- Design interactive front-end applications (HTML, CSS, JS, jQuery, Angular).
- Build and deploy backend applications using *Node.js and Express*.
- Handle user sessions, cookies, and server routing.

*Overall Challenge:*  
Initially, understanding how client and server communicate was difficult, but through these experiments, I developed a clear understanding of *full-stack web development*.

---

*Submitted by:* Sonal  
*Course:* Advanced Web Technology Lab  
*Tools Used:* VS Code, Node.js, GitHub