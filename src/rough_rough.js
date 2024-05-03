
// const express = require('express');
// const app = express();
// const path = require('path');
// const hbs = require('hbs');
// const collection = require("./mongodb");

// const tempelatePath = path.join(__dirname, '../tempelates');

// app.use(express.json());
// app.set("view engine", "hbs");
// app.set("views", tempelatePath);

// app.use(express.urlencoded({ extended: false }));

// function createServer() {
//     const desiredPort = 3001;
//     let currentPort = desiredPort;

//     const server = app.listen(currentPort, () => {
//         console.log(`Server is running on port ${currentPort}`);
//     });

//     server.on('error', (error) => {
//         if (error.code === 'EADDRINUSE') {
//             // Port is already in use, try the next port
//             console.log(`Port ${currentPort} is already in use. Trying the next port...`);
//             currentPort++;
//             createServer();
//         } else {
//             console.error('Server error:', error);
//         }
//     });
// }

// // Routes

// app.get("/", (req, res) => {
//     res.render("login");
// });

// app.get("/signup", (req, res) => {
//     res.render("signup");
// });

// app.get("/home", (req, res) => {
//     // Redirect to login page
//     res.redirect("/");
// });

// app.get("/journal", (req, res) => {
//     // Render the journal page
//     res.render("journal");
// });





// app.post("/login", async(req,res)=>{

//     const data={
//         name: req.body.name,
//         password: req.body.password
//     }

//     await collection.create([data])
//     res.redirect("/home")

// })


// app.post("/signup", async (req, res) => {
//     // Save signup data to database
//     // Assuming you have signup logic here

//     // Redirect to journal page after signup
//     res.redirect("/login");
// });


// // Route for saving a journal entry
// app.post("/journal", async (req, res) => {
//     const { datetime, entry } = req.body;


//     // Check if both datetime and entry are provided
//     if (!datetime || !entry) {
//         return res.status(400).send("Both datetime and entry are required.");
//     }


//     // Save journal entry to database
//     await collection.create({ datetime, entry })
//         .then(() => {
//             console.log("Journal entry saved successfully.");
//             res.redirect("/journal"); // Redirect to journal page after saving
//         })
//         .catch(error => {
//             console.error("Error saving journal entry:", error);
//             res.status(500).send("Internal Server Error");
//         });
// });

// // Start the server
// createServer();